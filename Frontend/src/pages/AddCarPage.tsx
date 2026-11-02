
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CarRequest } from "../models/Car";
import { carService } from "../Services/carService";

import CarForm from "../components/CarForm";

export default function AddCarPage() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (car: CarRequest) => {
        try {
            setSaving(true);
            setError("");

            await carService.create(car);

            navigate("/cars");
        } catch {
            setError("Nie udało się dodać samochodu.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h1>Dodaj samochód</h1>

            {error && <p className="error">{error}</p>}

            <CarForm
                onSubmit={handleSubmit}
                submitText={saving ? "Zapisywanie..." : "Dodaj samochód"}
            />
        </div>
    );
}
