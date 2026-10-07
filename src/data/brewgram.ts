import { BrewGramPost, CustomerChatThread } from '../types/game';

export const INITIAL_BREWGRAM_POSTS: BrewGramPost[] = [
  {
    id: 'post_sora',
    authorName: 'Sora 🎨',
    authorHandle: '@sora_artistry',
    avatarSeed: 'sora',
    text: 'Look at this breathtaking 3D cat foam art from @MidnightBrew! The velvety microfoam texture is surreal. Best cafe in town! ☕✨ #CoffeeArt #KawaiiVibes',
    imageUrl: '/cat_latte.jpg',
    likes: 248,
    rating: 5,
    timeAgo: '15m ago',
  },
  {
    id: 'post_maya',
    authorName: 'Maya (dev)',
    authorHandle: '@maya_codes_at_night',
    avatarSeed: 'maya',
    text: 'That Iced Strawberry Matcha Latte literally saved our production database from total meltdown. 10/10 caffeine deployment! 🚀🍓💻',
    imageUrl: '/strawberry_latte.jpg',
    likes: 189,
    rating: 5,
    timeAgo: '42m ago',
  },
  {
    id: 'post_critic',
    authorName: 'The Midnight Gourmet',
    authorHandle: '@underground_gourmet',
    avatarSeed: 'julian',
    text: 'Rarely does an indie midnight coffee bar combine exquisite rose porcelain aesthetics with authentic rainy nostalgia. A true Michelin-worthy coffee sanctuary. 🌸',
    imageUrl: '/hero-cup.png',
    likes: 412,
    rating: 5,
    timeAgo: '2h ago',
  },
  {
    id: 'post_clara',
    authorName: 'Clara 🥐',
    authorHandle: '@clara_botanist',
    avatarSeed: 'clara',
    text: 'Sunday morning perfection: warm strawberry cream croissant paired with iced rose milk latte under the soft morning sunlight. Utter bliss! 🍓🌸✨ #AestheticCafe #RosePetalLatte',
    imageUrl: '/rose_croissant.jpg',
    likes: 356,
    rating: 5,
    timeAgo: '3h ago',
  },
];

export const INITIAL_CHATS: CustomerChatThread[] = [
  {
    customerId: 'maya',
    customerName: 'Maya 👩‍💻',
    avatarSeed: 'maya',
    unread: true,
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Hey barista! Did you see our microservices survived the peak traffic? That strawberry macchiato was legendary!',
        timestamp: '02:45 AM',
      },
    ],
    pendingReplies: [
      {
        text: 'Glad to hear! Keep writing clean code, Maya.',
        response: 'Will do! Saving a seat for tomorrow night! ☕',
        xpBonus: 50,
      },
      {
        text: 'Next time try our Cold Brew with dark cocoa!',
        response: 'Ooh intriguing! Put me down for that on tomorrow\'s shift!',
        xpBonus: 50,
      },
    ],
  },
  {
    customerId: 'sora',
    customerName: 'Sora 🎨',
    avatarSeed: 'sora',
    unread: false,
    messages: [
      {
        id: 's1',
        sender: 'customer',
        text: 'My art professor loved the 3D cat coffee photo I posted on BrewGram! Sending you VIP gallery invites!',
        timestamp: '01:20 AM',
      },
    ],
    pendingReplies: [
      {
        text: 'Congratulations Sora! We\'ll feature your artwork on our cafe wall!',
        response: 'Omg really?! I will bring the framed canvas tomorrow!',
        xpBonus: 60,
      },
    ],
  },
];
