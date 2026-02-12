import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ScouterStat } from './ScouterStat';

interface CharacterCardProps {
    id: number;
    name: string;
    image: string;
    ki: string;
    race: string;
    affiliation: string;
    isFavorite?: boolean;
    onToggleFavorite?: (e: React.MouseEvent) => void;
    onClick?: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
    name,
    image,
    ki,
    race,
    affiliation,
    isFavorite,
    onToggleFavorite,
    onClick
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative group cursor-pointer bg-slate-900 border-2 border-slate-800 rounded-xl overflow-hidden hover:border-dbz-orange transition-colors"
        >
            {/* Radar Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            </div>

            {/* Favorite Toggle */}
            <button
                onClick={onToggleFavorite}
                className="absolute top-3 left-3 z-30 p-2 rounded-full bg-slate-950/60 border border-slate-800 hover:border-dbz-orange transition-all group/fav"
            >
                <Heart
                    className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-dbz-orange text-dbz-orange' : 'text-slate-500 group-hover/fav:text-dbz-orange'
                        }`}
                />
            </button>

            <div className="aspect-[3/4] overflow-hidden bg-slate-950 relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>

            <div className="p-4 space-y-4 relative">
                <div>
                    <h3 className="text-xl font-black italic tracking-tighter uppercase group-hover:text-dbz-orange transition-colors">
                        {name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                        {race} • {affiliation}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <ScouterStat label="Power Level" value={ki} color="orange" />
                </div>
            </div>

            {/* Scouter Corner Elements */}
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-700 group-hover:border-dbz-orange transition-colors"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-700 group-hover:border-dbz-orange transition-colors"></div>
        </motion.div>
    );
};
