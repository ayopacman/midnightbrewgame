import React, { useState, useEffect } from 'react';
import { GameState, GameMode, ThemeMode, DailyStats, ShopItem, CupSkin, WeatherType } from './types/game';
import { THEMES, ThemeConfig } from './data/themes';
import { INITIAL_QUESTS } from './data/quests';
import { Navbar } from './components/Navbar';
import { TitleScreen } from './components/TitleScreen';
import { CoffeeShop } from './components/CoffeeShop';
import { RecipeBookModal } from './components/RecipeBookModal';
import { LatteArtChallengeModal } from './components/LatteArtChallengeModal';
import { CafeShopModal } from './components/CafeShopModal';
import { toggleRainAmbience } from './utils/audio';

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [gameMode, setGameMode] = useState<GameMode>('STORY');
  const [themeMode, setThemeMode] = useState<ThemeMode>('blossom');
  const [weather, setWeather] = useState<WeatherType>('rain');
  const [isRainActive, setIsRainActive] = useState<boolean>(true);
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState<boolean>(false);
  const [isLatteMasterclassOpen, setIsLatteMasterclassOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);

  const [dailyStats, setDailyStats] = useState<DailyStats>(() => {
    try {
      const saved = localStorage.getItem('midnight_brew_save_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read save state from localStorage', e);
    }
    return {
      day: 1,
      customersServed: 0,
      perfectOrders: 0,
      nearOrders: 0,
      failedOrders: 0,
      totalTips: 0,
      totalEarnings: 0,
      reputation: 96,
      unlockedRecipes: ['classic_espresso', 'vanilla_latte'],
      coins: 300,
      xp: 60,
      level: 1,
      unlockedSkills: [],
      unlockedShopItems: ['skin_ceramic'],
      activeCupSkin: 'classic_ceramic',
      activeDecor: ['decor_fairy_lights'],
      catHappiness: 90,
      quests: INITIAL_QUESTS,
    };
  });

  // Auto-save progress to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('midnight_brew_save_v1', JSON.stringify(dailyStats));
    } catch (e) {
      console.warn('Could not write save state to localStorage', e);
    }
  }, [dailyStats]);

  const currentThemeConfig: ThemeConfig = THEMES[themeMode] || THEMES.blossom;

  const handleToggleRain = () => {
    const active = toggleRainAmbience();
    setIsRainActive(active);
  };

  const handleSelectMode = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('PLAYING');
  };

  const handleReturnToTitle = () => {
    setGameState('TITLE');
  };

  const handleUpdateDailyStats = (stats: Partial<DailyStats>) => {
    setDailyStats((prev) => ({
      ...prev,
      ...stats,
    }));
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentThemeConfig.bgGradient} ${currentThemeConfig.textColor} transition-colors duration-500 relative flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900`}
    >
      {/* Visual Rain & Weather Overlay */}
      {(weather === 'rain' || weather === 'thunderstorm') && isRainActive && (
        <div className="fixed inset-0 pointer-events-none z-30 opacity-40 overflow-hidden">
          <div className="rain-layer animate-rain"></div>
        </div>
      )}

      {/* Thunderstorm Lightning Flash Overlay */}
      {weather === 'thunderstorm' && (
        <div className="fixed inset-0 pointer-events-none z-30 bg-blue-200/10 animate-pulse"></div>
      )}

      {/* Snow Particles Overlay */}
      {weather === 'snow' && (
        <div className="fixed inset-0 pointer-events-none z-30 opacity-50 overflow-hidden flex justify-around text-white text-lg animate-pulse">
          <span>❄️</span><span>❄️</span><span>❄️</span><span>❄️</span><span>❄️</span><span>❄️</span><span>❄️</span>
        </div>
      )}

      {/* Sunrise Warm Sunbeam Overlay */}
      {weather === 'sunrise' && (
        <div className="fixed inset-0 pointer-events-none z-20 bg-gradient-to-b from-amber-400/10 via-transparent to-transparent"></div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        currentTheme={themeMode}
        onThemeChange={setThemeMode}
        onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        gameMode={gameMode}
        dailyStats={dailyStats}
        isRainActive={isRainActive}
        onToggleRain={handleToggleRain}
        onReturnToTitle={handleReturnToTitle}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
        {gameState === 'TITLE' && (
          <TitleScreen
            currentTheme={themeMode}
            onSelectMode={handleSelectMode}
            onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
            onOpenLatteArtStudio={() => setIsLatteMasterclassOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {gameState === 'PLAYING' && (
          <CoffeeShop
            onReturnToTitle={handleReturnToTitle}
            gameMode={gameMode}
            dailyStats={dailyStats}
            onUpdateDailyStats={handleUpdateDailyStats}
            isRainActive={isRainActive}
            onToggleRain={handleToggleRain}
            currentWeather={weather}
            onChangeWeather={setWeather}
          />
        )}
      </main>

      {/* Standalone Modals */}
      <RecipeBookModal
        isOpen={isRecipeBookOpen}
        onClose={() => setIsRecipeBookOpen(false)}
      />

      <LatteArtChallengeModal
        isOpen={isLatteMasterclassOpen}
        onClose={() => setIsLatteMasterclassOpen(false)}
        onCompleteChallenge={(challengeId, stars) => {
          handleUpdateDailyStats({
            coins: (dailyStats.coins || 0) + stars * 50,
            xp: (dailyStats.xp || 0) + stars * 60,
            reputation: Math.min(100, dailyStats.reputation + 2),
          });
        }}
      />

      <CafeShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        dailyStats={dailyStats}
        onBuyItem={(item: ShopItem) => {
          const newCoins = (dailyStats.coins || dailyStats.totalEarnings) - item.price;
          const newUnlocked = [...(dailyStats.unlockedShopItems || []), item.id];
          handleUpdateDailyStats({
            coins: newCoins,
            unlockedShopItems: newUnlocked,
          });
        }}
        onEquipCupSkin={(skinId: CupSkin) => {
          handleUpdateDailyStats({ activeCupSkin: skinId });
        }}
        onToggleDecor={(decorId: string) => {
          const current = dailyStats.activeDecor || [];
          const exists = current.includes(decorId);
          const nextDecor = exists ? current.filter((d) => d !== decorId) : [...current, decorId];
          handleUpdateDailyStats({ activeDecor: nextDecor });
        }}
      />
    </div>
  );
};

export default App;
