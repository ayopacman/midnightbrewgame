import React from 'react';
import { CupState, CupSkin, PastryType } from '../types/game';
import { BASES, LIQUIDS, EXTRAS } from '../data/recipes';
import { PASTRIES } from '../data/pastries';
import { Sparkles, Flame, Snowflake, Palette, RefreshCw } from 'lucide-react';

interface CupVisualizerProps {
  cupState: CupState;
  onOpenLatteArt: () => void;
  cupSkin?: CupSkin;
  onShakeIce?: () => void;
  activeDecor?: string[];
}

export const CupVisualizer: React.FC<CupVisualizerProps> = ({ 
  cupState, 
  onOpenLatteArt,
  cupSkin = 'classic_ceramic',
  onShakeIce,
  activeDecor = []
}) => {
  const getLiquidColor = () => {
    if (!cupState.base && !cupState.liquid) {
      return 'transparent';
    }
    if (cupState.base === 'matcha') {
      return cupState.liquid ? '#558B2F' : '#33691E';
    }
    if (cupState.base === 'black_tea') {
      return cupState.liquid ? '#A04000' : '#7B241C';
    }
    if (cupState.base === 'cold_brew') {
      return cupState.liquid ? '#2D1B13' : '#1A0F0A';
    }
    if (cupState.base === 'double_espresso') {
      return cupState.liquid ? '#4A2810' : '#2B1704';
    }
    return cupState.liquid ? '#6D4C41' : '#3E2723';
  };

  const hasContent = Boolean(cupState.base || cupState.liquid || cupState.addIns.length > 0);
  const baseInfo = BASES.find((b) => b.id === cupState.base);
  const liquidInfo = LIQUIDS.find((l) => l.id === cupState.liquid);
  const pastryInfo = PASTRIES.find((p) => p.id === cupState.selectedPastry);

  const getCupShellStyles = () => {
    switch (cupSkin) {
      case 'glass_tumbler':
        return 'bg-gradient-to-br from-white/40 via-white/10 to-cyan-100/20 border-4 border-cyan-200/60 backdrop-blur-xs rounded-b-[20px] shadow-2xl';
      case 'vintage_porcelain':
        return 'bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-4 border-amber-300 rounded-b-[44px] shadow-xl ring-2 ring-amber-400/40';
      case 'neon_takeaway':
        return 'bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950 border-4 border-cyan-400 rounded-b-[26px] shadow-[0_0_20px_rgba(6,182,212,0.4)] text-cyan-300';
      default:
        return 'bg-gradient-to-br from-white via-[#FFF9FA] to-[#FCE4EC] border-4 border-white shadow-xl rounded-b-[42px]';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-gradient-to-b from-white/90 via-[#FFF9FA] to-white/70 rounded-3xl border-2 border-[#F8D7DF] shadow-sm overflow-hidden w-full">
      
      {/* Background Decor: Fairy Lights */}
      {activeDecor.includes('decor_fairy_lights') && (
        <div className="absolute top-1 left-0 right-0 flex justify-around text-sm opacity-85 pointer-events-none animate-pulse">
          <span>✨</span><span>🌟</span><span>✨</span><span>🌟</span><span>✨</span>
        </div>
      )}

      {/* Background Decor: Glowing Neon Cat */}
      {activeDecor.includes('decor_neon_cat') && (
        <div className="absolute top-2 right-2 text-xs bg-pink-500/20 border border-pink-400/60 px-2.5 py-1 rounded-full text-pink-500 font-black shadow-[0_0_15px_rgba(236,72,153,0.6)] animate-pulse">
          🐱 Neon Cat Lounge
        </div>
      )}

      {/* Background Decor: Ceremonial Bonsai Tree */}
      {activeDecor.includes('decor_bonsai') && (
        <div className="absolute bottom-2 left-2 text-3xl opacity-80 pointer-events-none" title="Ceremonial Bonsai">
          🪴
        </div>
      )}

      {/* Temperature & Quality Badges */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-3 z-10 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${
            cupState.temperature === 'HOT' 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-cyan-50 text-cyan-700 border-cyan-200'
          }`}>
            {cupState.temperature === 'HOT' ? (
              <>
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Steaming Hot</span>
              </>
            ) : (
              <>
                <Snowflake className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
                <span>Iced &amp; Chilled</span>
              </>
            )}
          </span>

          {cupState.extractionQuality === 'PERFECT' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
              ⭐ Golden Crema
            </span>
          )}

          {cupState.steamQuality === 'PERFECT' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-pink-100 text-pink-900 border border-pink-300 px-2 py-0.5 rounded-full">
              🥛 Microfoam 65°C
            </span>
          )}
        </div>

        {cupState.hasLatteArt && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#FFF0F3] text-[#E84A74] border border-[#F8D7DF] px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
            <Palette className="w-3 h-3" />
            <span>Latte Art Painted</span>
          </span>
        )}
      </div>

      {/* 2D Cup Graphic Container */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-1 select-none">
        
        {/* Steam Effect */}
        {cupState.temperature === 'HOT' && hasContent && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-20">
            <div className="w-2 h-8 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-full blur-[2px] animate-steam"></div>
            <div className="w-2.5 h-10 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-full blur-[2px] animate-steam-delayed"></div>
            <div className="w-2 h-7 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-full blur-[2px] animate-steam"></div>
          </div>
        )}

        {/* Cup Saucer Base & Paired Pastry */}
        <div className="absolute bottom-2 w-48 sm:w-56 h-7 bg-gradient-to-b from-[#FDE8ED] via-[#F8D7DF] to-[#E5C1CA] rounded-[100%] shadow-md border-2 border-white flex items-center justify-start pl-2">
          {pastryInfo && (
            <div className="relative -top-2 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full border border-amber-300 shadow-sm animate-bounce">
              <span className="text-xl">{pastryInfo.icon}</span>
              <span className="text-[9px] font-bold text-amber-900">{pastryInfo.name.split(' ')[0]}</span>
            </div>
          )}
        </div>

        {/* Cup Outer Shell */}
        <div className={`relative w-36 sm:w-40 h-36 sm:h-40 ${getCupShellStyles()} flex flex-col items-center justify-end overflow-hidden z-10`}>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none z-20"></div>

          {/* Liquid Container */}
          <div 
            className="relative w-full transition-all duration-700 ease-out flex flex-col justify-end overflow-hidden rounded-b-[34px]"
            style={{
              height: hasContent ? (cupState.liquid ? '85%' : '45%') : '0%',
              backgroundColor: getLiquidColor(),
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-3 bg-white/20 rounded-[100%] blur-[1px]"></div>

            {/* Ice Cubes */}
            {cupState.temperature === 'ICED' && hasContent && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none z-15">
                <div className="w-6 h-6 bg-white/50 border border-white/70 rounded-lg transform rotate-12 backdrop-blur-xs shadow-inner animate-float"></div>
                <div className="w-5 h-5 bg-white/50 border border-white/70 rounded-lg transform -rotate-12 backdrop-blur-xs shadow-inner animate-float" style={{ animationDelay: '0.8s' }}></div>
              </div>
            )}

            {/* Lavender Cold Foam or Steamed Milk Layer */}
            {cupState.liquid === 'lavender_foam' ? (
              <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-[#E9D5FF]/90 to-transparent rounded-t-[100%] pointer-events-none"></div>
            ) : cupState.liquid && cupState.liquid !== 'hot_water' ? (
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#FFFDF9]/90 to-transparent rounded-t-[100%] pointer-events-none"></div>
            ) : null}

            {/* Whipped Cream */}
            {cupState.addIns.includes('whipped_cream') && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-11 bg-white rounded-full border-2 border-[#FFF0F3] shadow-md flex items-center justify-center text-lg z-25">
                <span>🧁</span>
              </div>
            )}

            {/* Syrups & Powders */}
            {cupState.addIns.includes('caramel_drizzle') && (
              <div className="absolute top-1 left-3 right-3 h-4 border-b-2 border-t-2 border-dashed border-[#D4AC0D] transform rotate-3 z-20 pointer-events-none opacity-90"></div>
            )}
            {cupState.addIns.includes('honey_drizzle') && (
              <div className="absolute top-1 left-3 right-3 h-4 border-b-2 border-[#F59E0B] transform -rotate-2 z-20 pointer-events-none opacity-90"></div>
            )}

            {(cupState.addIns.includes('cinnamon_powder') || cupState.addIns.includes('cocoa_powder') || cupState.addIns.includes('chocolate_chips')) && (
              <div className="absolute top-0 left-0 right-0 h-4 flex items-center justify-center gap-1.5 z-20 opacity-85">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA4A00]"></span>
                <span className="w-1 h-1 rounded-full bg-[#5C3822]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA4A00]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E2723]"></span>
              </div>
            )}

            {/* Latte Art Preview */}
            {cupState.canvasData && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-22 h-22 rounded-full overflow-hidden border border-white/50 shadow-inner z-20 opacity-90 pointer-events-none">
                <img src={cupState.canvasData} alt="Latte Art Preview" className="w-full h-full object-cover" />
              </div>
            )}

          </div>

          {!hasContent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10">
              <span className="text-xl text-[#A88C8C] mb-0.5">🫗</span>
              <p className="text-[10px] font-bold text-[#A88C8C]">Empty Cup</p>
              <p className="text-[8px] text-[#C4ACAC]">Select base below</p>
            </div>
          )}

          <div className="absolute top-2 left-3 w-2.5 h-24 bg-gradient-to-b from-white/80 to-transparent rounded-full transform -rotate-6 pointer-events-none z-30"></div>
        </div>

        {/* Cup Handle */}
        {cupSkin !== 'glass_tumbler' && cupSkin !== 'neon_takeaway' && (
          <div className="absolute right-4 sm:right-6 top-12 sm:top-14 w-12 sm:w-14 h-18 sm:h-20 border-[5px] border-white rounded-r-3xl shadow-md z-0 bg-transparent"></div>
        )}

      </div>

      {/* Action Buttons: Latte Art & Ice Shaker */}
      <div className="w-full space-y-2 mt-1">
        <div className="flex items-center gap-2">
          {hasContent && (
            <button
              onClick={onOpenLatteArt}
              className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFF0F3] border border-[#F8D7DF] hover:border-[#E84A74] text-[#E84A74] font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{cupState.hasLatteArt ? 'Edit Foam Art 🎨' : 'Paint Foam Art 🎨'}</span>
            </button>
          )}

          {cupState.temperature === 'ICED' && hasContent && onShakeIce && (
            <button
              onClick={onShakeIce}
              className="py-1.5 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 font-bold text-xs flex items-center justify-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Shake iced drink with ice rattling effect"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
              <span>Shake Ice 🧊</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
