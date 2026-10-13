import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, Shield, ZoomIn, X, Star, HeartHandshake, Award } from 'lucide-react';

export default function RoyalPatronSpotlight() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const imageUrl = "https://i.ibb.co/5x6TdXJF/HRM-OSABARIMBA-II-1.png";

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Radiant ambient royal background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Grand Spotlight Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl royal-glass border-2 border-gold-500/40 bg-gradient-to-b from-royal-900/80 via-royal-950/95 to-royal-950 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-gold-500/10 overflow-hidden"
      >
        {/* Ornate Golden Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-400 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-400 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-400 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-400 rounded-br pointer-events-none" />

        {/* Section Pill Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-950/90 border border-gold-500/40 text-gold-300 font-mono text-xs uppercase tracking-widest shadow-lg">
            <Crown className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="font-bold">Sovereign Patron & Paramount Ruler Spotlight</span>
          </div>
        </div>

        {/* Responsive Two-Column Layout with Massive Left Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* VERY LARGE, HIGH-VISIBILITY PORTRAIT */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div 
              onClick={() => setIsZoomOpen(true)}
              className="group relative w-full max-w-md sm:max-w-lg h-[460px] sm:h-[540px] md:h-[600px] lg:h-[620px] rounded-2xl overflow-hidden border-2 border-gold-400/50 bg-gradient-to-b from-royal-900 via-royal-950 to-royal-950 p-3 sm:p-4 shadow-2xl shadow-gold-500/15 cursor-pointer flex items-center justify-center transition-all duration-500 hover:border-gold-300 hover:shadow-gold-500/25"
            >
              {/* Golden Sunburst / Spotlight Glow behind portrait */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-royal-900/60 to-transparent pointer-events-none" />
              
              {/* Outer decorative border line */}
              <div className="absolute inset-2 rounded-xl border border-gold-500/20 pointer-events-none" />

              {/* The Very Large Image of HRM Osabarimba II */}
              <img
                src={imageUrl}
                alt="HRM Osabarimba Kwesi Atta II - Oguaa Omanhen"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-transform duration-700 group-hover:scale-[1.03] select-none z-10"
                referrerPolicy="no-referrer"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-royal-950/90 border border-gold-500/50 text-gold-200 font-mono text-[10px] sm:text-xs tracking-wider uppercase shadow-xl backdrop-blur-md">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>Paramount Custodian</span>
              </div>

              {/* Enlarge Click Prompt */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-royal-950/90 hover:bg-gold-500/20 border border-gold-500/60 text-gold-200 font-mono text-xs tracking-wider uppercase shadow-xl backdrop-blur-md transition-all group-hover:scale-105">
                <ZoomIn className="w-4 h-4 text-gold-400" />
                <span className="font-bold">Click to Enlarge</span>
              </div>
            </div>

            {/* Quick Caption Under Image */}
            <p className="mt-3 font-mono text-[11px] sm:text-xs text-gold-400/90 text-center tracking-widest uppercase font-semibold">
              ✦ Oguaa Traditional Council • Cape Coast Paramountcy ✦
            </p>
          </div>

          {/* Narrative & Royal Credentials Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-gold-400 font-mono text-xs tracking-widest uppercase font-bold">
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span>Supreme Founding Champion</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-extrabold text-gold-100 leading-tight">
                HIS ROYAL MAJESTY <br />
                <span className="text-shine">OSABARIMBA KWESI ATTA II</span>
              </h3>

              <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-300 font-serif italic text-sm sm:text-base leading-snug">
                Oguaa Omanhen — Paramount Ruler of Cape Coast & Key Pioneer of the Peace Tower Initiative
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-royal-100/90 leading-relaxed font-light">
              As the paramount cultural custodian of Cape Coast and an esteemed leader across the Republic of Ghana, His Royal Majesty Osabarimba Kwesi Atta II stands as the noble pillar and champion of the <strong className="text-gold-200 font-medium">Peace Tower of Africa</strong>.
            </p>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-royal-950/70 border border-gold-500/20 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-gold-200 uppercase tracking-wide">Pioneer Peacemaker</h4>
                  <p className="font-sans text-[11px] text-royal-100/75 leading-tight mt-1">Spearheaded traditional mediation and communal unity dialogues.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-royal-950/70 border border-gold-500/20 flex items-start gap-3">
                <Award className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-gold-200 uppercase tracking-wide">Living Legend</h4>
                  <p className="font-sans text-[11px] text-royal-100/75 leading-tight mt-1">Honored custodian driving cultural cohesion and national harmony.</p>
                </div>
              </div>
            </div>

            {/* Royal Quote Card */}
            <div className="relative p-4 sm:p-5 rounded-xl bg-gradient-to-r from-royal-950 via-royal-900/60 to-royal-950 border-l-4 border-gold-400 text-royal-100 space-y-2">
              <p className="font-serif italic text-xs sm:text-sm text-gold-100/95 leading-relaxed">
                "Peace is the essential bedrock of all continental prosperity. We call on every citizen, traditional authority, and African leader to champion verbal dispute resolution and build sustainable harmony."
              </p>
              <span className="font-mono text-[10px] text-gold-400 tracking-wider uppercase block font-bold">
                — Endorsement of the Oguaa Traditional Council
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setIsZoomOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-serif font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:from-gold-500 hover:to-gold-300 transition-all shadow-lg shadow-gold-500/20 flex items-center gap-2 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 text-royal-950" />
                <span>View Full-Size Portrait</span>
              </button>
            </div>

          </div>

        </div>
      </motion.div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="absolute inset-0 bg-royal-950/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl royal-glass border-2 border-gold-400/60 bg-gradient-to-b from-royal-900 via-royal-950 to-royal-950 shadow-2xl flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gold-500/20 bg-royal-950/80">
                <div className="flex items-center gap-2.5">
                  <Crown className="w-5 h-5 text-gold-400" />
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-gold-100 uppercase tracking-wide">
                      HRM Osabarimba Kwesi Atta II
                    </h4>
                    <p className="font-mono text-[10px] text-gold-400/80 uppercase">
                      Oguaa Omanhen — Paramount Ruler of Cape Coast
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="p-2 rounded-lg bg-royal-900 border border-gold-500/30 text-gold-300 hover:text-gold-100 hover:bg-gold-500/20 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Viewport */}
              <div className="relative flex-1 p-4 sm:p-8 flex items-center justify-center overflow-auto bg-royal-950/90">
                <img
                  src={imageUrl}
                  alt="HRM Osabarimba Kwesi Atta II"
                  className="max-h-[75vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)] select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-gold-500/20 bg-royal-950/90 text-center font-mono text-xs text-gold-300/80 tracking-wider uppercase">
                Peace Tower of Africa • Sovereign Royal Patronage
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
