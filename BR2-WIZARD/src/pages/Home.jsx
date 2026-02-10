import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import IntroductionScreen from '../components/memorial/IntroductionScreen';
import DateBackground from '../components/memorial/DateBackground';
import ScrollSection from '../components/memorial/ScrollSection';
import LyricsCard from '../components/memorial/LyricsCard';
import ImageShowcase from '../components/memorial/ImageShowcase';
import ParallaxText from '../components/memorial/ParallaxText';
import FloatingOrbs from '../components/memorial/FloatingOrbs';
import DecorativeElements from '../components/memorial/DecorativeElements';
import AudioPlayer from '../components/memorial/AudioPlayer';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  
  const handleEnter = () => {
    setShowContent(true);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-rose-50 to-amber-50">
      {/* Tela de Introdução */}
      {!showContent && <IntroductionScreen onEnter={handleEnter} />}
      
      {/* Conteúdo Principal */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Elementos de fundo */}
            <FloatingOrbs />
            <DateBackground />
            
            {/* Conteúdo */}
            <div className="relative z-10">
              
              {/* Hero Section */}
              <section className="min-h-screen flex items-center justify-center px-6 relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-10 w-2 h-2 bg-rose-300/40 rounded-full animate-pulse" />
                  <div className="absolute top-40 right-20 w-3 h-3 bg-amber-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                  <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-rose-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
                  <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-400/30 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
                </div>
                <ScrollSection delay={0.3} className="max-w-4xl w-full text-center space-y-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-3xl opacity-50" />
                    <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 leading-tight">
                      Oi, meu amor.
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                    <Heart className="w-6 h-6 text-rose-400 fill-rose-400/20" />
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                  </div>
                  <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
                    Queria te fazer essa lembrancinha.
                  </p>
                </ScrollSection>
              </section>

              {/* Texto 1 */}
              <section className="py-20 px-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-rose-300/50 to-transparent" />
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-200/30 shadow-xl">
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                      Estamos nos vendo todo final de semana há um mês, mas, sinceramente, eu sinto como se te visse todos os dias há muito mais tempo. Acho que é porque você não sai da minha cabeça em nenhum momento do dia. Está sempre ali, nos meus pensamentos, nos detalhes, nas pequenas coisas.
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-300/50" />
                      <div className="w-2 h-2 rounded-full bg-amber-300/50" />
                      <div className="w-2 h-2 rounded-full bg-rose-300/50" />
                    </div>
                  </div>
                </ScrollSection>
              </section>
              
              {/* Texto 2 - Wizard */}
              <section className="py-20 px-6 relative">
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-gradient-to-br from-purple-50/80 via-rose-50/60 to-amber-50/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-purple-300/40 shadow-2xl overflow-hidden">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-200 rounded-full" />
                    <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-amber-200 rounded-full" />
                    <Sparkles className="absolute top-4 right-4 w-8 h-8 text-purple-400/40 animate-pulse" />
                    <Sparkles className="absolute bottom-6 left-6 w-6 h-6 text-amber-400/40 animate-pulse" style={{animationDelay: '1s'}} />

                    <div className="text-center space-y-6">
                      <p className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 leading-relaxed">
                        Wizard
                      </p>

                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                        Você tem essa magia especial que encanta tudo ao seu redor. É impossível não se apaixonar pela sua essência única, pelo seu jeito de ser que mistura doçura, força e uma pitada de mistério. Você é mágica, literalmente. ✨
                      </p>
                    </div>
                  </div>
                </ScrollSection>
              </section>

              {/* Texto 3 */}
              <section className="py-20 px-6 relative">
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-gradient-to-br from-rose-50/80 to-amber-50/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-rose-300/40 shadow-2xl">
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-200 rounded-full" />
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-rose-200 rounded-full" />
                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-amber-400/30" />
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                      Quis deixar registrado aqui, nesse mural, algo que sinto com toda certeza: <span className="font-semibold text-rose-600 bg-rose-100/50 px-2 py-1 rounded">você é a mulher da minha vida.</span> E não falo isso da boca pra fora. Tenho essa convicção toda vez que penso em nós, no que já vivemos e no que ainda vamos construir.
                    </p>
                  </div>
                </ScrollSection>
              </section>
              
              {/* Texto 4 - Sobre ela */}
              <section className="py-20 px-6 relative">
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-amber-200/40 shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-100/20 via-transparent to-amber-100/20 rounded-3xl" />
                    <div className="relative space-y-6">
                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                        Seus olhos me prendem de um jeito que eu nem sei explicar — eles têm uma calma e uma força que me desarmam. Seu cabelo cacheado me hipnotiza, é impossível não sorrir só de olhar. E esse seu sorriso… é daqueles que ficam na memória, que aquecem o coração e fazem qualquer dia difícil ficar mais leve.
                      </p>
                      <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </ScrollSection>
              </section>
              
              {/* Texto 5 - Admiração */}
              <section className="py-20 px-6 relative">
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-gradient-to-br from-white/70 via-rose-50/60 to-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-200/30 shadow-2xl">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
                      <div className="w-3 h-3 bg-rose-300/60 rounded-full" />
                      <div className="w-3 h-3 bg-amber-300/60 rounded-full" />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                      Admiro profundamente a sua inteligência, o seu jeito de ver o mundo, a forma como você fala, pensa e sente. Você é intensa na medida certa, delicada sem deixar de ser forte, e única em tudo o que é.
                    </p>
                  </div>
                </ScrollSection>
              </section>

              {/* Texto 6 - Final */}
              <section className="py-20 px-6 relative">
                <ScrollSection delay={0.2} className="max-w-3xl mx-auto">
                  <div className="relative bg-gradient-to-br from-amber-50/80 to-rose-50/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-amber-300/50 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
                    <div className="relative">
                      <Heart className="w-8 h-8 text-rose-400 fill-rose-400/30 mx-auto mb-6" />
                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center font-medium">
                        Tudo em você me encanta. Tudo em você me faz querer ficar, cuidar, construir e escolher você todos os dias.
                      </p>
                    </div>
                  </div>
                </ScrollSection>
              </section>

              {/* Seção Final - Eu te amo */}
              <section className="min-h-screen flex items-center justify-center px-6 py-32 relative">
                <DecorativeElements variant="hearts" />
                <ScrollSection className="max-w-4xl text-center space-y-16 relative z-10">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1e3a5f]">
                    Eu te amo.
                  </h2>
                  <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="text-[8rem] md:text-[12rem] font-extralight text-amber-300/20 leading-none tracking-wider"
                  >
                    01
                  </motion.div>
                </ScrollSection>
              </section>
              
              {/* Footer minimalista */}
              <footer className="py-16 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                  className="space-y-2"
                >
                  <div className="w-12 h-px bg-amber-300/30 mx-auto mb-8" />
                  <p className="text-xs text-amber-600/40 tracking-[0.3em] font-light">
                    02 • 01
                  </p>
                </motion.div>
              </footer>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}