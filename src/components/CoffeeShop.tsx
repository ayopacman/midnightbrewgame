import React, { useState, useEffect } from 'react';
import { 
  Customer, 
  CupState, 
  BaseType, 
  LiquidType, 
  ExtraType, 
  TemperatureType, 
  DailyStats, 
  EvaluationResult, 
  CustomerEmotion,
  GameMode,
  DialogueChoice,
  RushStats,
  CupSkin,
  ShopItem,
  PastryType,
  WeatherType
} from '../types/game';
import { CUSTOMERS } from '../data/customers';
import { RECIPES } from '../data/recipes';
import { CustomerWindow } from './CustomerWindow';
import { BrewingCounter } from './BrewingCounter';
import { LatteArtModal } from './LatteArtModal';
import { RecipeBookModal } from './RecipeBookModal';
import { RushHourHUD } from './RushHourHUD';
import { MysteryModeHUD } from './MysteryModeHUD';
import { ZenSoundboard } from './ZenSoundboard';
import { PolaroidCardModal } from './PolaroidCardModal';
import { CafeShopModal } from './CafeShopModal';
import { MochiCounterCat } from './MochiCounterCat';
import { BakeryShowcase } from './BakeryShowcase';
import { PhoneAppModal } from './PhoneAppModal';
import { SkillTreeModal } from './SkillTreeModal';
import { WeatherControls } from './WeatherControls';
import { CassetteJukebox } from './CassetteJukebox';
import { 
  playBellChime, 
  playSuccessChime, 
  playClick,
  playIceShake
} from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Sparkles, 
  Coffee, 
  RefreshCw, 
  Camera, 
  ShoppingBag, 
  ArrowLeft,
  Smartphone,
  Award,
  Radio,
  Disc,
  Heart
} from 'lucide-react';

interface CoffeeShopProps {
  onReturnToTitle: () => void;
  gameMode?: GameMode;
  dailyStats: DailyStats;
  onUpdateDailyStats: (stats: Partial<DailyStats>) => void;
  isRainActive: boolean;
  onToggleRain: () => void;
  currentWeather: WeatherType;
  onChangeWeather: (w: WeatherType) => void;
}

const INITIAL_CUP_STATE: CupState = {
  base: null,
  liquid: null,
  temperature: 'HOT',
  addIns: [],
  canvasData: null,
  hasLatteArt: false,
  extractionQuality: 'NORMAL',
  steamQuality: 'NORMAL',
  selectedPastry: null,
  isPastryToasted: false,
};

export const CoffeeShop: React.FC<CoffeeShopProps> = ({
  onReturnToTitle,
  gameMode = 'STORY',
  dailyStats,
  onUpdateDailyStats,
  isRainActive,
  onToggleRain,
  currentWeather,
  onChangeWeather,
}) => {
  const [customerIndex, setCustomerIndex] = useState(0);
  const [cupState, setCupState] = useState<CupState>(INITIAL_CUP_STATE);
  const [customerEmotion, setCustomerEmotion] = useState<CustomerEmotion>('normal');
  const [dialogueText, setDialogueText] = useState<string>('');
  const [selectedDialogueChoiceId, setSelectedDialogueChoiceId] = useState<string | null>(null);
  const [lastEvaluation, setLastEvaluation] = useState<EvaluationResult | null>(null);

  // Modals
  const [isLatteArtOpen, setIsLatteArtOpen] = useState<boolean>(false);
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState<boolean>(false);
  const [isPolaroidOpen, setIsPolaroidOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState<boolean>(false);
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState<boolean>(false);

  // Rush Hour State
  const [rushStats, setRushStats] = useState<RushStats>({
    timeLeft: 90,
    score: 0,
    combo: 0,
    maxCombo: 0,
    servedCount: 0,
    multiplier: 1.0,
  });

  const activeCustomer: Customer = CUSTOMERS[customerIndex % CUSTOMERS.length];
  const targetRecipe = RECIPES.find((r) => r.id === activeCustomer.targetRecipeId) || RECIPES[0];

  // Rush Hour Countdown Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameMode === 'RUSH_HOUR' && rushStats.timeLeft > 0) {
      timer = setInterval(() => {
        setRushStats((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameMode, rushStats.timeLeft]);

  // Greet customer on walk-in
  useEffect(() => {
    playBellChime();
    setCustomerEmotion('normal');
    setSelectedDialogueChoiceId(null);
    setLastEvaluation(null);

    let intro = activeCustomer.orderIntro;
    if (gameMode === 'ZEN') {
      intro = `"Hello barista! Take your time, the rain outside is peaceful. I'd love something warm like a ${targetRecipe.name}."`;
    } else if (gameMode === 'MYSTERY') {
      intro = `"${activeCustomer.mysteryClues?.join(' ') || activeCustomer.orderRiddle}"`;
    }
    setDialogueText(intro);
  }, [customerIndex, gameMode]);

  // Ingredient manipulation
  const handleSetBase = (base: BaseType, extractionQuality: 'PERFECT' | 'GOOD' | 'NORMAL' = 'NORMAL') => {
    setCupState((prev) => ({ ...prev, base, extractionQuality }));
  };

  const handleSetLiquid = (liquid: LiquidType, steamQuality: 'PERFECT' | 'GOOD' | 'NORMAL' = 'NORMAL') => {
    setCupState((prev) => ({ ...prev, liquid, steamQuality }));
  };

  const handleToggleTemperature = (temperature: TemperatureType) => {
    setCupState((prev) => ({ ...prev, temperature }));
  };

  const handleToggleExtra = (extra: ExtraType) => {
    setCupState((prev) => {
      const exists = prev.addIns.includes(extra);
      return {
        ...prev,
        addIns: exists ? prev.addIns.filter((e) => e !== extra) : [...prev.addIns, extra],
      };
    });
  };

  const handleResetCup = () => {
    setCupState(INITIAL_CUP_STATE);
  };

  const handleShakeIce = () => {
    playIceShake();
    setCupState((prev) => ({ ...prev, isShaken: true }));
  };

  // Petting Mochi the Cat
  const handlePetCat = () => {
    const nextHappiness = Math.min(100, (dailyStats.catHappiness || 80) + 5);
    const updatedQuests = (dailyStats.quests || []).map((q) =>
      q.id === 'q_cat' ? { ...q, current: Math.min(q.target, q.current + 1) } : q
    );
    onUpdateDailyStats({
      catHappiness: nextHappiness,
      xp: (dailyStats.xp || 0) + 15,
      quests: updatedQuests,
    });
  };

  // Dialogue Choice selection
  const handleSelectDialogue = (choice: DialogueChoice) => {
    setSelectedDialogueChoiceId(choice.id);
    setCustomerEmotion('playful');
    setDialogueText(`"${choice.customerResponse}"`);
  };

  // Save latte art
  const handleSaveLatteArt = (canvasDataUrl: string) => {
    setCupState((prev) => ({
      ...prev,
      canvasData: canvasDataUrl,
      hasLatteArt: true,
    }));
    setIsLatteArtOpen(false);
  };

  // Serve drink evaluation
  const handleServeDrink = () => {
    const baseMatch = cupState.base === targetRecipe.base;
    const liquidMatch = cupState.liquid === targetRecipe.liquid;
    const tempMatch = cupState.temperature === targetRecipe.temperature;

    const requiredExtras = targetRecipe.addIns;
    const currentExtras = cupState.addIns;
    const hasAllRequired = requiredExtras.every((e) => currentExtras.includes(e));
    const hasNoExtraWrong = currentExtras.every((e) => requiredExtras.includes(e));
    const extrasMatch = hasAllRequired && hasNoExtraWrong;

    const latteArtBonus = Boolean(targetRecipe.requiresLatteArt && cupState.hasLatteArt);
    const extractionBonus = cupState.extractionQuality === 'PERFECT';
    const steamBonus = cupState.steamQuality === 'PERFECT';
    const pastryBonus = Boolean(cupState.selectedPastry);

    const breakdown: string[] = [];
    if (baseMatch) breakdown.push('Base Match');
    if (liquidMatch) breakdown.push('Liquid Match');
    if (tempMatch) breakdown.push('Temp Match');
    if (extrasMatch) breakdown.push('Extras Match');
    if (latteArtBonus) breakdown.push('Latte Art Painted');
    if (extractionBonus) breakdown.push('Golden Crema Shot');
    if (steamBonus) breakdown.push('Silky Microfoam');
    if (pastryBonus) breakdown.push('Bakery Pairing Combo');

    let score: 'PERFECT' | 'GOOD' | 'FAILED' = 'FAILED';
    let earnedTip = 0;
    let emotion: CustomerEmotion = 'disappointed';
    let feedbackText = activeCustomer.feedbackDisappointed;

    const isMatch = baseMatch && liquidMatch && tempMatch && extrasMatch;

    if (isMatch) {
      score = 'PERFECT';
      emotion = 'delighted';
      feedbackText = activeCustomer.feedbackDelighted;
      earnedTip = 35 + (latteArtBonus ? 20 : 0) + (extractionBonus ? 15 : 0) + (steamBonus ? 10 : 0) + (pastryBonus ? 25 : 0);

      if (selectedDialogueChoiceId) earnedTip += 15;

      playSuccessChime();
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    } else if (baseMatch && (liquidMatch || tempMatch)) {
      score = 'GOOD';
      emotion = 'content';
      feedbackText = activeCustomer.feedbackContent;
      earnedTip = 15 + (pastryBonus ? 15 : 0);
      playSuccessChime();
    }

    const evaluation: EvaluationResult = {
      score,
      earnedTip,
      feedbackText,
      emotion,
      baseMatch,
      liquidMatch,
      tempMatch,
      extrasMatch,
      pastryMatch: pastryBonus,
      latteArtBonus,
      extractionBonus,
      steamBonus,
      breakdown,
    };

    setLastEvaluation(evaluation);
    setCustomerEmotion(emotion);
    setDialogueText(`"${feedbackText}"`);

    // Update Quests
    const updatedQuests = (dailyStats.quests || []).map((q) => {
      if (q.id === 'q_perfect' && score === 'PERFECT') {
        return { ...q, current: Math.min(q.target, q.current + 1) };
      }
      if (q.id === 'q_pastry' && pastryBonus) {
        return { ...q, current: Math.min(q.target, q.current + 1) };
      }
      if (q.id === 'q_latte_art' && cupState.hasLatteArt) {
        return { ...q, current: Math.min(q.target, q.current + 1) };
      }
      return q;
    });

    // Update Rush Hour
    if (gameMode === 'RUSH_HOUR') {
      const nextCombo = score === 'PERFECT' ? rushStats.combo + 1 : score === 'GOOD' ? rushStats.combo : 0;
      const nextMultiplier = Math.min(4.0, 1.0 + nextCombo * 0.5);
      const points = Math.round((score === 'PERFECT' ? 250 : score === 'GOOD' ? 120 : 20) * nextMultiplier);

      setRushStats((prev) => ({
        ...prev,
        score: prev.score + points,
        combo: nextCombo,
        maxCombo: Math.max(prev.maxCombo, nextCombo),
        servedCount: prev.servedCount + 1,
        multiplier: nextMultiplier,
      }));
    }

    // Update Stats, XP & Coins
    const updatedEarnings = dailyStats.totalEarnings + targetRecipe.price + earnedTip;
    const updatedCoins = (dailyStats.coins || 0) + targetRecipe.price + earnedTip;
    const updatedTips = dailyStats.totalTips + earnedTip;
    const updatedXP = (dailyStats.xp || 0) + (score === 'PERFECT' ? 80 : 40);

    onUpdateDailyStats({
      totalEarnings: updatedEarnings,
      coins: updatedCoins,
      totalTips: updatedTips,
      xp: updatedXP,
      customersServed: dailyStats.customersServed + 1,
      perfectOrders: score === 'PERFECT' ? dailyStats.perfectOrders + 1 : dailyStats.perfectOrders,
      nearOrders: score === 'GOOD' ? dailyStats.nearOrders + 1 : dailyStats.nearOrders,
      failedOrders: score === 'FAILED' ? dailyStats.failedOrders + 1 : dailyStats.failedOrders,
      quests: updatedQuests,
    });
  };

  const handleNextCustomer = () => {
    playClick();
    setCustomerIndex((prev) => prev + 1);
    setCupState(INITIAL_CUP_STATE);
    setLastEvaluation(null);
  };

  return (
    <div className="w-full flex flex-col space-y-4 max-w-6xl mx-auto animate-in fade-in">
      
      {/* Top Utility Bar in Cohesive Pink */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onReturnToTitle}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9C6D79] hover:text-[#E84A74] bg-white/90 dark:bg-[#2A1220]/90 border border-[#F8D7DF] dark:border-[#5C2344] px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modes &amp; Title</span>
        </button>

        {/* Weather Controls */}
        <WeatherControls
          currentWeather={currentWeather}
          onChangeWeather={onChangeWeather}
        />

        {/* Right Feature Shortcuts */}
        <div className="flex items-center gap-2">
          {/* Smartphone BrewGram App Button */}
          <button
            onClick={() => { playClick(); setIsPhoneOpen(true); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FFF0F3] hover:bg-[#FDE8ED] text-[#E84A74] border border-[#F8D7DF] px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer relative"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E84A74]" />
            <span>BrewGram</span>
            <span className="w-2 h-2 rounded-full bg-[#E84A74] absolute -top-1 -right-1 animate-pulse"></span>
          </button>

          {/* Barista Skill Tree & Quests */}
          <button
            onClick={() => { playClick(); setIsSkillTreeOpen(true); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FFF0F3] hover:bg-[#FDE8ED] text-[#E84A74] border border-[#F8D7DF] px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#E84A74]" />
            <span>License (Lvl {Math.floor((dailyStats.xp || 0) / 200) + 1})</span>
          </button>

          {/* Cafe Boutique Shop */}
          <button
            onClick={() => { playClick(); setIsShopOpen(true); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FFF0F3] hover:bg-[#FDE8ED] text-[#E84A74] border border-[#F8D7DF] px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E84A74]" />
            <span>Shop (${dailyStats.coins || dailyStats.totalEarnings})</span>
          </button>
        </div>
      </div>

      {/* Mode-Specific HUDs */}
      {gameMode === 'RUSH_HOUR' && <RushHourHUD rushStats={rushStats} />}
      {gameMode === 'MYSTERY' && (
        <MysteryModeHUD
          customer={activeCustomer}
          cupState={cupState}
          onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
        />
      )}
      {gameMode === 'ZEN' && (
        <ZenSoundboard isRainActive={isRainActive} onToggleRain={onToggleRain} />
      )}

      {/* Customer Window & Living Mascot Mochi Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
        <div className="lg:col-span-9">
          <CustomerWindow
            customer={activeCustomer}
            emotion={customerEmotion}
            customDialogue={dialogueText}
            feedbackText={lastEvaluation?.feedbackText}
            targetRecipe={targetRecipe}
            evaluationResult={lastEvaluation}
            onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
            onSelectDialogueChoice={handleSelectDialogue}
            selectedChoiceId={selectedDialogueChoiceId}
            isMysteryMode={gameMode === 'MYSTERY'}
          />
        </div>

        {/* Counter Mascot Cat */}
        <div className="lg:col-span-3 flex justify-center py-2">
          <MochiCounterCat
            catHappiness={dailyStats.catHappiness || 85}
            onPetCat={handlePetCat}
            onFeedTreat={() => {
              onUpdateDailyStats({
                catHappiness: 100,
                xp: (dailyStats.xp || 0) + 30,
              });
            }}
          />
        </div>
      </div>

      {/* Bakery Showcase & Toaster Mini-Game */}
      <BakeryShowcase
        selectedPastry={cupState.selectedPastry || null}
        isPastryToasted={cupState.isPastryToasted || false}
        onSelectPastry={(pastry: PastryType) => {
          setCupState((prev) => ({ ...prev, selectedPastry: pastry, isPastryToasted: false }));
        }}
        onToastPastry={() => {
          setCupState((prev) => ({ ...prev, isPastryToasted: true }));
        }}
        onRemovePastry={() => {
          setCupState((prev) => ({ ...prev, selectedPastry: null, isPastryToasted: false }));
        }}
        disabled={Boolean(lastEvaluation)}
      />

      {/* Brewing Station & Ingredient Rack */}
      <BrewingCounter
        cupState={cupState}
        onSetBase={handleSetBase}
        onSetLiquid={handleSetLiquid}
        onToggleTemperature={handleToggleTemperature}
        onToggleExtra={handleToggleExtra}
        onResetCup={handleResetCup}
        onOpenLatteArt={() => setIsLatteArtOpen(true)}
        onServe={handleServeDrink}
        targetRecipe={targetRecipe}
        disabled={Boolean(lastEvaluation)}
        cupSkin={dailyStats.activeCupSkin}
        onShakeIce={handleShakeIce}
        activeDecor={dailyStats.activeDecor}
        unlockedSyrups={dailyStats.unlockedShopItems}
      />

      {/* Order Complete Banner */}
      {lastEvaluation && (
        <div className="w-full p-4 rounded-3xl bg-white/95 dark:bg-[#2A1220]/95 border-2 border-[#E84A74] shadow-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🌸</span>
            <div>
              <h4 className="font-serif font-black text-base text-[#4A2E35] dark:text-white">
                Order Complete! ({lastEvaluation.score})
              </h4>
              <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8]">
                Earned +${lastEvaluation.earnedTip} Tip • +{lastEvaluation.score === 'PERFECT' ? '80' : '40'} XP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playClick(); setIsPolaroidOpen(true); }}
              className="px-4 py-2.5 rounded-2xl bg-[#FFF0F3] hover:bg-[#FDE8ED] text-[#E84A74] border border-[#F8D7DF] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-[#E84A74]" />
              <span>Generate Polaroid Card</span>
            </button>

            <button
              onClick={handleNextCustomer}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#E84A74] to-[#D43862] hover:from-[#D43862] hover:to-[#BE185D] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Next Customer →
            </button>
          </div>
        </div>
      )}

      {/* Retro Cassette Jukebox on Counter */}
      <div className="pt-2 flex justify-center">
        <CassetteJukebox />
      </div>

      {/* Modals */}
      <RecipeBookModal isOpen={isRecipeBookOpen} onClose={() => setIsRecipeBookOpen(false)} />
      <LatteArtModal
        isOpen={isLatteArtOpen}
        onClose={() => setIsLatteArtOpen(false)}
        onSaveArt={handleSaveLatteArt}
        baseType={cupState.base || 'espresso'}
      />
      <PolaroidCardModal
        isOpen={isPolaroidOpen}
        onClose={() => setIsPolaroidOpen(false)}
        customer={activeCustomer}
        cupState={cupState}
        targetRecipe={targetRecipe}
        evaluationResult={lastEvaluation}
      />
      <CafeShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        dailyStats={dailyStats}
        onBuyItem={(item: ShopItem) => {
          const newCoins = (dailyStats.coins || dailyStats.totalEarnings) - item.price;
          const newUnlocked = [...(dailyStats.unlockedShopItems || []), item.id];
          onUpdateDailyStats({ coins: newCoins, unlockedShopItems: newUnlocked });
        }}
        onEquipCupSkin={(skinId: CupSkin) => {
          onUpdateDailyStats({ activeCupSkin: skinId });
        }}
        onToggleDecor={(decorId: string) => {
          const current = dailyStats.activeDecor || [];
          const exists = current.includes(decorId);
          const nextDecor = exists ? current.filter((d) => d !== decorId) : [...current, decorId];
          onUpdateDailyStats({ activeDecor: nextDecor });
        }}
      />
      <PhoneAppModal
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        onEarnXP={(amount: number) => {
          onUpdateDailyStats({ xp: (dailyStats.xp || 0) + amount });
        }}
      />
      <SkillTreeModal
        isOpen={isSkillTreeOpen}
        onClose={() => setIsSkillTreeOpen(false)}
        dailyStats={dailyStats}
        onUnlockSkill={(skillId: string, costXP: number) => {
          const newSkills = [...(dailyStats.unlockedSkills || []), skillId];
          onUpdateDailyStats({
            unlockedSkills: newSkills,
            xp: (dailyStats.xp || 0) - costXP,
          });
        }}
        onClaimQuestReward={(questId: string) => {
          const q = (dailyStats.quests || []).find((quest) => quest.id === questId);
          if (!q) return;
          const nextQuests = (dailyStats.quests || []).map((quest) =>
            quest.id === questId ? { ...quest, isCompleted: true } : quest
          );
          onUpdateDailyStats({
            coins: (dailyStats.coins || 0) + q.rewardCoins,
            xp: (dailyStats.xp || 0) + q.rewardXP,
            quests: nextQuests,
          });
        }}
      />

    </div>
  );
};
