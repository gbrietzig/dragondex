import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Zap, Shield, Swords, ChevronRight, ChevronLeft } from 'lucide-react';
import { Warrior, Transformation } from '../../services/warriorService';
import { ScouterStat } from './ScouterStat';
import { AuraEffect } from './AuraEffect';

interface CharacterDetailProps {
    character: Warrior | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, isOpen, onClose }) => {
    const [selectedForm, setSelectedForm] = useState<Transformation | Warrior | null>(null);

    // Reset form when character changes, but wait for the character to be loaded
    React.useEffect(() => {
        if (character) {
            setSelectedForm(character);
        }
    }, [character]);

    if (!character) return null;

    const currentData = selectedForm || character;
    const isTransformation = (currentData as Transformation).image !== character.image;

    // Determine Aura Color based on name
    const getAuraColor = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('blue')) return '#00D4FF';
        if (n.includes('rose') || n.includes('instinct')) return '#FF00A2';
        if (n.includes('ssj') || n.includes('super saiyan') || n.includes('gold')) return '#FFCC00';
        if (n.includes('god')) return '#FF4D00';
        if (n.includes('frieza') || n.includes('freeza')) return '#A200FF';
        return '#00FF41'; // Default Radar Green
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-6xl bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[110] p-2 bg-slate-950/50 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Column: Visual Showcase */}
                        <div className="relative w-full md:w-1/2 bg-slate-950 flex items-center justify-center p-8 overflow-hidden min-h-[400px]">
                            <AuraEffect color={getAuraColor(currentData.name)} />

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentData.image}
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                    src={currentData.image}
                                    alt={currentData.name}
                                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,255,65,0.3)]"
                                />
                            </AnimatePresence>

                            {/* Character Header Overlay */}
                            <div className="absolute bottom-6 left-8 z-20">
                                <motion.span
                                    className="text-dbz-orange font-mono text-xs font-bold tracking-[0.4em] uppercase"
                                >
                                    {isTransformation ? 'Evolution Detected' : 'Warrior Found'}
                                </motion.span>
                                <motion.h2
                                    className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none"
                                >
                                    {currentData.name}
                                </motion.h2>
                            </div>
                        </div>

                        {/* Right Column: Intel/Scouter Data */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-slate-900/50">
                            <div className="space-y-8">
                                {/* Stats Grid */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-dbz-orange" /> Scouter Analysis
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ScouterStat label="Form KI" value={currentData.ki} color="orange" />
                                        <ScouterStat label="MAX Potential" value={character.maxKi} color="gold" />
                                        <ScouterStat label="Origin Race" value={character.race} color="radar-green" />
                                        <ScouterStat label="Affiliation" value={character.affiliation} color="radar-green" />
                                    </div>
                                </div>

                                {/* Transformations Selector */}
                                {character.transformations && character.transformations.length > 0 && (
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                                            <Swords className="w-3 h-3 text-dbz-orange" /> Adaptive Evolutions
                                        </h3>
                                        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                                            {/* Base Form Option */}
                                            <button
                                                onClick={() => setSelectedForm(character)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all overflow-hidden ${selectedForm?.name === character.name ? 'border-dbz-orange bg-dbz-orange/10' : 'border-slate-800 bg-slate-950'
                                                    }`}
                                            >
                                                <img src={character.image} alt="Base" className="w-full h-full object-contain p-2" />
                                            </button>

                                            {/* Transformations */}
                                            {character.transformations.map((trans) => (
                                                <button
                                                    key={trans.id}
                                                    onClick={() => setSelectedForm(trans)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all overflow-hidden ${selectedForm?.name === trans.name ? 'border-dbz-orange bg-dbz-orange/10' : 'border-slate-800 bg-slate-950'
                                                        }`}
                                                >
                                                    <img src={trans.image} alt={trans.name} className="w-full h-full object-contain p-2" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* DescriptionSection */}
                                {!isTransformation && (
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                                            <Shield className="w-3 h-3 text-dbz-orange" /> Vital Intel
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed font-medium">
                                            {character.description}
                                        </p>
                                    </div>
                                )}

                                {/* Technical Specs */}
                                <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-8">
                                    <div className="flex items-start gap-3">
                                        <Globe className="w-5 h-5 text-dbz-orange" />
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-slate-500">Gender</span>
                                            <span className="text-sm font-bold uppercase">{character.gender}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Swords className="w-5 h-5 text-dbz-orange" />
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-slate-500">ID Signature</span>
                                            <span className="text-sm font-mono text-radar-green">#{character.id.toString().padStart(4, '0')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
