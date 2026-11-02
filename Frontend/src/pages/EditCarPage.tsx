
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Car, CarRequest } from "../models/Car";
import { carService } from "../Services/carService";

import CarForm from "../components/CarForm";
import Loading from "../components/Loading";

export default function EditCarPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const loadCar = async () => {
            try {
                const data = await carService.getById(id);
                setCar(data);
            } catch {
                setError("Nie udało się pobrać samochodu.");
            } finally {
                setLoading(false);
            }
        };

        loadCar();
    }, [id]);

    const handleSubmit = async (updatedCar: CarRequest) => {
        if (!id) return;

        try {
            setSaving(true);
            setError("");

            await carService.update(id, updatedCar);

            navigate(`/cars/${id}`);
        } catch {
            setError("Nie udało się zaktualizować samochodu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loading message="Pobieranie danych samochodu..." />;
    }

    if (!car) {
        return <p className="error">{error || "Nie znaleziono samochodu."}</p>;
    }

    return (
        <div>
            <h1>Edytuj samochód</h1>

            {error && <p className="error">{error}</p>}

            <CarForm
                initialData={car}
                onSubmit={handleSubmit}
                submitText={saving ? "Zapisywanie..." : "Zapisz zmiany"}
            />
        </div>
    );
}
