import type {
    LoginData,
    RegisterData,
    User,
} from "../models/Auth";
import {
    apiClient,
} from "../api/apiClient";

const confirmationRequests = new Map<string, Promise<string>>();

export async function login(
    data: LoginData,
): Promise<User> {
    const response =
        await apiClient.post<User>(
            "/Auth/login",
            data,
        );
    return response.data;
}
export async function register(
    data: RegisterData,
): Promise<string> {
    const response =
        await apiClient.post<{
            message: string;
        }        >(
            "/Auth/register",
            data,
        );
    return response.data.message;
}

export async function confirmEmail(
    userId: string,
    token: string,
): Promise<string> {
    const requestKey = `${userId}:${token}`;
    const existingRequest = confirmationRequests.get(requestKey);

    if (existingRequest) {
        return existingRequest;
    }

    const request = apiClient
        .post<{ message: string }>(
            "/Auth/confirm-email",
            {
                userId,
                token,
            },
        )
        .then((response) => response.data.message)
        .catch((error) => {
            confirmationRequests.delete(requestKey);
            throw error;
        });

    confirmationRequests.set(requestKey, request);

    return request;
}

export async function forgotPassword(
    email: string,
): Promise<string> {
    const response =
        await apiClient.post<{
            message: string;
        }>(
            "/Auth/forgot-password",
            { email },
        );
    return response.data.message;
}
export async function resetPassword(
    email: string,
    token: string,
    password: string,
): Promise<string> {
    const response =
        await apiClient.post<{
            message: string;
        }>(
            "/Auth/reset-password",
            {
                email,
                token,
                password,
            },
);
    return response.data.message;
}