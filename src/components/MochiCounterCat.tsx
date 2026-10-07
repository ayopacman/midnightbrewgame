import React, { useState, useEffect, useRef } from 'react';
import { playClick, playCatPurr, playBellChime } from '../utils/audio';
import { Heart, Sparkles, Coffee, Smile } from 'lucide-react';

export type CatActionState = 
  | 'SIT' 
  | 'STAND_STRETCH' 
  | 'GROOM' 
  | 'LOOK_AROUND' 
  | 'SLEEP' 
  | 'PETTED' 
  | 'DRINK_MILK'
  | 'PLAY_YARN';

interface MochiCounterCatProps {
  catHappiness: number;
  onPetCat: () => void;
  onFeedTreat?: () => void;
  standalone?: boolean;
}

export const MochiCounterCat: React.FC<MochiCounterCatProps> = ({
  catHappiness,
  onPetCat,
  onFeedTreat,
  standalone = false,
}) => {
  const [actionState, setActionState] = useState<CatActionState>('SIT');
  const [isPurring, setIsPurring] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [thoughtMessage, setThoughtMessage] = useState<string>('Meow~ ✨');
  const [isBlinking, setIsBlinking] = useState(false);
  const [headTilt, setHeadTilt] = useState<number>(0);
  const [yarnPosition, setYarnPosition] = useState<number>(50);
  const timerRef = useRef<number | null>(null);

  // Autonomous Living Cat AI (transitions naturally between idle behaviors)
  useEffect(() => {
    if (actionState === 'PETTED' || actionState === 'DRINK_MILK' || actionState === 'PLAY_YARN') {
      return;
    }

    const scheduleNextAction = () => {
      const delay = 4000 + Math.random() * 4000;
      timerRef.current = window.setTimeout(() => {
        const pool: CatActionState[] = [
          'SIT',
          'SIT',
          'STAND_STRETCH',
          'GROOM',
          'LOOK_AROUND',
          'LOOK_AROUND',
          'SLEEP',
        ];
        const next = pool[Math.floor(Math.random() * pool.length)];
        setActionState(next);

        if (next === 'STAND_STRETCH') {
          setThoughtMessage('*stretches paws* 🥱');
        } else if (next === 'GROOM') {
          setThoughtMessage('*grooming whiskers* 🐾');
        } else if (next === 'LOOK_AROUND') {
          setThoughtMessage('Sniffing coffee aroma... ☕');
          setHeadTilt((Math.random() - 0.5) * 16);
        } else if (next === 'SLEEP') {
          setThoughtMessage('Cozy catnap... Zzz 💤');
        } else {
          setThoughtMessage('Purr... 🌸');
          setHeadTilt(0);
        }

        scheduleNextAction();
      }, delay);
    };

    scheduleNextAction();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [actionState]);

  // Natural eye blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Petting interaction
  const handlePet = (e: React.MouseEvent) => {
    playCatPurr();
    setIsPurring(true);
    setActionState('PETTED');
    setThoughtMessage('Purrrr! Love you! 💖');
    onPetCat();

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setTimeout(() => {
      setIsPurring(false);
      setActionState('SIT');
    }, 2400);
  };

  // Feeding milk interaction
  const handleFeed = () => {
    playClick();
    playCatPurr();
    setActionState('DRINK_MILK');
    setThoughtMessage('*laps sweet strawberry milk* 🍓🥛');
    if (onFeedTreat) onFeedTreat();

    setTimeout(() => {
      setActionState('GROOM');
      setThoughtMessage('*cleans milk mustache* 🐱✨');
      setTimeout(() => setActionState('SIT'), 2000);
    }, 3000);
  };

  // Play with yarn toy
  const handlePlayYarn = () => {
    playClick();
    playBellChime();
    setActionState('PLAY_YARN');
    setThoughtMessage('*bats pink yarn ball!* 🧶✨');
    setYarnPosition(20 + Math.random() * 60);

    setTimeout(() => {
      setActionState('SIT');
      setThoughtMessage('That was fun! 🐾');
    }, 2800);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none group">
      
      {/* Flying Hearts on Pet */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute pointer-events-none text-rose-500 animate-bounce text-base font-black z-50 drop-shadow-md whitespace-nowrap"
          style={{ left: h.x - 20, top: h.y - 35 }}
        >
          💖 +Purr 💕
        </div>
      ))}

      {/* Cat Happiness & Thought Bubble Header */}
      <div className="flex flex-col items-center gap-1 mb-1 z-20">
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/95 dark:bg-[#2A1220]/95 border border-[#F8D7DF] text-[11px] font-black text-[#E84A74] shadow-xs">
          <Heart className="w-3 h-3 fill-[#E84A74] text-[#E84A74] animate-pulse" />
          <span>Mochi: {catHappiness}% Happy</span>
        </div>

        {/* Dynamic Thought Bubble */}
        <div className="bg-white/95 dark:bg-[#3B172E]/95 border border-[#F8D7DF] dark:border-[#5C2344] px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#9C6D79] dark:text-[#FFB6CE] shadow-xs transition-all animate-in fade-in flex items-center gap-1">
          <span>{thoughtMessage}</span>
        </div>
      </div>

      {/* Main Living Cat Container (Completely Transparent, No Background Box) */}
      <div
        onClick={handlePet}
        className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-end justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group"
        title="Click to pet Mochi! 🐾"
      >
        {/* Soft Ground Ambient Counter Shadow */}
        <div 
          className={`absolute bottom-2 w-32 h-6 bg-black/15 dark:bg-black/35 rounded-full blur-sm transition-all duration-500 ${
            actionState === 'STAND_STRETCH' ? 'w-40 scale-x-110' :
            actionState === 'SLEEP' ? 'w-36 scale-x-105' :
            'w-28'
          }`}
        />

        {/* Living Vector Animated Cat Character */}
        <div 
          className="relative w-full h-full flex items-center justify-center transition-all duration-500"
          style={{ transform: `rotate(${headTilt}deg)` }}
        >
          <svg
            viewBox="0 0 200 200"
            className={`w-full h-full filter drop-shadow-lg transition-transform duration-500 ${
              actionState === 'SIT' ? 'animate-breathe' :
              actionState === 'PETTED' ? 'animate-bounce' :
              ''
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cat Fur Radiant Gradients */}
              <linearGradient id="catFur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF5F7" />
                <stop offset="50%" stopColor="#FFE4EC" />
                <stop offset="100%" stopColor="#F8C8DC" />
              </linearGradient>

              <linearGradient id="catShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5BCCF" />
                <stop offset="100%" stopColor="#E599B2" />
              </linearGradient>

              {/* Pink Sunglasses Gradient */}
              <linearGradient id="glassesLens" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>

              <linearGradient id="glassesGoldFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Strawberry Collar Gradient */}
              <linearGradient id="collarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E84A74" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>
            </defs>

            {/* --- TAIL (Dynamic sine sway animation) --- */}
            <g className={`origin-bottom-left transition-transform duration-700 ${
              actionState === 'PETTED' ? 'animate-wiggle' :
              actionState === 'PLAY_YARN' ? 'animate-pulse' :
              'animate-swish-tail'
            }`}>
              <path
                d="M 135 150 C 170 145, 185 110, 165 85 C 155 75, 140 85, 148 95 C 160 110, 150 135, 125 145 Z"
                fill="url(#catFur)"
                stroke="#E599B2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Cute Fluffy Tail Tip */}
              <circle cx="160" cy="85" r="7" fill="#FFE4EC" />
            </g>

            {/* --- BODY & LEGS (State Dependent) --- */}
            {actionState === 'STAND_STRETCH' ? (
              /* Stretching Pose */
              <g className="transition-all duration-500">
                {/* Back Arch Body */}
                <path
                  d="M 50 155 C 65 115, 110 110, 145 135 C 155 145, 150 165, 135 165 C 95 165, 60 165, 50 155 Z"
                  fill="url(#catFur)"
                  stroke="#E599B2"
                  strokeWidth="2"
                />
                {/* Front Paws Stretched Forward */}
                <ellipse cx="45" cy="162" rx="14" ry="7" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                <ellipse cx="65" cy="164" rx="12" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                {/* Back Paws */}
                <ellipse cx="140" cy="162" rx="12" ry="8" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
              </g>
            ) : actionState === 'SLEEP' ? (
              /* Loaf / Sleep Pose */
              <g className="transition-all duration-500">
                {/* Curled Soft Loaf Body */}
                <ellipse cx="100" cy="148" rx="55" ry="32" fill="url(#catFur)" stroke="#E599B2" strokeWidth="2" />
                {/* Tucked Paws */}
                <ellipse cx="75" cy="165" rx="12" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                <ellipse cx="115" cy="165" rx="12" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
              </g>
            ) : (
              /* Sitting Classic Pose */
              <g className="transition-all duration-500">
                {/* Torso */}
                <path
                  d="M 68 120 C 65 95, 135 95, 132 120 C 138 140, 142 165, 120 168 C 100 170, 80 170, 70 165 C 58 150, 62 135, 68 120 Z"
                  fill="url(#catFur)"
                  stroke="#E599B2"
                  strokeWidth="2"
                />
                {/* Cute Chest Fluff */}
                <path
                  d="M 85 110 C 100 120, 100 135, 88 145 C 105 140, 112 125, 115 110 Z"
                  fill="#FFFFFF"
                  opacity="0.9"
                />
                {/* Front Left Paw */}
                <ellipse cx="82" cy="166" rx="9" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                {/* Front Right Paw (Lifts if grooming) */}
                {actionState === 'GROOM' ? (
                  <ellipse cx="105" cy="130" rx="8" ry="12" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" transform="rotate(-30 105 130)" />
                ) : (
                  <ellipse cx="114" cy="166" rx="9" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                )}
                {/* Back Haunches */}
                <circle cx="65" cy="150" r="14" fill="url(#catShadow)" opacity="0.4" />
                <circle cx="132" cy="150" r="14" fill="url(#catShadow)" opacity="0.4" />
              </g>
            )}

            {/* --- GOLD BELL COLLAR --- */}
            <g>
              <path
                d="M 75 105 Q 100 116 125 105"
                stroke="url(#collarGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Golden Bell / Pendant */}
              <circle cx="100" cy="114" r="5.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              <circle cx="100" cy="115" r="1.5" fill="#78350F" />
            </g>

            {/* --- HEAD --- */}
            <g className={`transition-transform duration-300 ${actionState === 'PETTED' ? 'translate-y-[-2px]' : ''}`}>
              
              {/* Left Cat Ear */}
              <g className="origin-bottom-left transition-transform duration-300 hover:rotate-[-8deg]">
                <path
                  d="M 66 75 L 52 35 Q 75 42 84 58 Z"
                  fill="url(#catFur)"
                  stroke="#E599B2"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Inner Ear Pink */}
                <path
                  d="M 68 68 L 58 42 Q 74 48 78 58 Z"
                  fill="#FDA4AF"
                />
              </g>

              {/* Right Cat Ear */}
              <g className="origin-bottom-right transition-transform duration-300 hover:rotate-[8deg]">
                <path
                  d="M 134 75 L 148 35 Q 125 42 116 58 Z"
                  fill="url(#catFur)"
                  stroke="#E599B2"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Inner Ear Pink */}
                <path
                  d="M 132 68 L 142 42 Q 126 48 122 58 Z"
                  fill="#FDA4AF"
                />
              </g>

              {/* Head Circle */}
              <ellipse cx="100" cy="74" rx="36" ry="30" fill="url(#catFur)" stroke="#E599B2" strokeWidth="2" />

              {/* Cute Cheek Fluffs */}
              <path d="M 63 76 Q 54 82 65 90 Z" fill="#FFE4EC" />
              <path d="M 137 76 Q 146 82 135 90 Z" fill="#FFE4EC" />

              {/* Blush Patches */}
              <ellipse cx="74" cy="82" rx="6" ry="3" fill="#FB7185" opacity="0.45" />
              <ellipse cx="126" cy="82" rx="6" ry="3" fill="#FB7185" opacity="0.45" />

              {/* Whiskers */}
              <g stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
                {/* Left Whiskers */}
                <line x1="58" y1="78" x2="36" y2="74" />
                <line x1="57" y1="83" x2="34" y2="84" />
                <line x1="58" y1="88" x2="38" y2="94" />
                {/* Right Whiskers */}
                <line x1="142" y1="78" x2="164" y2="74" />
                <line x1="143" y1="83" x2="166" y2="84" />
                <line x1="142" y1="88" x2="162" y2="94" />
              </g>

              {/* Cute Pink Nose */}
              <polygon points="97,80 103,80 100,84" fill="#F43F5E" />

              {/* Mouth */}
              {actionState === 'STAND_STRETCH' ? (
                /* Yawning Open Mouth */
                <path
                  d="M 95 86 Q 100 96 105 86 Z"
                  fill="#BE185D"
                  stroke="#9F1239"
                  strokeWidth="1"
                />
              ) : (
                /* Cute Cat Smile (=^･ω･^=) */
                <path
                  d="M 94 85 Q 97 89 100 85 Q 103 89 106 85"
                  stroke="#E11D48"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              )}

              {/* --- EYES / PINK SUNGLASSES --- */}
              {actionState === 'SLEEP' ? (
                /* Sleeping Eyes (Closed Arcs) */
                <g stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none">
                  <path d="M 78 72 Q 84 76 90 72" />
                  <path d="M 110 72 Q 116 76 122 72" />
                </g>
              ) : (
                /* Iconic Pink Sunglasses with Golden Accents */
                <g className="transition-transform duration-300 group-hover:scale-105 origin-center">
                  {/* Left Lens */}
                  <ellipse cx="84" cy="70" rx="14" ry="9" fill="url(#glassesLens)" stroke="url(#glassesGoldFrame)" strokeWidth="2" />
                  {/* Left Lens Gloss Specular Reflection */}
                  <ellipse cx="81" cy="67" rx="6" ry="2.5" fill="#FFFFFF" opacity="0.65" transform="rotate(-15 81 67)" />

                  {/* Bridge */}
                  <path d="M 98 68 Q 100 65 102 68" stroke="url(#glassesGoldFrame)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Right Lens */}
                  <ellipse cx="116" cy="70" rx="14" ry="9" fill="url(#glassesLens)" stroke="url(#glassesGoldFrame)" strokeWidth="2" />
                  {/* Right Lens Gloss Reflection */}
                  <ellipse cx="113" cy="67" rx="6" ry="2.5" fill="#FFFFFF" opacity="0.65" transform="rotate(-15 113 67)" />

                  {/* Sunglasses Side Wings */}
                  <path d="M 70 69 L 63 65" stroke="url(#glassesGoldFrame)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 130 69 L 137 65" stroke="url(#glassesGoldFrame)" strokeWidth="2" strokeLinecap="round" />

                  {/* Sparkle Star on sunglasses corner */}
                  <circle cx="126" cy="64" r="1.5" fill="#FFFFFF" className="animate-ping" />
                </g>
              )}

              {/* Grooming Paw Animation (if grooming) */}
              {actionState === 'GROOM' && (
                <g className="animate-bounce origin-top">
                  <ellipse cx="118" cy="78" rx="8" ry="6" fill="#FFF5F7" stroke="#E599B2" strokeWidth="1.5" />
                  <path d="M 100 87 Q 105 92 108 88" stroke="#FB7185" strokeWidth="2" fill="#FB7185" />
                </g>
              )}
            </g>

            {/* --- SLEEPING Zzz PARTICLES --- */}
            {actionState === 'SLEEP' && (
              <g className="animate-pulse">
                <text x="145" y="50" fill="#E84A74" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Z</text>
                <text x="155" y="38" fill="#F472B6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">z</text>
                <text x="163" y="28" fill="#FB7185" fontSize="9" fontWeight="bold" fontFamily="sans-serif">z</text>
              </g>
            )}

            {/* --- MILK SAUCER (When Drinking Milk) --- */}
            {actionState === 'DRINK_MILK' && (
              <g className="animate-in fade-in zoom-in-75">
                <ellipse cx="60" cy="165" rx="18" ry="6" fill="#FFF0F3" stroke="#E84A74" strokeWidth="1.5" />
                <ellipse cx="60" cy="164" rx="14" ry="4" fill="#FFE4ED" />
                <circle cx="60" cy="163" r="1.5" fill="#FFFFFF" className="animate-ping" />
              </g>
            )}

            {/* --- YARN TOY (When Playing Yarn) --- */}
            {actionState === 'PLAY_YARN' && (
              <g className="animate-bounce" style={{ transform: `translateX(${yarnPosition - 50}px)` }}>
                <circle cx="45" cy="160" r="10" fill="#F43F5E" stroke="#BE185D" strokeWidth="1.5" />
                <path d="M 40 156 Q 45 160 50 156 Q 45 164 40 160" stroke="#FFE4ED" strokeWidth="1.5" fill="none" />
                <path d="M 54 163 Q 70 168 80 164" stroke="#F43F5E" strokeWidth="1" fill="none" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Interactive Pet Control Buttons */}
      <div className="flex items-center gap-1.5 mt-1 z-20 flex-wrap justify-center">
        {/* Pet Button */}
        <button
          onClick={handlePet}
          className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#FFF0F3] to-[#FDE8ED] hover:from-[#FDE8ED] hover:to-[#FBCFE8] text-[#E84A74] font-extrabold text-[11px] border border-[#F8D7DF] flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>🐾 Pet</span>
        </button>

        {/* Warm Milk Treat */}
        <button
          onClick={handleFeed}
          className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#FFF0F3] to-[#FDE8ED] hover:from-[#FDE8ED] hover:to-[#FBCFE8] text-[#E84A74] font-extrabold text-[11px] border border-[#F8D7DF] flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>🥛 Milk</span>
        </button>

        {/* Play Yarn */}
        <button
          onClick={handlePlayYarn}
          className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#FFF0F3] to-[#FDE8ED] hover:from-[#FDE8ED] hover:to-[#FBCFE8] text-[#E84A74] font-extrabold text-[11px] border border-[#F8D7DF] flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>🧶 Play</span>
        </button>

        {/* Nap / Stretch */}
        <button
          onClick={() => {
            playClick();
            if (actionState === 'SLEEP') {
              setActionState('STAND_STRETCH');
              setThoughtMessage('*wakes up and stretches!* 🥱✨');
            } else {
              setActionState('SLEEP');
              setThoughtMessage('Taking a sweet catnap... 💤');
            }
          }}
          className="px-2 py-1 rounded-xl bg-white/80 hover:bg-white text-[#9C6D79] hover:text-[#E84A74] font-bold text-[10px] border border-[#F8D7DF] transition-all cursor-pointer"
          title="Toggle Nap / Stretch"
        >
          {actionState === 'SLEEP' ? '☀️ Wake' : '💤 Nap'}
        </button>
      </div>

    </div>
  );
};
