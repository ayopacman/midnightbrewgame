import { BaristaSkill } from '../types/game';

export const BARISTA_SKILLS: BaristaSkill[] = [
  {
    id: 'golden_crema',
    name: 'Golden Crema Mastery',
    description: 'Increases all espresso-based drink tip bonuses by +25%.',
    icon: '⭐',
    costXP: 100,
    unlocked: false,
  },
  {
    id: 'turbo_frother',
    name: 'Steam Wand Precision',
    description: 'Widens the perfect microfoam temperature zone for easier silky foam.',
    icon: '🥛',
    costXP: 150,
    unlocked: false,
  },
  {
    id: 'pastry_chef',
    name: 'Artisan Pastry Warmer',
    description: 'Pastries warm 50% faster and grant +$20 bonus tip on served pairs.',
    icon: '🥐',
    costXP: 200,
    unlocked: false,
  },
  {
    id: 'feline_charm',
    name: 'Cat Whisperer Aura',
    description: 'Mochi the cat attracts 20% more customer tips and bonus XP.',
    icon: '🐾',
    costXP: 250,
    unlocked: false,
  },
  {
    id: 'alchemist_flow',
    name: 'Coffee Alchemist',
    description: 'Unlocks glowing cosmic swirls and secret drink recipes.',
    icon: '✨',
    costXP: 400,
    unlocked: false,
  },
];
