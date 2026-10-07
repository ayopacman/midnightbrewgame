import React, { useState, useEffect, useRef } from 'react';
import { BaseType, LiquidType, ExtraType, CupState, TemperatureType } from '../types/game';
import { BASES, LIQUIDS, EXTRAS } from '../data/recipes';
import { 
  playClick, 
  playEspressoExtract, 
  playMilkPour, 
  playSteamHiss, 
  playSpiceShake,
  playGrinderCrunch
} from '../utils/audio';
import { 
  Flame, 
  Snowflake, 
  Plus, 
  Check, 
  Sparkles, 
  Coffee, 
  Droplet, 
  RotateCcw,
  Send,
  Gauge,
  Thermometer
} from 'lucide-react';

interface IngredientRackProps {
  cupState: CupState;
  onSetBase: (base: BaseType, extractionQuality?: 'PERFECT' | 'GOOD' | 'NORMAL') => void;
  onSetLiquid: (liquid: LiquidType, steamQuality?: 'PERFECT' | 'GOOD' | 'NORMAL') => void;
  onToggleTemperature: (temp: TemperatureType) => void;
  onToggleExtra: (extra: ExtraType) => void;
  onResetCup: () => void;
  onOpenLatteArt: () => void;
  onServe: () => void;
  disabled?: boolean;
  unlockedSyrups?: string[];
}

type TabType = 'base' | 'liquid' | 'extras';

export const IngredientRack: React.FC<IngredientRackProps> = ({
  cupState,
  onSetBase,
  onSetLiquid,
  onToggleTemperature,
  onToggleExtra,
  onResetCup,
  onOpenLatteArt,
  onServe,
  disabled = false,
  unlockedSyrups = [],
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('base');

  // Mini-game states
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractProgress, setExtractProgress] = useState<number>(0);
  const [selectedPendingBase, setSelectedPendingBase] = useState<BaseType | null>(null);

  const [isSteaming, setIsSteaming] = useState<boolean>(false);
  const [steamingTemp, setSteamingTemp] = useState<number>(20);
  const [selectedPendingLiquid, setSelectedPendingLiquid] = useState<LiquidType | null>(null);
  const steamingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Extraction Slider Loop
  useEffect(() => {
    let animFrame: number;
    let direction = 1;
    if (isExtracting) {
      const step = () => {
        setExtractProgress((prev) => {
          let next = prev + direction * 2.8;
          if (next >= 100) {
            next = 100;
            direction = -1;
          } else if (next <= 0) {
            next = 0;
            direction = 1;
          }
          return next;
        });
        animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isExtracting]);

  const handleBaseClick = (baseId: BaseType) => {
    if (disabled) return;
    if (baseId === 'espresso' || baseId === 'double_espresso') {
      playGrinderCrunch();
      setSelectedPendingBase(baseId);
      setIsExtracting(true);
      setExtractProgress(10);
    } else {
      playEspressoExtract();
      onSetBase(baseId, 'NORMAL');
    }
  };

  const handleStopExtraction = () => {
    if (!selectedPendingBase) return;
    playEspressoExtract();
    setIsExtracting(false);
    let quality: 'PERFECT' | 'GOOD' | 'NORMAL' = 'NORMAL';
    if (extractProgress >= 65 && extractProgress <= 82) {
      quality = 'PERFECT';
    } else if (extractProgress >= 45 && extractProgress <= 92) {
      quality = 'GOOD';
    }
    onSetBase(selectedPendingBase, quality);
    setSelectedPendingBase(null);
  };

  const handleStartSteaming = (liquidId: LiquidType) => {
    if (disabled) return;
    setSelectedPendingLiquid(liquidId);
    setIsSteaming(true);
    setSteamingTemp(25);
    playSteamHiss();

    steamingIntervalRef.current = setInterval(() => {
      setSteamingTemp((prev) => {
        if (prev >= 95) {
          if (steamingIntervalRef.current) clearInterval(steamingIntervalRef.current);
          return 95;
        }
        return prev + 2;
      });
    }, 45);
  };

  const handleReleaseSteaming = () => {
    if (steamingIntervalRef.current) {
      clearInterval(steamingIntervalRef.current);
      steamingIntervalRef.current = null;
    }
    setIsSteaming(false);
    if (!selectedPendingLiquid) return;

    let quality: 'PERFECT' | 'GOOD' | 'NORMAL' = 'NORMAL';
    if (steamingTemp >= 60 && steamingTemp <= 72) {
      quality = 'PERFECT';
    } else if (steamingTemp >= 50 && steamingTemp <= 85) {
      quality = 'GOOD';
    }
    onSetLiquid(selectedPendingLiquid, quality);
    setSelectedPendingLiquid(null);
  };

  const handleLiquidClick = (liquidId: LiquidType) => {
    if (disabled) return;
    if (cupState.temperature === 'HOT' && (liquidId === 'steamed_milk' || liquidId === 'oat_milk')) {
      handleStartSteaming(liquidId);
    } else {
      playMilkPour();
      onSetLiquid(liquidId, 'NORMAL');
    }
  };

  const handleExtraClick = (extraId: ExtraType) => {
    if (disabled) return;
    playSpiceShake();
    onToggleExtra(extraId);
  };

  const handleTempToggle = (temp: TemperatureType) => {
    if (disabled) return;
    playClick();
    onToggleTemperature(temp);
  };

  const canServe = cupState.base !== null;

  return (
    <div className="bg-white/95 dark:bg-[#2A1220]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-[#F8D7DF] dark:border-[#5C2344] shadow-md flex flex-col justify-between h-full">
      
      {/* Top Bar: Category Tabs & Temperature Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F8D7DF] dark:border-[#5C2344]">
        <div className="flex items-center gap-1.5 p-1 bg-[#FFF0F3] dark:bg-[#3B172C] rounded-xl border border-[#F8D7DF]/60">
          <button
            onClick={() => { playClick(); setActiveTab('base'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'base'
                ? 'bg-[#E84A74] text-white shadow-sm'
                : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:text-[#E84A74] hover:bg-white/60'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>1. Bases</span>
            {cupState.base && <span className="w-2 h-2 rounded-full bg-white ml-0.5 animate-pulse"></span>}
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('liquid'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'liquid'
                ? 'bg-[#E84A74] text-white shadow-sm'
                : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:text-[#E84A74] hover:bg-white/60'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>2. Liquids</span>
            {cupState.liquid && <span className="w-2 h-2 rounded-full bg-white ml-0.5 animate-pulse"></span>}
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('extras'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'extras'
                ? 'bg-[#E84A74] text-white shadow-sm'
                : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:text-[#E84A74] hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Extras</span>
            {cupState.addIns.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-[#E84A74] rounded-full text-[10px] font-black">
                {cupState.addIns.length}
              </span>
            )}
          </button>
        </div>

        {/* Temperature Pill Selector */}
        <div className="flex items-center bg-[#FFF0F3] dark:bg-[#3B172C] p-1 rounded-xl border border-[#F8D7DF] dark:border-[#5C2344]">
          <button
            onClick={() => handleTempToggle('HOT')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              cupState.temperature === 'HOT'
                ? 'bg-[#E84A74] text-white shadow-xs'
                : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:text-[#E84A74]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>HOT</span>
          </button>

          <button
            onClick={() => handleTempToggle('ICED')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              cupState.temperature === 'ICED'
                ? 'bg-[#F472B6] text-white shadow-xs'
                : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:text-[#F472B6]'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>ICED</span>
          </button>
        </div>
      </div>

      {/* Mini-Game: Espresso Extraction Pressure Timing Bar */}
      {isExtracting && (
        <div className="my-3 p-3 bg-gradient-to-r from-[#2A1220] via-[#3B172C] to-[#1A0B14] text-white rounded-2xl border border-pink-400/50 shadow-md animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between text-xs font-bold text-pink-300 mb-1.5">
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4 text-pink-400" />
              <span>Espresso Extraction Timing (Lock in Golden Crema!)</span>
            </span>
            <span>{Math.round(extractProgress)}%</span>
          </div>

          <div className="relative w-full h-5 bg-black/40 rounded-full overflow-hidden border border-[#5C2344] my-1">
            <div className="absolute top-0 bottom-0 left-[65%] right-[18%] bg-pink-400/80 z-10 flex items-center justify-center text-[9px] font-black text-stone-900">
              GOLDEN CREMA
            </div>
            <div
              className="h-full bg-gradient-to-r from-[#F472B6] to-[#E84A74] transition-all duration-75"
              style={{ width: `${extractProgress}%` }}
            ></div>
          </div>

          <button
            onClick={handleStopExtraction}
            className="w-full mt-2 py-2 bg-[#E84A74] hover:bg-[#D43862] text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            ☕ PULL ESPRESSO SHOT NOW!
          </button>
        </div>
      )}

      {/* Mini-Game: Steaming Wand Thermometer */}
      {isSteaming && (
        <div className="my-3 p-3 bg-gradient-to-r from-[#2A1220] via-[#3B172C] to-[#1A0B14] text-white rounded-2xl border border-pink-400/50 shadow-md animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between text-xs font-bold text-pink-300 mb-1.5">
            <span className="flex items-center gap-1">
              <Thermometer className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Milk Steaming Wand (Target: 65°C Silky Microfoam)</span>
            </span>
            <span className="text-sm font-black text-pink-300">{steamingTemp}°C</span>
          </div>

          <div className="relative w-full h-5 bg-black/40 rounded-full overflow-hidden border border-[#5C2344] my-1">
            <div className="absolute top-0 bottom-0 left-[60%] right-[28%] bg-pink-300 z-10 flex items-center justify-center text-[9px] font-black text-stone-900">
              PERFECT 65°C
            </div>
            <div
              className="h-full transition-all duration-75 bg-gradient-to-r from-pink-400 to-rose-500"
              style={{ width: `${(steamingTemp / 95) * 100}%` }}
            ></div>
          </div>

          <button
            onClick={handleReleaseSteaming}
            className="w-full mt-2 py-2 bg-[#E84A74] hover:bg-[#D43862] text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            🥛 STOP STEAMING WAND!
          </button>
        </div>
      )}

      {/* Main Ingredient Content Grid */}
      <div className="py-3.5 flex-1">
        {activeTab === 'base' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BASES.map((base) => {
              const isSelected = cupState.base === base.id;
              return (
                <button
                  key={base.id}
                  onClick={() => handleBaseClick(base.id)}
                  disabled={disabled}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#E84A74] bg-[#FFF0F3] dark:bg-[#3B172C] ring-2 ring-[#E84A74]/40 shadow-xs'
                      : 'border-[#F8D7DF] dark:border-[#5C2344] bg-white dark:bg-[#2A1220] hover:border-[#E84A74]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{base.icon}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#E84A74] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#4A2E35] dark:text-white">{base.name}</h4>
                    <p className="text-[10px] text-[#9C6D79] dark:text-[#D4A5B8] line-clamp-1 mt-0.5">{base.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'liquid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LIQUIDS.map((liquid) => {
              const isSelected = cupState.liquid === liquid.id;
              return (
                <button
                  key={liquid.id}
                  onClick={() => handleLiquidClick(liquid.id)}
                  disabled={disabled}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#E84A74] bg-[#FFF0F3] dark:bg-[#3B172C] ring-2 ring-[#E84A74]/40 shadow-xs'
                      : 'border-[#F8D7DF] dark:border-[#5C2344] bg-white dark:bg-[#2A1220] hover:border-[#E84A74]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{liquid.icon}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#E84A74] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#4A2E35] dark:text-white">{liquid.name}</h4>
                    <p className="text-[10px] text-[#9C6D79] dark:text-[#D4A5B8] line-clamp-1 mt-0.5">{liquid.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'extras' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {EXTRAS.map((extra) => {
              const isSelected = cupState.addIns.includes(extra.id);
              return (
                <button
                  key={extra.id}
                  onClick={() => handleExtraClick(extra.id)}
                  disabled={disabled}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#E84A74] bg-[#FFF0F3] dark:bg-[#3B172C] ring-2 ring-[#E84A74]/40 shadow-xs'
                      : 'border-[#F8D7DF] dark:border-[#5C2344] bg-white dark:bg-[#2A1220] hover:border-[#E84A74]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{extra.icon}</span>
                    {isSelected ? (
                      <span className="w-4 h-4 rounded-full bg-[#E84A74] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-[#FFF0F3] text-[#E84A74] flex items-center justify-center text-[10px]">
                        <Plus className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#4A2E35] dark:text-white">{extra.name}</h4>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3 border-t border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-between gap-3">
        <button
          onClick={() => { playClick(); onResetCup(); }}
          disabled={disabled || (!cupState.base && !cupState.liquid && cupState.addIns.length === 0)}
          className="px-3.5 py-2 rounded-xl border border-[#F8D7DF] dark:border-[#5C2344] text-[#9C6D79] dark:text-[#D4A5B8] hover:bg-[#FFF0F3] dark:hover:bg-[#3B172C] text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Cup</span>
        </button>

        <button
          onClick={onServe}
          disabled={disabled || !canServe}
          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
            canServe && !disabled
              ? 'bg-gradient-to-r from-[#E84A74] to-[#D43862] hover:from-[#D43862] hover:to-[#BE185D] text-white shadow-[#E84A74]/25 hover:scale-105 active:scale-95'
              : 'bg-pink-100 text-pink-300 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed opacity-60'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Serve to Customer ☕</span>
        </button>
      </div>

    </div>
  );
};
