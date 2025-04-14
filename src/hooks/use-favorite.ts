import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
    id: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavorites() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('favorites', []);
    const queryClient = useQueryClient();

    const favoritesQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity,
    });

    const addFavorite = useMutation({
        mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            };

            if (favorites.some((fav) => fav.id === newFavorite.id)) {
                return favorites;
            }

            const newFavorites = [...favorites, newFavorite];
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: (newFavorites) => {
            queryClient.setQueryData(['favorites'], newFavorites);
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: (newFavorites) => {
            queryClient.setQueryData(['favorites'], newFavorites);
        },
    });

    return {
        favorites: favoritesQuery.data ?? [],
        addFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) =>
            favorites.some((city) => city.lat === lat && city.lon === lon),
    };
}
