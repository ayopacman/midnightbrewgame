import React, { useState, useEffect } from 'react';
import { Customer, CustomerEmotion, ThemeMode, Recipe, EvaluationResult, DialogueChoice } from '../types/game';
import { Sparkles, HelpCircle, MessageSquare, Heart, Smile, Frown, Meh, Eye, Sparkle } from 'lucide-react';
import { THEMES, ThemeConfig } from '../data/themes';
import { playClick, playDialogueChirp } from '../utils/audio';

interface CustomerWindowProps {
  customer: Customer;
  emotion: CustomerEmotion;
  currentTheme?: ThemeMode;
  customDialogue?: string;
  feedbackText?: string | null;
  targetRecipe?: Recipe;
  evaluationResult?: EvaluationResult | null;
  onOpenRecipeBook?: () => void;
  onSelectDialogueChoice?: (choice: DialogueChoice) => void;
  selectedChoiceId?: string | null;
  isMysteryMode?: boolean;
}

export const CustomerWindow: React.FC<CustomerWindowProps> = ({
  customer,
  emotion,
  currentTheme = 'blossom',
  customDialogue,
  feedbackText,
  targetRecipe,
  evaluationResult,
  onOpenRecipeBook,
  onSelectDialogueChoice,
  selectedChoiceId,
  isMysteryMode = false,
}) => {
  const theme: ThemeConfig = THEMES[currentTheme] || THEMES.blossom;
  const [displayedText, setDisplayedText] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Target text to render
  const fullText = customDialogue || feedbackText || (
    isMysteryMode && customer.mysteryClues 
      ? `"${customer.mysteryClues.join(' ')}"` 
      : `${customer.orderIntro} "${customer.orderRiddle}"`
  );

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setShowHint(false);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText(fullText.slice(0, idx + 1));
        if (idx % 4 === 0) {
          playDialogueChirp(customer.id === 'mochi' ? 1.6 : customer.id === 'kaito' ? 1.3 : 1.0);
        }
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [fullText, customer.id, isMysteryMode]);

  // Avatar expression icon & emotion badge in harmonious pink tones
  const getEmotionDetails = () => {
    switch (emotion) {
      case 'delighted':
        return {
          icon: <Heart className="w-4 h-4 text-[#E84A74] fill-[#E84A74] animate-bounce" />,
          label: 'Delighted! ✨',
          bg: 'bg-[#FFF0F3] border-[#F8D7DF] text-[#E84A74]',
        };
      case 'content':
        return {
          icon: <Smile className="w-4 h-4 text-[#F472B6]" />,
          label: 'Satisfied ☕',
          bg: 'bg-[#FFF0F3] border-[#F8D7DF] text-[#D43862]',
        };
      case 'disappointed':
        return {
          icon: <Frown className="w-4 h-4 text-[#9C6D79]" />,
          label: 'Disappointed...',
          bg: 'bg-[#FFF5F7] border-[#F8D7DF] text-[#9C6D79]',
        };
      case 'thinking':
        return {
          icon: <Meh className="w-4 h-4 text-[#E84A74] animate-spin" />,
          label: 'Tasting...',
          bg: 'bg-[#FFF0F3] border-[#F8D7DF] text-[#E84A74]',
        };
      case 'playful':
        return {
          icon: <Sparkle className="w-4 h-4 text-[#E84A74] animate-pulse" />,
          label: 'Charmed 💖',
          bg: 'bg-[#FFF0F3] border-[#F8D7DF] text-[#E84A74]',
        };
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-[#E84A74]" />,
          label: 'Waiting for Drink',
          bg: 'bg-[#FFF0F3] border-[#F8D7DF] text-[#E84A74]',
        };
    }
  };

  const emotionInfo = getEmotionDetails();

  // Character illustrated portraits with soft pastel pink backgrounds
  const renderAvatarGraphic = (seed: string) => {
    switch (seed) {
      case 'maya':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FFD6E5]">
            <div className="text-4xl sm:text-5xl select-none">👩‍💻</div>
            <div className="absolute -top-1 -right-1 text-xs">🎧</div>
          </div>
        );
      case 'arthur':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FFE4ED]">
            <div className="text-4xl sm:text-5xl select-none">👨‍🏫</div>
            <div className="absolute -top-1 -right-1 text-xs">📖</div>
          </div>
        );
      case 'sora':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFE4ED] to-[#FFD6E5]">
            <div className="text-4xl sm:text-5xl select-none">🎨</div>
            <div className="absolute -top-1 -right-1 text-xs">✨</div>
          </div>
        );
      case 'kaito':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FCE4EC]">
            <div className="text-4xl sm:text-5xl select-none">🕹️</div>
            <div className="absolute -top-1 -right-1 text-xs">⚡</div>
          </div>
        );
      case 'beatrice':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFE4ED] to-[#FCE4EC]">
            <div className="text-4xl sm:text-5xl select-none">🪻</div>
            <div className="absolute -top-1 -right-1 text-xs">✨</div>
          </div>
        );
      case 'mochi':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FFD6E5] p-1 overflow-hidden">
            <img src="/favicon.png" alt="Mochi the Cat" className="w-full h-full object-contain animate-bounce" />
          </div>
        );
      case 'julian':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FFE4ED]">
            <div className="text-4xl sm:text-5xl select-none">🕵️‍♂️</div>
            <div className="absolute -top-1 -right-1 text-xs">🖋️</div>
          </div>
        );
      case 'aria':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFE4ED] to-[#FFD6E5]">
            <div className="text-4xl sm:text-5xl select-none">🔭</div>
            <div className="absolute -top-1 -right-1 text-xs">🌌</div>
          </div>
        );
      case 'kenji':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FCE4EC]">
            <div className="text-4xl sm:text-5xl select-none">🎧</div>
            <div className="absolute -top-1 -right-1 text-xs">🎵</div>
          </div>
        );
      case 'elena':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FFE4ED]">
            <div className="text-4xl sm:text-5xl select-none">🧣</div>
            <div className="absolute -top-1 -right-1 text-xs">🌧️</div>
          </div>
        );
      case 'chloe':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFE4ED] to-[#FFD6E5]">
            <div className="text-4xl sm:text-5xl select-none">🌸</div>
            <div className="absolute -top-1 -right-1 text-xs">🌿</div>
          </div>
        );
      case 'leo':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] to-[#FCE4EC]">
            <div className="text-4xl sm:text-5xl select-none">🎷</div>
            <div className="absolute -top-1 -right-1 text-xs">🎶</div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            ☕
          </div>
        );
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-3xl ${theme.cardBg} border-2 ${theme.borderColor} shadow-xs relative overflow-hidden transition-all duration-300`}>
      
      {/* Top Header Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E84A74] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E84A74]">
            {isMysteryMode ? '🕵️ Mystery Customer Clue' : 'Customer At Counter'}
          </span>
        </div>

        {/* Emotion Status Badge & Loyalty Hearts */}
        <div className="flex items-center gap-2">
          {customer.loyaltyLevel && (
            <div className="inline-flex items-center gap-0.5 px-2.5 py-0.5 bg-[#FFF0F3] rounded-full border border-[#F8D7DF] text-[10px] font-bold text-[#E84A74]">
              <Heart className="w-3 h-3 fill-[#E84A74] text-[#E84A74]" />
              <span>Lvl {customer.loyaltyLevel}</span>
            </div>
          )}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${emotionInfo.bg} shadow-2xs`}>
            {emotionInfo.icon}
            <span>{emotionInfo.label}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Customer Avatar & Bio Card (Left Column) */}
        <div className="md:col-span-4 flex md:flex-col items-center gap-3 bg-gradient-to-b from-white/95 to-[#FFF0F3]/60 p-3 rounded-2xl border border-[#F8D7DF]">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white shadow-md overflow-hidden shrink-0 bg-white">
            {renderAvatarGraphic(customer.avatarSeed)}
          </div>

          <div className="text-left md:text-center min-w-0 w-full">
            <h3 className="font-serif font-black text-base sm:text-lg text-[#4A2E35] dark:text-white truncate">
              {customer.name}
            </h3>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#E84A74] bg-[#FFF0F3] border border-[#F8D7DF] px-2 py-0.5 rounded-md mt-0.5">
              {customer.role}
            </span>
            <p className="text-[11px] text-[#9C6D79] dark:text-[#D4A5B8] mt-1 font-medium line-clamp-2 leading-relaxed">
              {customer.bio}
            </p>
          </div>
        </div>

        {/* Customer Speech Bubble & Interactive Dialogue Choice (Right Column) */}
        <div className="md:col-span-8 space-y-2.5">
          {/* Dialogue Speech Bubble */}
          <div className="relative bg-[#FFF9FA] border-2 border-[#F8D7DF] rounded-2xl p-3.5 sm:p-4 shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#E84A74]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isMysteryMode ? 'Cryptic Flavor Request:' : 'Customer Dialogue:'}</span>
              </div>

              {customer.likesLatteArt && (
                <span className="text-[10px] font-bold text-[#E84A74] bg-[#FFF0F3] border border-[#F8D7DF] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>🎨</span>
                  <span>Loves Latte Art</span>
                </span>
              )}
            </div>

            {/* Typewriter text */}
            <p className="font-serif text-sm text-[#4A2E35] leading-relaxed italic min-h-[3.2rem]">
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="inline-block w-1.5 h-4 bg-[#E84A74] ml-0.5 animate-pulse"></span>
              )}
            </p>
          </div>

          {/* Interactive Dialogue Choice Buttons */}
          {customer.dialogueChoices && customer.dialogueChoices.length > 0 && !evaluationResult && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C6D79] flex items-center gap-1">
                <span>💬</span> Choose Barista Reply (Boosts Tip &amp; Mood):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {customer.dialogueChoices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => {
                        playClick();
                        onSelectDialogueChoice?.(choice);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-xl border font-semibold text-left transition-all btn-press flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E84A74] text-white border-[#E84A74] shadow-xs'
                          : 'bg-white/90 text-[#4A2E35] border-[#F8D7DF] hover:border-[#E84A74] hover:bg-[#FFF0F3]'
                      }`}
                    >
                      <Sparkle className="w-3 h-3 text-pink-300 shrink-0" />
                      <span>{choice.prompt}</span>
                      <span className="text-[10px] opacity-80 font-black">+{choice.moodBonus}%</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Row: Hint toggle & Recipe Book Shortcut */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            {!isMysteryMode ? (
              <button
                onClick={() => {
                  playClick();
                  setShowHint(!showHint);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E84A74] hover:text-[#D43862] bg-[#FFF0F3] hover:bg-[#FDE8ED] border border-[#F8D7DF] px-3.5 py-1.5 rounded-xl transition-all shadow-2xs btn-press cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Order Hint' : 'Show Order Hint'}</span>
              </button>
            ) : (
              <span className="text-[11px] font-bold text-[#E84A74] bg-[#FFF0F3] border border-[#F8D7DF] px-2.5 py-1 rounded-lg">
                🔍 Deduce flavor from clues!
              </span>
            )}

            {onOpenRecipeBook && (
              <button
                onClick={() => {
                  playClick();
                  onOpenRecipeBook();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A2E35] hover:text-[#E84A74] bg-white border border-[#F8D7DF] px-3 py-1.5 rounded-xl transition-all shadow-2xs btn-press cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#E84A74]" />
                <span>Recipe Book Lookup</span>
              </button>
            )}
          </div>

          {/* Revealable Hint Box */}
          {showHint && (
            <div className="bg-[#FFF0F3] border border-[#F8D7DF] text-[#4A2E35] text-xs p-3 rounded-xl animate-fade-in shadow-xs">
              <span className="font-bold block text-[#E84A74] mb-0.5">💡 Barista Recipe Hint:</span>
              <span className="font-medium text-[#4A2E35]">{customer.orderHint}</span>
            </div>
          )}

          {/* Evaluation Result Banner */}
          {evaluationResult && (
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between animate-fade-in ${
              evaluationResult.score === 'PERFECT' 
                ? 'bg-[#FFF0F3] border-[#E84A74] text-[#E84A74]' 
                : 'bg-[#FFF5F7] border-[#F8D7DF] text-[#9C6D79]'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-bold">Score: {evaluationResult.score}</span>
                <span className="text-[11px] opacity-85">({evaluationResult.breakdown.join(' • ')})</span>
              </div>
              <span className="font-black text-[#E84A74]">+${evaluationResult.earnedTip} Tip</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
