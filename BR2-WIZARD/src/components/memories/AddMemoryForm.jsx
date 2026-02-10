import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Video, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';

export default function AddMemoryForm({ onMemoryAdded, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    memory_date: ''
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaFile(file);
    
    // Determine media type
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    setMediaType(type);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile || !formData.title) return;

    setUploading(true);
    try {
      // Upload media file
      const upload = await base44.integrations.Core.UploadFile({ file: mediaFile });
      
      // Create memory record
      await base44.entities.Memory.create({
        title: formData.title,
        description: formData.description,
        memory_date: formData.memory_date,
        media_url: upload.file_url,
        media_type: mediaType
      });

      onMemoryAdded();
      onClose();
    } catch (error) {
      console.error('Error uploading memory:', error);
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
        className="bg-gradient-to-br from-white via-rose-50/50 to-amber-50/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-rose-200/40 relative max-h-[90vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-rose-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 mb-6">
          Adicionar Memória
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto ou Vídeo *
            </label>
            
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-rose-300">
                {mediaType === 'image' ? (
                  <img src={preview} alt="Preview" className="w-full max-h-80 object-contain" />
                ) : (
                  <video src={preview} controls className="w-full max-h-80" />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMediaFile(null);
                    setPreview(null);
                    setMediaType(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-rose-300 rounded-xl hover:border-rose-400 transition-colors cursor-pointer bg-white/50"
                >
                  <div className="flex gap-4">
                    <Image className="w-8 h-8 text-rose-400" />
                    <Video className="w-8 h-8 text-amber-400" />
                  </div>
                  <span className="text-gray-700 text-center">
                    Clique para selecionar uma foto ou vídeo
                  </span>
                  <span className="text-sm text-gray-500">
                    PNG, JPG, MP4, MOV até 100MB
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nome desta memória especial"
              required
              className="bg-white/80"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Conte sobre este momento especial..."
              rows={4}
              className="bg-white/80 resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Memória
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={formData.memory_date}
                onChange={(e) => setFormData({ ...formData, memory_date: e.target.value })}
                className="bg-white/80 pl-10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!mediaFile || !formData.title || uploading}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-6 text-lg"
          >
            {uploading ? (
              <>
                <Upload className="w-5 h-5 mr-2 animate-pulse" />
                Salvando memória...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Adicionar Memória
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}