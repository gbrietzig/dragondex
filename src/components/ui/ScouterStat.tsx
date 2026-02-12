import React from 'react';

interface ScouterStatProps {
    label: string;
    value: string;
    color?: 'green' | 'red' | 'orange' | 'gold' | 'radar-green';
}

export const ScouterStat: React.FC<ScouterStatProps> = ({ label, value, color = 'radar-green' }) => {
    const colorMap = {
        'radar-green': 'border-radar-green text-radar-green',
        'green': 'border-green-500 text-green-500',
        'red': 'border-red-500 text-red-500',
        'orange': 'border-dbz-orange text-dbz-orange',
        'gold': 'border-dbz-gold text-dbz-gold',
    };

    const selectedColor = colorMap[color as keyof typeof colorMap] || colorMap['radar-green'];

    return (
        <div className={`flex flex-col border-l-2 pl-2 ${selectedColor} bg-slate-900/50 py-1`}>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">{label}</span>
            <span className="text-lg font-mono leading-none font-black tracking-tighter">
                {value}
            </span>
        </div>
    );
};
