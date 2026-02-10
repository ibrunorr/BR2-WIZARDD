import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SongCard({ song, isPlaying, onPlay, onDelete, isCurrentSong }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group bg-gradient-to-br from-white/80 via-rose-50/40 to-amber-50/40 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 ${
        isCurrentSong ? 'border-rose-400/60 shadow-lg shadow-rose-200/50' : 'border-rose-200/30 hover:border-rose-300/50'
      }`}
    >
      {/* Album Art */}
      <div className="relative mb-4">
        <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
          {song.album_art_url ? (
            <img 
              src={song.album_art_url} 
              alt={song.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="w-16 h-16 text-rose-300" />
          )}
        </div>
        
        {/* Play button overlay */}
        <button
          onClick={onPlay}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying && isCurrentSong ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </button>
      </div>

      {/* Song Info */}
      <div className="space-y-1 mb-4">
        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">
          {song.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {song.artist}
        </p>
        {song.duration && (
          <p className="text-xs text-gray-500">
            {song.duration}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onPlay}
          size="sm"
          className="flex-1 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500"
        >
          {isPlaying && isCurrentSong ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying && isCurrentSong ? 'Pausar' : 'Tocar'}
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="outline"
          className="border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {/* Playing indicator */}
      {isPlaying && isCurrentSong && (
        <div className="absolute top-3 right-3">
          <div className="flex gap-1 items-end h-4">
            <motion.div
              animate={{ height: ['8px', '16px', '8px'] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-1 bg-rose-400 rounded-full"
            />
            <motion.div
              animate={{ height: ['12px', '8px', '12px'] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-1 bg-rose-400 rounded-full"
            />
            <motion.div
              animate={{ height: ['8px', '16px', '8px'] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              className="w-1 bg-rose-400 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}