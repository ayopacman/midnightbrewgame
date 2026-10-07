import React, { useState } from 'react';
import { 
  startLofiRadio, 
  stopLofiRadio, 
  isLofiRadioActive, 
  getCurrentLofiStation,
  playClick
} from '../utils/audio';
import { Disc, Play, Square, SkipForward, Volume2, Sparkles } from 'lucide-react';

export const CassetteJukebox: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(isLofiRadioActive());
  const [station, setStation] = useState<'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic'>(getCurrentLofiStation());

  const STATIONS: { id: 'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic'; label: string; tapeColor: string }[] = [
    { id: 'midnight', label: '🌙 Midnight Lo-Fi Tape', tapeColor: 'bg-[#3B172C] border-[#F472B6]' },
    { id: 'rainy_jazz', label: '🎷 Rainy Tokyo Jazz LP', tapeColor: 'bg-[#4C1D28] border-[#FB7185]' },
    { id: 'tokyo_cozy', label: '🌸 Shibuya Sunset Beats', tapeColor: 'bg-[#831843] border-[#F43F5E]' },
    { id: 'acoustic', label: '🎸 Acoustic Vinyl Warmth', tapeColor: 'bg-[#2A1220] border-[#E84A74]' },
  ];

  const handleTogglePlay = () => {
    playClick();
    if (isPlaying) {
      stopLofiRadio();
      setIsPlaying(false);
    } else {
      startLofiRadio(station);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    playClick();
    const idx = STATIONS.findIndex((s) => s.id === station);
    const nextStation = STATIONS[(idx + 1) % STATIONS.length].id;
    setStation(nextStation);
    if (isPlaying) {
      startLofiRadio(nextStation);
    }
  };

  const currentTape = STATIONS.find((s) => s.id === station) || STATIONS[0];

  return (
    <div className="bg-[#2A1220] text-pink-100 rounded-3xl p-3.5 sm:p-4 border-2 border-[#5C2344] shadow-xl flex flex-col justify-between max-w-sm w-full select-none">
      
      {/* Tape Deck Window with Spinning Spools */}
      <div className="relative w-full h-24 bg-[#1A0B14] rounded-2xl border-2 border-[#5C2344] p-2 flex items-center justify-between overflow-hidden shadow-inner">
        
        {/* Left Spool */}
        <div className="w-14 h-14 rounded-full border-4 border-[#5C2344] bg-[#2A1220] flex items-center justify-center relative shadow-md">
          <div className={`w-8 h-8 rounded-full border-2 border-dashed border-pink-400 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
            <div className="w-3 h-3 bg-[#1A0B14] rounded-full"></div>
          </div>
        </div>

        {/* Center Cassette Label */}
        <div className={`flex-1 mx-2 h-16 rounded-xl border p-1.5 flex flex-col justify-between text-center ${currentTape.tapeColor} shadow-md`}>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-200 truncate">
            {currentTape.label}
          </span>

          {/* Equalizer Visualizer Bars */}
          <div className="flex items-end justify-center gap-1 h-5">
            {[40, 80, 60, 100, 70, 90, 50].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-[#F472B6] rounded-full transition-all"
                style={{
                  height: isPlaying ? `${Math.random() * h + 20}%` : '20%',
                  transitionDuration: '150ms',
                }}
              ></div>
            ))}
          </div>

          <span className="text-[8px] font-mono text-pink-300">SIDE A • STEREO</span>
        </div>

        {/* Right Spool */}
        <div className="w-14 h-14 rounded-full border-4 border-[#5C2344] bg-[#2A1220] flex items-center justify-center relative shadow-md">
          <div className={`w-8 h-8 rounded-full border-2 border-dashed border-pink-400 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
            <div className="w-3 h-3 bg-[#1A0B14] rounded-full"></div>
          </div>
        </div>

      </div>

      {/* Retro Physical Deck Controls */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#5C2344]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTogglePlay}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-white text-[#E84A74] animate-pulse'
                : 'bg-[#E84A74] hover:bg-[#D43862] text-white'
            }`}
          >
            {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'PAUSE TAPE' : 'PLAY TAPE'}</span>
          </button>

          <button
            onClick={handleNextTrack}
            className="p-1.5 rounded-xl bg-[#3B172C] hover:bg-[#4C1D28] text-pink-200 border border-[#5C2344] transition-all cursor-pointer"
            title="Next Cassette Mixtape"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-pink-300">
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>{isPlaying ? 'PLAYING' : 'IDLE'}</span>
        </div>
      </div>

    </div>
  );
};
