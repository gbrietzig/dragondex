import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites } from '../useFavorites';

const STORAGE_KEY = 'dragon_dex_favorites';

describe('useFavorites', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with empty favorites', () => {
        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([]);
    });

    it('should toggle a favorite', () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite(1);
        });

        expect(result.current.favorites).toContain(1);
        expect(result.current.isFavorite(1)).toBe(true);

        act(() => {
            result.current.toggleFavorite(1);
        });

        expect(result.current.favorites).not.toContain(1);
        expect(result.current.isFavorite(1)).toBe(false);
    });

    it('should persist favorites to localStorage', () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite(1);
        });

        const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        expect(stored).toContain(1);
    });

    it('should load favorites from localStorage', () => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2]));

        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([1, 2]);
    });
});
