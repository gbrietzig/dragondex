import { api } from './api';

export interface Transformation {
    id: number;
    name: string;
    image: string;
    ki: string;
}

export interface Warrior {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    transformations?: Transformation[];
}

export interface ApiResponse<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

export const warriorService = {
    getCharacters: async (page = 1, limit = 50) => {
        const response = await api.get<ApiResponse<Warrior>>(`/characters`, {
            params: { page, limit },
        });
        return response.data;
    },

    getCharacterById: async (id: number) => {
        const response = await api.get<Warrior>(`/characters/${id}`);
        return response.data;
    },

    searchCharacters: async (name: string) => {
        const response = await api.get<Warrior[]>(`/characters`, {
            params: { name },
        });
        return response.data;
    },
};
