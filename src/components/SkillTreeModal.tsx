import React from 'react';
import { BaristaSkill, DailyQuest, DailyStats } from '../types/game';
import { BARISTA_SKILLS } from '../data/skills';
import { playClick, playSuccessChime } from '../utils/audio';
import { X, Award, Zap, Check, Star, Target, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SkillTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyStats: DailyStats;
  onUnlockSkill: (skillId: string, costXP: number) => void;
  onClaimQuestReward: (questId: string) => void;
}

export const SkillTreeModal: React.FC<SkillTreeModalProps> = ({
  isOpen,
  onClose,
  dailyStats,
  onUnlockSkill,
  onClaimQuestReward,
}) => {
  if (!isOpen) return null;

  const currentLevel = Math.floor((dailyStats.xp || 0) / 200) + 1;
  const levelProgress = ((dailyStats.xp || 0) % 200) / 2;

  const getRankTitle = (lvl: number) => {
    if (lvl >= 5) return '👑 Grandmaster Rose Alchemist';
    if (lvl >= 3) return '☕ Senior Artisan Roaster';
    if (lvl >= 2) return '✨ Certified Shift Barista';
    return '🌱 Apprentice Brewer';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#2A1220] rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border-2 border-[#F8D7DF] dark:border-[#5C2344] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-between bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFF0F3] dark:from-[#3B172C] dark:to-[#2A1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E84A74] text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-black text-lg sm:text-xl text-[#4A2E35] dark:text-white">
                  Barista License &amp; Skill Tree
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF0F3] text-[#E84A74] border border-[#F8D7DF] text-xs font-black">
                  Lvl {currentLevel}
                </span>
              </div>
              <p className="text-xs text-[#9C6D79] dark:text-[#D4A5B8] font-medium">
                {getRankTitle(currentLevel)} • {dailyStats.xp || 0} Total Barista XP
              </p>
            </div>
          </div>

          <button
            onClick={() => { playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#3B172C] border border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-center text-[#9C6D79] hover:text-[#4A2E35] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div className="px-5 py-3 bg-[#FFF0F3]/60 dark:bg-[#3B172C]/40 border-b border-[#F8D7DF] dark:border-[#5C2344] flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-[#E84A74] dark:text-[#F472B6] mb-1">
              <span>Next Rank Progress</span>
              <span>{(dailyStats.xp || 0) % 200} / 200 XP</span>
            </div>
            <div className="w-full h-2.5 bg-pink-100 dark:bg-[#1A0B14] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F472B6] to-[#E84A74] transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* Section 1: Daily Quests */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#E84A74]">
              <Target className="w-4 h-4" />
              <span>Daily Shift Bounties</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(dailyStats.quests || []).map((q) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    q.isCompleted
                      ? 'bg-[#FFF0F3] border-[#E84A74]/50 text-[#E84A74]'
                      : 'bg-white dark:bg-[#3B172C] border-[#F8D7DF] dark:border-[#5C2344]'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#4A2E35] dark:text-white flex items-center gap-1">
                      {q.title}
                      {q.isCompleted && <Check className="w-3.5 h-3.5 text-[#E84A74]" />}
                    </h4>
                    <p className="text-[10px] text-[#9C6D79] dark:text-[#D4A5B8] mt-0.5">{q.description}</p>
                    <span className="text-[9px] font-bold text-[#E84A74] dark:text-[#F472B6] mt-1 block">
                      Reward: +${q.rewardCoins} &amp; +{q.rewardXP} XP ({q.current}/{q.target})
                    </span>
                  </div>

                  {!q.isCompleted && q.current >= q.target ? (
                    <button
                      onClick={() => {
                        playSuccessChime();
                        confetti({ particleCount: 40, spread: 50 });
                        onClaimQuestReward(q.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#E84A74] hover:bg-[#D43862] text-white font-bold text-xs shadow-xs animate-bounce cursor-pointer"
                    >
                      Claim!
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Barista Skill Perks */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#BE185D]">
              <Sparkles className="w-4 h-4" />
              <span>Permanent Barista Perks</span>
            </div>

            <div className="space-y-2.5">
              {BARISTA_SKILLS.map((skill) => {
                const isUnlocked = dailyStats.unlockedSkills?.includes(skill.id);
                const canAfford = (dailyStats.xp || 0) >= skill.costXP;

                return (
                  <div
                    key={skill.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      isUnlocked
                        ? 'bg-[#FFF0F3]/70 dark:bg-[#3B172C]/80 border-[#F8D7DF] dark:border-[#5C2344]'
                        : 'bg-white dark:bg-[#3B172C] border-[#F8D7DF] dark:border-[#5C2344]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FFF0F3] dark:bg-[#2A1220] border border-[#F8D7DF] flex items-center justify-center text-xl shrink-0 shadow-inner">
                        {skill.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#4A2E35] dark:text-white flex items-center gap-1.5">
                          <span>{skill.name}</span>
                          {isUnlocked && (
                            <span className="px-2 py-0.5 bg-[#FFF0F3] text-[#E84A74] border border-[#F8D7DF] text-[9px] font-bold rounded-full">
                              LEARNED ✓
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-[#9C6D79] dark:text-[#D4A5B8] mt-0.5">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            playSuccessChime();
                            confetti({ particleCount: 50, spread: 60 });
                            onUnlockSkill(skill.id, skill.costXP);
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                          canAfford
                            ? 'bg-[#E84A74] hover:bg-[#D43862] text-white font-black shadow-xs active:scale-95'
                            : 'bg-pink-100 text-pink-300 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? `Learn (${skill.costXP} XP)` : `${skill.costXP} XP needed`}
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-[#E84A74]">Active</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
