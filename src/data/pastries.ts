import { PastryItem } from '../types/game';

export const PASTRIES: PastryItem[] = [
  {
    id: 'croissant',
    name: 'Flaky Butter Croissant',
    icon: '🥐',
    price: 90,
    description: 'Freshly baked French viennoiserie with 36 golden buttery layers.',
    warmRequired: true,
  },
  {
    id: 'matcha_mochi',
    name: 'Uji Matcha Daifuku Mochi',
    icon: '🍡',
    price: 110,
    description: 'Chewy sweet rice cake filled with sweetened Kyoto red bean paste.',
    warmRequired: false,
  },
  {
    id: 'cinnamon_roll',
    name: 'Warm Cinnamon Glaze Roll',
    icon: '🥮',
    price: 120,
    description: 'Swirled with Ceylon cinnamon sugar and warm vanilla cream icing.',
    warmRequired: true,
  },
  {
    id: 'shortcake',
    name: 'Strawberry Cloud Shortcake',
    icon: '🍰',
    price: 140,
    description: 'Japanese airy sponge cake with fresh strawberries and whipped cream.',
    warmRequired: false,
  },
  {
    id: 'waffle',
    name: 'Belgian Liege Waffle',
    icon: '🧇',
    price: 130,
    description: 'Crispy caramelized pearl sugar waffle served with wild honey.',
    warmRequired: true,
  },
];
