import React from 'react';
import { motion } from 'framer-motion';

export const RadarSweep: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-slate-950">
            {/* Static Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF41_1px,transparent_1px),linear-gradient(to_bottom,#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Circular Sweep */}
            <motion.div
                animate={{
                    scale: [0, 4],
                    opacity: [0.3, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-4 border-radar-green rounded-full"
            />

            {/* Rotating Line Sweep */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px]"
            >
                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-b from-radar-green to-transparent opacity-30 shadow-[0_0_15px_rgba(0,255,65,0.5)]"></div>
            </motion.div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
        </div>
    );
};
