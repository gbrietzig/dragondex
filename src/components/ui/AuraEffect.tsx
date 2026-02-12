import React from 'react';
import { motion } from 'framer-motion';

interface AuraEffectProps {
    color?: string;
}

export const AuraEffect: React.FC<AuraEffectProps> = ({ color = '#FFCC00' }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary Aura Bloom */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--aura-color)_0%,transparent_70%)]"
                style={{ '--aura-color': color } as any}
            />

            {/* Lightning/Energy Sparkles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        y: '-10%',
                        opacity: [0, 1, 0],
                        rotate: [0, 90, 180]
                    }}
                    transition={{
                        duration: Math.random() * 1 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                    className="absolute w-1 h-8 bg-white blur-[1px]"
                    style={{ left: Math.random() * 100 + '%' }}
                />
            ))}

            {/* Heat Haze Distortion Overlay */}
            <div className="absolute inset-0 backdrop-blur-[2px] opacity-30"></div>
        </div>
    );
};
