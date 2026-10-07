import React, { useState, useEffect } from 'react';
import { PastryType, PastryItem } from '../types/game';
import { PASTRIES } from '../data/pastries';
import { playClick, playOvenDing } from '../utils/audio';
import { Flame, Sparkles, Check, RotateCcw, Clock } from 'lucide-react';

interface BakeryShowcaseProps {
  selectedPastry: PastryType | null;
  isPastryToasted: boolean;
  onSelectPastry: (pastry: PastryType) => void;
  onToastPastry: () => void;
  onRemovePastry: () => void;
  disabled?: boolean;
}

export const BakeryShowcase: React.FC<BakeryShowcaseProps> = ({
  selectedPastry,
  isPastryToasted,
  onSelectPastry,
  onToastPastry,
  onRemovePastry,
  disabled = false,
}) => {
  const [isWarming, setIsWarming] = useState(false);
  const [warmProgress, setWarmProgress] = useState(0);

  const activePastryInfo = PASTRIES.find((p) => p.id === selectedPastry);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isWarming) {
      interval = setInterval(() => {
        setWarmProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsWarming(false);
            playOvenDing();
            onToastPastry();
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isWarming]);

  const handleStartWarm = () => {
    if (disabled || !selectedPastry) return;
    playClick();
    setIsWarming(true);
    setWarmProgress(0);
  };

  return (
    <div className="bg-gradient-to-br from-[#FFF0F3]/95 via-[#FFF9FA]/90 to-[#FCE4EC]/90 dark:from-[#2A1220]/95 dark:to-[#1A0B14]/90 rounded-2xl p-3 sm:p-4 border-2 border-[#F8D7DF] dark:border-[#5C2344] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#F8D7DF] dark:border-[#5C2344]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥐</span>
          <div>
            <h4 className="font-serif font-black text-xs sm:text-sm text-[#E84A74] dark:text-[#F472B6]">
              Cozy Bakery Showcase
            </h4>
            <p className="text-[10px] text-[#9C6D79] dark:text-[#D4A5B8]">
              Pair a warm pastry with coffee for +$50 Combo Tip!
            </p>
          </div>
        </div>

        {selectedPastry && (
          <button
            onClick={() => { playClick(); onRemovePastry(); }}
            disabled={disabled}
            className="text-[10px] font-bold text-[#E84A74] hover:text-[#D43862] px-2.5 py-1 rounded-xl bg-white border border-[#F8D7DF] transition-all cursor-pointer shadow-2xs"
          >
            Clear Pastry
          </button>
        )}
      </div>

      {/* Pastry Selector Row */}
      <div className="grid grid-cols-5 gap-1.5 mb-2.5">
        {PASTRIES.map((pastry) => {
          const isSelected = selectedPastry === pastry.id;
          return (
            <button
              key={pastry.id}
              onClick={() => {
                if (disabled) return;
                playClick();
                onSelectPastry(pastry.id);
              }}
              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#FFF0F3] border-[#E84A74] ring-2 ring-[#E84A74]/40 shadow-xs scale-105'
                  : 'bg-white dark:bg-[#3B172C] border-[#F8D7DF] dark:border-[#5C2344] hover:border-[#E84A74]'
              }`}
            >
              <span className="text-2xl mb-1">{pastry.icon}</span>
              <span className="text-[9px] font-bold text-[#4A2E35] dark:text-[#FDE8EF] line-clamp-1">
                {pastry.name.split(' ')[0]}
              </span>
              <span className="text-[8px] text-[#E84A74] dark:text-[#F472B6] font-bold mt-0.5">
                +${pastry.price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toaster Oven Mini-Game Status Bar */}
      {selectedPastry && activePastryInfo && (
        <div className="p-2.5 rounded-xl bg-white/95 dark:bg-[#3B172C]/90 border border-[#F8D7DF] dark:border-[#5C2344] flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activePastryInfo.icon}</span>
            <div>
              <span className="font-bold text-xs text-[#4A2E35] dark:text-white">
                {activePastryInfo.name}
              </span>
              <span className={`block text-[10px] font-bold ${isPastryToasted ? 'text-rose-600 dark:text-rose-400' : 'text-[#E84A74]'}`}>
                {isPastryToasted ? '✨ Freshly Toasted & Crispy (Ready to Serve!)' : '❄️ Chilled (Needs Quick Warm)'}
              </span>
            </div>
          </div>

          {activePastryInfo.warmRequired && !isPastryToasted && (
            <button
              onClick={handleStartWarm}
              disabled={isWarming || disabled}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isWarming
                  ? 'bg-rose-400 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#E84A74] to-[#D43862] hover:from-[#D43862] hover:to-[#BE185D] text-white active:scale-95'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isWarming ? `Oven Warming (${warmProgress}%)` : 'Toast in Mini-Oven 🔥'}</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
