
import { useEffect, useState } from "react";

import type { CarListItem } from "../models/Car";
import { carService } from "../Services/carService";

import { useCarStore } from "../store/useCarStore";
import CarList from "../components/CarList";
import Loading from "../components/Loading";

export default function FavoritesPage() {
    const [cars, setCars] = useState<CarListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const favoriteIds = useCarStore(
        (state) => state.favoriteIds
    );

    const removeFavorite = useCarStore(
        (state) => state.removeFavorite
    );

    useEffect(() => {
        const loadCars = async () => {
            try {
                const data = await carService.getAll();

                setCars(data);

                const existingIds = data
                    .map((car) => {
                        const match = car.match(/^\(([^,]+)/);
                        return match?.[1].trim();
                    })
                    .filter((id): id is string => Boolean(id));

                favoriteIds.forEach((id) => {
                    if (!existingIds.includes(id)) {
                        removeFavorite(id);
                    }
                });

            } catch {
                setError(
                    "Nie udało się pobrać samochodów."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCars();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten samochód?"
        );

        if (!confirmed) return;

        try {
            await carService.delete(id);

            setCars((prev) =>
                prev.filter((car) => {
                    const match = car.match(/^\(([^,]+)/);
                    return match?.[1].trim() !== id;
                })
            );

            removeFavorite(id);
        } catch {
            setError("Nie udało się usunąć samochodu.");
        }
    };

    const favoriteCars = cars.filter((car) => {
        const match = car.match(/^\(([^,]+)/);

        if (!match) return false;

        const id = match[1].trim();

        return favoriteIds.includes(id);
    });

    if (loading) {
        return <Loading message="Pobieranie ulubionych samochodów..." />;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <div className="page-header">
                <h1>Ulubione samochody</h1>

                <span>
                    Liczba ulubionych: {favoriteCars.length}
                </span>
            </div>

            {favoriteCars.length === 0 ? (
                <div className="empty-state">
                    <h2>Brak ulubionych samochodów</h2>

                    <p>
                        Nie masz jeszcze żadnych samochodów
                        dodanych do ulubionych.
                    </p>
                </div>
            ) : (
                <CarList
                    cars={favoriteCars}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
