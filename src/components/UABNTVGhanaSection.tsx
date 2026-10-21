import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, Play, Volume2, VolumeX, Radio, ExternalLink, 
  Youtube, Share2, CheckCircle2, Shield, Heart, 
  ListVideo, Plus, Globe, Sparkles, Users, MessageCircle
} from 'lucide-react';

// Sourced specifically for the UABN TV GHANA section as requested
const UABN_LOGO_URL = 'https://i.postimg.cc/90nb8rZP/Whats-App-Image-2026-10-13-at-1-36-50-PM.jpg';

export interface UABNVideo {
  id: string;
  videoId?: string;
  playlistId?: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  thumbnail: string;
  isPlaylist?: boolean;
}

export const UABN_VIDEOS: UABNVideo[] = [
  {
    id: 'uabn-widows',
    videoId: 'dzuTO9IGwgI',
    title: 'CELEBRATION WITH WIDOWS | UABN TV GHANA',
    category: 'Community Outreach',
    duration: 'Official Broadcast',
    description: 'Bringing new life to the current generation: UABN TV GHANA heartfelt community outreach and celebration honoring widows with love, relief, and dignity.',
    thumbnail: 'https://i.ytimg.com/vi/dzuTO9IGwgI/hqdefault.jpg',
  },
  {
    id: 'uabn-tawia',
    videoId: 'TvCGsB3HLSE',
    title: 'Honhom Kronkron Sane - Tawia Prayer Song | UABN TV GHANA',
    category: 'Spiritual Heritage',
    duration: '06:48',
    description: 'Sacred prayer and harmony broadcast by UABN TV GHANA inspiring spiritual revival and national unity.',
    thumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
  },
  {
    id: 'uabn-playlist',
    playlistId: 'PLXLwH4e4BAVg-G4qawhbVUtGjIapLqfIP',
    title: 'UABN TV GHANA Official Broadcast Loop Playlist',
    category: 'Full Broadcast Playlist',
    duration: 'Continuous Stream',
    description: 'Continuous official stream from @uabntvghana featuring prayer songs, youth dialogues, and community updates.',
    thumbnail: 'https://i.ytimg.com/vi/dzuTO9IGwgI/hqdefault.jpg',
    isPlaylist: true,
  },
  {
    id: 'uabn-civic',
    videoId: 'wR5fdXIBLss',
    title: 'Ghana National Civic Accord & Youth Peacemaking Dialogue',
    category: 'National Forum',
    duration: 'Live Stream',
    description: 'Empowering the next generation with non-violent conflict resolution and community solidarity.',
    thumbnail: 'https://i.ytimg.com/vi/wR5fdXIBLss/hqdefault.jpg',
  },
];

export default function UABNTVGhanaSection() {
  const [selectedVideo, setSelectedVideo] = useState<UABNVideo>(UABN_VIDEOS[0]);
  const [isMuted, setIsMuted] = useState(true); // Default muted so browser allows seamless auto-play
  const [viewerCount, setViewerCount] = useState(2480);
  const [customInput, setCustomInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; left: number }>>([]);
  const [activeMediaTab, setActiveMediaTab] = useState<'player' | 'facebook'>('player');

  // Viewer count heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount(prev => Math.max(1500, prev + Math.floor(Math.random() * 9) - 4));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSendReaction = (emoji: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: 15 + Math.random() * 70,
    };
    setFloatingEmojis(prev => [...prev.slice(-15), newEmoji]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 2800);
  };

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    let vidId = trimmed;
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      const match = trimmed.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11})/);
      if (match) {
        vidId = match[1];
      }
    }

    const newVideoItem: UABNVideo = {
      id: `custom-${Date.now()}`,
      videoId: vidId,
      title: `UABN TV Broadcast: ${vidId}`,
      category: 'User Added Broadcast',
      duration: 'Custom Stream',
      description: 'Stream loaded from YouTube.',
      thumbnail: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
    };

    setSelectedVideo(newVideoItem);
    setCustomInput('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/#uabn-tv-ghana');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Embed URL with autoplay parameters
  const embedUrl = selectedVideo.isPlaylist && selectedVideo.playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${selectedVideo.playlistId}&autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&enablejsapi=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=${selectedVideo.videoId}&enablejsapi=1&rel=0`;

  return (
    <section 
      id="uabn-tv-ghana" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-royal-50"
    >
      {/* Radiant Television Studio Ambient Backlights */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] bg-gold-500/15 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />

      {/* SECTION HEADER & BRAND IDENTITY */}
      <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
        
        {/* On-Air Live Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full royal-glass border border-gold-500/40 text-gold-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest shadow-xl">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="font-bold">Official Online TV Network</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-[11px] sm:text-xs tracking-wider uppercase shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
            <span className="font-extrabold text-white">LIVE BROADCAST</span>
          </div>
        </div>

        {/* Section Logo & Title Showcase */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-3">
          
          {/* Logo Badge Container (Appears specifically at this section as requested) */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-gold-500 via-rose-500 to-amber-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-2 shadow-2xl flex items-center justify-center">
              <img 
                src={UABN_LOGO_URL} 
                alt="UABN TV GHANA Official Logo" 
                className="w-full h-full object-contain rounded-xl select-none"
              />
            </div>
          </div>

          {/* Section Name, Slogan & Description */}
          <div className="text-center sm:text-left space-y-1.5">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-100 tracking-tight leading-tight uppercase">
              UABN TV <span className="text-shine">GHANA</span>
            </h2>
            
            {/* Slogan */}
            <p className="font-mono text-xs sm:text-sm text-gold-400 font-bold tracking-widest uppercase">
              ✦ SLOGAN: UABN TV GHANA ✦
            </p>

            {/* Description */}
            <p className="font-serif text-base sm:text-lg text-gold-200 font-semibold italic">
              "Bringing new life to the current Generation"
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-royal-100/70 font-sans">
              <a 
                href="https://www.youtube.com/@uabntvghana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-100 flex items-center gap-1.5 underline decoration-gold-500/50"
              >
                <Youtube className="w-3.5 h-3.5 text-rose-500" />
                <span>www.youtube.com/@uabntvghana</span>
              </a>
              <span aria-hidden="true" className="text-gold-500/40">·</span>
              <a 
                href="https://www.facebook.com/profile.php?id=61595362933995" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-100 flex items-center gap-1.5 underline decoration-gold-500/50"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full mt-2" />
      </div>

      {/* BROADCAST & SOCIAL MEDIA HUB GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / PRIMARY COLUMN: AUTO-EMBEDDED YOUTUBE BROADCAST PLAYER (7 or 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Autoplay Audio Notification Bar */}
          {isMuted && (
            <div className="bg-gradient-to-r from-amber-900/60 via-gold-900/40 to-amber-900/60 border border-gold-500/40 rounded-2xl p-3 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-gold-200">
              <div className="flex items-center gap-2.5">
                <VolumeX className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <div className="text-xs font-sans text-center sm:text-left">
                  <strong className="text-gold-100 font-serif font-bold uppercase">Auto-Playing with Sound Muted:</strong> Modern browsers start videos muted for silent autoplay. Click Unmute to hear full audio!
                </div>
              </div>
              <button
                onClick={() => setIsMuted(false)}
                className="px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Unmute Audio</span>
              </button>
            </div>
          )}

          {/* 16:9 WIDESCREEN YOUTUBE PLAYER CONTAINER */}
          <div 
            id="uabn-tv-player-viewport"
            className="relative rounded-3xl overflow-hidden border-2 border-gold-400/50 bg-black shadow-2xl shadow-gold-500/20 aspect-video flex flex-col justify-between group"
          >
            {/* Embedded YouTube Iframe with Auto-Play */}
            <iframe
              key={`${selectedVideo.id}-${isMuted ? 'muted' : 'unmuted'}`}
              src={embedUrl}
              title={selectedVideo.title}
              className="absolute inset-0 w-full h-full z-10 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Floating Reaction Emojis Canvas */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <AnimatePresence>
                {floatingEmojis.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 150, scale: 0.5 }}
                    animate={{ opacity: 1, y: -200, scale: [0.8, 1.4, 1.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.6, ease: 'easeOut' }}
                    style={{ left: `${item.left}%`, bottom: '20%' }}
                    className="absolute text-3xl sm:text-4xl drop-shadow-lg"
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ACTIVE BROADCAST METADATA & REACTION BAR */}
          <div className="p-4 sm:p-5 rounded-2xl royal-glass border border-gold-500/25 bg-royal-950/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-gold-400 font-bold uppercase">{selectedVideo.category}</span>
                <span className="text-gold-500/40">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Auto-Playing
                </span>
                <span className="text-gold-500/40">·</span>
                <span className="text-royal-100/60">{viewerCount.toLocaleString()} watching</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100 leading-snug">
                {selectedVideo.title}
              </h3>
              <p className="font-sans text-xs text-royal-100/70 font-light max-w-2xl leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>

            {/* Quick React Bar */}
            <div className="flex items-center gap-1.5 bg-royal-900/80 p-1.5 rounded-2xl border border-gold-500/20 shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gold-400/80 mr-1 hidden sm:inline">React:</span>
              {['🕊️', '❤️', '👏', '🇬🇭', '✨'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleSendReaction(emoji)}
                  className="text-base hover:scale-125 transition-transform p-1 cursor-pointer active:scale-95"
                  title={`Send ${emoji} reaction`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* CHANNEL VIDEOS CAROUSEL / SELECTOR */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gold-300 font-bold uppercase flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-gold-400" />
                <span>Select UABN TV GHANA Broadcast to Watch:</span>
              </span>
              <span className="text-royal-100/60">{UABN_VIDEOS.length} Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {UABN_VIDEOS.map(video => {
                const isCurrent = selectedVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video);
                      const playerEl = document.getElementById('uabn-tv-player-viewport');
                      if (playerEl) {
                        playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className={`p-3 rounded-xl royal-glass border transition-all cursor-pointer flex items-center gap-3 ${
                      isCurrent 
                        ? 'border-gold-400 bg-royal-900/90 ring-1 ring-gold-400/50 shadow-md' 
                        : 'border-gold-500/20 hover:border-gold-400/50 bg-royal-950/60'
                    }`}
                  >
                    <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-black shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                      {isCurrent && (
                        <div className="absolute top-1 right-1 px-1 py-0.2 bg-rose-600 text-white font-mono text-[7px] font-bold rounded uppercase">
                          Playing
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-serif text-xs font-bold text-gold-100 truncate">
                        {video.title}
                      </h4>
                      <p className="font-mono text-[10px] text-gold-400/80 truncate">
                        {video.category} · {video.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Video / Livestream Embed Form */}
            <form onSubmit={handleAddCustomVideo} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Paste any YouTube URL or Video ID from @uabntvghana..."
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                className="flex-1 p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-md"
              >
                Auto-Play Video
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: FACEBOOK PAGE EMBED & CHANNEL SOCIAL PROFILE (4 or 5 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Official Social Profile Card */}
          <div className="rounded-2xl royal-glass border border-gold-500/30 bg-gradient-to-b from-royal-950 to-royal-900 p-5 shadow-xl space-y-4 text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-1 shrink-0 shadow-md">
                <img 
                  src={UABN_LOGO_URL} 
                  alt="UABN TV GHANA" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-base text-gold-100 truncate">
                  UABN TV GHANA
                </h4>
                <p className="font-mono text-[11px] text-gold-400">
                  @uabntvghana
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Broadcast Channel</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-royal-900/80 border border-gold-500/15 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold">
                Channel Mandate
              </div>
              <p className="font-sans text-xs text-royal-100/90 leading-relaxed font-light">
                Bringing new life to the current Generation through inspirational media, youth dialogues, and community care.
              </p>
            </div>

            {/* Quick Actions (YouTube & Facebook) */}
            <div className="space-y-2 pt-1">
              <a
                href="https://www.youtube.com/@uabntvghana?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Subscribe on YouTube (@uabntvghana)</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61595362933995"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20 transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4 text-white" />
                <span>Follow on Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-xl royal-glass border border-gold-500/25 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Section Link'}</span>
              </button>
            </div>

          </div>

          {/* Facebook Official Page Feed Embed & Timeline Container */}
          <div className="rounded-2xl royal-glass border border-gold-500/30 bg-royal-950 p-4 shadow-xl space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-gold-500/15 pb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-serif text-xs font-bold text-gold-100 uppercase tracking-wide">
                  Facebook Community Feed
                </span>
              </div>
              <span className="font-mono text-[10px] text-gold-400/80">Official Page</span>
            </div>

            {/* Embedded Facebook Page Plugin Iframe */}
            <div className="rounded-xl overflow-hidden bg-black/40 border border-gold-500/20 aspect-[4/5] max-h-[380px] w-full relative">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61595362933995&tabs=timeline&width=380&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', overflow: 'hidden' }} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="UABN TV GHANA Facebook Page"
                className="w-full h-full"
              />

              {/* Overlaid Direct Link Button at the bottom for instant access */}
              <div className="absolute bottom-2 inset-x-2 bg-royal-950/95 backdrop-blur-md p-2 rounded-lg border border-gold-500/30 flex items-center justify-between text-xs">
                <div className="truncate text-gold-200 font-sans text-[11px]">
                  <strong>UABN TV GHANA</strong> on Facebook
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=61595362933995"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase shrink-0 transition-colors"
                >
                  Open Page ↗
                </a>
              </div>
            </div>

            <p className="font-sans text-[11px] text-royal-100/70 leading-relaxed font-light">
              Connect directly with UABN TV GHANA on Facebook for live transmissions, prayers, and generational impact initiatives.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
