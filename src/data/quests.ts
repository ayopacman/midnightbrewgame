import { DailyQuest } from '../types/game';

export const INITIAL_QUESTS: DailyQuest[] = [
  {
    id: 'q_perfect',
    title: 'Precision Craft',
    description: 'Brew 3 PERFECT rating drinks.',
    rewardCoins: 150,
    rewardXP: 120,
    current: 0,
    target: 3,
    isCompleted: false,
  },
  {
    id: 'q_pastry',
    title: 'Cafe Combo Pair',
    description: 'Serve 2 customers with a warm pastry pairing.',
    rewardCoins: 120,
    rewardXP: 100,
    current: 0,
    target: 2,
    isCompleted: false,
  },
  {
    id: 'q_cat',
    title: 'Pamper Mochi',
    description: 'Pet Mochi the Cat 5 times.',
    rewardCoins: 80,
    rewardXP: 80,
    current: 0,
    target: 5,
    isCompleted: false,
  },
  {
    id: 'q_latte_art',
    title: 'Foam Picasso',
    description: 'Paint and serve 2 drinks with custom latte art.',
    rewardCoins: 160,
    rewardXP: 150,
    current: 0,
    target: 2,
    isCompleted: false,
  },
];
