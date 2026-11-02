
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { CarListItem } from "../models/Car";
import { carService } from "../Services/carService";

import CarList from "../components/CarList";
import Loading from "../components/Loading";

export default function CarsPage() {
    const [cars, setCars] = useState<CarListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCars = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await carService.getAll();

            setCars(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Nie udało się pobrać samochodów."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten samochód?"
        );

        if (!confirmed) return;

        try {
            await carService.delete(id);

            setCars(prev =>
                prev.filter(car => {
                    const match = car.match(/^\(([^,]+)/);

                    return match?.[1].trim() !== id;
                })
            );

            setError("");
        } catch {
            setError("Nie udało się usunąć samochodu.");
        }
    };

    if (loading) {
        return <Loading message="Pobieranie samochodów..." />;
    }

    return (
        <div>
            <div className="page-header">
                <h1>Lista samochodów</h1>

                <Link to="/cars/new" className="primary-btn">
                    Dodaj samochód
                </Link>
            </div>

            {error && (
                <p className="error">{error}</p>
            )}

            {cars.length === 0 ? (
                <p>Brak samochodów w bazie danych.</p>
            ) : (
                <CarList
                    cars={cars}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
