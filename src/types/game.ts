export type BaseType = 'espresso' | 'double_espresso' | 'matcha' | 'black_tea' | 'cold_brew';

export type LiquidType = 'hot_water' | 'steamed_milk' | 'oat_milk' | 'cold_milk' | 'lavender_foam';

export type TemperatureType = 'HOT' | 'ICED';

export type ExtraType = 
  | 'vanilla_syrup' 
  | 'caramel_drizzle' 
  | 'cinnamon_powder' 
  | 'cocoa_powder' 
  | 'whipped_cream'
  | 'lavender_syrup'
  | 'honey_drizzle'
  | 'chocolate_chips';

export type PastryType = 'croissant' | 'matcha_mochi' | 'cinnamon_roll' | 'shortcake' | 'waffle';

export type WeatherType = 'rain' | 'thunderstorm' | 'snow' | 'sunrise';

export type CupSkin = 'classic_ceramic' | 'glass_tumbler' | 'vintage_porcelain' | 'neon_takeaway';

export interface PastryItem {
  id: PastryType;
  name: string;
  icon: string;
  price: number;
  description: string;
  warmRequired: boolean;
}

export interface IngredientOption<T extends string> {
  id: T;
  name: string;
  category: 'base' | 'liquid' | 'extra';
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  accentColor: string;
}

export interface CupState {
  base: BaseType | null;
  liquid: LiquidType | null;
  temperature: TemperatureType;
  addIns: ExtraType[];
  canvasData: string | null;
  hasLatteArt: boolean;
  extractionQuality?: 'PERFECT' | 'GOOD' | 'NORMAL';
  steamQuality?: 'PERFECT' | 'GOOD' | 'NORMAL';
  isShaken?: boolean;
  selectedPastry?: PastryType | null;
  isPastryToasted?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  base: BaseType;
  liquid: LiquidType;
  temperature: TemperatureType;
  addIns: ExtraType[];
  requiresLatteArt?: boolean;
  recommendedPastry?: PastryType;
  flavorProfile: string[];
  sweetness: number;
  bitterness: number;
  warmth: number;
  creaminess: number;
  price: number;
  icon: string;
}

export type CustomerEmotion = 'normal' | 'thinking' | 'delighted' | 'content' | 'disappointed' | 'surprised' | 'playful';

export interface DialogueChoice {
  id: string;
  prompt: string;
  baristaReply: string;
  customerResponse: string;
  moodBonus: number;
}

export interface Customer {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarSeed: string;
  themeColor: string;
  targetRecipeId: string;
  targetPastryId?: PastryType;
  orderIntro: string;
  orderRiddle: string;
  orderHint: string;
  feedbackDelighted: string;
  feedbackContent: string;
  feedbackDisappointed: string;
  likesLatteArt: boolean;
  loyaltyLevel?: number;
  dialogueChoices?: DialogueChoice[];
  mysteryClues?: string[];
  favoriteGenre?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  rewardXP: number;
  current: number;
  target: number;
  isCompleted: boolean;
}

export interface BaristaSkill {
  id: string;
  name: string;
  description: string;
  icon: string;
  costXP: number;
  unlocked: boolean;
}

export interface BrewGramPost {
  id: string;
  authorName: string;
  authorHandle: string;
  avatarSeed: string;
  text: string;
  imageUrl?: string | null;
  likes: number;
  rating: number; // 1 - 5
  timeAgo: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'barista';
  text: string;
  timestamp: string;
}

export interface CustomerChatThread {
  customerId: string;
  customerName: string;
  avatarSeed: string;
  unread: boolean;
  messages: ChatMessage[];
  pendingReplies?: { text: string; response: string; xpBonus: number }[];
}

export interface DailyStats {
  day: number;
  customersServed: number;
  perfectOrders: number;
  nearOrders: number;
  failedOrders: number;
  totalTips: number;
  totalEarnings: number;
  reputation: number;
  unlockedRecipes: string[];
  coins: number;
  xp: number;
  level: number;
  unlockedSkills: string[];
  unlockedShopItems: string[];
  activeCupSkin: CupSkin;
  activeDecor: string[];
  catHappiness: number; // 0 - 100
  quests: DailyQuest[];
}

export type GameMode = 'STORY' | 'RUSH_HOUR' | 'MYSTERY' | 'ZEN' | 'LATTE_CHALLENGE';

export type GameState = 'TITLE' | 'PLAYING' | 'DAY_SUMMARY' | 'FREE_BREW';

export type ThemeMode = 'blossom' | 'midnight' | 'matcha' | 'caramel';

export interface EvaluationResult {
  score: 'PERFECT' | 'GOOD' | 'FAILED';
  earnedTip: number;
  feedbackText: string;
  emotion: CustomerEmotion;
  baseMatch: boolean;
  liquidMatch: boolean;
  tempMatch: boolean;
  extrasMatch: boolean;
  pastryMatch?: boolean;
  latteArtBonus: boolean;
  extractionBonus: boolean;
  steamBonus: boolean;
  breakdown: string[];
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'cup' | 'decor' | 'syrup' | 'radio';
  description: string;
  price: number;
  icon: string;
  skinId?: CupSkin;
}

export interface LatteChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Expert';
  description: string;
  targetTemplate: string;
  icon: string;
  targetStars: number;
  recommendedBase: BaseType;
}

export interface RushStats {
  timeLeft: number;
  score: number;
  combo: number;
  maxCombo: number;
  servedCount: number;
  multiplier: number;
}
