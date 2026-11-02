import { useEffect, useState } from "react";
import type { Car, CarRequest } from "../models/Car";

interface Props {
    initialData?: Car;
    onSubmit: (car: CarRequest) => void;
    submitText: string;
}

type FormState = {
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: string;
    productionDate: string;
    averageFuelConsumption: number;
};

const emptyForm: FormState = {
    brand: "",
    model: "",
    doorsNumber: 0,
    luggageCapacity: 0,
    engineCapacity: 0,
    fuelType: "",
    productionDate: "",
    averageFuelConsumption: 0
};

export default function CarForm({
                                    initialData,
                                    onSubmit,
                                    submitText
                                }: Props) {
    const [form, setForm] = useState<FormState>(emptyForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                brand: initialData.brand,
                model: initialData.model,
                doorsNumber: initialData.doorsNumber,
                luggageCapacity: initialData.luggageCapacity,
                engineCapacity: initialData.engineCapacity,
                fuelType: initialData.fuelType,
                productionDate: initialData.productionDate,
                averageFuelConsumption: initialData.averageFuelConsumption
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const numericFields = [
            "doorsNumber",
            "luggageCapacity",
            "engineCapacity",
            "averageFuelConsumption"
        ];

        setForm(prev => ({
            ...prev,
            [name]: numericFields.includes(name)
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(form);
    };

    return (
        <form className="car-form" onSubmit={handleSubmit}>
            <label htmlFor="brand">Marka</label>
            <input
                id="brand"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
            />

            <label htmlFor="model">Model</label>
            <input
                id="model"
                name="model"
                value={form.model}
                onChange={handleChange}
                required
            />

            <label htmlFor="doorsNumber">Liczba drzwi</label>
            <input
                id="doorsNumber"
                name="doorsNumber"
                type="number"
                min="1"
                value={form.doorsNumber}
                onChange={handleChange}
                required
            />

            <label htmlFor="luggageCapacity">
                Pojemność bagażnika (l)
            </label>
            <input
                id="luggageCapacity"
                name="luggageCapacity"
                type="number"
                min="0"
                value={form.luggageCapacity}
                onChange={handleChange}
                required
            />

            <label htmlFor="engineCapacity">
                Pojemność silnika (cm³)
            </label>
            <input
                id="engineCapacity"
                name="engineCapacity"
                type="number"
                min="0"
                value={form.engineCapacity}
                onChange={handleChange}
                required
            />

            <label htmlFor="fuelType">Rodzaj paliwa</label>
            <select
                id="fuelType"
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
                required
            >
                <option value="">Wybierz paliwo</option>
                <option value="Petrol">Benzyna</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybryda</option>
                <option value="Electric">Elektryczny</option>
                <option value="LPG">LPG</option>
            </select>

            <label htmlFor="productionDate">
                Data produkcji
            </label>
            <input
                id="productionDate"
                name="productionDate"
                type="date"
                value={form.productionDate}
                onChange={handleChange}
                required
            />

            <label htmlFor="averageFuelConsumption">
                Średnie zużycie paliwa
            </label>
            <input
                id="averageFuelConsumption"
                name="averageFuelConsumption"
                type="number"
                min="0"
                step="1"
                value={form.averageFuelConsumption}
                onChange={handleChange}
                required
            />

            <button type="submit" className="primary-btn">
                {submitText}
            </button>
        </form>
    );
}