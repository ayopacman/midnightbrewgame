import { Customer } from '../types/game';

export const CUSTOMERS: Customer[] = [
  {
    id: 'maya',
    name: 'Maya',
    role: 'Night-Shift Coder',
    bio: 'Debugging production microservices at 2 AM. Powered strictly by iced caffeine and mechanical keyboards.',
    avatarSeed: 'maya',
    themeColor: '#7C3AED',
    targetRecipeId: 'iced_oat_caramel_macchiato',
    orderIntro: "Hey barista... server deployment is failing. I need something cold, smooth, and sweet to keep me awake until sunrise.",
    orderRiddle: "Give me an iced drink: bold espresso over creamy oat milk, drizzled with sweet salted caramel.",
    orderHint: "Base: Espresso • Liquid: Cold Milk & Ice • Extra: Salted Caramel Drizzle (Iced)",
    feedbackDelighted: "Oh wow! The layers and caramel are heavenly. My bug is solved and my sanity restored! Here is a fat tip.",
    feedbackContent: "Not bad! Keeps my brain overclocked for another sprint. Thanks!",
    feedbackDisappointed: "Wait... this isn't iced or has the wrong milk. My code is going to crash and burn tonight...",
    likesLatteArt: false,
    loyaltyLevel: 3,
    mysteryClues: [
      "I need ice-cold energy to beat the 2 AM server crash.",
      "The milk must be plant-based and naturally sweet.",
      "Finish it with a golden buttery swirl on top."
    ],
    dialogueChoices: [
      {
        id: 'c1',
        prompt: "Encourage her debugging session",
        baristaReply: "Take a deep breath, Maya. You'll squash that bug in no time.",
        customerResponse: "Thanks barista... your confidence is the boost I needed!",
        moodBonus: 15,
      },
      {
        id: 'c2',
        prompt: "Joke about restarting servers",
        baristaReply: "Have you tried turning the cloud off and on again?",
        customerResponse: "Haha! If only AWS had a giant physical power switch!",
        moodBonus: 10,
      }
    ]
  },
  {
    id: 'arthur',
    name: 'Professor Arthur',
    role: 'Retired Literature Scholar',
    bio: 'Carries antique leather notebooks and enjoys the rhythm of late-night raindrops on glass.',
    avatarSeed: 'arthur',
    themeColor: '#B45309',
    targetRecipeId: 'spiced_london_fog',
    orderIntro: "Good evening, my friend. The rain outside whispers of old Victorian autumns... I yearn for the fragrance of bergamot.",
    orderRiddle: "A warm cup steeped with dark Earl Grey tea, embraced by steamed milk, scented with vanilla and kissed with cinnamon spice.",
    orderHint: "Base: Black Tea • Liquid: Steamed Whole Milk • Extras: Vanilla Syrup + Cinnamon Dust (Hot)",
    feedbackDelighted: "Magnificent! The bergamot and cinnamon harmonize like a Shakespearean sonnet. Truly exquisite craft.",
    feedbackContent: "A lovely cup of warmth. It soothes the soul on a stormy night like this.",
    feedbackDisappointed: "Alas, this brew lacks the poetic harmony I sought. Perhaps the tea leaves were offended...",
    likesLatteArt: false,
    loyaltyLevel: 4,
    mysteryClues: [
      "A comforting warm infusion, not brewed from beans.",
      "Steeped with the citrus aroma of bergamot oil.",
      "Comforted by warm milk and bakery spices."
    ],
    dialogueChoices: [
      {
        id: 'a1',
        prompt: "Ask about his vintage book",
        baristaReply: "What classic tale are you reading tonight, Professor?",
        customerResponse: "Keats' poetry on autumn mist. It pairs divinely with your tea.",
        moodBonus: 20,
      },
      {
        id: 'a2',
        prompt: "Remark on the rain",
        baristaReply: "The storm outside makes every sip feel poetic, doesn't it?",
        customerResponse: "Indeed! Nature plays the finest cello accompaniment.",
        moodBonus: 12,
      }
    ]
  },
  {
    id: 'sora',
    name: 'Sora',
    role: 'Fine Arts Student',
    bio: 'Observes the world through brushstrokes and color palettes. Evaluates every cup by its crema canvas.',
    avatarSeed: 'sora',
    themeColor: '#EC4899',
    targetRecipeId: 'vanilla_latte',
    orderIntro: "Hi! I just finished my oil painting critique. I need a canvas in a cup to inspire my next gallery piece!",
    orderRiddle: "Serve me a classic velvet vanilla latte, and please paint a beautiful latte art foam design on top for me!",
    orderHint: "Base: Espresso • Liquid: Steamed Whole Milk • Extra: Vanilla Syrup (Hot) + Draw Latte Art!",
    feedbackDelighted: "A masterpiece! That foam art is museum-worthy! The vanilla microfoam is silky perfection.",
    feedbackContent: "Delicious latte! A bit more flourish in the latte art would make it surreal, but I love it.",
    feedbackDisappointed: "Oh no... the texture collapsed and there's no artistic soul in this cup.",
    likesLatteArt: true,
    loyaltyLevel: 5,
    mysteryClues: [
      "I desire a silky steamed canvas with a sweet floral note.",
      "A warm espresso base wrapped in velvety dairy foam.",
      "The visual presentation on top is everything to me!"
    ],
    dialogueChoices: [
      {
        id: 's1',
        prompt: "Compliment her creative eye",
        baristaReply: "I prepared the silkiest microfoam canvas just for your art critique!",
        customerResponse: "Aww thank you! I can feel the creative energy glowing!",
        moodBonus: 25,
      },
      {
        id: 's2',
        prompt: "Ask about the gallery exhibit",
        baristaReply: "When is your upcoming midnight gallery show?",
        customerResponse: "Next Friday! You have a VIP pass at the front counter!",
        moodBonus: 15,
      }
    ]
  },
  {
    id: 'kaito',
    name: 'Kaito',
    role: 'Cyberpunk Speedrunner',
    bio: 'Twitch streamer chasing world records in retro sci-fi games. Needs instant focus & maximum stamina.',
    avatarSeed: 'kaito',
    themeColor: '#06B6D4',
    targetRecipeId: 'iced_double_espresso',
    orderIntro: "Yo barista! I'm on sub-hour pace in the Neo-Tokyo boss rush! Give me the strongest turbo fuel you've got!",
    orderRiddle: "Two shots of intense dark espresso, served over chilling ice with zero fluff.",
    orderHint: "Base: Double Espresso • Liquid: Cold Milk & Ice • Extra: None (Iced)",
    feedbackDelighted: "LETS GOOO! Frame-perfect espresso shot! My reaction times just shot up 200%! World record incoming!",
    feedbackContent: "Solid fuel! Kept me from dropping a combo.",
    feedbackDisappointed: "Too slow or too diluted... I just dropped frames and lost the run!",
    likesLatteArt: false,
    loyaltyLevel: 2,
    mysteryClues: [
      "Maximum caffeine concentration, no sweet syrup distractions.",
      "Double power espresso extraction.",
      "Chilled to keep my processor cool."
    ],
    dialogueChoices: [
      {
        id: 'k1',
        prompt: "Cheer on the speedrun",
        baristaReply: "Lock in, Kaito! That world record is yours tonight!",
        customerResponse: "POGGERS! The chat is spamming coffee emotes right now!",
        moodBonus: 20,
      }
    ]
  },
  {
    id: 'beatrice',
    name: 'Madame Beatrice',
    role: 'Vintage Perfumer',
    bio: 'Formulates rare fragrances in glass alembics. Reads the world through top notes and base notes.',
    avatarSeed: 'beatrice',
    themeColor: '#9333EA',
    targetRecipeId: 'lavender_honey_cloud',
    orderIntro: "Bonsoir. The damp night air carries notes of petrichor... but my palate craves botanical elegance.",
    orderRiddle: "Delicate steeped black tea crowned with airy lavender foam and a drizzle of golden honey.",
    orderHint: "Base: Black Tea • Liquid: Lavender Foam • Extras: Lavender Syrup + Honey Drizzle (Hot)",
    feedbackDelighted: "Magnifique! The aroma of Provence lavender and honey is pure poetry. You possess a master perfumer's nose.",
    feedbackContent: "A charming floral harmony. Quite pleasant for the senses.",
    feedbackDisappointed: "Mon dieu... the fragrance accord is flat. It lacks delicate floral finesse.",
    likesLatteArt: true,
    loyaltyLevel: 3,
    mysteryClues: [
      "A soothing botanical tea base with aromatic floral notes.",
      "Crowned with purple floral microfoam.",
      "Kissed by natural golden honey."
    ],
    dialogueChoices: [
      {
        id: 'b1',
        prompt: "Discuss aroma extraction",
        baristaReply: "I infused the lavender at exactly 85 degrees to preserve the top notes.",
        customerResponse: "Remarkable precision! You truly understand the chemistry of scent.",
        moodBonus: 25,
      }
    ]
  },
  {
    id: 'mochi',
    name: 'Rin & Mochi',
    role: 'Stray Calico Cat Regular',
    bio: 'A sweet calico stray cat who taps on the cafe window whenever the rain begins. Loves warm treats.',
    avatarSeed: 'mochi',
    themeColor: '#F59E0B',
    targetRecipeId: 'puppuccino_bowl',
    orderIntro: "Meow... *paws against the rainy glass window and purrs warmly*",
    orderRiddle: "Warm frothed oat milk poured into a cozy bowl, topped with a giant fluffy whipped cream cloud and honey.",
    orderHint: "Base: Cold Brew/Black Tea (decaf base) or Matcha • Liquid: Steamed Oat Milk • Extras: Whipped Cream + Honey",
    feedbackDelighted: "*Purrrr!* Mochi happily licks the whipped cream cloud and nuzzles against your counter bell!",
    feedbackContent: "*Purrs softly and happily curls on the warm window sill cushion*",
    feedbackDisappointed: "*Meow... looks at the cup curiously with folded ears*",
    likesLatteArt: true,
    loyaltyLevel: 5,
    mysteryClues: [
      "Gentle, decaf warmth safe for a cozy feline friend.",
      "Steamed sweet oat milk with no harsh bitterness.",
      "Topped with a snowy mountain of whipped cream."
    ],
    dialogueChoices: [
      {
        id: 'm1',
        prompt: "Pet Mochi behind the ears",
        baristaReply: "Who's the best cafe mascot? Enjoy your warm treat, Mochi!",
        customerResponse: "*Purrrrrr loudly and rubs against your espresso tamper*",
        moodBonus: 30,
      }
    ]
  },
  {
    id: 'julian',
    name: 'Julian',
    role: 'Midnight Noir Novelist',
    bio: 'Typing on an old Remington typewriter under streetlamps. Loves brooding mysteries and dark cocoa.',
    avatarSeed: 'julian',
    themeColor: '#374151',
    targetRecipeId: 'cocoa_mocha_delight',
    orderIntro: "The city was dark, the rain unyielding. I needed something bitter, rich, and shrouded in cocoa mystery.",
    orderRiddle: "A double espresso hit with steamed milk, Dutch cocoa powder, and a swirl of whipped cream on top.",
    orderHint: "Base: Double Espresso • Liquid: Steamed Whole Milk • Extras: Dutch Cocoa + Whipped Cream (Hot)",
    feedbackDelighted: "Just like the climax of chapter twelve. Rich, intense, and leaving you wanting more.",
    feedbackContent: "A good companion for a writer's midnight vigil.",
    feedbackDisappointed: "Too light... the plot holes in my mystery are widening.",
    likesLatteArt: true,
    loyaltyLevel: 2,
    mysteryClues: [
      "A drink fit for a rainy detective novel.",
      "Double shot darkness infused with Dutch cocoa.",
      "Steamed whole milk crowned with whipped cream."
    ],
    dialogueChoices: [
      {
        id: 'j1',
        prompt: "Ask who the culprit is",
        baristaReply: "Did the detective catch the shadow in chapter five yet?",
        customerResponse: "The shadow was inside the cafe all along, my friend...",
        moodBonus: 20,
      }
    ]
  },
  {
    id: 'aria',
    name: 'Aria',
    role: 'Astrophysics Researcher',
    bio: 'Observing distant nebulae through the university telescope. Loves iced galaxy drinks while calculating orbital mechanics.',
    avatarSeed: 'aria',
    themeColor: '#3B82F6',
    targetRecipeId: 'galaxy_iced_macchiato',
    orderIntro: "Greetings! The skies tonight have zero cloud obstruction near Orion. I need a cosmic iced brew for telescope hours!",
    orderRiddle: "Chilled cold brew coffee over ice, layered with lavender foam and vanilla sweetness like a distant galaxy.",
    orderHint: "Base: Cold Brew • Liquid: Lavender Foam • Extras: Vanilla Syrup + Caramel Drizzle (Iced)",
    feedbackDelighted: "Spectacular! The color layers look like the Carina Nebula through a 14-inch mirror! 10 out of 10!",
    feedbackContent: "A well-balanced iced drink. Keeps my orbital calculations sharp.",
    feedbackDisappointed: "The layers collapsed into a singularity. Not quite the nebula I calculated.",
    likesLatteArt: false,
    loyaltyLevel: 4,
    mysteryClues: [
      "Smooth chilled cold brew base.",
      "Layered with celestial purple lavender foam.",
      "Ice-cold for stargazing nights under the telescope."
    ],
    dialogueChoices: [
      {
        id: 'ar1',
        prompt: "Ask about tonight's constellation",
        baristaReply: "Are the Pleiades visible through the cafe skylight tonight?",
        customerResponse: "Yes! Shining brightly right above the coffee chimney!",
        moodBonus: 22,
      }
    ]
  },
  {
    id: 'kenji',
    name: 'Kenji',
    role: 'Vinyl DJ & Record Collector',
    bio: 'Spins rare Japanese city pop and dusty soul 45s. Passionate about warm analog sound and warm spiced espresso.',
    avatarSeed: 'kenji',
    themeColor: '#D97706',
    targetRecipeId: 'cappuccino_cinnamon',
    orderIntro: "What's up! Just found an original 1982 Tatsuro Yamashita LP down the street. Need a warm spiced brew to match the groove.",
    orderRiddle: "An espresso with equal parts velvety steamed milk, topped with a generous dusting of cinnamon.",
    orderHint: "Base: Espresso • Liquid: Steamed Whole Milk • Extra: Ceylon Cinnamon Dust (Hot)",
    feedbackDelighted: "Analog warmth in a cup! That cinnamon hits like the horn section on a classic groove.",
    feedbackContent: "Smooth track. Keeps the tempo steady.",
    feedbackDisappointed: "A bit distorted, barista. The warmth was missing from the mix.",
    likesLatteArt: true,
    loyaltyLevel: 3,
    mysteryClues: [
      "Classic warm espresso and microfoam harmony.",
      "Ceylon spice dusted over the crema.",
      "Pairs best with soothing vinyl records."
    ],
    dialogueChoices: [
      {
        id: 'kj1',
        prompt: "Ask about his favorite vinyl record",
        baristaReply: "What album should we spin on the cafe turntable next?",
        customerResponse: "Put on some late-night City Pop and let the rain fall.",
        moodBonus: 20,
      }
    ]
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Rainy-Night Traveler',
    bio: 'Carrying a vintage suitcase with train tickets to everywhere. Seeking shelter and aromatic solace.',
    avatarSeed: 'elena',
    themeColor: '#059669',
    targetRecipeId: 'cappuccino_cinnamon',
    orderIntro: "The train station was so chilly tonight. May I please have a cozy, foamy cappuccino with warm spice?",
    orderRiddle: "An espresso with equal parts velvety steamed milk, topped with a generous dusting of cinnamon.",
    orderHint: "Base: Espresso • Liquid: Steamed Whole Milk • Extra: Ceylon Cinnamon Dust (Hot)",
    feedbackDelighted: "Mmm, the aroma of cinnamon reminds me of home. You make this cafe feel like a warm hug.",
    feedbackContent: "Very comforting! Just what my cold hands needed tonight.",
    feedbackDisappointed: "Hmm, it didn't quite warm my spirits. Maybe the temperature or spice was off.",
    likesLatteArt: true,
    loyaltyLevel: 3,
    mysteryClues: [
      "A warm companion for a cold train passenger.",
      "Equal parts espresso and steamed dairy foam.",
      "Spiced with soothing Ceylon cinnamon."
    ],
    dialogueChoices: [
      {
        id: 'e1',
        prompt: "Offer a warm napkin & welcome",
        baristaReply: "Rest your bags by the fireplace, Elena. You're always safe here.",
        customerResponse: "You don't know how much those words mean to a weary traveler.",
        moodBonus: 25,
      }
    ]
  },
  {
    id: 'chloe',
    name: 'Chloe',
    role: 'Botanical Florist',
    bio: 'Surrounds herself with lush orchids and moss. Craves earthy green ceremonial teas.',
    avatarSeed: 'chloe',
    themeColor: '#16A34A',
    targetRecipeId: 'matcha_cloud',
    orderIntro: "Konbanwa! After potting bonsai trees all evening, my spirit calls for fresh Uji green tea.",
    orderRiddle: "A serene cup of Japanese Matcha whisked with steamed oat milk, crowned with a fluffy whipped cream cloud.",
    orderHint: "Base: Uji Matcha • Liquid: Barista Oat Milk • Extra: Vanilla Whipped Cream (Hot)",
    feedbackDelighted: "Sublime! The earthiness of the matcha and the fluffy whipped cloud are in complete zen balance.",
    feedbackContent: "Good matcha flavor. It brings peace to a busy night.",
    feedbackDisappointed: "This doesn't taste like proper ceremonial matcha... the balance is broken.",
    likesLatteArt: false,
    loyaltyLevel: 4,
    mysteryClues: [
      "Vibrant green botanical powder whisked with water.",
      "Steamed plant-based oat milk.",
      "Crowned with a soft whipped cloud."
    ],
    dialogueChoices: [
      {
        id: 'ch1',
        prompt: "Ask about her newest bonsai",
        baristaReply: "How is the miniature juniper bonsai doing this season?",
        customerResponse: "It sprouted fresh green needles this morning! Full of vitality.",
        moodBonus: 20,
      }
    ]
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Jazz Saxophonist',
    bio: 'Plays midnight sets at the basement club next door. Appreciates deep bass and rich chocolate espresso.',
    avatarSeed: 'leo',
    themeColor: '#D97706',
    targetRecipeId: 'cocoa_mocha_delight',
    orderIntro: "Whew! Just wrapped up an intense blues improvisation. My lips need that dark cocoa rhythm.",
    orderRiddle: "A double espresso hit with steamed milk, Dutch cocoa powder, and a swirl of whipped cream on top.",
    orderHint: "Base: Double Espresso • Liquid: Steamed Whole Milk • Extras: Dutch Cocoa + Whipped Cream (Hot)",
    feedbackDelighted: "Yeah man! That double shot hits like a smooth saxophone solo in Bb minor! Pure velvet groove.",
    feedbackContent: "Solid brew! Keeps the rhythm rolling.",
    feedbackDisappointed: "Off-key, barista. That shot didn't have the blues punch I needed.",
    likesLatteArt: true,
    loyaltyLevel: 3,
    mysteryClues: [
      "Double strength espresso with rhythmic cocoa notes.",
      "Steamed dairy and sweet whipped cream.",
      "A late-night jazz club favorite."
    ],
    dialogueChoices: [
      {
        id: 'l1',
        prompt: "Praise the sax solo",
        baristaReply: "We could hear that soulful solo all the way from the coffee bar!",
        customerResponse: "Haha thanks! That melody was dedicated to Midnight Brew!",
        moodBonus: 22,
      }
    ]
  }
];
