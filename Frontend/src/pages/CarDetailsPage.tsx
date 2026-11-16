import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Car } from "../models/Car";
import { carService } from "../Services/carService";

import Loading from "../components/Loading";

import { useCarStore } from "../store/useCarStore";
import { useAuthStore } from "../store/useAuthStore";

const EMPTY_FAVORITE_CAR_IDS: string[] = [];

export default function CarDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.roles.includes("Admin") ?? false;

    const favoriteCarIds = useCarStore((state) =>
        user
            ? state.favoriteCarIdsByUser[user.id] ?? EMPTY_FAVORITE_CAR_IDS
            : EMPTY_FAVORITE_CAR_IDS,
    );

    const toggleFavorite = useCarStore(
        (state) => state.toggleFavorite,
    );

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const loadCar = async () => {
            try {
                setLoading(true);
                setError("");

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
        return (
            <p className="error">
                {error || "Nie znaleziono samochodu."}
            </p>
        );
    }

    const isFavorite = favoriteCarIds.includes(car.id);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten samochód?",
        );

        if (!confirmed) return;

        try {
            await carService.delete(car.id);
            navigate("/cars");
        } catch {
            setError("Nie udało się usunąć samochodu.");
        }
    };

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

            {user && (
                <button
                    type="button"
                    onClick={() => {
                        if (user) {
                            toggleFavorite(user.id, car.id);
                        }
                    }}
                    className="primary-btn"
                >
                    {isFavorite
                        ? "Usuń z ulubionych"
                        : "Dodaj do ulubionych"}
                </button>
            )}

            <Link
                to={`/cars/${car.id}/edit`}
                className="primary-btn"
            >
                Edytuj
            </Link>

            {isAdmin && (
                <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                >
                    Usuń
                </button>
            )}

            <Link to="/cars" className="secondary-btn">
                Powrót do listy
            </Link>
        </div>
    );
}
