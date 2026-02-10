import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function ImageShowcase({ 
  imageUrl, 
  alt = '', 
  direction = 'left',
  parallaxStrength = 50
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: '-100px 0px -100px 0px' 
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxStrength, parallaxStrength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  const slideFrom = direction === 'left' ? -100 : 100;
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1.4, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative w-full ${direction === 'left' ? 'mr-auto' : 'ml-auto'}`}
    >
      {/* Elementos decorativos ao redor */}
      <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-rose-300/40 rounded-full" />
      <div className="absolute -bottom-6 -right-6 w-16 h-16 border-2 border-amber-300/40 rounded-full" />
      <div className="absolute top-1/2 -left-8 w-3 h-3 bg-rose-300/50 rounded-full animate-pulse" />
      <div className="absolute top-1/3 -right-8 w-3 h-3 bg-amber-300/50 rounded-full animate-pulse" style={{animationDelay: '1s'}} />

      {/* Container decorado */}
      <div className="relative p-6 bg-gradient-to-br from-white via-rose-50/40 to-amber-50/40 rounded-3xl shadow-2xl border-4 border-rose-200/50">
        {/* Frame decorativo */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-inner">
          {/* Overlay sutil com brilho */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-rose-900/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-amber-200/10 z-10" />
          
          {/* Imagem com parallax e zoom */}
          <motion.div
            style={{ y, scale }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1) contrast(1.05) saturate(1.1)' }}
            />
          </motion.div>
          
          {/* Cantos decorativos */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-300/60 z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-300/60 z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-300/60 z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-300/60 z-20" />
        </div>
        
        {/* Sombra decorativa */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-rose-400/20 blur-2xl" />
      </div>
    </motion.div>
  );
}