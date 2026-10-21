import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, Play, Pause, Volume2, VolumeX, Maximize2, Radio, 
  ExternalLink, Youtube, Sparkles, Flame, Users, Clock, 
  Share2, ArrowLeft, Send, CheckCircle2, Shield, Heart,
  ListVideo, RefreshCw, MessageSquare, Calendar, HelpCircle,
  Film, RadioTower, Globe, ChevronRight, Plus
} from 'lucide-react';

const ptaTvLogo = '/pta-tv-logo.jpg';

export interface UNBATVVideo {
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

export const UNBATV_VIDEOS: UNBATVVideo[] = [
  {
    id: 'unba-widows',
    videoId: 'dzuTO9IGwgI',
    title: 'CELEBRATION WITH WIDOWS | UABN TV GHANA',
    category: 'Community Outreach',
    duration: 'Official Broadcast',
    description: 'Bringing new life to the current generation: UABN TV GHANA heartfelt community outreach honoring widows with love, relief, and dignity.',
    thumbnail: 'https://i.ytimg.com/vi/dzuTO9IGwgI/hqdefault.jpg',
  },
  {
    id: 'unba-playlist',
    playlistId: 'PLXLwH4e4BAVg-G4qawhbVUtGjIapLqfIP',
    title: 'UNBATV GHANA Official Broadcast Playlist',
    category: 'Full Broadcast Loop',
    duration: 'Continuous Stream',
    description: 'Continuous official video broadcast playlist from @uabntvghana featuring prayer songs, community broadcasts, and cultural peace messages.',
    thumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
    isPlaylist: true,
  },
  {
    id: 'unba-vid-1',
    videoId: 'TvCGsB3HLSE',
    title: 'Honhom Kronkron Sane - Tawia Prayer Song | UNBATV GHANA',
    category: 'Spiritual & Harmony',
    duration: '06:48',
    description: 'Sacred prayer and harmony broadcast on UNBATV GHANA celebrating faith, national unity, and spiritual peace in Ghana.',
    thumbnail: 'https://i.ytimg.com/vi/TvCGsB3HLSE/hqdefault.jpg',
  },
  {
    id: 'unba-vid-2',
    videoId: 'wR5fdXIBLss',
    title: 'Ghana National Live Broadcast Stream | Peace & Civic Accord',
    category: 'National News & Live',
    duration: 'Live Feed',
    description: 'Live national news and civic dialogue stream highlighting grassroots mediation and community updates across Ghana.',
    thumbnail: 'https://i.ytimg.com/vi/wR5fdXIBLss/hqdefault.jpg',
  },
  {
    id: 'unba-vid-3',
    videoId: 'ECp57uwwSao',
    title: 'National Reconciliation & Chieftaincy Leadership Summit',
    category: 'Civic Leadership',
    duration: '24:15',
    description: 'Executive address and chieftaincy elders discussing peaceful transitions, democratic integrity, and traditional council dispute mediation.',
    thumbnail: 'https://i.ytimg.com/vi/ECp57uwwSao/hqdefault.jpg',
  },
  {
    id: 'unba-vid-4',
    videoId: '-jC4o811UkA',
    title: 'Continental Town Hall: Verbal Dispute Resolution & Youth Voice',
    category: 'Grassroots Dialogue',
    duration: '1:12:30',
    description: 'Comprehensive town hall symposium engaging Ghanaian citizens on non-violent mediation, civic harmony, and continental security.',
    thumbnail: 'https://i.ytimg.com/vi/-jC4o811UkA/hqdefault.jpg',
  },
];

interface ChatMessage {
  id: string;
  user: string;
  location: string;
  text: string;
  time: string;
  badge?: string;
}

const INITIAL_UNBA_CHAT: ChatMessage[] = [
  { id: '1', user: 'Emmanuel Mensah', location: 'Accra, Ghana', text: 'Welcome to UNBATV GHANA! Blessed to have this channel broadcasting peace.', time: '14:20', badge: 'Subscriber' },
  { id: '2', user: 'Abena Serwaa', location: 'Kumasi, Ghana', text: 'Watching live with crisp clarity. Beautiful cultural songs and unity messages.', time: '14:22', badge: 'Moderator' },
  { id: '3', user: 'Kwame Osei', location: 'Cape Coast, Ghana', text: 'Greetings to the Peace Tower of Africa and UNBATV team!', time: '14:25' },
  { id: '4', user: 'Aisha Bello', location: 'Tamale, Ghana', text: 'Continuous peace across our regions. Verbal resolution is the way forward!', time: '14:29', badge: 'Peace Ambassador' },
];

interface UNBATVGhanaPageProps {
  onBackToHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function UNBATVGhanaPage({ onBackToHome, onNavigateSection }: UNBATVGhanaPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<UNBATVVideo>(UNBATV_VIDEOS[0]);
  const [isMuted, setIsMuted] = useState(true); // Default muted so browser allows autoplay
  const [customVideoInput, setCustomVideoInput] = useState('');
  const [viewerCount, setViewerCount] = useState(3840);
  const [activeTab, setActiveTab] = useState<'playlist' | 'chat' | 'about' | 'schedule'>('playlist');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_UNBA_CHAT);
  const [newChatText, setNewChatText] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [newChatLocation, setNewChatLocation] = useState('');
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; left: number }>>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Viewer heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount(prev => Math.max(1200, prev + Math.floor(Math.random() * 11) - 5));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const user = newChatName.trim() || 'UNBA Viewer';
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

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customVideoInput.trim();
    if (!trimmed) return;

    let vidId = trimmed;
    // Check if it is a full youtube URL
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      const match = trimmed.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11})/);
      if (match) {
        vidId = match[1];
      }
    }

    const newVideoItem: UNBATVVideo = {
      id: `custom-${Date.now()}`,
      videoId: vidId,
      title: `UNBATV Broadcast: ${vidId}`,
      category: 'User Added Stream',
      duration: 'Live / On-Demand',
      description: 'Stream loaded directly from YouTube.',
      thumbnail: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
    };

    setSelectedVideo(newVideoItem);
    setCustomVideoInput('');
  };

  // Build the embed URL with auto-play parameters
  // autoplay=1 starts playback automatically
  // mute=1 is required by modern browser autoplay policies (unmute toggle provided)
  const embedUrl = selectedVideo.isPlaylist && selectedVideo.playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${selectedVideo.playlistId}&autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&enablejsapi=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=${selectedVideo.videoId}&enablejsapi=1&rel=0`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen text-royal-50 relative selection:bg-gold-500/30 selection:text-gold-100 pb-20">
      
      {/* VIBRANT AMBIENT BACKLIGHTS */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-red-600/15 blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[35%] right-10 w-[550px] h-[550px] rounded-full bg-amber-500/20 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-royal-950/90 backdrop-blur-md border-b border-gold-500/25 py-3 px-4 sm:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button & Station Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl royal-glass border border-gold-500/30 hover:border-gold-400 text-gold-300 hover:text-gold-100 flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer group shadow-sm"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Main Portal</span>
            </button>

            <div className="h-6 w-px bg-gold-500/20 hidden sm:block" />

            {/* UNBATV Station Logo Badge */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-1 shadow-lg shrink-0">
                <img 
                  src={ptaTvLogo} 
                  alt="UNBATV GHANA Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-black text-sm sm:text-base text-gold-100 tracking-wider uppercase leading-none">
                    UNBATV GHANA
                  </h1>
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-mono text-[8px] font-bold tracking-widest uppercase animate-pulse shadow-sm">
                    LIVE
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-gold-400/90 tracking-widest uppercase">
                  @unbatvghana • Official Online TV
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions (YouTube Subscribe & Share) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://www.youtube.com/@unbatvghana?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-sans font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all hover:scale-105"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Subscribe on YouTube</span>
              <span className="sm:hidden">Subscribe</span>
            </a>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl royal-glass border border-gold-500/30 text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
              title="Share UNBATV GHANA"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* BANNER SHOWCASE */}
        <div className="rounded-3xl royal-glass border border-gold-500/30 bg-gradient-to-r from-royal-950 via-royal-900/80 to-royal-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-gold-500 via-rose-500 to-amber-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-gold-400 bg-royal-950 p-2 shadow-2xl flex items-center justify-center">
                  <img 
                    src={ptaTvLogo} 
                    alt="UNBATV GHANA Official Emblem" 
                    className="w-full h-full object-contain rounded-xl select-none"
                  />
                </div>
              </div>

              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Official Television Channel
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-600/30 border border-rose-500/50 text-rose-300 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                    Auto-Play Broadcast Live
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-100 tracking-tight uppercase">
                  UNBATV <span className="text-shine">GHANA</span>
                </h2>

                <p className="font-sans text-xs sm:text-sm text-royal-100/90 leading-relaxed font-light">
                  Broadcasting continental unity, peaceful conflict resolution, sacred prayer anthems, and chieftaincy leadership across Ghana and the worldwide African diaspora.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 font-mono text-xs text-gold-400/90">
                  <div className="flex items-center gap-1.5">
                    <Youtube className="w-4 h-4 text-rose-500" />
                    <span>Channel: <strong>@unbatvghana</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span><strong>{viewerCount.toLocaleString()}</strong> Active Viewers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>24/7 Global Web Stream</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channel External Link Box */}
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
              <a
                href="https://www.youtube.com/@unbatvghana"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Visit YouTube Channel</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-4 py-2.5 rounded-xl royal-glass border border-gold-500/30 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>{isMuted ? 'Turn Sound ON' : 'Mute Audio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BROADCAST THEATER - AUTO PLAY VIDEO PLAYER */}
        <section className="space-y-4">
          
          {/* Autoplay Audio Notification Bar */}
          {isMuted && (
            <div className="bg-gradient-to-r from-amber-900/60 via-gold-900/50 to-amber-900/60 border border-gold-500/40 rounded-2xl p-3 sm:p-4 shadow-lg flex items-center justify-between gap-3 text-gold-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gold-500/20 text-gold-300">
                  <VolumeX className="w-4 h-4 animate-pulse" />
                </div>
                <div className="text-xs sm:text-sm font-sans">
                  <strong className="text-gold-100 font-serif font-bold uppercase">Auto-Playing Muted:</strong> Modern browsers start videos muted for silent autoplay. Click Unmute to hear full audio!
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

          {/* WIDESCREEN YOUTUBE PLAYER CONTAINER */}
          <div 
            id="unba-tv-player"
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

          {/* PLAYER DETAILS TOOLBAR */}
          <div className="p-4 sm:p-5 rounded-2xl royal-glass border border-gold-500/25 bg-royal-950/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-500 text-royal-950 font-mono text-[9px] font-black uppercase tracking-wider">
                  {selectedVideo.category}
                </span>
                <span className="font-mono text-xs text-gold-400/80">
                  {selectedVideo.duration}
                </span>
                <span className="text-royal-100/40">•</span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Auto-Playing
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-100 leading-snug">
                {selectedVideo.title}
              </h3>
              <p className="font-sans text-xs text-royal-100/70 font-light max-w-3xl leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>

            {/* Quick React Bar */}
            <div className="flex items-center gap-1.5 bg-royal-900/80 p-2 rounded-2xl border border-gold-500/20 shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gold-400/80 mr-1 hidden sm:inline">React:</span>
              {['🕊️', '❤️', '👏', '🇬🇭', '👑', '✨'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleSendReaction(emoji)}
                  className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer active:scale-95"
                  title={`Send ${emoji} reaction`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* PLAYLIST BROWSER & INTERACTIVE TABS */}
        <section className="rounded-3xl royal-glass border border-gold-500/30 bg-gradient-to-b from-royal-950 via-royal-900/60 to-royal-950 p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Tabs Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'playlist', label: 'UNBATV Video Library & Playlist', icon: ListVideo },
                { id: 'chat', label: 'Live Viewer Chat Room', icon: MessageSquare },
                { id: 'schedule', label: 'Broadcast Schedule', icon: Calendar },
                { id: 'about', label: 'About UNBATV GHANA', icon: Globe },
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

            <div className="font-mono text-xs text-gold-400/90 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Broadcast Source: YouTube (@unbatvghana)</span>
            </div>
          </div>

          {/* TAB 1: VIDEO LIBRARY / PLAYLIST */}
          {activeTab === 'playlist' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-100 uppercase tracking-wide">
                    Featured UNBATV GHANA Broadcasts
                  </h4>
                  <p className="font-sans text-xs text-royal-100/70 font-light">
                    Select any video or playlist below to immediately switch the top player and auto-play:
                  </p>
                </div>
                <span className="font-mono text-xs text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 self-start sm:self-auto">
                  {UNBATV_VIDEOS.length} Curated Broadcasts
                </span>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {UNBATV_VIDEOS.map(video => {
                  const isCurrent = selectedVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => {
                        setSelectedVideo(video);
                        // Scroll player to center
                        const playerEl = document.getElementById('unba-tv-player');
                        if (playerEl) {
                          playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`group rounded-2xl overflow-hidden royal-glass border transition-all cursor-pointer flex flex-col shadow-xl ${
                        isCurrent 
                          ? 'border-gold-400 ring-2 ring-gold-400/40 bg-royal-900/80 scale-[1.02]' 
                          : 'border-gold-500/25 hover:border-gold-400/70 bg-royal-950/60'
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-black">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-royal-950/90 border border-gold-500/30 text-gold-300 font-mono text-[9px] uppercase">
                          {video.category}
                        </span>
                        
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px]">
                          {video.duration}
                        </span>

                        {isCurrent && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider animate-pulse shadow-md">
                            Playing Now
                          </div>
                        )}

                        {/* Play Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <div className="p-3 rounded-full bg-gold-500 text-royal-950 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-5 h-5 fill-royal-950" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                        <h5 className="font-serif text-sm font-bold text-gold-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
                          {video.title}
                        </h5>
                        <p className="font-sans text-xs text-royal-100/70 font-light line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between font-mono text-[10px] text-gold-400/80">
                          <span>{video.isPlaylist ? 'Full Playlist' : 'Single Video'}</span>
                          <span className="underline group-hover:text-gold-200">Watch Now →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom YouTube Video / ID Loader */}
              <div className="p-5 rounded-2xl bg-royal-950/90 border border-gold-500/30 space-y-3">
                <div className="flex items-center gap-2 text-gold-300 font-mono text-xs uppercase font-bold">
                  <Plus className="w-4 h-4 text-gold-400" />
                  <span>Load Any Video or Livestream from @unbatvghana</span>
                </div>
                <p className="font-sans text-xs text-royal-100/70 font-light">
                  Paste any YouTube URL or 11-character Video ID from the UNBATV GHANA channel to embed and auto-play immediately:
                </p>
                <form onSubmit={handleAddCustomVideo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... or Video ID"
                    value={customVideoInput}
                    onChange={e => setCustomVideoInput(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-royal-950 font-serif font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-md"
                  >
                    Load & Auto-Play
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE VIEWER CHAT */}
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Chat Feed */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                <div 
                  ref={chatScrollRef}
                  className="h-80 overflow-y-auto space-y-3 p-4 rounded-2xl bg-royal-950/80 border border-gold-500/20 shadow-inner"
                >
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="p-3 rounded-xl bg-royal-900/60 border border-gold-500/10 space-y-1 text-left">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-gold-200">{msg.user}</span>
                          {msg.badge && (
                            <span className="px-1.5 py-0.2 rounded bg-gold-500/20 border border-gold-500/40 text-gold-300 font-mono text-[9px] uppercase font-bold">
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
                      placeholder="Your Name (e.g. Nana Kwame, Sister Grace)"
                      value={newChatName}
                      onChange={e => setNewChatName(e.target.value)}
                      className="p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
                    />
                    <input
                      type="text"
                      placeholder="Your City / Country (e.g. Accra, London)"
                      value={newChatLocation}
                      onChange={e => setNewChatLocation(e.target.value)}
                      className="p-2.5 rounded-xl bg-royal-900 border border-gold-500/30 text-royal-50 font-sans text-xs outline-none focus:border-gold-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Share your peace message, reflection, or prayer with the UNBATV audience..."
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

              {/* Chat Sidebar */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <div className="p-4 rounded-2xl royal-glass border border-gold-500/20 space-y-3">
                  <h5 className="font-serif text-sm font-bold text-gold-100 uppercase tracking-wide">
                    Viewer Emoji Reactions
                  </h5>
                  <p className="font-sans text-xs text-royal-100/70 font-light leading-relaxed">
                    Tap to trigger live floating animations over the video stream:
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { emoji: '🕊️', label: 'Peace' },
                      { emoji: '❤️', label: 'Love' },
                      { emoji: '👏', label: 'Applause' },
                      { emoji: '🇬🇭', label: 'Ghana' },
                      { emoji: '👑', label: 'Royal' },
                      { emoji: '✨', label: 'Grace' },
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

                <div className="p-4 rounded-2xl bg-royal-950 border border-gold-500/25 space-y-2">
                  <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase font-bold">
                    <Shield className="w-4 h-4 text-gold-400" />
                    <span>Broadcasting Etiquette</span>
                  </div>
                  <p className="font-sans text-[11px] text-royal-100/80 leading-relaxed font-light">
                    UNBATV GHANA honors all cultural backgrounds, fostering peaceful dialogue, customary respect, and national progress.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BROADCAST SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 text-left">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-100 uppercase tracking-wide">
                UNBATV GHANA Daily Broadcast Lineup • GMT
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { time: '06:00 - 08:30 GMT', title: 'Morning Songs & Divine Grace', desc: 'Starting the African day with spiritual songs, traditional libations, and prayers for Ghana and Africa.' },
                  { time: '08:30 - 11:30 GMT', title: 'Chieftaincy Custodians & Harmony', desc: 'Case studies in verbal dispute resolution and customary reconciliation accords.' },
                  { time: '11:30 - 14:00 GMT', title: 'Pan-African News & Civic Forum', desc: 'Border security, regional harmony, and youth leadership interviews across ECOWAS.' },
                  { time: '14:00 - 18:00 GMT', title: 'High-Level Mediation & Peace Summit', desc: 'Live diplomatic delegations, traditional rulers, and peace pact ceremonies.' },
                  { time: '18:00 - 20:30 GMT', title: 'Living Legends Retrospective', desc: 'Documentaries preserving the historic sacrifices of African peacemakers and statesmen.' },
                  { time: '20:30 - Midnight GMT', title: 'National Thanksgiving & Reconciliation Hotline', desc: 'Open dialogue call-in forum connecting communities, chiefs, and diasporans.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl royal-glass border border-gold-500/20 space-y-1.5">
                    <span className="font-mono text-xs font-bold text-gold-400">{item.time}</span>
                    <h5 className="font-serif text-sm sm:text-base font-bold text-gold-100">{item.title}</h5>
                    <p className="font-sans text-xs text-royal-100/80 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ABOUT UNBATV GHANA */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-gold-100 uppercase">
                  Mission & Vision of UNBATV GHANA
                </h4>
                <p className="font-sans text-xs sm:text-sm text-royal-100/90 leading-relaxed font-light">
                  UNBATV GHANA (@unbatvghana) operates as an independent broadcasting network committed to continental harmony, cultural heritage, and verbal conflict resolution. Partnering with the Peace Tower of Africa, the channel shares sacred music, traditional mediation ceremonies, and educational forums.
                </p>
                <div className="space-y-2 font-mono text-xs text-gold-300">
                  <div>✦ YouTube Channel: <strong>https://www.youtube.com/@unbatvghana</strong></div>
                  <div>✦ Network Name: <strong>UNBATV GHANA / UABN TV GHANA</strong></div>
                  <div>✦ Origin: <strong>Ghana, West Africa</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl royal-glass border border-gold-500/25 space-y-3">
                <h5 className="font-serif text-sm font-bold text-gold-100 uppercase">
                  Subscribe & Follow Official Feeds
                </h5>
                <p className="font-sans text-xs text-royal-100/80 font-light leading-relaxed">
                  Support the channel by subscribing on YouTube, enabling notifications for live streams, and sharing peace covenants across social platforms.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.youtube.com/@unbatvghana?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    <Youtube className="w-4 h-4 fill-white" />
                    <span>Subscribe to UNBATV GHANA</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER BAR */}
      <footer className="mt-16 border-t border-gold-500/20 pt-8 text-center space-y-3 font-mono text-xs text-gold-400/80">
        <div className="flex items-center justify-center gap-2">
          <img src={ptaTvLogo} alt="UNBATV" className="w-6 h-6 object-contain rounded" />
          <span className="font-serif font-bold text-gold-200 uppercase">UNBATV GHANA</span>
          <span>• In Association with Peace Tower of Africa</span>
        </div>
        <p className="font-sans text-xs text-royal-100/60 font-light">
          "Resolving Conflicts Verbally — Let's Build the African Peace Tower"
        </p>
        <button
          onClick={onBackToHome}
          className="mt-2 text-gold-300 hover:text-gold-100 underline cursor-pointer text-xs uppercase tracking-wider"
        >
          ← Return to Main Peace Tower Portal
        </button>
      </footer>

    </div>
  );
}
