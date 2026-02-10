import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Orb 1 - Sutil */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-rose-300/15 rounded-full blur-[120px]"
      />
      
      {/* Orb 2 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3
        }}
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-[100px]"
      />
    </div>
  );
}