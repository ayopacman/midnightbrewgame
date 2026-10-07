import { ShopItem } from '../types/game';

export const SHOP_ITEMS: ShopItem[] = [
  // Cups
  {
    id: 'skin_ceramic',
    name: 'Artisan Ceramic Cup',
    category: 'cup',
    description: 'Classic handcrafted rose pastel ceramic mug with glossy glaze.',
    price: 0,
    icon: '☕',
    skinId: 'classic_ceramic',
  },
  {
    id: 'skin_glass',
    name: 'Frosted Glass Tumbler',
    category: 'cup',
    description: 'Double-walled thermal borosilicate glass cup showcasing liquid layers.',
    price: 350,
    icon: '🥛',
    skinId: 'glass_tumbler',
  },
  {
    id: 'skin_porcelain',
    name: 'Royal Vintage Porcelain',
    category: 'cup',
    description: 'Gold-gilded antique floral saucer and fine bone china cup.',
    price: 600,
    icon: '🫖',
    skinId: 'vintage_porcelain',
  },
  {
    id: 'skin_takeaway',
    name: 'Cyberpunk Neon Cup',
    category: 'cup',
    description: 'Glow-in-the-dark eco takeaway cup with holographic cafe sleeve.',
    price: 500,
    icon: '⚡',
    skinId: 'neon_takeaway',
  },

  // Cafe Decor
  {
    id: 'decor_neon_cat',
    name: 'Glowing Neon Cat Sign',
    category: 'decor',
    description: 'Vibrant pink neon sign shaped like a sleeping cat in a coffee cup.',
    price: 450,
    icon: '🐱',
  },
  {
    id: 'decor_fairy_lights',
    name: 'Warm Fairy Light Canopy',
    category: 'decor',
    description: 'Sparkling golden fairy string lights that cast a soft cozy shimmer.',
    price: 300,
    icon: '✨',
  },
  {
    id: 'decor_bonsai',
    name: 'Ceremonial Bonsai Tree',
    category: 'decor',
    description: 'Miniature 40-year-old pine bonsai bringing zen energy to the counter.',
    price: 400,
    icon: '🪴',
  },
  {
    id: 'decor_turntable',
    name: 'Vintage Vinyl Turntable',
    category: 'decor',
    description: 'Antique wooden record player that boosts the atmosphere.',
    price: 750,
    icon: '📻',
  },

  // Premium Syrups & Toppings
  {
    id: 'syrup_lavender',
    name: 'French Lavender Extract',
    category: 'syrup',
    description: 'Unlocks lavender cold foam and Provence syrup on the rack.',
    price: 250,
    icon: '🪻',
  },
  {
    id: 'syrup_honey',
    name: 'Wildflower Apiary Honey',
    category: 'syrup',
    description: 'Unlocks raw wildflower honey bottles for barista creations.',
    price: 200,
    icon: '🍯',
  },
];
