import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  Radio, Sparkles, Flame, Eye, Users, Clock, Calendar, 
  Send, Heart, Shield, Award, MessageSquare, ChevronRight, 
  Share2, RefreshCw, Film, RadioTower, CheckCircle2, Crown, 
  Layers, Info, ExternalLink, HelpCircle, Youtube, ArrowRight
} from 'lucide-react';
const ptaTvLogo = '/pta-tv-logo.jpg';

interface Channel {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  currentProgram: string;
  host: string;
  viewers: number;
  bgGradient: string;
  videoUrl?: string;
  previewThumbnail: string;
  youtubeId?: string;
  playlistId?: string;
  isYoutube?: boolean;
}

interface ProgramSchedule {
  time: string;
  title: string;
  presenter: string;
  genre: string;
  isLiveNow: boolean;
  synopsis: string;
}

interface ChatMessage {
  id: string;
  user: string;
  location: string;
  text: string;
  time: string;
  badge?: string;
}

interface ArchiveVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  views: string;
  thumbnail: string;
  description: string;
  youtubeId?: string;
  playlistId?: string;
}

const CHANNELS: Channel[] = [
  {
    id: 'unba-live',
    number: '01',
    name: 'UNBATV GHANA (YouTube Live)',
    tagline: '24/7 Official Broadcast Stream from @unbatvghana',
    category: 'Official YouTube Live',
    currentProgram: 'UNBATV GHANA: Honhom Kronkron Sane & Peace Broadcast',
    host: 'UNBATV Ghana Broadcast Directorate',
    viewers: 3840,
    bgGradient: 'from-amber-950 via-royal-950 to-royal-900',
    previewThumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
    youtubeId: 'TvCGsB3HLSE',
    playlistId: 'PLXLwH4e4BAVg-G4qawhbVUtGjIapLqfIP',
    isYoutube: true,
  },
  {
    id: 'unba-stream-2',
    number: '02',
    name: 'UNBATV National Peace Accord',
    tagline: 'Live Civic Dialogues, Grassroots Peacemaking & Chieftaincy Accords',
    category: 'National Peace Broadcast',
    currentProgram: 'Ghana National Civic Accord & Reconciliation Forum',
    host: 'National Peace Council & Community Elders',
    viewers: 2420,
    bgGradient: 'from-emerald-950 via-royal-950 to-royal-900',
    previewThumbnail: 'https://i.ytimg.com/vi/wR5fdXIBLss/hqdefault.jpg',
    youtubeId: 'wR5fdXIBLss',
    isYoutube: true,
  },
  {
    id: 'pta-1',
    number: '03',
    name: 'Peace Tower Summit TV',
    tagline: '24/7 Pan-African Sovereign Mediation & Continental Peace Summit',
    category: 'High-Level Diplomacy',
    currentProgram: 'High-Level Diplomatic Mediation Summit & Chieftaincy Council',
    host: 'Ambassador Kwesi Mensah & Sovereign Council Elders',
    viewers: 3120,
    bgGradient: 'from-amber-950 via-royal-950 to-royal-900',
    previewThumbnail: 'https://i.postimg.cc/NjdbbdD7/Whats-App-Image-2026-08-24-at-08-59-35-(1).jpg',
    youtubeId: 'ECp57uwwSao',
    isYoutube: true,
  },
  {
    id: 'pta-2',
    number: '04',
    name: 'African Living Legends TV',
    tagline: 'Preserving the Voices, Pacts, and Wisdom of African Elders',
    category: 'Historical Heritage',
    currentProgram: 'Retrospective: Paramount Custodians & Lifetime Peace Laureates',
    host: 'Nana Osei Bonsu & Pan-African Historians',
    viewers: 1840,
    bgGradient: 'from-emerald-950 via-royal-950 to-royal-900',
    previewThumbnail: 'https://i.postimg.cc/PxYWGyW1/Whats-App-Image-2026-08-20-at-20-04-55.jpg',
    youtubeId: '-jC4o811UkA',
    isYoutube: true,
  },
];

const TODAY_SCHEDULE: ProgramSchedule[] = [
  {
    time: '06:00 - 08:30 GMT',
    title: 'Dawn Harmony: African Proverbs & Traditional Peace Prayers',
    presenter: 'Council of Traditional Elders',
    genre: 'Spiritual & Cultural',
    isLiveNow: false,
    synopsis: 'Starting the African day with ancestral wisdom, customary libations, and proverbs fostering reconciliation and communal respect.',
  },
  {
    time: '08:30 - 11:30 GMT',
    title: 'Chieftaincy Mediation Forum: Customary Land & Chieftaincy Accords',
    presenter: 'Paramount Palace Representatives & Legal Jurists',
    genre: 'Traditional Governance',
    isLiveNow: false,
    synopsis: 'Live case studies on how customary councils successfully mediate local grievances verbally without prolonged litigation.',
  },
  {
    time: '11:30 - 14:00 GMT',
    title: 'Continental Trade Integration: Economic Security Along Border Corridors',
    presenter: 'Dr. Joseph Boateng & ECOWAS Trade Analysts',
    genre: 'Pan-African Commerce',
    isLiveNow: false,
    synopsis: 'Examining bilateral peace agreements, cross-border trader safety, and conflict prevention strategies across West Africa.',
  },
  {
    time: '14:00 - 18:00 GMT',
    title: 'High-Level Diplomatic Mediation Summit & Chieftaincy Council',
    presenter: 'Ambassador Kwesi Mensah & Sovereign Council Elders',
    genre: 'Diplomatic Dialogue',
    isLiveNow: true,
    synopsis: 'Flagship live broadcast assembling regional governors, royal dignitaries, and civic emissaries to fortify verbal conflict prevention covenants.',
  },
  {
    time: '18:00 - 20:30 GMT',
    title: 'African Living Legends Spotlight: Pioneers of Continental Harmony',
    presenter: 'Living Legends Archive Bureau',
    genre: 'Documentary Special',
    isLiveNow: false,
    synopsis: 'An intimate portrait of historical African laureates who mediated historic treaties and sacrificed for national sovereignty.',
  },
  {
    time: '20:30 - 23:00 GMT',
    title: 'Ghana Thank You Awards: 9th Edition Gala Retrospective',
    presenter: 'Executive Awards Directorate',
    genre: 'State Honours',
    isLiveNow: false,
    synopsis: 'Comprehensive celebration of national gratitude, honoring notable citizens and community builders across Ghana.',
  },
  {
    time: '23:00 - Dawn GMT',
    title: 'Nightwatch for Continental Peace: Open Hotline & Reconciliation Songs',
    presenter: 'PTA Midnight Emissaries',
    genre: 'Interactive Call-In',
    isLiveNow: false,
    synopsis: 'Live call-in reconciliations for families, diasporic Ghanaians, and youth seeking conflict resolution guidance.',
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  { id: '1', user: 'Nana Kwadwo', location: 'Cape Coast, Ghana', text: 'Peace is indeed the sacred foundation! Watching live from Oguaa.', time: '14:05', badge: 'Council Elder' },
  { id: '2', user: 'Dr. Amina Touré', location: 'Dakar, Senegal', text: 'Splendid initiative by Peace Tower of Africa. Dialogue must always prevail over hostility.', time: '14:08', badge: 'Diplomat' },
  { id: '3', user: 'Kofi Asante', location: 'Kumasi, Ghana', text: 'Long live HRM Osabarimba Kwesi Atta II and the royal champions!', time: '14:12' },
  { id: '4', user: 'Grace Mwangi', location: 'Nairobi, Kenya', text: 'Watching with immense pride from East Africa. One united, peaceful continent!', time: '14:15', badge: 'Peace Ambassador' },
  { id: '5', user: 'Emeka Okafor', location: 'Lagos, Nigeria', text: 'Verbal dispute settlement is the authentic African heritage. Beautiful broadcast!', time: '14:19' },
];

const ARCHIVE_VIDEOS: ArchiveVideo[] = [
  {
    id: 'uabn-arch-widows',
    title: 'CELEBRATION WITH WIDOWS | UABN TV GHANA',
    duration: 'Official Broadcast',
    category: 'Community Outreach',
    views: '41.2K views',
    thumbnail: 'https://i.ytimg.com/vi/dzuTO9IGwgI/hqdefault.jpg',
    description: 'Bringing new life to the current generation: UABN TV GHANA honoring widows with love and relief.',
    youtubeId: 'dzuTO9IGwgI',
  },
  {
    id: 'unba-arch-1',
    title: 'Honhom Kronkron Sane - Tawia Prayer Song | UNBATV GHANA',
    duration: '06:48',
    category: 'UNBATV Spiritual',
    views: '38.4K views',
    thumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
    description: 'Sacred prayer and harmony broadcast on UNBATV GHANA celebrating faith, national unity, and spiritual peace in Ghana.',
    youtubeId: 'TvCGsB3HLSE',
  },
  {
    id: 'unba-arch-2',
    title: 'UNBATV GHANA Official Broadcast Continuous Playlist',
    duration: 'Full Playlist',
    category: 'UNBATV Loop',
    views: '45.1K views',
    thumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
    description: 'Continuous official stream from @uabntvghana with prayer songs and community peace broadcasts.',
    playlistId: 'PLXLwH4e4BAVg-G4qawhbVUtGjIapLqfIP',
  },
  {
    id: 'unba-arch-3',
    title: 'Ghana National Civic Accord & Reconciliation Forum',
    duration: 'Live Feed',
    category: 'UNBATV News',
    views: '29.3K views',
    thumbnail: 'https://i.ytimg.com/vi/wR5fdXIBLss/hqdefault.jpg',
    description: 'Civic leaders, dispute mediators, and community elders conferring on non-violent accords.',
    youtubeId: 'wR5fdXIBLss',
  },
  {
    id: 'unba-arch-4',
    title: 'National Reconciliation & Chieftaincy Leadership Summit',
    duration: '24:15',
    category: 'Diplomatic Accord',
    views: '32.1K views',
    thumbnail: 'https://i.ytimg.com/vi/ECp57uwwSao/hqdefault.jpg',
    description: 'Executive address and chieftaincy elders discussing peaceful transitions and customary dispute mediation.',
    youtubeId: 'ECp57uwwSao',
  },
];

interface PeaceTowerTVProps {
  onOpenUNBAPage?: () => void;
}

export default function PeaceTowerTV({ onOpenUNBAPage }: PeaceTowerTVProps) {
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default true so browser autoplay initiates immediately
  const [volume, setVolume] = useState(85);
  const [resolution, setResolution] = useState<'4K' | '1080p' | '720p' | 'AUDIO'>('1080p');
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'chat' | 'archive' | 'transponder'>('guide');
  
  // Live viewers simulation with realistic heartbeat
  const [viewerCount, setViewerCount] = useState(activeChannel.viewers);
  
  // Live Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [newChatText, setNewChatText] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [newChatLocation, setNewChatLocation] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Floating emoji reaction effects
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; left: number }>>([]);

  // Auto update viewers slightly
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 9) - 4;
      setViewerCount(prev => Math.max(800, prev + delta));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update viewer count on channel switch
  useEffect(() => {
    setViewerCount(activeChannel.viewers);
  }, [activeChannel]);

  // Scroll chat to bottom when updated
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendReaction = (emoji: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: 15 + Math.random() * 70, // percentage from left
    };
    setFloatingEmojis(prev => [...prev.slice(-15), newEmoji]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 2800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const user = newChatName.trim() || 'Peace Advocate';
    const loc = newChatLocation.trim() || 'Ghana';
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      user,
      location: loc,
      text: newChatText.trim(),
      time: timeStr,
    };

    setChatMessages(prev => [...prev, newMsg]);
    setNewChatText('');
  };

  const handleSelectArchiveVideo = (video: ArchiveVideo) => {
    // Dynamically update the player to stream this archive feature
    setActiveChannel(prev => ({
      ...prev,
      currentProgram: video.title,
      category: video.category,
      previewThumbnail: video.thumbnail,
      tagline: video.description,
      youtubeId: video.youtubeId || 'TvCGsB3HLSE',
      playlistId: video.playlistId,
      isYoutube: true,
    }));
    setIsPlaying(true);
    // Scroll player into view smoothly
    const playerEl = document.getElementById('pta-tv-player-viewport');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="peace-tower-tv" 
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-royal-50"
    >
      {/* Radiant Television Studio Ambient Backlights */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gold-500/15 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />

      {/* TV Station Header Banner */}
      <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
        
        {/* Official Logo & Live On-Air Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full royal-glass border border-gold-500/40 text-gold-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest shadow-xl">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="font-bold">Official Online TV Network</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-[11px] sm:text-xs tracking-wider uppercase shadow-xl animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
            <span className="font-extrabold text-white">LIVE ON AIR NOW</span>
          </div>
        </div>

        {/* Station Identity Showcase */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          {/* Logo Badge Container */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-500 via-rose-500 to-amber-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-1.5 shadow-2xl flex items-center justify-center">
              <img 
                src={ptaTvLogo} 
                alt="Peace Tower TV Official Logo" 
                className="w-full h-full object-contain rounded-xl select-none"
              />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-100 tracking-tight leading-tight uppercase">
              PEACE TOWER & UNBATV <span className="text-shine">GHANA</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-gold-400/90 tracking-widest uppercase font-semibold">
              ✦ UNBATV GHANA • 24/7 PAN-AFRICAN ONLINE TV & PEACE BROADCAST NETWORK ✦
            </p>
            <p className="font-sans text-xs sm:text-sm text-royal-100/80 font-light max-w-xl">
              Streaming sacred prayer anthems, sovereign chieftaincy arbitrations, and continental peace accords directly from @unbatvghana to Africa and the global diaspora.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              {onOpenUNBAPage && (
                <button
                  onClick={onOpenUNBAPage}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Open Dedicated UNBATV Channel Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <a
                href="https://www.youtube.com/@unbatvghana"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-sans font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>@unbatvghana on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full mt-2" />
      </div>

      {/* Main Broadcast Console Container */}
      <div className={`transition-all duration-500 ${isTheaterMode ? 'max-w-full' : 'max-w-7xl'} mx-auto space-y-6`}>
        
        {/* Channel Fast-Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl royal-glass border border-gold-500/25 bg-royal-950/70 shadow-lg">
          <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase tracking-wider pl-2">
            <Tv className="w-4 h-4 text-gold-400" />
            <span className="font-bold">Select Channel:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHANNELS.map(channel => {
              const isActive = activeChannel.id === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-bold shadow-lg shadow-gold-500/20 scale-105' 
                      : 'royal-glass text-gold-200/80 hover:text-gold-100 hover:bg-gold-500/10 border border-gold-500/20'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-royal-950 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="font-bold">CH {channel.number}</span>
                  <span className="hidden md:inline font-sans font-normal text-[11px] truncate max-w-[120px]">
                    {channel.name.split('(')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pr-2 text-gold-300 font-mono text-xs">
            <Users className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-bold">{viewerCount.toLocaleString()}</span>
            <span className="text-[10px] text-royal-100/60 uppercase">watching</span>
          </div>
        </div>

        {/* Autoplay Audio Notice Bar */}
        {isMuted && (
          <div className="bg-gradient-to-r from-amber-900/60 via-gold-900/40 to-amber-900/60 border border-gold-500/40 rounded-2xl p-3 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-gold-200">
            <div className="flex items-center gap-2.5">
              <VolumeX className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <div className="text-xs font-sans text-center sm:text-left">
                <strong className="text-gold-100 font-serif font-bold uppercase">Auto-Playing with Sound Muted:</strong> In modern browsers, YouTube videos auto-play silently. Click Unmute to hear full audio!
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMuted(false)}
                className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Unmute Audio</span>
              </button>
              {onOpenUNBAPage && (
                <button
                  onClick={onOpenUNBAPage}
                  className="px-3 py-1.5 rounded-xl royal-glass border border-gold-500/30 text-gold-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Full UNBATV Page →
                </button>
              )}
            </div>
          </div>
        )}

        {/* BROADCAST VIEWPORT (16:9 Widescreen) */}
        <div 
          id="pta-tv-player-viewport"
          className="relative rounded-3xl overflow-hidden border-2 border-gold-400/50 bg-black shadow-2xl shadow-gold-500/20 aspect-video flex flex-col justify-between group select-none"
        >
          {/* Embedded YouTube Player with Auto-Play */}
          {activeChannel.isYoutube && (activeChannel.youtubeId || activeChannel.playlistId) ? (
            <iframe
              key={`${activeChannel.id}-${activeChannel.youtubeId || activeChannel.playlistId}-${isMuted ? 'muted' : 'unmuted'}`}
              src={
                activeChannel.playlistId
                  ? `https://www.youtube-nocookie.com/embed/videoseries?list=${activeChannel.playlistId}&autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&enablejsapi=1&rel=0`
                  : `https://www.youtube-nocookie.com/embed/${activeChannel.youtubeId}?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=${activeChannel.youtubeId}&enablejsapi=1&rel=0`
              }
              title={activeChannel.currentProgram}
              className="absolute inset-0 w-full h-full z-0 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 z-0 overflow-hidden bg-royal-950">
              <img 
                src={activeChannel.previewThumbnail} 
                alt={activeChannel.currentProgram} 
                className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-105 filter contrast-105 brightness-95' : 'scale-100 filter brightness-75'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/80 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />
            </div>
          )}

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
                  style={{ left: `${item.left}%`, bottom: '15%' }}
                  className="absolute text-3xl sm:text-4xl drop-shadow-lg"
                >
                  {item.emoji}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TOP BROADCAST OVERLAY BAR (Watermark Bug & Stream Details) */}
          <div className="relative z-10 p-3 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            
            {/* Left: TV Station On-Screen Bug */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-0.5 shadow-xl shrink-0 flex items-center justify-center">
                <img 
                  src={ptaTvLogo} 
                  alt="PTA TV Bug" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-xs sm:text-sm text-gold-100 tracking-wider uppercase">
                    PEACE TOWER TV
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold tracking-widest uppercase animate-pulse">
                    LIVE
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-gold-400/90 tracking-widest uppercase">
                  CH {activeChannel.number} • GLOBAL FEED
                </span>
              </div>
            </div>

            {/* Right: Technical Stream Metrics */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal-950/80 border border-gold-500/30 text-gold-300 font-mono text-[10px]">
                <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                <span>{resolution}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 border border-gold-500/30 text-gold-200 font-mono text-[10px] sm:text-xs">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">{viewerCount.toLocaleString()}</span>
              </div>

              <button
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className="p-1.5 sm:p-2 rounded-lg bg-black/60 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 transition-all cursor-pointer"
                title={isTheaterMode ? 'Standard View' : 'Theater View'}
              >
                {isTheaterMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* CENTER BROADCAST PLAY/PAUSE PROMPT (Hover or Paused) */}
          <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
            {!isPlaying && (
              <div className="p-4 rounded-full bg-royal-950/90 border-2 border-gold-400 text-gold-300 shadow-2xl backdrop-blur-md animate-pulse">
                <Pause className="w-10 h-10" />
              </div>
            )}
          </div>

          {/* LOWER-THIRD GRAPHIC & NEWS TICKER BAR */}
          <div className="relative z-10 bg-gradient-to-t from-black via-black/95 to-transparent pt-6">
            
            {/* Lower-Third Newsstrap Graphic */}
            <div className="px-4 sm:px-6 pb-2">
              <div className="max-w-2xl bg-royal-950/90 border-l-4 border-gold-400 rounded-r-xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gold-500 text-royal-950 font-mono text-[9px] font-black uppercase tracking-wider">
                    {activeChannel.category}
                  </span>
                  <span className="font-mono text-[10px] text-gold-400 font-semibold tracking-wider uppercase truncate">
                    {activeChannel.host}
                  </span>
                </div>
                <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-gold-100 leading-snug">
                  {activeChannel.currentProgram}
                </h3>
              </div>
            </div>

            {/* CONTINUOUS BREAKING NEWS PEACE TICKER */}
            <div className="w-full bg-gradient-to-r from-rose-900 via-royal-950 to-rose-900 border-y border-gold-500/30 py-1.5 px-3 flex items-center gap-3 overflow-hidden">
              <div className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-md">
                <span>BREAKING</span>
              </div>
              <div className="overflow-hidden whitespace-nowrap text-xs text-gold-200 font-sans tracking-wide">
                <div className="inline-block animate-[marquee_30s_linear_infinite]">
                  ✦ PTA-TV TRANSMISSION: Sovereign Chieftaincy Council convenes verbal dispute resolution accord • Peace Tower of Africa reaches over 250,000 citizens in nationwide peace awareness campaigns • 2027 Ghana 70th Independence African Peace Center fundraiser updates • ECOWAS pilot mediation team establishes bilateral unity corridors • Tune in at 18:00 GMT for African Living Legends Retrospective ✦
                </div>
              </div>
            </div>

            {/* PLAYER CONTROLS TOOLBAR */}
            <div className="p-3 sm:p-4 flex items-center justify-between gap-4 bg-royal-950/95 border-t border-gold-500/20">
              
              {/* Play / Volume */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-bold transition-all shadow-md cursor-pointer"
                  title={isPlaying ? 'Pause Broadcast' : 'Play Broadcast'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-royal-950" /> : <Play className="w-4 h-4 fill-royal-950" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-16 sm:w-24 h-1.5 accent-amber-500 bg-royal-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gold-500/20 font-mono text-[11px] text-gold-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>LIVE TRANSMISSION</span>
                </div>
              </div>

              {/* Reaction Emojis Bar (Direct on player) */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full royal-glass border border-gold-500/30">
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold-400/80 mr-1">React:</span>
                {['🕊️', '❤️', '👏', '🇬🇭', '👑', '✨'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleSendReaction(emoji)}
                    className="text-base hover:scale-125 transition-transform p-1 cursor-pointer active:scale-95"
                    title={`Send ${emoji} to live stream`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quality & Fullscreen */}
              <div className="flex items-center gap-2">
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value as any)}
                  className="bg-royal-900 border border-gold-500/30 text-gold-300 font-mono text-[11px] rounded-lg px-2 py-1 cursor-pointer outline-none"
                >
                  <option value="4K">4K UHD</option>
                  <option value="1080p">1080p HD</option>
                  <option value="720p">720p</option>
                  <option value="AUDIO">Audio Only</option>
                </select>

                <button
                  onClick={() => {
                    const el = document.getElementById('pta-tv-player-viewport');
                    if (el) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        el.requestFullscreen();
                      }
                    }
                  }}
                  className="p-1.5 sm:p-2 rounded-lg bg-royal-900 border border-gold-500/30 text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* INTERACTIVE TV STATION HUBS (Schedule / Live Chat / Archive / Transponder) */}
        <div className="rounded-3xl royal-glass border border-gold-500/30 bg-gradient-to-b from-royal-950 via-royal-900/60 to-royal-950 p-4 sm:p-6 shadow-2xl">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'guide', label: 'TV Program Guide (EPG)', icon: Calendar },
                { id: 'chat', label: 'Live Viewer Chat & Reactions', icon: MessageSquare },
                { id: 'archive', label: 'Broadcast Archive & VOD', icon: Film },
                { id: 'transponder', label: 'Transmission & Reception', icon: RadioTower },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-black shadow-md' 
                        : 'royal-glass text-gold-300/80 hover:text-gold-100 hover:bg-gold-500/10 border border-gold-500/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-gold-400/90 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Transmitting 24/7 in English, Akan & French</span>
            </div>
          </div>

          {/* TAB 1: ELECTRONIC PROGRAM GUIDE (EPG) */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-100 uppercase tracking-wide">
                  Today's Broadcast Lineup • All Times GMT
                </h4>
                <span className="font-mono text-xs text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                  Channel 01 Schedule
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {TODAY_SCHEDULE.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      item.isLiveNow 
                        ? 'bg-gradient-to-r from-royal-900 via-royal-950 to-royal-900 border-gold-400 shadow-xl shadow-gold-500/10 scale-[1.01]' 
                        : 'bg-royal-950/60 border-gold-500/15 hover:border-gold-500/35'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-gold-400 shrink-0">
                          {item.time}
                        </span>
                        {item.isLiveNow && (
                          <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-black uppercase tracking-wider animate-pulse">
                            Airing Now
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-royal-900 border border-gold-500/25 text-gold-300 font-mono text-[9px] uppercase">
                          {item.genre}
                        </span>
                      </div>

                      <span className="font-mono text-[11px] text-royal-100/70">
                        Hosted by: <strong className="text-gold-200">{item.presenter}</strong>
                      </span>
                    </div>

                    <h5 className="font-serif text-sm sm:text-base font-bold text-gold-100 mt-2">
                      {item.title}
                    </h5>
                    <p className="font-sans text-xs sm:text-sm text-royal-100/80 font-light mt-1 leading-relaxed">
                      {item.synopsis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE VIEWER CHAT & COMMUNITY REACTIONS */}
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Chat Feed */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                <div 
                  ref={chatScrollRef}
                  className="h-80 overflow-y-auto space-y-3 p-4 rounded-2xl bg-royal-950/80 border border-gold-500/20 shadow-inner"
                >
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="p-3 rounded-xl bg-royal-900/60 border border-gold-500/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-gold-200">{msg.user}</span>
                          {msg.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-gold-500/20 border border-gold-500/40 text-gold-300 font-mono text-[9px] uppercase font-bold">
                              {msg.badge}
                            </span>
                          )}
                          <span className="text-[10px] text-royal-100/60 font-mono">({msg.location})</span>
                        </div>
                        <span className="font-mono text-[10px] text-gold-500/60">{msg.time}</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-royal-100/90 leading-relaxed font-light">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Send Chat Form */}
                <form onSubmit={handleSendMessage} className="space-y-3 p-4 rounded-2xl bg-royal-950/90 border border-gold-500/25">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name / Title"
                      value={newChatName}
                      onChange={e => setNewChatName(e.target.value)}
                      className="p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
                    />
                    <input
                      type="text"
                      placeholder="Your City / Country (e.g. Cape Coast, London)"
                      value={newChatLocation}
                      onChange={e => setNewChatLocation(e.target.value)}
                      className="p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write your message of peace, support, or prayer..."
                      value={newChatText}
                      onChange={e => setNewChatText(e.target.value)}
                      className="flex-1 p-3 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs sm:text-sm outline-none focus:border-gold-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Chat Sidebar & Quick Reactions */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-2xl royal-glass border border-gold-500/20 space-y-3 text-left">
                  <h5 className="font-serif text-sm font-bold text-gold-100 uppercase tracking-wide">
                    Live Audience Reactions
                  </h5>
                  <p className="font-sans text-xs text-royal-100/70 font-light leading-relaxed">
                    Tap any reaction below to float your endorsement directly on the broadcast video screen:
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { emoji: '🕊️', label: 'Peace Dove' },
                      { emoji: '❤️', label: 'Love' },
                      { emoji: '👏', label: 'Applause' },
                      { emoji: '🇬🇭', label: 'Ghana' },
                      { emoji: '👑', label: 'Royal' },
                      { emoji: '✨', label: 'Blessings' },
                    ].map(item => (
                      <button
                        key={item.emoji}
                        onClick={() => handleSendReaction(item.emoji)}
                        className="p-2.5 rounded-xl bg-royal-950 hover:bg-gold-500/20 border border-gold-500/20 flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95"
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="font-mono text-[9px] text-gold-300/80">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-royal-900 to-royal-950 border border-gold-500/25 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase font-bold">
                    <Shield className="w-4 h-4 text-gold-400" />
                    <span>Studio Etiquette</span>
                  </div>
                  <p className="font-sans text-[11px] text-royal-100/80 leading-relaxed font-light">
                    The Peace Tower chat forum is moderated in accordance with the Pan-African Peace Covenant. All messages promoting unity, customary respect, reconciliation, and progress are welcomed.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BROADCAST ARCHIVE & VIDEO ON DEMAND (VOD) */}
          {activeTab === 'archive' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-100 uppercase tracking-wide">
                    Featured Broadcast Archive
                  </h4>
                  <p className="font-sans text-xs text-royal-100/70 font-light">
                    Click any episode below to load and watch it in the main player above.
                  </p>
                </div>
                <span className="font-mono text-xs text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                  4 Documentaries Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ARCHIVE_VIDEOS.map(video => (
                  <div
                    key={video.id}
                    onClick={() => handleSelectArchiveVideo(video)}
                    className="group rounded-2xl overflow-hidden royal-glass border border-gold-500/25 hover:border-gold-400 transition-all cursor-pointer flex flex-col shadow-lg"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-royal-950/90 border border-gold-500/30 text-gold-300 font-mono text-[9px] uppercase">
                        {video.category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px]">
                        {video.duration}
                      </span>

                      {/* Play hover prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="p-3 rounded-full bg-gold-500 text-royal-950 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-5 h-5 fill-royal-950" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between text-left space-y-2">
                      <h5 className="font-serif text-xs sm:text-sm font-bold text-gold-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h5>
                      <p className="font-sans text-[11px] text-royal-100/70 font-light line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                      <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between font-mono text-[10px] text-gold-400/80">
                        <span>{video.views}</span>
                        <span className="underline group-hover:text-gold-200">Watch Now →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRANSMISSION & RECEPTION SPECIFICATIONS */}
          {activeTab === 'transponder' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Satellite Specs */}
              <div className="p-5 rounded-2xl royal-glass border border-gold-500/25 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase font-bold">
                  <RadioTower className="w-4 h-4 text-gold-400" />
                  <span>Satellite Transmission</span>
                </div>
                <div className="space-y-2 font-mono text-xs text-royal-100/90">
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Satellite:</span>
                    <span>SES-5 / Astra 2G</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Frequency:</span>
                    <span>11,540 MHz</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Polarization:</span>
                    <span>Vertical (V)</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Symbol Rate:</span>
                    <span>30,000 kS/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gold-400/80">FEC:</span>
                    <span>3/4 (DVB-S2 / 8PSK)</span>
                  </div>
                </div>
              </div>

              {/* Digital & Web Streaming */}
              <div className="p-5 rounded-2xl royal-glass border border-gold-500/25 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase font-bold">
                  <Tv className="w-4 h-4 text-gold-400" />
                  <span>Digital Web Protocol</span>
                </div>
                <div className="space-y-2 font-mono text-xs text-royal-100/90">
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Stream Type:</span>
                    <span>HLS / LL-HLS Adaptive</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Video Codec:</span>
                    <span>H.264 / H.265 UHD</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Audio Codec:</span>
                    <span>AAC-LC 320 kbps Stereo</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gold-400/80">Latency:</span>
                    <span>~1.8s Ultra Low Latency</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gold-400/80">Geo-Restriction:</span>
                    <span>None (Global Open Broadcast)</span>
                  </div>
                </div>
              </div>

              {/* Studio Contact & Program Submission */}
              <div className="p-5 rounded-2xl royal-glass border border-gold-500/25 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase font-bold">
                  <Radio className="w-4 h-4 text-rose-400" />
                  <span>Studio Hotline & Enquiries</span>
                </div>
                <p className="font-sans text-xs text-royal-100/80 font-light leading-relaxed">
                  For civic organizations, chieftaincy councils, or institutions wishing to broadcast mediation dialogues or documentary profiles:
                </p>
                <div className="space-y-1 font-mono text-xs pt-1">
                  <div className="text-gold-300">Studio Line: +233 (0) 24 123 4567</div>
                  <div className="text-gold-300">Email: broadcast@peacetowerofafrica.org</div>
                  <div className="text-royal-100/60 text-[10px] uppercase">Broadcasting Master Control: Cape Coast & Accra</div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
