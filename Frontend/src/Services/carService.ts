import axios from 'axios';
import type { Car, CarListItem, CarRequest } from "../models/Car";

const api = axios.create({
    baseURL: "http://localhost:5213/api/Cars",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const carService = {

    async getAll(): Promise<CarListItem[]> {
        try {
            const response = await api.get<{ cars: CarListItem[] }>('');
            return response.data.cars;
        } catch (error) {
            throw new Error("Nie udało się pobrać samochodów", { cause: error });
        }
    },

    async getById(id: string): Promise<Car> {
        try {
            const response = await api.get<Car>(`/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Nie znaleziono samochodu", { cause: error });
        }
    },

    async create(car: CarRequest): Promise<void> {
        try {
            await api.post('', car);
        } catch (error) {
            throw new Error("Nie udało się dodać samochodu", { cause: error });
        }
    },

    async update(id: string, car: CarRequest): Promise<void> {
        try {
            await api.put(`/${id}`, car);
        } catch (error) {
            throw new Error("Nie udało się edytować samochodu", { cause: error });
        }
    },

    async delete(id: string): Promise<void> {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            throw new Error("Nie udało się usunąć samochodu", { cause: error });
        }
    }
};