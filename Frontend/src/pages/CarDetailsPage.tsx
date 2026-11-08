
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Car } from "../models/Car";
import { carService } from "../Services/carService";

import Loading from "../components/Loading";

import { useCarStore } from "../store/useCarStore";

export default function CarDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const favoriteIds = useCarStore(
        (state) => state.favoriteIds
    );

    const toggleFavorite = useCarStore(
        (state) => state.toggleFavorite
    );

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const loadCar = async () => {
            try {
                const data = await carService.getById(id);
                setCar(data);
            } catch {
                setError("Nie udało się pobrać szczegółów samochodu.");
            } finally {
                setLoading(false);
            }
        };

        loadCar();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error || !car) {
        return <p className="error">{error || "Nie znaleziono samochodu."}</p>;
    }

    return (
        <div className="details">
            <h1>Szczegóły samochodu</h1>

            <p><strong>ID:</strong> {car.id}</p>
            <p><strong>Marka:</strong> {car.brand}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Liczba drzwi:</strong> {car.doorsNumber}</p>
            <p><strong>Pojemność bagażnika:</strong> {car.luggageCapacity} l</p>
            <p><strong>Pojemność silnika:</strong> {car.engineCapacity} cm³</p>
            <p><strong>Rodzaj paliwa:</strong> {car.fuelType}</p>
            <p><strong>Data produkcji:</strong> {car.productionDate}</p>
            <p>
                <strong>Średnie zużycie paliwa:</strong>{" "}
                {car.averageFuelConsumption}
            </p>

            <button
                onClick={() => toggleFavorite(car.id)}
                className="primary-btn"
            >
                {favoriteIds.includes(car.id)
                    ? "Usuń z ulubionych"
                    : "Dodaj do ulubionych"}
            </button>

            <Link
                to={`/cars/${car.id}/edit`}
                className="primary-btn"
            >
                Edytuj
            </Link>

            <Link to="/cars" className="secondary-btn">
                Powrót do listy
            </Link>
        </div>
    );
}
