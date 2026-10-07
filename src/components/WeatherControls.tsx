import React from 'react';
import { WeatherType } from '../types/game';
import { playClick, playThunder, startRainAmbience, stopRainAmbience } from '../utils/audio';
import { CloudRain, CloudLightning, Snowflake, Sun } from 'lucide-react';

interface WeatherControlsProps {
  currentWeather: WeatherType;
  onChangeWeather: (weather: WeatherType) => void;
}

export const WeatherControls: React.FC<WeatherControlsProps> = ({
  currentWeather,
  onChangeWeather,
}) => {
  const handleSelect = (weather: WeatherType) => {
    playClick();
    if (weather === 'thunderstorm') {
      playThunder();
      startRainAmbience();
    } else if (weather === 'rain') {
      startRainAmbience();
    } else {
      stopRainAmbience();
    }
    onChangeWeather(weather);
  };

  return (
    <div className="flex items-center gap-1 bg-white/90 dark:bg-[#2A1220]/90 backdrop-blur-md p-1 rounded-2xl border border-[#F8D7DF] dark:border-[#5C2344] shadow-2xs">
      <button
        onClick={() => handleSelect('rain')}
        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
          currentWeather === 'rain' ? 'bg-[#E84A74] text-white shadow-xs' : 'text-[#9C6D79] hover:text-[#E84A74]'
        }`}
        title="Rainy Midnight (Soothing Raindrops)"
      >
        <CloudRain className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleSelect('thunderstorm')}
        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
          currentWeather === 'thunderstorm' ? 'bg-[#BE185D] text-white shadow-xs animate-pulse' : 'text-[#9C6D79] hover:text-[#BE185D]'
        }`}
        title="Thunderstorm (Distant Thunder & Lightning)"
      >
        <CloudLightning className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleSelect('snow')}
        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
          currentWeather === 'snow' ? 'bg-[#F472B6] text-white shadow-xs' : 'text-[#9C6D79] hover:text-[#F472B6]'
        }`}
        title="Winter Snow (Falling Flakes & Fireplace)"
      >
        <Snowflake className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleSelect('sunrise')}
        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
          currentWeather === 'sunrise' ? 'bg-[#FB7185] text-white shadow-xs' : 'text-[#9C6D79] hover:text-[#FB7185]'
        }`}
        title="Golden Rose Morning Dawn"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
