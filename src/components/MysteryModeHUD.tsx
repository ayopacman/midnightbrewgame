import React from 'react';
import { Customer, CupState, Recipe } from '../types/game';
import { BookOpen, Droplet, Flame, Candy, Coffee } from 'lucide-react';

interface MysteryModeHUDProps {
  customer: Customer;
  cupState: CupState;
  onOpenRecipeBook: () => void;
}

export const MysteryModeHUD: React.FC<MysteryModeHUDProps> = ({
  customer,
  cupState,
  onOpenRecipeBook,
}) => {
  const computeCurrentFlavor = () => {
    let sweetness = 0;
    let bitterness = 0;
    let warmth = cupState.temperature === 'HOT' ? 80 : 15;
    let creaminess = 0;

    if (cupState.base === 'espresso') {
      bitterness += 40;
    } else if (cupState.base === 'double_espresso') {
      bitterness += 80;
    } else if (cupState.base === 'matcha') {
      bitterness += 25;
      sweetness += 10;
    } else if (cupState.base === 'black_tea') {
      bitterness += 20;
    } else if (cupState.base === 'cold_brew') {
      bitterness += 45;
    }

    if (cupState.liquid === 'steamed_milk' || cupState.liquid === 'oat_milk') {
      creaminess += 60;
      sweetness += 20;
    } else if (cupState.liquid === 'lavender_foam') {
      creaminess += 50;
      sweetness += 35;
    } else if (cupState.liquid === 'cold_milk') {
      creaminess += 50;
    }

    if (cupState.addIns.includes('vanilla_syrup')) sweetness += 30;
    if (cupState.addIns.includes('caramel_drizzle')) sweetness += 35;
    if (cupState.addIns.includes('honey_drizzle')) sweetness += 35;
    if (cupState.addIns.includes('lavender_syrup')) sweetness += 25;
    if (cupState.addIns.includes('cocoa_powder')) { sweetness += 15; bitterness += 20; }
    if (cupState.addIns.includes('whipped_cream')) { creaminess += 30; sweetness += 15; }

    return {
      sweetness: Math.min(100, sweetness),
      bitterness: Math.min(100, bitterness),
      warmth: Math.min(100, warmth),
      creaminess: Math.min(100, creaminess),
    };
  };

  const currentFlavor = computeCurrentFlavor();

  return (
    <div className="w-full bg-gradient-to-br from-[#2A1220] via-[#3B172C] to-[#1A0B14] border-2 border-[#5C2344] p-4 rounded-3xl text-white shadow-xl mb-4 animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#5C2344]/80">
        
        {/* Left: Mystery Detective Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-xl shadow-inner">
            🕵️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-black text-sm sm:text-base text-rose-200">
                Barista Detective Mode
              </h3>
              <span className="px-2 py-0.5 bg-[#E84A74] text-white font-bold text-[10px] rounded-full uppercase">
                Blind Tasting
              </span>
            </div>
            <p className="text-[11px] text-pink-200/80 font-medium">
              Read the customer's mood &amp; memories to deduce their desired flavor profile!
            </p>
          </div>
        </div>

        {/* Right: Recipe Book Helper */}
        <button
          onClick={onOpenRecipeBook}
          className="px-3.5 py-1.5 rounded-xl bg-[#E84A74]/80 hover:bg-[#E84A74] border border-pink-400 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer text-white"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Consult Flavor Notes</span>
        </button>

      </div>

      {/* Flavor Profile Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        
        {/* Sweetness */}
        <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-bold text-pink-300 mb-1">
            <span className="flex items-center gap-1"><Candy className="w-3 h-3" /> Sweetness</span>
            <span>{currentFlavor.sweetness}%</span>
          </div>
          <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
            <div className="h-full bg-pink-400 transition-all duration-300" style={{ width: `${currentFlavor.sweetness}%` }}></div>
          </div>
        </div>

        {/* Bitterness / Roasty */}
        <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-300 mb-1">
            <span className="flex items-center gap-1"><Coffee className="w-3 h-3" /> Bitterness</span>
            <span>{currentFlavor.bitterness}%</span>
          </div>
          <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${currentFlavor.bitterness}%` }}></div>
          </div>
        </div>

        {/* Warmth */}
        <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-bold text-pink-200 mb-1">
            <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> Warmth</span>
            <span>{currentFlavor.warmth}%</span>
          </div>
          <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${currentFlavor.warmth}%` }}></div>
          </div>
        </div>

        {/* Creaminess */}
        <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-200 mb-1">
            <span className="flex items-center gap-1"><Droplet className="w-3 h-3" /> Creaminess</span>
            <span>{currentFlavor.creaminess}%</span>
          </div>
          <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
            <div className="h-full bg-rose-300 transition-all duration-300" style={{ width: `${currentFlavor.creaminess}%` }}></div>
          </div>
        </div>

      </div>

    </div>
  );
};
