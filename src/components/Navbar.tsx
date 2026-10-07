import React from 'react';
import { 
  Coffee, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Sparkles, 
  DollarSign, 
  Award,
  Palette,
  ShoppingBag,
  Coins,
  Radio
} from 'lucide-react';
import { ThemeMode, DailyStats, GameMode } from '../types/game';
import { THEMES, ThemeConfig } from '../data/themes';
import { playClick, toggleRainAmbience, setSoundMuted, getSoundMuted, toggleLofiRadio, isLofiRadioActive } from '../utils/audio';

interface NavbarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenRecipeBook: () => void;
  onOpenShop?: () => void;
  gameMode?: GameMode;
  dailyStats: DailyStats;
  isRainActive: boolean;
  onToggleRain: () => void;
  onReturnToTitle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenRecipeBook,
  onOpenShop,
  gameMode = 'STORY',
  dailyStats,
  isRainActive,
  onToggleRain,
  onReturnToTitle,
}) => {
  const theme: ThemeConfig = THEMES[currentTheme] || THEMES.blossom;
  const [muted, setMuted] = React.useState(getSoundMuted());
  const [isLofi, setIsLofi] = React.useState(isLofiRadioActive());

  const handleMuteToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) playClick();
  };

  const handleLofiToggle = () => {
    playClick();
    const active = toggleLofiRadio();
    setIsLofi(active);
  };

  const handleThemeCycle = () => {
    playClick();
    const themesList: ThemeMode[] = ['blossom', 'midnight', 'matcha', 'caramel'];
    const nextIdx = (themesList.indexOf(currentTheme) + 1) % themesList.length;
    onThemeChange(themesList[nextIdx]);
  };

  const getModeLabel = () => {
    switch (gameMode) {
      case 'RUSH_HOUR':
        return { label: '⚡ RUSH HOUR', color: 'bg-[#F43F5E] text-white' };
      case 'MYSTERY':
        return { label: '🕵️ BARISTA DETECTIVE', color: 'bg-[#BE185D] text-white' };
      case 'ZEN':
        return { label: '🧘 ZEN LOUNGE', color: 'bg-[#EC4899] text-white' };
      case 'LATTE_CHALLENGE':
        return { label: '🎨 MASTERCLASS', color: 'bg-[#E84A74] text-white' };
      default:
        return { label: '🌸 STORY SHIFT', color: 'bg-[#E84A74] text-white' };
    }
  };

  const modeInfo = getModeLabel();

  return (
    <header className={`sticky top-0 z-40 ${theme.headerBg} backdrop-blur-md border-b shadow-xs transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand / Title */}
        <div 
          onClick={onReturnToTitle}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          title="Click to Return to Title / Mode Selector"
        >
          <div className="relative">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#FFD3DD] via-[#FFF0F3] to-[#FCE4EC] border border-[#F8D7DF] shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/hero-cup.png" alt="Midnight Brew" className="w-full h-full object-contain" />
            </div>
            {/* Mascot Cat Mini Badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-white bg-[#FFE4ED] overflow-hidden shadow-xs">
              <img src="/favicon.png" alt="Cat Mascot" className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <div className="font-serif font-black text-lg sm:text-2xl tracking-tight flex items-center gap-1.5 leading-none">
              <span className="text-[#E84A74]">
                Midnight Brew
              </span>
              <span className={`text-[9px] font-sans font-extrabold px-2 py-0.5 rounded-full shadow-2xs ${modeInfo.color}`}>
                {modeInfo.label}
              </span>
            </div>
            <p className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 tracking-wide ${theme.textMuted}`}>
              Night Shift • Day {dailyStats.day}
            </p>
          </div>
        </div>

        {/* Center: Live Stats Bar in Pink / Rose Gold */}
        <div className="hidden md:flex items-center gap-3 bg-white/90 dark:bg-[#2A1220]/90 backdrop-blur-xs border border-[#F8D7DF] dark:border-[#5C2344] px-3.5 py-1.5 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E84A74]">
            <div className="w-6 h-6 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#E84A74]">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <span>${dailyStats.coins || dailyStats.totalEarnings}</span>
            <span className="text-[10px] text-[#9C6D79] font-normal">(${dailyStats.totalTips} tips)</span>
          </div>

          <div className="h-4 w-px bg-[#F8D7DF]"></div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#D43862]">
            <Award className="w-4 h-4 text-[#E84A74]" />
            <span>Rep: {dailyStats.reputation}%</span>
          </div>

          <div className="h-4 w-px bg-[#F8D7DF]"></div>

          <div className="text-[11px] font-semibold text-[#9C6D79]">
            Served: <span className="font-bold text-[#4A2E35] dark:text-white">{dailyStats.customersServed}</span>
          </div>
        </div>

        {/* Right: Controls & Modals */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Cafe Boutique Shop Button */}
          {onOpenShop && (
            <button
              onClick={() => {
                playClick();
                onOpenShop();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all shadow-2xs btn-press bg-[#FFF0F3] hover:bg-[#FDE8ED] text-[#E84A74] border-[#F8D7DF]"
              title="Open Cafe Boutique Shop"
            >
              <ShoppingBag className="w-4 h-4 text-[#E84A74]" />
              <span className="hidden sm:inline">Shop</span>
            </button>
          )}

          {/* Recipe Book */}
          <button
            onClick={() => {
              playClick();
              onOpenRecipeBook();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all shadow-2xs btn-press bg-white/90 hover:bg-[#FFF0F3] text-[#4A2E35] border-[#F8D7DF]"
            title="Open Barista Recipe Guide"
          >
            <BookOpen className="w-4 h-4 text-[#E84A74]" />
            <span className="hidden sm:inline">Recipes</span>
          </button>

          {/* Lo-Fi Radio Button */}
          <button
            onClick={handleLofiToggle}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all shadow-2xs btn-press ${
              isLofi 
                ? 'bg-[#FFF0F3] border-[#E84A74] text-[#E84A74] ring-2 ring-[#E84A74]/30 animate-pulse' 
                : 'bg-white/90 text-[#9C6D79] border-[#F8D7DF] hover:text-[#E84A74]'
            }`}
            title={isLofi ? 'Lo-Fi Radio Active' : 'Toggle Lo-Fi Radio Chords'}
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* Theme Selector */}
          <button
            onClick={handleThemeCycle}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 hover:bg-[#FFF0F3] border border-[#F8D7DF] flex items-center justify-center text-base shadow-2xs transition-all btn-press"
            title={`Current Theme: ${theme.name}. Click to switch theme.`}
          >
            <span>{theme.emoji}</span>
          </button>

          {/* Ambient Rain FX */}
          <button
            onClick={() => {
              playClick();
              onToggleRain();
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all shadow-2xs btn-press ${
              isRainActive 
                ? 'bg-[#FFF0F3] border-[#E84A74] text-[#E84A74] shadow-pink-100 ring-2 ring-[#E84A74]/30' 
                : 'bg-white/90 text-[#9C6D79] border-[#F8D7DF] hover:text-[#E84A74]'
            }`}
            title={isRainActive ? 'Rain audio active' : 'Start ambient rain sounds'}
          >
            <CloudRain className="w-4 h-4" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#F8D7DF] flex items-center justify-center transition-all shadow-2xs btn-press ${
              muted 
                ? 'bg-pink-100 text-pink-400' 
                : 'bg-white/90 text-[#4A2E35] hover:text-[#E84A74]'
            }`}
            title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
