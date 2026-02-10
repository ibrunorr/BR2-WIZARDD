import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Trash2, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MemoryCard({ memory, onDelete }) {
  const [showFullView, setShowFullView] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative bg-gradient-to-br from-white/80 via-rose-50/40 to-amber-50/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-rose-200/30 hover:border-rose-300/50 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {/* Media Preview */}
        <div 
          className="relative aspect-square cursor-pointer overflow-hidden"
          onClick={() => setShowFullView(true)}
        >
          {memory.media_type === 'image' ? (
            <img 
              src={memory.media_url} 
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="relative w-full h-full">
              <video 
                src={memory.media_url}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-16 h-16 text-white/90" />
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
            {memory.title}
          </h3>
          
          {memory.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {memory.description}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-2">
            {memory.memory_date && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>{format(new Date(memory.memory_date), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
              </div>
            )}
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              size="sm"
              variant="ghost"
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Heart decoration */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/50" />
        </div>
      </motion.div>

      {/* Full View Modal */}
      <AnimatePresence>
        {showFullView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullView(false)}
          >
            <button
              onClick={() => setShowFullView(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="bg-gradient-to-br from-white via-rose-50/50 to-amber-50/50 rounded-3xl p-8 border-2 border-rose-200/40">
                {/* Media */}
                <div className="mb-6 rounded-2xl overflow-hidden">
                  {memory.media_type === 'image' ? (
                    <img 
                      src={memory.media_url} 
                      alt={memory.title}
                      className="w-full max-h-[60vh] object-contain"
                    />
                  ) : (
                    <video 
                      src={memory.media_url}
                      controls
                      className="w-full max-h-[60vh]"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                    {memory.title}
                  </h2>
                  
                  {memory.description && (
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {memory.description}
                    </p>
                  )}
                  
                  {memory.memory_date && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-rose-400" />
                      <span className="text-lg">
                        {format(new Date(memory.memory_date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}