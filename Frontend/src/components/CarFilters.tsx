

import { useCarStore } from "../store/useCarStore";

export default function CarFilters() {
    const searchTerm = useCarStore(
        (state) => state.searchTerm
    );

    const onlyFavorites = useCarStore(
        (state) => state.onlyFavorites
    );

    const setSearchTerm = useCarStore(
        (state) => state.setSearchTerm
    );

    const toggleOnlyFavorites = useCarStore(
        (state) => state.toggleOnlyFavorites
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
                    checked={onlyFavorites}
                    onChange={toggleOnlyFavorites}
                />

                Tylko ulubione
            </label>
        </div>
    );
}
