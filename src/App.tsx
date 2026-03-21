import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gamepad2, 
  Search, 
  Clock, 
  Flame, 
  Trophy, 
  ExternalLink, 
  Maximize2, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Games Data
const gamesData: { id: string; title: string; thumbnail: string; iframeUrl: string; category: string; }[] = [
  { 
    id: "basket-hoop", 
    title: "Basket Hoop", 
    thumbnail: "https://i.ibb.co/SXJnkkWt/image-2026-03-20-222150740.png", 
    iframeUrl: "https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html", 
    category: "Sports" 
  },
  {
    id: "soccer-random",
    title: "Soccer Random",
    thumbnail: "https://i.ibb.co/xVQwQ7K/image-2026-03-20-230147166.png",
    iframeUrl: "https://script.google.com/macros/s/AKfycbwr79gF5RqgUkBr0YEX16ayQF4aqdcHxaLRubcOggFvXqp-PiG7tw0uyvr3vlUEpDnC/exec",
    category: "Sports"
  },
  {
    id: "basket-random",
    title: "Basket Random",
    thumbnail: "https://i.ibb.co/3YpXMgQv/image-2026-03-20-230527992.png",
    iframeUrl: "https://script.google.com/macros/s/AKfycbwiQgeRHVDP8wzJ_CeSE1LyaKCMu1qdlopwylhD4LdBvBVd2y36VjlWY0iyk38WH0JiJA/exec",
    category: "Sports"
  },
  {
    id: "basket-bros",
    title: "Basket Bros",
    thumbnail: "https://i.ibb.co/MxK7KXWc/image-2026-03-20-230109421.png",
    iframeUrl: "https://script.google.com/macros/s/AKfycbxUfaDSpH-0SJL0WPKt38JY7OOOGMmtpY9JTSbL8pvtjxS7jSpNHHu6MdZgWUshIU00Kw/exec",
    category: "Sports"
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<typeof gamesData[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Panic Key Implementation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        window.location.href = 'https://www.google.com';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(gamesData.map(g => g.category))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => {
            setActiveCategory('All');
            setSearchQuery('');
            setSelectedGame(null);
          }}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              $$4L <span className="text-indigo-400">GAMES</span>
            </h1>
          </div>

          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 text-sm"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white">
              <Clock className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20">
              <Flame className="w-4 h-4" />
              Trending
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {activeCategory === 'All' && searchQuery === '' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 p-8 sm:p-12"
          >
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-3 h-3" />
                Featured Game
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                Experience the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Next Level</span> of Play
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Discover curated unblocked games with zero lag and instant loading.
              </p>
              <button 
                onClick={() => setSelectedGame(gamesData[0])}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-600/20"
              >
                Play Featured
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#050508] to-transparent pointer-events-none hidden lg:block" />
          </motion.section>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredGames.map((game) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={game.id}
              className="group cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-3">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Play Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors truncate">
                {game.title}
              </h3>
              <p className="text-xs text-zinc-500 font-medium">{game.category}</p>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No games found</h3>
            <p className="text-zinc-500">Try searching for something else or change the category.</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-black/95 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-6xl bg-[#121214] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#121214]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <img src={selectedGame.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const frame = document.querySelector('iframe') as HTMLIFrameElement;
                      if (frame) frame.src = frame.src;
                    }}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                    title="Reload Game"
                  >
                    <Clock className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Game Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  loading="lazy"
                  allowFullScreen
                  allow="autoplay; fullscreen; pointer-lock"
                  sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#121214] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-zinc-500 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500 text-sm">
                    <Gamepad2 className="w-4 h-4 text-indigo-500" />
                    <span>{selectedGame.category}</span>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(selectedGame.iframeUrl, '_blank')}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Open in New Tab
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/5 py-12 mt-20 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight">$$4L GAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="text-sm text-zinc-600">© 2026 $$4L GAMES. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
