import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Music, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function UploadSongForm({ onSongAdded, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    duration: ''
  });
  const [audioFile, setAudioFile] = useState(null);
  const [albumArtFile, setAlbumArtFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile || !formData.title || !formData.artist) return;

    setUploading(true);
    try {
      // Upload audio file
      const audioUpload = await base44.integrations.Core.UploadFile({ file: audioFile });
      
      // Upload album art if provided
      let albumArtUrl = null;
      if (albumArtFile) {
        const artUpload = await base44.integrations.Core.UploadFile({ file: albumArtFile });
        albumArtUrl = artUpload.file_url;
      }

      // Create song record
      await base44.entities.Song.create({
        title: formData.title,
        artist: formData.artist,
        duration: formData.duration,
        audio_url: audioUpload.file_url,
        album_art_url: albumArtUrl
      });

      onSongAdded();
      onClose();
    } catch (error) {
      console.error('Error uploading song:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-white via-rose-50/50 to-amber-50/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-rose-200/40 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-rose-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 mb-6">
          Adicionar Música
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Audio File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquivo de Áudio *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-rose-300 rounded-xl hover:border-rose-400 transition-colors cursor-pointer bg-white/50"
              >
                <Music className="w-6 h-6 text-rose-400" />
                <span className="text-gray-700">
                  {audioFile ? audioFile.name : 'Selecione um arquivo de áudio'}
                </span>
              </label>
            </div>
          </div>

          {/* Album Art Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capa do Álbum
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAlbumArtFile(e.target.files[0])}
                className="hidden"
                id="art-upload"
              />
              <label
                htmlFor="art-upload"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-amber-300 rounded-xl hover:border-amber-400 transition-colors cursor-pointer bg-white/50"
              >
                <Image className="w-6 h-6 text-amber-400" />
                <span className="text-gray-700">
                  {albumArtFile ? albumArtFile.name : 'Selecione uma imagem (opcional)'}
                </span>
              </label>
            </div>
          </div>

          {/* Song Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Música *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nome da música"
                required
                className="bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artista *
              </label>
              <Input
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Nome do artista"
                required
                className="bg-white/80"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duração
            </label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ex: 3:45"
              className="bg-white/80"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!audioFile || !formData.title || !formData.artist || uploading}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-6 text-lg"
          >
            {uploading ? (
              <>
                <Upload className="w-5 h-5 mr-2 animate-pulse" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Adicionar Música
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}