import { describe, it, expect, vi, beforeEach } from 'vitest';
import { warriorService } from '../warriorService';
import { api } from '../api';

vi.mock('../api', () => ({
    api: {
        get: vi.fn(),
    },
}));

describe('warriorService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch characters with default params', async () => {
        const mockData = { items: [{ id: 1, name: 'Goku' }], meta: {} };
        (api.get as any).mockResolvedValue({ data: mockData });

        const result = await warriorService.getCharacters();

        expect(api.get).toHaveBeenCalledWith('/characters', {
            params: { page: 1, limit: 50, race: undefined, affiliation: undefined },
        });
        expect(result).toEqual(mockData);
    });

    it('should fetch characters with filters and normalize array response', async () => {
        const mockArray = [{ id: 1, name: 'Goku' }];
        (api.get as any).mockResolvedValue({ data: mockArray });

        const result = await warriorService.getCharacters(1, 50, 'Saiyan');

        expect(api.get).toHaveBeenCalledWith('/characters', {
            params: { page: 1, limit: 50, race: 'Saiyan', affiliation: undefined },
        });
        expect(result).toEqual({ items: mockArray });
    });

    it('should fetch characters with filters', async () => {
        const mockData = { items: [{ id: 1, name: 'Goku' }], meta: {} };
        (api.get as any).mockResolvedValue({ data: mockData });

        const result = await warriorService.getCharacters(1, 10, 'Saiyan', 'Z Fighter');

        expect(api.get).toHaveBeenCalledWith('/characters', {
            params: { page: 1, limit: 10, race: 'Saiyan', affiliation: 'Z Fighter' },
        });
        expect(result).toEqual(mockData);
    });

    it('should fetch character by id', async () => {
        const mockWarrior = { id: 1, name: 'Goku' };
        (api.get as any).mockResolvedValue({ data: mockWarrior });

        const result = await warriorService.getCharacterById(1);

        expect(api.get).toHaveBeenCalledWith('/characters/1');
        expect(result).toEqual(mockWarrior);
    });
});
