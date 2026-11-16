
import type { Car, CarListItem, CarRequest } from "../models/Car";

import {apiClient} from "../api/apiClient.ts";

export const carService = {

    async getAll(): Promise<CarListItem[]> {
        try {
            const response = await apiClient.get<{ cars: CarListItem[] }>('/Cars');
            return response.data.cars;
        } catch (error) {
            throw new Error("Nie udało się pobrać samochodów", { cause: error });
        }
    },

    async getById(id: string): Promise<Car> {
        try {
            const response = await apiClient.get<Car>(`/Cars/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Nie znaleziono samochodu", { cause: error });
        }
    },

    async create(car: CarRequest): Promise<void> {
        try {
            await apiClient.post('/Cars', car);
        } catch (error) {
            throw new Error("Nie udało się dodać samochodu", { cause: error });
        }
    },

    async update(id: string, car: CarRequest): Promise<void> {
        try {
            await apiClient.put(`/Cars/${id}`, car);
        } catch (error) {
            throw new Error("Nie udało się edytować samochodu", { cause: error });
        }
    },

    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/Cars/${id}`);
        } catch (error) {
            throw new Error("Nie udało się usunąć samochodu", { cause: error });
        }
    }
};