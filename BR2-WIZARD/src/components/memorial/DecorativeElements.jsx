import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function DecorativeElements({ variant = 'hearts' }) {
  if (variant === 'hearts') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: -200,
              rotate: 360,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeInOut'
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-50px',
            }}
          >
            <Heart className="w-4 h-4 text-rose-300/40" fill="currentColor" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'sparkles') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut'
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-3 h-3 text-amber-400/60" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'stars') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
            className="absolute"
            style={{
              left: `${5 + i * 9}%`,
              top: `${10 + (i % 4) * 25}%`,
            }}
          >
            <Star className="w-2 h-2 text-amber-400/40" fill="currentColor" />
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}