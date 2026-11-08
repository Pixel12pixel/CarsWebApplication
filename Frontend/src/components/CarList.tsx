
import { Link } from "react-router-dom";
import type { CarListItem } from "../models/Car";
import { useCarStore } from "../store/useCarStore";

interface Props {
    cars: CarListItem[];
    onDelete: (id: string) => void;
}

export default function CarList({ cars, onDelete }: Props) {
    const searchTerm = useCarStore(
        (state) => state.searchTerm
    );

    const onlyFavorites = useCarStore(
        (state) => state.onlyFavorites
    );

    const favoriteIds = useCarStore(
        (state) => state.favoriteIds
    );

    const toggleFavorite = useCarStore(
        (state) => state.toggleFavorite
    );

    const filteredCars = cars
        .map((car) => {
            const match = car.match(
                /^\(([^,]+),\s*([^,]+),\s*(.*)\)$/
            );

            if (!match) return null;

            return {
                id: match[1].trim(),
                model: match[2].trim(),
                brand: match[3].trim()
            };
        })
        .filter((car) => {
            if (!car) return false;

            const search = searchTerm.toLowerCase();

            const matchesSearch =
                car.model.toLowerCase().includes(search) ||
                car.brand.toLowerCase().includes(search);

            const matchesFavorites =
                !onlyFavorites ||
                favoriteIds.includes(car.id);

            return matchesSearch && matchesFavorites;
        });

    return (
        <table className="car-table">
            <thead>
            <tr>
                <th>Samochód</th>
                <th>Ulubione</th>
                <th>Akcje</th>
            </tr>
            </thead>

            <tbody>
            {filteredCars.map((car) => {
                if (!car) return null;

                const isFavorite =
                    favoriteIds.includes(car.id);

                return (
                    <tr key={car.id}>
                        <td>
                            {car.brand} {car.model}
                        </td>

                        <td>
                            <button
                                onClick={() =>
                                    toggleFavorite(car.id)
                                }
                                title={
                                    isFavorite
                                        ? "Usuń z ulubionych"
                                        : "Dodaj do ulubionych"
                                }
                            >
                                {isFavorite ? "★" : "☆"}
                            </button>
                        </td>

                        <td className="actions">
                            <Link to={`/cars/${car.id}`}>
                                Szczegóły
                            </Link>

                            <Link to={`/cars/${car.id}/edit`}>
                                Edytuj
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    onDelete(car.id)
                                }
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                );
            })}

            {filteredCars.length === 0 && (
                <tr>
                    <td colSpan={3}>
                        Nie znaleziono samochodów.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
