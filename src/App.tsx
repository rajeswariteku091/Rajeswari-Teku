import { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Music, Trophy, Zap } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Zap size={24} className="text-black" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter italic uppercase leading-none">Neon Rhythm</h1>
            <p className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-[0.2em]">Arcade Experience</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-fuchsia-500">
              <Trophy size={16} />
              <span className="text-xs font-mono uppercase tracking-widest">Current Score</span>
            </div>
            <motion.span 
              key={score}
              initial={{ scale: 1.2, color: '#d946ef' }}
              animate={{ scale: 1, color: '#fff' }}
              className="text-2xl font-black font-mono"
            >
              {score.toString().padStart(5, '0')}
            </motion.span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Info/Stats */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Gamepad2 size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Controls</h2>
            </div>
            <ul className="space-y-6 text-2xl text-white font-display uppercase italic">
              <li className="flex justify-between border-b border-white/5 pb-2 glitch-text" data-text="Move">
                <span>Move</span>
                <span className="text-cyan-400 font-black" data-text="Arrows">Arrows</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 glitch-text" data-text="Pause">
                <span>Pause</span>
                <span className="text-cyan-400 font-black" data-text="Space">Space</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 glitch-text" data-text="Restart">
                <span>Restart</span>
                <span className="text-cyan-400 font-black" data-text="Enter">Enter</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-fuchsia-400">
              <Music size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Now Playing</h2>
            </div>
            <div className="text-xs text-white/40 leading-relaxed italic">
              "Experience the fusion of classic arcade mechanics and synthetic soundscapes."
            </div>
          </section>
        </div>

        {/* Center Column: Game */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full mb-4 flex justify-between items-center lg:hidden">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-fuchsia-500" />
              <span className="text-xl font-mono font-bold">{score}</span>
            </div>
          </div>
          <SnakeGame onScoreChange={setScore} />
        </div>

        {/* Right Column: Music Player */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end">
          <MusicPlayer />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-center pointer-events-none">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
          System Status: Optimal // Connection: Secure
        </div>
      </footer>
    </div>
  );
}
