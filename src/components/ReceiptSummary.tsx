import React, { useEffect } from 'react';
import { DailyStats } from '../types/game';
import { playSuccessChime, playClick } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Coffee, 
  Heart, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface ReceiptSummaryProps {
  stats: DailyStats;
  onNextDay: () => void;
  onRestartGame: () => void;
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({
  stats,
  onNextDay,
  onRestartGame,
}) => {
  useEffect(() => {
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E84A74', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7'],
    });
  }, []);

  const totalShiftsEarnings = stats.totalEarnings + stats.totalTips;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md animate-fade-in">
      {/* Receipt Paper Card */}
      <div className="relative bg-[#FFFDF9] text-stone-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 flex flex-col font-mono text-sm overflow-hidden animate-scale-up">
        {/* Jagged / Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300"></div>

        {/* Receipt Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-stone-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
            <Coffee className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-black text-2xl tracking-wider text-stone-900">
            MIDNIGHT BREW
          </h2>
          <p className="text-xs text-stone-500 tracking-widest uppercase mt-0.5">
            Artisan Craft Barista Receipt
          </p>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 px-2">
            <span>SHIFT: DAY {stats.day}</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="py-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Customers Served:</span>
            <span className="font-bold text-stone-900">{stats.customersServed} guests</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Perfect Concoctions:</span>
            </span>
            <span className="font-bold text-emerald-600">
              {stats.perfectOrders} ({(stats.customersServed > 0 ? ((stats.perfectOrders / stats.customersServed) * 100).toFixed(0) : 0)}%)
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-600">Base Menu Revenue:</span>
            <span className="font-bold text-stone-900">${stats.totalEarnings}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-600 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Generous Tips Earned:</span>
            </span>
            <span className="font-bold text-rose-600">+${stats.totalTips}</span>
          </div>

          {/* Reputation Progress */}
          <div className="pt-2 border-t border-dashed border-stone-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-stone-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Cafe Reputation:</span>
              </span>
              <span className="font-bold text-indigo-600">{stats.reputation}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.max(0, stats.reputation))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total Grand Revenue */}
        <div className="pt-3 pb-4 border-t-2 border-dashed border-stone-300 flex justify-between items-baseline">
          <span className="font-bold text-stone-800 text-sm">TOTAL SHIFT REVENUE:</span>
          <span className="font-serif font-black text-2xl text-rose-600">
            ${totalShiftsEarnings}
          </span>
        </div>

        {/* Barcode / Cute stamp */}
        <div className="text-center py-2 bg-stone-100 rounded-xl mb-4 border border-stone-200/80">
          <p className="text-[10px] text-stone-400 tracking-[0.25em] uppercase font-mono">
            * THANK YOU FOR VISITING DEJA BREW *
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 font-sans">
          <button
            onClick={() => { playClick(); onRestartGame(); }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-bold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Day</span>
          </button>

          <button
            onClick={() => { playClick(); onNextDay(); }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 hover:shadow-lg transition-all active:scale-95"
          >
            <span>Next Shift (Day {stats.day + 1})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
