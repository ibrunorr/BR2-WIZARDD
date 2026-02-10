import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Plus, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import SongCard from '../components/music/SongCard';
import UploadSongForm from '../components/music/UploadSongForm';
import ScrollSection from '../components/memorial/ScrollSection';
import LyricsCard from '../components/memorial/LyricsCard';
import DecorativeElements from '../components/memorial/DecorativeElements';

export default function MusicGallery() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: () => base44.entities.Song.list('-created_date')
  });

  const deleteSongMutation = useMutation({
    mutationFn: (id) => base44.entities.Song.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      if (currentSong && songs.find(s => s.id === currentSong.id)) {
        setCurrentSong(null);
        setIsPlaying(false);
      }
    }
  });

  const handlePlay = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio_url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentSong, songs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-amber-50 relative">
      <audio ref={audioRef} />

      {/* Header */}
      <section className="py-20 px-6">
        <ScrollSection delay={0.2} className="max-w-6xl mx-auto text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-2xl" />
            <h1 className="relative text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
              Galeria de Músicas
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-rose-400/60 rounded-full" />
            <div className="w-32 h-px bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 rounded-full" />
            <Music className="w-5 h-5 text-rose-400 fill-rose-400/40" />
            <div className="w-32 h-px bg-gradient-to-r from-amber-300 via-pink-300 to-rose-300 rounded-full" />
            <div className="w-2 h-2 bg-amber-400/60 rounded-full" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa coleção especial de músicas que contam nossa história
          </p>
        </ScrollSection>
      </section>

      {/* Add Song Button */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Button
          onClick={() => setShowUploadForm(true)}
          className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Música
        </Button>
      </div>

      {/* Songs Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {isLoading ? (
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-rose-300 animate-pulse mx-auto mb-4" />
            <p className="text-gray-500">Carregando músicas...</p>
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-rose-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">Nenhuma música ainda</p>
            <p className="text-gray-500">Adicione sua primeira música para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SongCard
                  song={song}
                  isPlaying={isPlaying}
                  onPlay={() => handlePlay(song)}
                  onDelete={() => deleteSongMutation.mutate(song.id)}
                  isCurrentSong={currentSong?.id === song.id}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lyrics Section */}
      <section className="py-24 px-6">
        <ScrollSection delay={0.2} className="text-center space-y-6 max-w-6xl mx-auto">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-2xl" />
            <h2 className="relative text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
              Trechos Especiais
            </h2>
          </div>
        </ScrollSection>
      </section>

      {/* Primeira Música - Djonga */}
      <section className="min-h-[80vh] flex items-center py-32 px-6 relative">
        <DecorativeElements variant="hearts" />
        <div className="relative z-10 w-full">
          <LyricsCard 
            lyrics="Eu quero que seja melhor que ontem, quero que seja bom pra mim e pra você"
            artist="Djonga"
            song="Melhor Que Ontem"
            align="left"
            accentColor="purple"
          />
        </div>
      </section>

      {/* Segunda Música - Taylor Swift */}
      <section className="min-h-[80vh] flex items-center py-32 px-6 relative">
        <DecorativeElements variant="sparkles" />
        <div className="relative z-10 w-full">
          <LyricsCard 
            lyrics="Time, mystical time, cutting me open then healing me fine. Were there clues I didn't see?"
            artist="Taylor Swift"
            song="Invisible String"
            align="right"
            accentColor="pink"
          />
        </div>
      </section>

      {/* Terceira Música - Taylor Swift */}
      <section className="min-h-[80vh] flex items-center py-32 px-6 relative">
        <DecorativeElements variant="stars" />
        <div className="relative z-10 w-full">
          <LyricsCard 
            lyrics="Is this the end of all the endings? My broken bones are mending with all these nights we're spending up on the roof with a school girl crush"
            artist="Taylor Swift"
            song="King Of My Heart"
            align="left"
            accentColor="blue"
          />
        </div>
      </section>

      {/* Quarta Música - Taylor Swift */}
      <section className="min-h-[80vh] flex items-center py-32 px-6 relative pb-48">
        <DecorativeElements variant="hearts" />
        <div className="relative z-10 w-full">
          <LyricsCard 
            lyrics="This ain't for the best, my reputation's never been worse, so you must like me for me"
            artist="Taylor Swift"
            song="Delicate"
            align="right"
            accentColor="amber"
          />
        </div>
      </section>

      {/* Fixed Player */}
      <AnimatePresence>
        {currentSong && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 backdrop-blur-lg border-t-2 border-white/20 shadow-2xl z-40"
          >
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Song Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/20 flex-shrink-0">
                    {currentSong.album_art_url ? (
                      <img src={currentSong.album_art_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-6 h-6 text-white/60" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold truncate">{currentSong.title}</h3>
                    <p className="text-white/80 text-sm truncate">{currentSong.artist}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePrevious}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handlePlay(currentSong)}
                    size="icon"
                    className="bg-white text-rose-500 hover:bg-white/90 w-12 h-12"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button
                    onClick={handleNext}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="hidden md:flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <UploadSongForm
            onSongAdded={() => queryClient.invalidateQueries({ queryKey: ['songs'] })}
            onClose={() => setShowUploadForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}