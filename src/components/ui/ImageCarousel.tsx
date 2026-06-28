import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden my-10 bg-slate-950 border border-slate-800 shadow-2xl group flex flex-col items-center justify-center min-h-[50vh] max-h-[85vh]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].startsWith('http') || images[currentIndex].startsWith('/') ? images[currentIndex] : `/${images[currentIndex]}`}
          alt={`Page ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="max-h-[80vh] w-auto h-auto object-contain mx-auto select-none p-2 sm:p-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/600x800/1e293b/94a3b8?text=Textbook+Page+${currentIndex + 1}`;
          }}
        />
      </AnimatePresence>

      {/* Overlay info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-blue-600' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Badge */}
      <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
