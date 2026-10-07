import React, { useState } from 'react';
import { ShopItem, CupSkin, DailyStats } from '../types/game';
import { SHOP_ITEMS } from '../data/shopItems';
import { playClick, playSuccessChime } from '../utils/audio';
import { X, ShoppingBag, Check, Sparkles, Coffee, Palette, Coins, Star } from 'lucide-react';

interface CafeShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyStats: DailyStats;
  onBuyItem: (item: ShopItem) => void;
  onEquipCupSkin: (skinId: CupSkin) => void;
  onToggleDecor: (decorId: string) => void;
}

export const CafeShopModal: React.FC<CafeShopModalProps> = ({
  isOpen,
  onClose,
  dailyStats,
  onBuyItem,
  onEquipCupSkin,
  onToggleDecor,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'cup' | 'decor' | 'syrup'>('all');

  if (!isOpen) return null;

  const filteredItems = activeTab === 'all' 
    ? SHOP_ITEMS 
    : SHOP_ITEMS.filter((i) => i.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#2A1220] rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border-2 border-[#F8D7DF] dark:border-[#5C2344] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-between bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFF0F3] dark:from-[#3B172C] dark:to-[#2A1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E84A74] text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg sm:text-xl text-[#4A2E35] dark:text-white">
                Midnight Cafe Boutique
              </h2>
              <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] font-medium">
                Spend your earned tips to unlock artisan cups, cozy decor &amp; rare syrups!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet Coins Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F8D7DF] text-[#E84A74] font-black text-sm shadow-xs">
              <Coins className="w-4 h-4 text-[#E84A74]" />
              <span>${dailyStats.coins || dailyStats.totalEarnings}</span>
            </div>

            <button
              onClick={() => { playClick(); onClose(); }}
              className="w-8 h-8 rounded-full bg-white dark:bg-[#3B172C] border border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-center text-[#9C6D79] hover:text-[#4A2E35] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-4 pt-3 flex items-center gap-2 border-b border-pink-100 dark:border-[#5C2344]">
          {(['all', 'cup', 'decor', 'syrup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { playClick(); setActiveTab(tab); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#E84A74] text-white shadow-xs'
                  : 'text-[#9C6D79] dark:text-[#D4A5B8] hover:bg-[#FFF0F3] dark:hover:bg-[#3B172C]'
              }`}
            >
              {tab === 'all' ? '✨ All Goods' : tab === 'cup' ? '☕ Mugs & Glass' : tab === 'decor' ? '🪴 Decor & Lights' : '🪻 Syrups'}
            </button>
          ))}
        </div>

        {/* Goods Catalog Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => {
            const isUnlocked = item.price === 0 || dailyStats.unlockedShopItems?.includes(item.id);
            const canAfford = (dailyStats.coins || dailyStats.totalEarnings) >= item.price;
            const isEquippedSkin = item.skinId && dailyStats.activeCupSkin === item.skinId;
            const isDecorActive = dailyStats.activeDecor?.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                  isEquippedSkin || isDecorActive
                    ? 'border-[#E84A74] bg-[#FFF0F3]/60 dark:bg-[#3B172C]/70 shadow-sm'
                    : 'border-[#F8D7DF] dark:border-[#5C2344] bg-white dark:bg-[#3B172C]'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] dark:bg-[#2A1220] border border-[#F8D7DF] flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#4A2E35] dark:text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {(isEquippedSkin || isDecorActive) && (
                        <span className="px-1.5 py-0.5 bg-[#E84A74] text-white text-[9px] font-bold rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-[#9C6D79] dark:text-[#D4A5B8] mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-between">
                  <span className="font-bold text-xs text-[#E84A74] dark:text-[#F472B6]">
                    {item.price === 0 ? 'Default' : `$${item.price}`}
                  </span>

                  {isUnlocked ? (
                    item.skinId ? (
                      <button
                        onClick={() => {
                          playClick();
                          onEquipCupSkin(item.skinId!);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isEquippedSkin
                            ? 'bg-pink-100 text-[#E84A74] cursor-default'
                            : 'bg-[#E84A74] text-white hover:bg-[#D43862]'
                        }`}
                      >
                        {isEquippedSkin ? 'Equipped' : 'Equip Mug'}
                      </button>
                    ) : item.category === 'decor' ? (
                      <button
                        onClick={() => {
                          playClick();
                          onToggleDecor(item.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isDecorActive
                            ? 'bg-[#E84A74] text-white'
                            : 'bg-[#FFF0F3] text-[#E84A74] border border-[#F8D7DF] hover:bg-[#FDE8ED]'
                        }`}
                      >
                        {isDecorActive ? 'Decor Placed ✓' : 'Place Decor'}
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-[#E84A74]">Unlocked In Rack ✓</span>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          playSuccessChime();
                          onBuyItem(item);
                        }
                      }}
                      disabled={!canAfford}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-[#E84A74] hover:bg-[#D43862] text-white shadow-xs'
                          : 'bg-pink-100 text-pink-300 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Purchase' : 'Need Tips'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
