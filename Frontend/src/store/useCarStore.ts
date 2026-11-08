
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarStore {
    searchTerm: string;
    onlyFavorites: boolean;
    favoriteIds: string[];

    setSearchTerm: (term: string) => void;
    toggleOnlyFavorites: () => void;
    toggleFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
}

export const useCarStore = create<CarStore>()(
    persist(
        (set) => ({
            searchTerm: "",
            onlyFavorites: false,
            favoriteIds: [],

            setSearchTerm: (term) =>
                set({ searchTerm: term }),

            toggleOnlyFavorites: () =>
                set((state) => ({
                    onlyFavorites: !state.onlyFavorites
                })),

            toggleFavorite: (id) =>
                set((state) => {
                    const exists = state.favoriteIds.includes(id);

                    return {
                        favoriteIds: exists
                            ? state.favoriteIds.filter(
                                (favId) => favId !== id
                            )
                            : [...state.favoriteIds, id]
                    };
                }),

            removeFavorite: (id) =>
                set((state) => ({
                    favoriteIds: state.favoriteIds.filter(
                        (favId) => favId !== id
                    )
                }))
        }),
        {
            name: "car-storage",
            partialize: (state) => ({
                favoriteIds: state.favoriteIds
            })
        }
    )
);
