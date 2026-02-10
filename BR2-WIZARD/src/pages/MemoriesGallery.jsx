import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Image as ImageIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import MemoryCard from '../components/memories/MemoryCard';
import AddMemoryForm from '../components/memories/AddMemoryForm';
import ScrollSection from '../components/memorial/ScrollSection';

export default function MemoriesGallery() {
  const [showAddForm, setShowAddForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: memories = [], isLoading } = useQuery({
    queryKey: ['memories'],
    queryFn: () => base44.entities.Memory.list('-memory_date')
  });

  const deleteMemoryMutation = useMutation({
    mutationFn: (id) => base44.entities.Memory.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-amber-50 relative">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-rose-300/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-[15%] right-[8%] w-[350px] h-[350px] bg-amber-300/10 rounded-full blur-[90px]"
        />
      </div>

      {/* Header */}
      <section className="relative py-20 px-6">
        <ScrollSection delay={0.2} className="max-w-6xl mx-auto text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-2xl" />
            <h1 className="relative text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
              Nossas Memórias
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-rose-400/60 rounded-full" />
            <div className="w-32 h-px bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 rounded-full" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/40" />
            <div className="w-32 h-px bg-gradient-to-r from-amber-300 via-pink-300 to-rose-300 rounded-full" />
            <div className="w-2 h-2 bg-amber-400/60 rounded-full" />
          </div>

        </ScrollSection>
      </section>

      {/* Add Memory Button */}
      <div className="relative max-w-7xl mx-auto px-6 mb-8">
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Memória
        </Button>
      </div>

      {/* Memories Grid */}
      <section className="relative max-w-7xl mx-auto px-6 pb-32">
        {isLoading ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-rose-300 animate-pulse mx-auto mb-4 fill-rose-300/50" />
            <p className="text-gray-500">Carregando memórias...</p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <ImageIcon className="w-16 h-16 text-rose-300 mx-auto mb-4" />
            </div>
            <p className="text-gray-600 text-lg mb-2">Nenhuma memória ainda</p>
            <p className="text-gray-500">Comece adicionando fotos e vídeos dos nossos momentos especiais</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MemoryCard
                  memory={memory}
                  onDelete={() => deleteMemoryMutation.mutate(memory.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Add Memory Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddMemoryForm
            onMemoryAdded={() => queryClient.invalidateQueries({ queryKey: ['memories'] })}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}