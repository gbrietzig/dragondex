import React from 'react';
import { Target, Users, X, Filter } from 'lucide-react';

interface FilterScouterProps {
    selectedRace: string | null;
    setSelectedRace: (race: string | null) => void;
    selectedAffiliation: string | null;
    setSelectedAffiliation: (affiliation: string | null) => void;
}

const RACES = [
    'Saiyan',
    'Namekian',
    'Human',
    'Majin',
    'Frieza Race',
    'Android',
    'God',
    'Nucleico',
    'Cerealian',
    'Unknown'
];

const AFFILIATIONS = [
    'Z Fighter',
    'Red Ribbon Army',
    'Frieza Force',
    'Galactic Patrol',
    'Pride Troopers',
    'Army of Babidi',
    'Other'
];

export const FilterScouter: React.FC<FilterScouterProps> = ({
    selectedRace,
    setSelectedRace,
    selectedAffiliation,
    setSelectedAffiliation
}) => {
    return (
        <div className="space-y-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                    <Filter className="w-3 h-3 text-dbz-orange" /> Filter Protocols
                </h3>
                {(selectedRace || selectedAffiliation) && (
                    <button
                        onClick={() => {
                            setSelectedRace(null);
                            setSelectedAffiliation(null);
                        }}
                        className="text-[10px] font-bold uppercase text-dbz-orange hover:text-white transition-colors flex items-center gap-1"
                    >
                        <X className="w-3 h-3" /> Clear HUD
                    </button>
                )}
            </div>

            {/* Race Filter */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Target className="w-3 h-3 text-radar-green" /> DNA Signature
                </div>
                <div className="flex flex-wrap gap-2">
                    {RACES.map((race) => (
                        <button
                            key={race}
                            onClick={() => setSelectedRace(selectedRace === race ? null : race)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase transition-all border ${selectedRace === race
                                ? 'bg-radar-green/20 border-radar-green text-radar-green shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                                : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                                }`}
                        >
                            {race}
                        </button>
                    ))}
                </div>
            </div>

            {/* Affiliation Filter */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Users className="w-3 h-3 text-dbz-orange" /> Alliance detected
                </div>
                <div className="flex flex-wrap gap-2">
                    {AFFILIATIONS.map((aff) => (
                        <button
                            key={aff}
                            onClick={() => setSelectedAffiliation(selectedAffiliation === aff ? null : aff)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase transition-all border ${selectedAffiliation === aff
                                ? 'bg-dbz-orange/20 border-dbz-orange text-dbz-orange shadow-[0_0_15px_rgba(255,106,0,0.2)]'
                                : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                                }`}
                        >
                            {aff}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
