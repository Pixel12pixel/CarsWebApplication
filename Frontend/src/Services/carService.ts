import type {Car, CarListItem, CarRequest} from "../models/Car";

const API_URL = `http://localhost:5213/api/Cars`;

export const carService = {

    async getAll(): Promise<CarListItem[]> {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Nie udało się pobrać samochodów");
        }

        const data: { cars: string[] } = await response.json();

        return data.cars;
    },

    async getById(id: string): Promise<Car> {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Nie znaleziono samochodu");
        }

        return response.json();
    },

    async create(car: CarRequest): Promise<void> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        });

        if (!response.ok) {
            throw new Error("Nie udało się dodać samochodu");
        }
    },

    async update(id: string, car: CarRequest): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        });

        if (!response.ok) {
            throw new Error("Nie udało się edytować samochodu");
        }
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Nie udało się usunąć samochodu");
        }
    }
};