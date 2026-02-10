import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DateBackground() {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0.015, 0.025, 0.02, 0.01]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  return (
    <motion.div
      style={{ y, opacity, rotate }}
      className="fixed top-[20%] right-[5%] pointer-events-none select-none z-0"
    >
      <span className="text-[15vw] md:text-[12vw] font-serif text-amber-300/15 font-extralight tracking-[0.2em]">
        02
      </span>
    </motion.div>
  );
}