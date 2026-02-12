import { useState, useEffect, useCallback } from 'react';
import { warriorService, Warrior } from '../services/warriorService';

export const useWarriors = () => {
    const [warriors, setWarriors] = useState<Warrior[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRace, setSelectedRace] = useState<string | null>(null);
    const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(null);

    const fetchWarriors = useCallback(async () => {
        try {
            setLoading(true);
            const data = await warriorService.getCharacters(1, 50, selectedRace || undefined, selectedAffiliation || undefined);
            setWarriors(data.items);
            setError(null);
        } catch (err) {
            setError('Houve uma interferência no Radar... Não foi possível localizar os sinais.');
        } finally {
            setLoading(false);
        }
    }, [selectedRace, selectedAffiliation]);

    const searchWarriors = useCallback(async (name: string) => {
        if (!name) {
            fetchWarriors();
            return;
        }

        try {
            setLoading(true);
            const data = await warriorService.searchCharacters(name);
            // The API returns an array for name search
            setWarriors(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Sinal perdido na busca.');
        } finally {
            setLoading(false);
        }
    }, [fetchWarriors]);

    useEffect(() => {
        fetchWarriors();
    }, [fetchWarriors]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                searchWarriors(searchQuery);
            } else {
                fetchWarriors();
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, searchWarriors, fetchWarriors]);

    return {
        warriors,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedRace,
        setSelectedRace,
        selectedAffiliation,
        setSelectedAffiliation
    };
};
