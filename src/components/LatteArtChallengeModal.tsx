import React, { useRef, useState, useEffect } from 'react';
import { LatteChallenge, BaseType } from '../types/game';
import { LATTE_CHALLENGES } from '../data/latteChallenges';
import { playClick, playLatteDab, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  X, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Brush, 
  Star, 
  Eye, 
  Award, 
  ChevronRight,
  Palette
} from 'lucide-react';

interface LatteArtChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteChallenge?: (challengeId: string, stars: number) => void;
}

export const LatteArtChallengeModal: React.FC<LatteArtChallengeModalProps> = ({
  isOpen,
  onClose,
  onCompleteChallenge,
}) => {
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState<number>(0);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [brushColor, setBrushColor] = useState<string>('#FFFDF5');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [gradedScore, setGradedScore] = useState<{ stars: number; feedback: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentChallenge: LatteChallenge = LATTE_CHALLENGES[selectedChallengeIndex];

  // Initialize Crema Canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.clip();

    // Crema gradient
    const grad = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size / 2);
    grad.addColorStop(0, '#BCAAA4');
    grad.addColorStop(0.3, '#8D6E63');
    grad.addColorStop(0.8, '#4E342E');
    grad.addColorStop(1, '#2E1C14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle crema swirl
    ctx.fillStyle = 'rgba(255, 235, 205, 0.15)';
    ctx.beginPath();
    ctx.arc(size / 2 + 15, size / 2 - 15, size / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    setGradedScore(null);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(initCanvas, 50);
    }
  }, [isOpen, selectedChallengeIndex]);

  if (!isOpen) return null;

  // Drawing Handlers
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    playLatteDab();

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 4, 0, Math.PI * 2);
    ctx.clip();

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleEndDraw = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.restore();
    }
    setIsDrawing(false);
  };

  // Stamp template onto canvas
  const handleStampTemplate = (type: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    playSuccessChime();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, canvas.width / 2 - 4, 0, Math.PI * 2);
    ctx.clip();

    if (type === 'heart') {
      ctx.fillStyle = '#FFFDF5';
      ctx.beginPath();
      ctx.arc(cx - 25, cy - 20, 30, 0, Math.PI * 2);
      ctx.arc(cx + 25, cy - 20, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy - 10);
      ctx.lineTo(cx, cy + 50);
      ctx.lineTo(cx + 50, cy - 10);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'cat_paw') {
      ctx.fillStyle = '#FFFDF5';
      ctx.beginPath();
      ctx.arc(cx, cy + 15, 36, 0, Math.PI * 2);
      ctx.fill();
      // Toes
      ctx.fillStyle = '#3E2723';
      ctx.beginPath(); ctx.arc(cx - 35, cy - 25, 14, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - 12, cy - 45, 14, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 12, cy - 45, 14, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 35, cy - 25, 14, 0, Math.PI * 2); ctx.fill();
    } else {
      // Rosetta or crescent
      ctx.fillStyle = '#FFFDF5';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 25, 60, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // Grade drawing
  const handleGradeDrawing = () => {
    playSuccessChime();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    const stars = 3;
    setGradedScore({
      stars,
      feedback: 'Incredible symmetry, velvety microfoam contrast, and masterful execution! 🌟',
    });
    onCompleteChallenge?.(currentChallenge.id, stars);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-[#F8D7DF] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F8D7DF] flex items-center justify-between bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFF0F3]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E84A74] text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg sm:text-xl text-[#2D2020] dark:text-white">
                Latte Art Masterclass &amp; Grading
              </h2>
              <p className="text-xs text-[#7A6767] dark:text-stone-300 font-medium">
                Recreate iconic barista patterns &amp; earn master star certifications!
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Level Challenge Selector Carousel */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-100 dark:border-stone-700 flex items-center gap-2 overflow-x-auto">
          {LATTE_CHALLENGES.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                playClick();
                setSelectedChallengeIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedChallengeIndex === idx
                  ? 'bg-[#E84A74] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-[#FFF0F3]'
              }`}
            >
              <span>{ch.icon}</span>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>

        {/* Main Studio Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Left Canvas (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-[#FDE8ED] shadow-2xl overflow-hidden bg-stone-900 cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                onMouseDown={handleStartDraw}
                onMouseMove={handleDraw}
                onMouseUp={handleEndDraw}
                onMouseLeave={handleEndDraw}
                onTouchStart={handleStartDraw}
                onTouchMove={handleDraw}
                onTouchEnd={handleEndDraw}
                className="w-full h-full object-cover"
              />

              {/* Reference Stencil Overlay */}
              {showOverlay && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 border-4 border-dashed border-white rounded-full">
                  <span className="text-8xl">{currentChallenge.icon}</span>
                </div>
              )}
            </div>

            {/* Quick Canvas Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => { playClick(); initCanvas(); }}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Crema</span>
              </button>

              <button
                onClick={() => setShowOverlay(!showOverlay)}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold text-[#E84A74] bg-[#FFF0F3] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showOverlay ? 'Hide Guide' : 'Show Guide'}</span>
              </button>

              <button
                onClick={() => handleStampTemplate(currentChallenge.targetTemplate)}
                className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Auto-Stencil</span>
              </button>
            </div>
          </div>

          {/* Right Palette & Grading Info (6 cols) */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif font-black text-base text-stone-900 dark:text-white flex items-center gap-1.5">
                  <span>{currentChallenge.icon}</span>
                  <span>{currentChallenge.title}</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                  {currentChallenge.difficulty}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {currentChallenge.description}
              </p>
            </div>

            {/* Color Palette */}
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                Foam Ink &amp; Drizzles:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Microfoam', color: '#FFFDF5' },
                  { name: 'Caramel', color: '#D4AC0D' },
                  { name: 'Choco', color: '#3E2723' },
                  { name: 'Matcha', color: '#558B2F' },
                  { name: 'Berry', color: '#EC407A' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { playClick(); setBrushColor(c.color); }}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                      brushColor === c.color ? 'ring-2 ring-[#E84A74] scale-110' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Needle Size:</span>
              <input
                type="range"
                min="6"
                max="26"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-32 accent-[#E84A74]"
              />
              <span className="text-xs font-mono font-bold">{brushSize}px</span>
            </div>

            {/* Grade Result Box */}
            {gradedScore && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {Array.from({ length: gradedScore.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="font-black text-xs text-emerald-800 ml-1">MASTER BARISTA!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">{gradedScore.feedback}</p>
              </div>
            )}

            {/* Grade Button */}
            <button
              onClick={handleGradeDrawing}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E84A74] to-pink-600 hover:from-[#D43862] hover:to-pink-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Submit for Barista Grading ⭐⭐⭐</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
