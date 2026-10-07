import React, { useRef, useState, useEffect } from 'react';
import { BaseType } from '../types/game';
import { playClick, playLatteDab } from '../utils/audio';
import { 
  X, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Brush, 
  Stamp, 
  Heart, 
  Feather, 
  Smile, 
  Flame,
  Undo2
} from 'lucide-react';

interface LatteArtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveArt: (canvasDataUrl: string) => void;
  baseType: BaseType | null;
}

interface BrushColor {
  id: string;
  name: string;
  color: string;
  bgHex: string;
}

const BRUSH_COLORS: BrushColor[] = [
  { id: 'white', name: 'Steamed Microfoam', color: '#FFFDF5', bgHex: '#FFFDF5' },
  { id: 'cream', name: 'Vanilla Cream', color: '#FFF3B0', bgHex: '#FFF3B0' },
  { id: 'caramel', name: 'Caramel Drizzle', color: '#D4AC0D', bgHex: '#D4AC0D' },
  { id: 'chocolate', name: 'Choco Sauce', color: '#3E2723', bgHex: '#3E2723' },
  { id: 'matcha', name: 'Matcha Dust', color: '#558B2F', bgHex: '#558B2F' },
  { id: 'rose', name: 'Berry Foam', color: '#EC407A', bgHex: '#EC407A' },
];

export const LatteArtModal: React.FC<LatteArtModalProps> = ({
  isOpen,
  onClose,
  onSaveArt,
  baseType,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>('#FFFDF5');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [activeTab, setActiveTab] = useState<'brush' | 'stamps'>('brush');

  // Background Crema Base Color based on coffee base
  const getCremaGradient = (ctx: CanvasRenderingContext2D, size: number) => {
    const cx = size / 2;
    const cy = size / 2;
    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, size / 2);
    if (baseType === 'matcha') {
      grad.addColorStop(0, '#558B2F');
      grad.addColorStop(0.7, '#33691E');
      grad.addColorStop(1, '#1B5E20');
    } else if (baseType === 'black_tea') {
      grad.addColorStop(0, '#A04000');
      grad.addColorStop(0.7, '#78281F');
      grad.addColorStop(1, '#4A148C');
    } else {
      // Espresso Crema
      grad.addColorStop(0, '#BCAAA4');
      grad.addColorStop(0.2, '#8D6E63');
      grad.addColorStop(0.8, '#4E342E');
      grad.addColorStop(1, '#2E1C14');
    }
    return grad;
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    // Save state for circular clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.clip();

    // Fill crema
    ctx.fillStyle = getCremaGradient(ctx, size);
    ctx.fillRect(0, 0, size, size);

    // Draw subtle crema swirls
    ctx.fillStyle = 'rgba(255, 235, 205, 0.12)';
    ctx.beginPath();
    ctx.arc(size / 2 + 20, size / 2 - 20, size / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Save initial history
    const initialData = ctx.getImageData(0, 0, size, size);
    setHistory([initialData]);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initCanvas();
      }, 50);
    }
  }, [isOpen, baseType]);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), current]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current state
    const previous = newHistory[newHistory.length - 1];
    if (previous) {
      ctx.putImageData(previous, 0, 0);
      setHistory(newHistory);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    playLatteDab();
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveHistoryState();
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    const radius = canvas.width / 2;
    const distFromCenter = Math.hypot(x - radius, y - radius);

    // Keep within circular cup
    if (distFromCenter > radius - 10) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = brushColor;
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Stamp Templates
  const applyStamp = (type: 'heart' | 'rosetta' | 'paw' | 'tulip' | 'star' | 'swirl') => {
    playLatteDab();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, cx - 6, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = brushColor;
    ctx.strokeStyle = brushColor;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 6;

    if (type === 'heart') {
      ctx.beginPath();
      const topCurveHeight = 45;
      ctx.moveTo(cx, cy + 35);
      // Left curve
      ctx.bezierCurveTo(cx - 55, cy - 10, cx - 55, cy - 45, cx, cy - 20);
      // Right curve
      ctx.bezierCurveTo(cx + 55, cy - 45, cx + 55, cy - 10, cx, cy + 35);
      ctx.fill();
    } else if (type === 'rosetta') {
      // Draw artistic leaf / rosetta lines
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, cy + 80);
      ctx.quadraticCurveTo(cx, cy - 40, cx, cy - 70);
      ctx.stroke();

      for (let i = 0; i < 5; i++) {
        const yOffset = cy + 50 - i * 28;
        const width = 35 - i * 4;
        ctx.beginPath();
        ctx.moveTo(cx, yOffset);
        ctx.bezierCurveTo(cx - width, yOffset - 15, cx - width - 10, yOffset - 25, cx, yOffset - 15);
        ctx.bezierCurveTo(cx + width + 10, yOffset - 25, cx + width, yOffset - 15, cx, yOffset);
        ctx.fill();
      }
    } else if (type === 'paw') {
      // Main pad
      ctx.beginPath();
      ctx.ellipse(cx, cy + 15, 36, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4 Toes
      const toeOffsets = [
        { x: -35, y: -20, r: 12 },
        { x: -14, y: -35, r: 13 },
        { x: 14, y: -35, r: 13 },
        { x: 35, y: -20, r: 12 },
      ];
      toeOffsets.forEach((toe) => {
        ctx.beginPath();
        ctx.arc(cx + toe.x, cy + toe.y, toe.r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (type === 'tulip') {
      // 3 layered tulip petals
      const layers = [
        { y: cy + 40, rx: 35, ry: 20 },
        { y: cy, rx: 30, ry: 18 },
        { y: cy - 35, rx: 24, ry: 15 },
        { y: cy - 65, rx: 14, ry: 10 },
      ];
      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.ellipse(cx, layer.y, layer.rx, layer.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (type === 'star') {
      // Sparkling stars
      const drawStar = (x: number, y: number, spikes: number, outer: number, inner: number) => {
        let rot = (Math.PI / 2) * 3;
        let step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(x, y - outer);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
          rot += step;
        }
        ctx.lineTo(x, y - outer);
        ctx.closePath();
        ctx.fill();
      };
      drawStar(cx, cy, 4, 45, 12);
      drawStar(cx - 50, cy - 40, 4, 20, 6);
      drawStar(cx + 50, cy + 40, 4, 24, 7);
    } else if (type === 'swirl') {
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < 180; i++) {
        const angle = 0.1 * i;
        const r = (1 + angle) * 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.restore();
    saveHistoryState();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playClick();
    const dataUrl = canvas.toDataURL('image/png');
    onSaveArt(dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-pink-200 dark:border-stone-800 rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
                Latte Art Studio
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Draw your foam pattern or stamp a design onto the crema
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); onClose(); }}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Canvas Area */}
        <div className="flex flex-col items-center justify-center py-4 select-none">
          {/* Circular Mug Border */}
          <div className="relative p-3 rounded-full bg-stone-100 dark:bg-stone-800 shadow-2xl border-4 border-stone-200 dark:border-stone-700">
            <canvas
              ref={canvasRef}
              width={260}
              height={260}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="rounded-full cursor-crosshair touch-none shadow-inner"
            />
            {/* Mug Handle Accent */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-14 rounded-r-xl border-4 border-l-0 border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800"></div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-3 bg-stone-50/80 dark:bg-stone-800/60 p-3.5 rounded-2xl border border-stone-200/70 dark:border-stone-700">
          {/* Mode Tabs: Brush vs Stamps */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 dark:bg-stone-700/60 rounded-xl">
              <button
                onClick={() => { playClick(); setActiveTab('brush'); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'brush'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-rose-500'
                }`}
              >
                <Brush className="w-3.5 h-3.5" />
                <span>Freehand Brush</span>
              </button>
              <button
                onClick={() => { playClick(); setActiveTab('stamps'); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'stamps'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-rose-500'
                }`}
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>Stencil Stamps</span>
              </button>
            </div>

            {/* Undo & Reset buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 transition-colors"
                title="Undo last stroke"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => { playClick(); initCanvas(); }}
                className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-100/50 dark:hover:bg-stone-700 transition-colors"
                title="Clear canvas"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Foam / Syrup Color
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {BRUSH_COLORS.map((bc) => (
                <button
                  key={bc.id}
                  onClick={() => { playClick(); setBrushColor(bc.color); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                    brushColor === bc.color
                      ? 'border-rose-500 ring-2 ring-rose-400/50 shadow-sm'
                      : 'border-stone-300 dark:border-stone-600 hover:border-stone-400'
                  }`}
                  style={{
                    backgroundColor: brushColor === bc.color ? '#FFF0F5' : 'transparent',
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-stone-400 shadow-inner"
                    style={{ backgroundColor: bc.bgHex }}
                  />
                  <span className="text-stone-700 dark:text-stone-300 text-[11px]">
                    {bc.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content: Brush Size OR Stencil Stamps */}
          {activeTab === 'brush' ? (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                <span>Brush Size</span>
                <span>{brushSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                Click to Stamp Design
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <button
                  onClick={() => applyStamp('heart')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-rose-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-all active:scale-95 shadow-xs"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] font-bold">Heart</span>
                </button>
                <button
                  onClick={() => applyStamp('rosetta')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-emerald-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-emerald-600 transition-all active:scale-95 shadow-xs"
                >
                  <Feather className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold">Rosetta</span>
                </button>
                <button
                  onClick={() => applyStamp('paw')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-amber-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-amber-600 transition-all active:scale-95 shadow-xs"
                >
                  <Smile className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold">Cat Paw</span>
                </button>
                <button
                  onClick={() => applyStamp('tulip')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-purple-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-purple-600 transition-all active:scale-95 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-[10px] font-bold">Tulip</span>
                </button>
                <button
                  onClick={() => applyStamp('star')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-yellow-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-yellow-600 transition-all active:scale-95 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-[10px] font-bold">Sparkles</span>
                </button>
                <button
                  onClick={() => applyStamp('swirl')}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-orange-400 flex flex-col items-center gap-1 text-stone-700 dark:text-stone-200 hover:text-orange-600 transition-all active:scale-95 shadow-xs"
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-bold">Swirl</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-4">
          <button
            onClick={() => { playClick(); onClose(); }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md shadow-rose-500/25 transition-all active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Apply Latte Art ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
