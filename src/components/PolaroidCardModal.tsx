import React, { useRef } from 'react';
import { Customer, CupState, Recipe, EvaluationResult } from '../types/game';
import { BASES, LIQUIDS, EXTRAS } from '../data/recipes';
import { playClick } from '../utils/audio';
import { X, Download, Camera, Heart, Sparkles, Share2 } from 'lucide-react';

interface PolaroidCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  cupState: CupState;
  targetRecipe?: Recipe;
  evaluationResult?: EvaluationResult | null;
}

export const PolaroidCardModal: React.FC<PolaroidCardModalProps> = ({
  isOpen,
  onClose,
  customer,
  cupState,
  targetRecipe,
  evaluationResult,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const baseInfo = BASES.find((b) => b.id === cupState.base);
  const liquidInfo = LIQUIDS.find((l) => l.id === cupState.liquid);

  const handleDownloadCard = () => {
    playClick();
    // Use canvas to capture snapshot or download placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Polaroid Card
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, 600, 750);
    ctx.strokeStyle = '#E8DCD4';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 580, 730);

    // Photo Box
    ctx.fillStyle = '#2B1704';
    ctx.fillRect(40, 40, 520, 460);

    // Title & Text
    ctx.fillStyle = '#3E2723';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(targetRecipe?.name || 'Artisan Midnight Brew', 45, 550);

    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillStyle = '#7A6767';
    ctx.fillText(`Brewed for ${customer.name} (${customer.role})`, 45, 585);

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#E84A74';
    ctx.fillText(`Score: ${evaluationResult?.score || 'PERFECT'} • Tip: +$${evaluationResult?.earnedTip || 30}`, 45, 620);

    ctx.fillStyle = '#A88C8C';
    ctx.font = '14px monospace';
    ctx.fillText(`☕ Midnight Brew Cafe • ${new Date().toLocaleDateString()}`, 45, 690);

    const link = document.createElement('a');
    link.download = `midnight-brew-${customer.name.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-[#F8D7DF] flex flex-col items-center">
        
        {/* Top Header */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#E84A74]" />
            <h3 className="font-serif font-black text-base text-[#2D2020] dark:text-white">
              Midnight Cafe Memory Polaroid
            </h3>
          </div>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Polaroid Physical Card Frame */}
        <div
          ref={cardRef}
          className="w-full bg-[#FFFDF9] border-2 border-stone-200 rounded-2xl p-4 shadow-xl text-stone-800 space-y-3"
        >
          {/* Photo Frame Container */}
          <div className="w-full h-56 bg-gradient-to-br from-[#2D1A16] to-[#150A08] rounded-xl relative overflow-hidden flex items-center justify-center border border-stone-300">
            {cupState.canvasData ? (
              <img src={cupState.canvasData} alt="Latte Art" className="w-36 h-36 rounded-full object-cover border-4 border-white/80 shadow-2xl animate-float" />
            ) : (
              <div className="text-center text-white">
                <span className="text-6xl drop-shadow-md">☕</span>
                <p className="text-xs font-bold text-amber-200 mt-2">{targetRecipe?.name || 'Fresh Brew'}</p>
              </div>
            )}

            {/* Customer Stamp Badge */}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#E84A74] border border-[#F8D7DF] shadow-xs flex items-center gap-1">
              <span>👤</span>
              <span>{customer.name}</span>
            </div>
          </div>

          {/* Handwritten Style Caption */}
          <div className="pt-2 text-left space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-black text-base text-stone-900">
                {targetRecipe?.name || 'Artisan Midnight Cup'}
              </h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {evaluationResult?.score || 'DELIGHTED'}
              </span>
            </div>

            <p className="font-serif italic text-xs text-stone-600 line-clamp-2">
              "{customer.feedbackDelighted || 'A warm midnight memory.'}"
            </p>

            <div className="flex items-center justify-between pt-2 text-[10px] text-stone-400 font-mono">
              <span>☕ Midnight Brew Station</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-2 mt-4">
          <button
            onClick={handleDownloadCard}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#E84A74] hover:bg-[#D43862] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Postcard PNG</span>
          </button>
        </div>

      </div>
    </div>
  );
};
