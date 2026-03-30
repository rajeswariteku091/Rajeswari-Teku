import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music as MusicIcon } from 'lucide-react';
import { DUMMY_TRACKS, Track } from '../constants';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const onEnded = () => {
    handleNext();
  };

  return (
    <div className="w-full max-w-md bg-black/40 border border-fuchsia-500/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(217,70,239,0.15)]">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      
      <div className="flex items-center gap-6 mb-6">
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full border border-fuchsia-500" />
          </div>
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate tracking-tight">{currentTrack.title}</h3>
          <p className="text-fuchsia-400 text-sm font-medium truncate">{currentTrack.artist}</p>
          <div className="flex items-center gap-2 mt-2 text-fuchsia-500/60">
            <MusicIcon size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">AI Generated Audio</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-500/60">
          <Volume2 size={18} className="neon-icon-cyan" />
          <div className="w-16 h-1 bg-cyan-500/20 rounded-full">
            <div className="w-2/3 h-full bg-cyan-500/50 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            className="text-white/60 hover:text-fuchsia-400 transition-colors transform active:scale-90"
          >
            <SkipBack size={24} fill="currentColor" className="neon-icon-fuchsia" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center bg-fuchsia-500 hover:bg-fuchsia-400 text-black rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(217,70,239,0.6)]"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" className="neon-icon-white" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1 neon-icon-white" />
            )}
          </button>

          <button 
            onClick={handleNext}
            className="text-white/60 hover:text-fuchsia-400 transition-colors transform active:scale-90"
          >
            <SkipForward size={24} fill="currentColor" className="neon-icon-fuchsia" />
          </button>
        </div>

        <div className="w-10" /> {/* Spacer */}
      </div>
    </div>
  );
};

export default MusicPlayer;
