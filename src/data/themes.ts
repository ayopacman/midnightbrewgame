import { ThemeMode } from '../types/game';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  emoji: string;
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  accentColor: string;
  accentHover: string;
  textColor: string;
  textMuted: string;
  headerBg: string;
  badgeBg: string;
  counterBg: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  blossom: {
    id: 'blossom',
    name: 'Sakura Blossom (Pastel Pink)',
    emoji: '🌸',
    bgGradient: 'from-[#FFF0F3] via-[#FFF5F7] to-[#FCE4EC]',
    cardBg: 'bg-white',
    borderColor: 'border-[#F8D7DF]',
    accentColor: 'bg-[#E84A74] text-white hover:bg-[#D43862]',
    accentHover: '#D43862',
    textColor: 'text-[#4A2E35]',
    textMuted: 'text-[#9C6D79]',
    headerBg: 'bg-white/95 border-[#F8D7DF]',
    badgeBg: 'bg-[#FFF0F3] text-[#E84A74] border-[#F8D7DF]',
    counterBg: 'bg-[#FFF5F7] border-[#F8D7DF]',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Rose (Velvet Plum)',
    emoji: '🌙',
    bgGradient: 'from-[#1A0B14] via-[#2A1220] to-[#3B172C]',
    cardBg: 'bg-[#2A1220]/90',
    borderColor: 'border-[#5C2344]',
    accentColor: 'bg-[#EC4899] text-white hover:bg-[#DB2777]',
    accentHover: '#DB2777',
    textColor: 'text-[#FDE8EF]',
    textMuted: 'text-[#D4A5B8]',
    headerBg: 'bg-[#1A0B14]/95 border-[#5C2344]',
    badgeBg: 'bg-[#3B172C] text-[#F472B6] border-[#5C2344]',
    counterBg: 'bg-[#2A1220] border-[#5C2344]',
  },
  matcha: {
    id: 'matcha',
    name: 'Strawberry Milk (Soft Blush)',
    emoji: '🍓',
    bgGradient: 'from-[#FFF1F5] via-[#FFE4ED] to-[#FFD6E5]',
    cardBg: 'bg-white',
    borderColor: 'border-[#FFC0D3]',
    accentColor: 'bg-[#F43F5E] text-white hover:bg-[#E11D48]',
    accentHover: '#E11D48',
    textColor: 'text-[#4C1D28]',
    textMuted: 'text-[#A25068]',
    headerBg: 'bg-white/95 border-[#FFC0D3]',
    badgeBg: 'bg-[#FFF1F5] text-[#F43F5E] border-[#FFC0D3]',
    counterBg: 'bg-[#FFE4ED] border-[#FFC0D3]',
  },
  caramel: {
    id: 'caramel',
    name: 'Dusty Rose Gold',
    emoji: '✨',
    bgGradient: 'from-[#FDF2F4] via-[#F8E7EB] to-[#F1D7DE]',
    cardBg: 'bg-white',
    borderColor: 'border-[#E8B8C5]',
    accentColor: 'bg-[#BE185D] text-white hover:bg-[#9D174D]',
    accentHover: '#9D174D',
    textColor: 'text-[#4A1525]',
    textMuted: 'text-[#8E4B5E]',
    headerBg: 'bg-white/95 border-[#E8B8C5]',
    badgeBg: 'bg-[#FDF2F4] text-[#BE185D] border-[#E8B8C5]',
    counterBg: 'bg-[#F8E7EB] border-[#E8B8C5]',
  },
};
