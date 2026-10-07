import React from 'react';
import { 
  Coffee, 
  Play, 
  BookOpen, 
  Sparkles, 
  Zap, 
  Search, 
  Palette, 
  ShoppingBag, 
  Radio, 
  Heart,
  Award,
  Sparkle,
  Camera
} from 'lucide-react';
import { ThemeMode, GameMode } from '../types/game';
import { THEMES, ThemeConfig } from '../data/themes';
import { playClick, playBellChime } from '../utils/audio';
import { MochiCounterCat } from './MochiCounterCat';

interface TitleScreenProps {
  currentTheme: ThemeMode;
  onSelectMode: (mode: GameMode) => void;
  onOpenRecipeBook: () => void;
  onOpenLatteArtStudio: () => void;
  onOpenShop: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  currentTheme,
  onSelectMode,
  onOpenRecipeBook,
  onOpenLatteArtStudio,
  onOpenShop,
}) => {
  const theme: ThemeConfig = THEMES[currentTheme] || THEMES.blossom;

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      
      {/* Background Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E84A74]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FFD3DD]/30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl w-full text-center relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-500 py-4">
        
        {/* Floating Aesthetic Photo Trio & Hero Centerpiece */}
        <div className="relative inline-block mx-auto mb-2">
          
          {/* Animated Steam */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-20">
            <span className="text-2xl animate-steam opacity-80">☁️</span>
            <span className="text-xl animate-steam-delayed opacity-60">☁️</span>
          </div>

          {/* Right Floating Living Mascot Pet: Mochi (Transparent, No Background Box) */}
          <div className="absolute -right-8 sm:-right-36 -bottom-6 sm:bottom-0 z-20 scale-90 sm:scale-100 origin-bottom-right">
            <MochiCounterCat
              catHappiness={95}
              onPetCat={() => {}}
              onFeedTreat={() => {}}
              standalone={true}
            />
          </div>

          {/* Left Floating Pinterest Thumbnail (Strawberry Matcha Latte) */}
          <div className="hidden sm:block absolute -left-20 top-6 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg rotate-[-12deg] hover:rotate-0 hover:scale-110 transition-all duration-300 z-10">
            <img src="/strawberry_latte.jpg" alt="Strawberry Matcha" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[8px] font-bold text-white text-center py-0.5">
              🍓 Iced
            </div>
          </div>

          {/* Main Watercolor Pink Rose Hero Cup */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto flex items-center justify-center p-2 animate-float filter drop-shadow-2xl select-none">
            <img
              src="/hero-cup.png"
              alt="Artisan Pink Rose Coffee Cup & Macarons"
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Floating Pinterest Thumbnail (3D Cat Latte Art) */}
          <div className="hidden sm:block absolute -right-20 top-6 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg rotate-[12deg] hover:rotate-0 hover:scale-110 transition-all duration-300 z-10">
            <img src="/cat_latte.jpg" alt="Cute Cat Foam Art" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[8px] font-bold text-white text-center py-0.5">
              🐱 Art
            </div>
          </div>

          {/* Sparkle Badge */}
          <div className="absolute bottom-3 left-6 bg-gradient-to-r from-[#E84A74] to-[#F43F5E] text-white p-2.5 rounded-full shadow-lg shadow-pink-500/40 animate-pulse z-20">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#F8D7DF] text-xs font-black text-[#E84A74] shadow-xs hover:scale-105 transition-transform">
            <span>🌸</span>
            <span>Aesthetic Pinterest 2D Barista Sim &amp; Cafe</span>
            <span>🌸</span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl tracking-tight text-[#4A2E35] dark:text-white leading-tight">
            Midnight <span className="text-[#E84A74]">Brew</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#9C6D79] dark:text-[#D4A5B8] max-w-lg mx-auto font-medium leading-relaxed">
            Step behind the rainy pastel counter. Brew strawberry matchas, bake warm flaky croissants, draw cute 3D cat latte art, and pet Mochi!
          </p>
        </div>

        {/* 5 Distinct Game Modes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left max-w-3xl mx-auto pt-2">
          
          {/* Mode 1: Classic Story Shift */}
          <div
            onClick={() => {
              playBellChime();
              onSelectMode('STORY');
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#E84A74] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">☕</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#E84A74] font-black text-[10px] border border-[#F8D7DF]">
                STORY MODE
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#E84A74] transition-colors">
              Story Shift Cafe
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              Talk to 12 customers, choose dialogue branches, bake croissants, and pet Mochi!
            </p>
          </div>

          {/* Mode 2: Rush Hour Speedrun */}
          <div
            onClick={() => {
              playBellChime();
              onSelectMode('RUSH_HOUR');
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#F43F5E] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⚡</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF1F5] text-[#F43F5E] font-black text-[10px] border border-[#FFC0D3]">
                90s SPEEDRUN
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#F43F5E] transition-colors">
              Rush Hour Frenzy
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              Serve fast-paced incoming tickets to build combo multipliers (x2, x3, x4)!
            </p>
          </div>

          {/* Mode 3: Barista Detective */}
          <div
            onClick={() => {
              playBellChime();
              onSelectMode('MYSTERY');
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#BE185D] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🕵️</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FDF2F4] text-[#BE185D] font-black text-[10px] border border-[#E8B8C5]">
                FLAVOR PUZZLE
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#BE185D] transition-colors">
              Barista Detective
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              Blind orders! Read mood riddles and balance flavor gauges to concoct the drink.
            </p>
          </div>

          {/* Mode 4: Zen Lounge */}
          <div
            onClick={() => {
              playBellChime();
              onSelectMode('ZEN');
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#EC4899] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🧘</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#EC4899] font-black text-[10px] border border-[#F8D7DF]">
                LO-FI CHILL
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#EC4899] transition-colors">
              Zen Lounge &amp; Radio
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              No timers or ratings. Relax with procedural Lo-Fi synth mixtapes and rain sounds.
            </p>
          </div>

          {/* Mode 5: Latte Art Masterclass */}
          <div
            onClick={() => {
              playClick();
              onOpenLatteArtStudio();
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#E84A74] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🎨</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#E84A74] font-black text-[10px] border border-[#F8D7DF]">
                MASTERCLASS
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#E84A74] transition-colors">
              Latte Art Studio
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              Draw foam art, try swan &amp; rosetta stencil challenges, and earn 3-star badges.
            </p>
          </div>

          {/* Feature 6: Cafe Boutique */}
          <div
            onClick={() => {
              playClick();
              onOpenShop();
            }}
            className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#F8D7DF] hover:border-[#D43862] hover:scale-[1.02] shadow-xs hover:shadow-pink-200/50 hover:shadow-lg transition-all cursor-pointer group shimmer-pink"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🛍️</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#D43862] font-black text-[10px] border border-[#F8D7DF]">
                SHOP UPGRADES
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#4A2E35] dark:text-white group-hover:text-[#D43862] transition-colors">
              Cafe Boutique
            </h3>
            <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] mt-1">
              Unlock glass tumblers, neon cat signs, fairy lights, and rare lavender syrups.
            </p>
          </div>

        </div>

        {/* Recipe Guide Shortcut */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              playClick();
              onOpenRecipeBook();
            }}
            className="bg-white/95 hover:bg-[#FFF0F3] border border-[#F8D7DF] text-[#4A2E35] font-bold text-xs py-2.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#E84A74]" />
            <span>Open Recipe Guidebook &amp; Flavor Encyclopedia</span>
          </button>
        </div>

      </div>
    </div>
  );
};
