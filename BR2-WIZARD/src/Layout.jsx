import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Home, Music, Heart } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-sky-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-8">
            <Link
              to={createPageUrl('Home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentPageName === 'Home'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-rose-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Início</span>
            </Link>
            <Link
              to={createPageUrl('MusicGallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentPageName === 'MusicGallery'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-rose-50'
              }`}
            >
              <Music className="w-4 h-4" />
              <span className="font-medium">Músicas</span>
            </Link>
            <Link
              to={createPageUrl('MemoriesGallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentPageName === 'MemoriesGallery'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-rose-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="font-medium">Memórias</span>
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          width: 100%;
          overflow-x: hidden;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #faf8f6 0%, #fff9f5 100%);
          color: #5a4a42;
          line-height: 1.6;
        }
        
        /* Remove scrollbar mas manter funcionalidade */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        /* Tipografia elegante */
        h1, h2, h3 {
          font-family: 'Georgia', serif;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        
        /* Efeito de respiração sutil */
        @keyframes breathing {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes floatBg {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        
        .breathing {
          animation: breathing 4s ease-in-out infinite;
        }
        
        .fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }
        
        .float-bg {
          animation: floatBg 8s ease-in-out infinite;
        }
      `}</style>
      
      <div className="pt-20">
        {children}
      </div>
      </div>
      </div>
      );
      }