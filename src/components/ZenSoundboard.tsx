import React, { useState } from 'react';
import { 
  startLofiRadio, 
  stopLofiRadio, 
  isLofiRadioActive, 
  getCurrentLofiStation,
  toggleRainAmbience,
  isRainAmbienceActive,
  playClick
} from '../utils/audio';
import { Radio, CloudRain, Volume2, Music, Sparkles, Disc } from 'lucide-react';

interface ZenSoundboardProps {
  isRainActive: boolean;
  onToggleRain: () => void;
}

export const ZenSoundboard: React.FC<ZenSoundboardProps> = ({ isRainActive, onToggleRain }) => {
  const [station, setStation] = useState<'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic'>('midnight');
  const [isLofiOn, setIsLofiOn] = useState<boolean>(isLofiRadioActive());

  const handleStationChange = (newStation: 'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic') => {
    playClick();
    setStation(newStation);
    startLofiRadio(newStation);
    setIsLofiOn(true);
  };

  const handleToggleLofi = () => {
    playClick();
    if (isLofiOn) {
      stopLofiRadio();
      setIsLofiOn(false);
    } else {
      startLofiRadio(station);
      setIsLofiOn(true);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2A1220]/95 via-[#3B172C]/95 to-[#1A0B14]/95 border-2 border-[#5C2344] p-4 rounded-3xl text-white shadow-xl mb-4 animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-pink-400/40 flex items-center justify-center text-xl shadow-inner">
            🧘
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base text-pink-200">
                Zen Lounge &amp; ASMR Radio
              </h3>
              <span className="px-2 py-0.5 bg-[#E84A74] text-white font-bold text-[10px] rounded-full uppercase">
                Endless Chill
              </span>
            </div>
            <p className="text-[11px] text-pink-300/80 font-medium">
              Procedural synth chords, rainy window vibes, and relaxed brewing with no stress.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lo-Fi Radio Toggle */}
          <button
            onClick={handleToggleLofi}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isLofiOn
                ? 'bg-[#E84A74] text-white border-pink-300 shadow-md shadow-pink-500/30 animate-pulse'
                : 'bg-black/40 text-pink-200 border-[#5C2344] hover:bg-black/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isLofiOn ? 'Lo-Fi Radio: ON 🎵' : 'Play Lo-Fi Radio 📻'}</span>
          </button>

          {/* Rain Ambience Toggle */}
          <button
            onClick={onToggleRain}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isRainActive
                ? 'bg-[#F43F5E] text-white border-pink-300 shadow-md'
                : 'bg-black/40 text-pink-200 border-[#5C2344] hover:bg-black/60'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>{isRainActive ? 'Rain ASMR: ON 🌧️' : 'Start Rain 🌧️'}</span>
          </button>
        </div>

      </div>

      {/* Station Selector Bar */}
      {isLofiOn && (
        <div className="mt-3 pt-3 border-t border-[#5C2344]/80 flex flex-wrap items-center gap-2 text-xs animate-in fade-in">
          <span className="text-[10px] font-bold uppercase text-pink-300 mr-1 flex items-center gap-1">
            <Disc className="w-3 h-3 animate-spin" /> Station:
          </span>

          <button
            onClick={() => handleStationChange('midnight')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              station === 'midnight' ? 'bg-pink-400 text-stone-950 font-bold' : 'bg-black/30 text-pink-200'
            }`}
          >
            🌙 Midnight Chords
          </button>

          <button
            onClick={() => handleStationChange('rainy_jazz')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              station === 'rainy_jazz' ? 'bg-pink-400 text-stone-950 font-bold' : 'bg-black/30 text-pink-200'
            }`}
          >
            🎷 Rainy Jazz Dm7
          </button>

          <button
            onClick={() => handleStationChange('tokyo_cozy')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              station === 'tokyo_cozy' ? 'bg-pink-400 text-stone-950 font-bold' : 'bg-black/30 text-pink-200'
            }`}
          >
            🌸 Tokyo Pentatonic
          </button>

          <button
            onClick={() => handleStationChange('acoustic')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              station === 'acoustic' ? 'bg-pink-400 text-stone-950 font-bold' : 'bg-black/30 text-pink-200'
            }`}
          >
            🎸 Acoustic Warmth
          </button>
        </div>
      )}

    </div>
  );
};
