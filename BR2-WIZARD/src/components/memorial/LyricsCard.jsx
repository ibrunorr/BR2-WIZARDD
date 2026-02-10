import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music } from 'lucide-react';

export default function LyricsCard({ 
  lyrics, 
  artist, 
  song, 
  align = 'left',
  accentColor = 'purple'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px 0px -50px 0px' 
  });
  
  const colors = {
    purple: 'from-purple-500/20 to-purple-900/5 border-purple-500/20',
    pink: 'from-pink-500/20 to-pink-900/5 border-pink-500/20',
    blue: 'from-blue-500/20 to-blue-900/5 border-blue-500/20',
    amber: 'from-amber-500/20 to-amber-900/5 border-amber-500/20'
  };
  
  const textAlign = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const justifyContent = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      className={`w-full flex ${justifyContent}`}
    >
      <div className={`relative max-w-3xl ${textAlign}`}>
        {/* Card decorativo */}
        <div className="relative p-10 md:p-14 bg-gradient-to-br from-white/90 via-rose-50/60 to-amber-50/60 rounded-3xl border-2 border-amber-200/50 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Brilhos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-200/30 to-transparent rounded-full blur-3xl" />
          
          {/* Elementos decorativos */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-rose-300 to-amber-300 rounded-full opacity-60 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-300 to-rose-300 rounded-full opacity-50 blur-xl" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-rose-300/40 rounded-full animate-pulse" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
          
          {/* Letra */}
          <blockquote className="relative">
            <div className="absolute -top-4 -left-2 text-8xl font-serif text-amber-200/30">"</div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-900 leading-[1.7] tracking-tight italic relative z-10">
              {lyrics}
            </p>
            <div className="absolute -bottom-8 -right-2 text-8xl font-serif text-amber-200/30">"</div>
          </blockquote>
          
          {/* Linha decorativa com ícone */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <Music className="w-4 h-4 text-amber-400" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          </div>
          
          {/* Crédito */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm text-amber-700 font-medium tracking-wide">
              {song}
            </p>
            <p className="text-xs text-amber-600/60 mt-1 tracking-wider uppercase">
              {artist}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}