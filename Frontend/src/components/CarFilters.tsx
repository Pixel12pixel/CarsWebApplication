
import { useCarStore } from "../store/useCarStore";

export default function CarFilters() {
    const searchTerm = useCarStore(
        (state) => state.searchTerm
    );

    const showFavoritesOnly = useCarStore(
        (state) => state.showFavoritesOnly
    );

    const setSearchTerm = useCarStore(
        (state) => state.setSearchTerm
    );

    const setShowFavoritesOnly = useCarStore(
        (state) => state.setShowFavoritesOnly
    );

    return (
        <div className="car-filters">
            <input
                type="text"
                placeholder="Szukaj po marce lub modelu..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

            <label>
                <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) =>
                        setShowFavoritesOnly(e.target.checked)
                    }
                />

                Tylko ulubione
            </label>
        </div>
    );
}
