import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IntroductionScreen({ onEnter }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 overflow-hidden"
        >
          {/* Elementos de fundo animados */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Orbs grandes */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/40 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.35, 0.15],
                x: [0, -40, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3
              }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-300/30 rounded-full blur-[130px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300/25 rounded-full blur-[140px]"
            />

            {/* Partículas flutuantes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000, 
                  y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  opacity: 0 
                }}
                animate={{
                  y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut'
                }}
                className="absolute w-2 h-2 bg-rose-400/40 rounded-full"
              />
            ))}
          </div>

          {/* Conteúdo central */}
          <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
            {/* Coração principal animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                type: 'spring',
                stiffness: 200 
              }}
              className="relative inline-block"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 blur-2xl bg-rose-400/40 rounded-full"
              />
              <Heart className="relative w-24 h-24 mx-auto text-red-600 fill-red-600 drop-shadow-2xl" />
            </motion.div>

            {/* Sparkles decorativos */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-8 left-1/4"
              >
                <Sparkles className="w-6 h-6 text-amber-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-12 right-1/3"
              >
                <Sparkles className="w-5 h-5 text-rose-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -top-6 right-1/4"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
              </motion.div>
            </div>

            {/* Título principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-8xl font-serif text-[#1e3a5f] leading-tight drop-shadow-sm">
                Para Você
              </h1>
              
              {/* Linha decorativa */}
              <div className="flex items-center justify-center gap-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-rose-300 to-pink-300"
                />
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </motion.div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="h-px bg-gradient-to-r from-pink-300 via-amber-300 to-transparent"
                />
              </div>
            </motion.div>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide"
            >
              BR2 & WIZARD
            </motion.p>

            {/* Botão de entrada */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                  className="pt-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleEnter}
                      size="lg"
                      className="bg-gradient-to-r from-white via-blue-400 to-blue-600 hover:from-blue-50 hover:via-blue-500 hover:to-blue-700 text-[#1e3a5f] px-16 py-8 text-xl font-medium rounded-full shadow-2xl border-4 border-[#FFD700] relative overflow-hidden group"
                    >
                      {/* Efeito de brilho no hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative flex items-center gap-3">
                        Entrar
                        <Heart className="w-5 h-5 fill-white" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Brilhos decorativos nos cantos */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-transparent rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}