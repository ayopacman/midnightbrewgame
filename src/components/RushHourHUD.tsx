import React from 'react';
import { RushStats } from '../types/game';
import { Zap, Timer, Flame, Award } from 'lucide-react';

interface RushHourHUDProps {
  rushStats: RushStats;
  onEndRushEarly?: () => void;
}

export const RushHourHUD: React.FC<RushHourHUDProps> = ({ rushStats }) => {
  const isTimeCritical = rushStats.timeLeft <= 15;

  return (
    <div className="w-full bg-gradient-to-r from-[#E84A74] via-[#F43F5E] to-[#BE185D] p-3 sm:p-4 rounded-3xl text-white shadow-lg mb-4 animate-in fade-in slide-in-from-top-4 border-2 border-pink-200/40">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Rush Mode Banner */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner animate-pulse">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base tracking-wide uppercase text-white">
                Rush Hour Speedrun
              </h3>
              <span className="px-2 py-0.5 bg-white text-[#E84A74] font-black text-[10px] rounded-full uppercase shadow-xs">
                Fast Orders!
              </span>
            </div>
            <p className="text-[11px] text-pink-100 font-medium">
              Serve tickets fast to build massive combo multipliers!
            </p>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 backdrop-blur-md transition-all ${
          isTimeCritical
            ? 'bg-rose-950/80 border-white text-white animate-bounce'
            : 'bg-black/25 border-white/40 text-white'
        }`}>
          <Timer className={`w-5 h-5 ${isTimeCritical ? 'animate-spin' : ''}`} />
          <span className="font-mono font-black text-xl sm:text-2xl">
            {Math.floor(rushStats.timeLeft / 60)}:{(rushStats.timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Right: Score, Combo Multiplier & Served Count */}
        <div className="flex items-center gap-2.5">
          {/* Combo Multiplier */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/25 border border-white/30 backdrop-blur-md">
            <Flame className="w-4 h-4 text-pink-200 animate-bounce" />
            <div className="text-left">
              <span className="block text-[9px] uppercase font-bold text-pink-100">Combo</span>
              <span className="font-black text-sm text-white">
                x{rushStats.multiplier.toFixed(1)} ({rushStats.combo} streak)
              </span>
            </div>
          </div>

          {/* Rush Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 border border-white/20">
            <Award className="w-4 h-4 text-pink-200" />
            <div className="text-left">
              <span className="block text-[9px] uppercase font-bold text-pink-100">Score</span>
              <span className="font-black text-sm text-white">
                {rushStats.score} pts
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-right text-xs">
            <span className="block text-pink-100 font-semibold">Served</span>
            <span className="font-bold text-sm text-white">{rushStats.servedCount} Cups</span>
          </div>

        </div>

      </div>
    </div>
  );
};
