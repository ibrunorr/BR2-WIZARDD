import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';

export default function AudioPlayer({ 
  spotifyUrl = '',
  song = '',
  artist = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!spotifyUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 flex items-center gap-4 p-4 rounded-full bg-gradient-to-r from-rose-100/50 to-amber-100/50 border border-amber-200/50 w-fit"
    >
      <motion.button
        onClick={handlePlayPause}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-300 flex items-center justify-center text-white shadow-lg"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" fill="currentColor" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        )}
      </motion.button>
      
      <audio
        ref={audioRef}
        src={spotifyUrl}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="text-sm">
        <p className="font-medium text-amber-900">{song}</p>
        <p className="text-xs text-amber-700/70">{artist}</p>
      </div>
      
      <Volume2 className="w-4 h-4 text-amber-600 ml-2" />
    </motion.div>
  );
}