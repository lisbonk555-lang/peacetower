import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ZoomIn, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PhotoItem {
  url: string;
  title: string;
  subtitle: string;
  badge: string;
}

const SHOWCASE_PHOTOS: PhotoItem[] = [
  {
    url: "https://i.postimg.cc/NjdbbdD7/Whats-App-Image-2026-08-24-at-08-59-35-(1).jpg",
    title: "Pan-African Peace Delegation & High-Level Advocacy",
    subtitle: "Official leadership engagement in conflict resolution, national unity, and grassroots peace dialogue.",
    badge: "Official Delegation",
  },
  {
    url: "https://i.postimg.cc/PxYWGyW1/Whats-App-Image-2026-08-20-at-20-04-55.jpg",
    title: "Continental Peace & Humanitarian Outreach",
    subtitle: "Strategic diplomacy, civic counseling, and disaster management initiatives across Ghanaian communities.",
    badge: "Humanitarian Outreach",
  },
];

export default function HomepagePhotoShowcase() {
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);

  return (
    <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-950/40 via-royal-900/30 to-royal-950/60 rounded-3xl -z-10 pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full royal-glass border border-gold-500/30 text-gold-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Featured Homepage Highlights</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gold-100 uppercase tracking-tight">
          PEACE TOWER OF AFRICA <span className="text-shine">IN ACTION</span>
        </h2>
        <p className="text-xs sm:text-sm text-royal-100/80 font-sans max-w-2xl mx-auto leading-relaxed">
          Documented field advocacy, diplomatic delegations, and community outreach driving sustainable peace and unity.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full mt-2" />
      </div>

      {/* Two Wide, High-Visibility Side-by-Side Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {SHOWCASE_PHOTOS.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="royal-glass p-3 sm:p-4 rounded-2xl border-2 border-gold-500/35 bg-gradient-to-b from-royal-900/60 to-royal-950 shadow-2xl flex flex-col group relative overflow-hidden"
          >
            {/* Corner visual accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-500/40 rounded-tl pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-500/40 rounded-tr pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-500/40 rounded-bl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-500/40 rounded-br pointer-events-none" />

            {/* Image Canvas Container - Wide and Tall for clear visibility */}
            <div 
              onClick={() => setSelectedImage(photo)}
              className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[420px] xl:h-[480px] rounded-xl overflow-hidden bg-royal-950 border border-gold-500/25 flex items-center justify-center cursor-pointer shadow-inner"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-950/90 border border-gold-500/30 text-gold-300 font-mono text-[10px] tracking-wider uppercase shadow-lg backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>{photo.badge}</span>
              </div>

              {/* Click to Zoom Pill */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/50 text-gold-200 font-mono text-[10px] tracking-wider uppercase shadow-md backdrop-blur-md transition-all group-hover:scale-105">
                <ZoomIn className="w-3.5 h-3.5 text-gold-300" />
                <span className="hidden sm:inline">Click to Enlarge</span>
              </div>
            </div>

            {/* Details Footer */}
            <div className="p-4 sm:p-5 space-y-2 text-left">
              <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100 group-hover:text-gold-300 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-royal-100/80 font-sans leading-relaxed">
                {photo.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Full Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-royal-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[92vh] w-full rounded-2xl royal-glass border-2 border-gold-500/50 bg-royal-950 p-3 sm:p-5 shadow-2xl flex flex-col items-center overflow-hidden z-10"
            >
              {/* Modal Top Bar */}
              <div className="w-full flex items-center justify-between p-2 border-b border-gold-500/20 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs text-gold-400 font-bold uppercase tracking-widest bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/30">
                    {selectedImage.badge}
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-gold-200 uppercase tracking-wide truncate max-w-xs sm:max-w-md md:max-w-xl">
                    {selectedImage.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-full hover:bg-gold-500/20 text-royal-100 hover:text-gold-200 transition-colors cursor-pointer border border-gold-500/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Expanded Image Frame */}
              <div className="relative w-full flex-1 min-h-[300px] max-h-[74vh] flex items-center justify-center overflow-auto rounded-xl bg-black/70 p-2 sm:p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Caption */}
              <div className="w-full p-2 sm:p-3 text-center border-t border-gold-500/15 mt-2">
                <p className="text-xs sm:text-sm text-royal-100/90 font-sans">
                  {selectedImage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
