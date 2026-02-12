import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dragon_dex_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Initial load
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Falha ao sincronizar favoritos do banco de dados local.', e);
            }
        }
    }, []);

    const toggleFavorite = useCallback((id: number) => {
        setFavorites((prev) => {
            const isFav = prev.includes(id);
            const updated = isFav
                ? prev.filter((favId) => favId !== id)
                : [...prev, id];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const isFavorite = useCallback((id: number) => {
        return favorites.includes(id);
    }, [favorites]);

    return { favorites, toggleFavorite, isFavorite };
};
