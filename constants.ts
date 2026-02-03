import {
  RotateCw,
  Star,
  Zap,
  Globe,
  Pencil,
  Layout,
  Search,
  Heart,
  MessageCircle,
  User,
  LucideIcon
} from 'lucide-react';

export const USER_DATA = {
  name: "Riku",
  age: 21,
  location: "Tokyo",
  avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png",  // 人間用アイコン
  characterAvatar: "/images/characters/char_me.png",  // AIキャラクター用
};

export const MY_PROFILE = {
  id: 0,
  name: "Me",
  image: USER_DATA.avatar
};

// ストーリーの型定義
export interface Story {
  id: number;
  content: string;
  source?: string;
}

export interface UserElement {
  label: string;
  type: "hobby" | "personality";
  stories: Story[];
}

// ユーザーの趣味・性格（Elements）
export const USER_ELEMENTS: UserElement[] = [
  {
    label: "Photography",
    type: "hobby",
    stories: [
      { id: 1, content: "高校時代から一眼レフを始めた", source: "photo_001.jpg" },
      { id: 2, content: "渋谷の街並みを撮るのが好き", source: "photo_002.jpg" },
    ]
  },
  {
    label: "Coffee",
    type: "hobby",
    stories: [
      { id: 1, content: "毎朝ハンドドリップで淹れる" },
      { id: 2, content: "お気に入りは深煎りのエチオピア" },
    ]
  },
  {
    label: "Reading",
    type: "hobby",
    stories: [
      { id: 1, content: "村上春樹の作品が好き" },
    ]
  },
  {
    label: "Gaming",
    type: "hobby",
    stories: [
      { id: 1, content: "RPGとシミュレーションが得意" },
    ]
  },
  {
    label: "Music",
    type: "hobby",
    stories: [
      { id: 1, content: "ジャズとシティポップをよく聴く" },
    ]
  },
  {
    label: "Cooking",
    type: "hobby",
    stories: [
      { id: 1, content: "イタリアンが得意" },
    ]
  },
  {
    label: "Travel",
    type: "hobby",
    stories: [
      { id: 1, content: "年に2回は国内旅行に行く" },
    ]
  },
  {
    label: "Anime",
    type: "hobby",
    stories: [
      { id: 1, content: "最近はSF系にハマっている" },
    ]
  },
  {
    label: "Hiking",
    type: "hobby",
    stories: [
      { id: 1, content: "高尾山は何度も登った" },
    ]
  },
  {
    label: "Art",
    type: "hobby",
    stories: [
      { id: 1, content: "美術館巡りが好き" },
    ]
  },
  {
    label: "Movies",
    type: "hobby",
    stories: [
      { id: 1, content: "ミニシアター系の映画が好き" },
    ]
  },
  {
    label: "Yoga",
    type: "hobby",
    stories: [
      { id: 1, content: "朝のルーティンとして続けている" },
    ]
  },
  {
    label: "Introvert",
    type: "personality",
    stories: [
      { id: 1, content: "一人の時間が必要なタイプ" },
      { id: 2, content: "少人数の深い会話が好き" },
    ]
  },
  {
    label: "Creative",
    type: "personality",
    stories: [
      { id: 1, content: "アイデアを考えるのが好き" },
    ]
  },
  {
    label: "Curious",
    type: "personality",
    stories: [
      { id: 1, content: "新しいことを学ぶのが楽しい" },
    ]
  },
  {
    label: "Calm",
    type: "personality",
    stories: [
      { id: 1, content: "慌てずに物事を考えるタイプ" },
    ]
  },
  {
    label: "Kind",
    type: "personality",
    stories: [
      { id: 1, content: "困っている人は放っておけない" },
    ]
  },
  {
    label: "Honest",
    type: "personality",
    stories: [
      { id: 1, content: "嘘がつけない性格" },
    ]
  },
  {
    label: "Optimist",
    type: "personality",
    stories: [
      { id: 1, content: "なんとかなると思って生きている" },
    ]
  },
];

export const STATS = [
  { icon: RotateCw, count: 3, color: "text-green-500", label: "Refresh" },
  { icon: Star, count: 2, color: "text-blue-500", label: "Stars" },
  { icon: Zap, count: 0, color: "text-purple-500", label: "Boosts" },
  { icon: Globe, count: 0, color: "text-yellow-500", label: "Web" },
];

export const MENU_ITEMS: { icon: typeof Pencil; label: string }[] = [];

export const NAV_ITEMS = [
  { icon: Layout, label: "Feed", active: false },
  { icon: Search, label: "Explorer", active: false },
  { icon: Heart, label: "Likes", active: false },
  { icon: MessageCircle, label: "Chat", active: false },
  { icon: User, label: "Account", active: true },
];

// マッチング候補
export const MATCH_CANDIDATE = {
  name: "Emily",
  age: 23,
  location: "Osaka",
  avatar: "https://ftrfpbrgnjkqgzaggkdz.supabase.co/storage/v1/object/public/profile-avatar/generated-avatars/7e9e5d27-4daa-426f-b4c7-e31e5a2c8045/20260121_043055.png",
  interests: ["Photography", "Coffee", "Hiking", "Indie Music"],
};

// 共通の趣味
export const SHARED_INTERESTS = ["Photography", "Coffee"];

// AI会話スクリプト
export const AI_CONVERSATION: Array<{
  sender: 'user' | 'match';
  message: string;
}> = [
  { sender: 'user', message: "Hi! I heard we both love photography!" },
  { sender: 'match', message: "Yes! I'm really into street photography lately." },
  { sender: 'user', message: "That's cool! Do you have a favorite camera?" },
  { sender: 'match', message: "I use a Fujifilm X100V. The colors are amazing!" },
  { sender: 'user', message: "Nice choice! I've been wanting to try Fujifilm." },
  { sender: 'match', message: "You should! Want to go on a photo walk sometime?" },
];

// 友達のイベント型
export interface FriendEvent {
  id: string;
  title: string;
  emoji: string;
  date: string;
  description?: string;  // AI会話履歴画面でのみ表示
}

// 友達プロフィール型
export interface FriendProfile {
  id: number;
  userId: string;  // @username 形式
  name: string;
  image: string;
  hobbies: string[];
  personality: string[];
  events: FriendEvent[];
}

// 友達一覧（交換済みカード）
export const FRIENDS_LIST: FriendProfile[] = [
  {
    id: 1,
    userId: "@momo_123",
    name: "Momo",
    image: "/images/characters/char16.png",
    hobbies: ["Photography", "Coffee", "Art"],
    personality: ["Introvert", "Creative"],
    events: [
      { id: 'momo-1', title: 'Found a hidden cafe in Shimokita', emoji: '☕', date: '2 hours ago', description: 'Stumbled upon this cozy underground cafe with amazing jazz music. The owner is super friendly!' },
      { id: 'momo-2', title: 'Finished a new painting', emoji: '🎨', date: '1 day ago', description: 'Finally completed my abstract landscape series. Feeling accomplished!' },
    ]
  },
  {
    id: 2,
    userId: "@kento_game",
    name: "Kento",
    image: "/images/characters/char17.png",
    hobbies: ["Gaming", "Anime", "Music"],
    personality: ["Extrovert", "Energetic"],
    events: [
      { id: 'kento-1', title: 'Finally beat the final boss!', emoji: '🎮', date: '5 hours ago', description: 'After 50+ attempts, I finally did it! The secret was to use the ice element combo.' },
      { id: 'kento-2', title: 'New anime season is amazing', emoji: '✨', date: '2 days ago', description: 'The new season of my favorite anime just dropped. The animation quality is insane!' },
    ]
  },
  {
    id: 3,
    userId: "@nina_yoga",
    name: "Nina",
    image: "/images/characters/char18.png",
    hobbies: ["Reading", "Yoga", "Travel"],
    personality: ["Calm", "Thoughtful"],
    events: [
      { id: 'nina-1', title: 'Morning yoga by the river', emoji: '🧘', date: '3 hours ago', description: 'The sunrise was beautiful today. Perfect way to start the morning.' },
      { id: 'nina-2', title: 'Started a new book', emoji: '📚', date: '1 day ago', description: 'Reading "The Midnight Library" by Matt Haig. Already hooked!' },
    ]
  },
  {
    id: 4,
    userId: "@ryo_chef",
    name: "Ryo",
    image: "/images/characters/char19.png",
    hobbies: ["Cooking", "Movies", "Music"],
    personality: ["Kind", "Romantic"],
    events: [
      { id: 'ryo-1', title: 'Made homemade pasta today', emoji: '🍝', date: '4 hours ago', description: 'Tried making carbonara from scratch. The key is tempering the eggs slowly!' },
      { id: 'ryo-2', title: 'Watched a classic film', emoji: '🎬', date: '2 days ago', description: 'Finally watched Cinema Paradiso. Cried at the ending.' },
    ]
  },
  {
    id: 5,
    userId: "@sora_hike",
    name: "Sora",
    image: "/images/characters/char20.png",
    hobbies: ["Hiking", "Photography", "Cooking"],
    personality: ["Adventurous", "Optimist"],
    events: [
      { id: 'sora-1', title: 'Climbed Mt. Takao again!', emoji: '⛰️', date: '1 day ago', description: 'Took the challenging trail this time. The view from the top was worth every step!' },
      { id: 'sora-2', title: 'Captured a beautiful sunset', emoji: '📷', date: '3 days ago', description: 'Golden hour at the beach. Got some amazing shots for my portfolio.' },
    ]
  },
  {
    id: 6,
    userId: "@leon_play",
    name: "Leon",
    image: "/images/characters/char21.png",
    hobbies: ["Gaming", "Anime", "Coffee"],
    personality: ["Introvert", "Curious"],
    events: [
      { id: 'leon-1', title: 'New game release day!', emoji: '🕹️', date: '6 hours ago', description: 'Picked up the collector\'s edition. Already 10 hours in!' },
    ]
  },
  {
    id: 7,
    userId: "@akane_art",
    name: "Akane",
    image: "/images/characters/char22.png",
    hobbies: ["Art", "Music", "Reading"],
    personality: ["Creative", "Honest"],
    events: [
      { id: 'akane-1', title: 'Visited a new art exhibition', emoji: '🖼️', date: '1 day ago', description: 'Saw some incredible digital art pieces at the Roppongi gallery. Super inspiring!' },
      { id: 'akane-2', title: 'Learning to play guitar', emoji: '🎸', date: '4 days ago', description: 'Just started lessons. My fingers hurt but I can play a basic chord now!' },
    ]
  },
  {
    id: 8,
    userId: "@kai_travel",
    name: "Kai",
    image: "/images/characters/char23.png",
    hobbies: ["Travel", "Hiking", "Photography"],
    personality: ["Adventurous", "Extrovert"],
    events: [
      { id: 'kai-1', title: 'Planning a trip to Kyoto', emoji: '🗾', date: '2 hours ago', description: 'Researching temples and hidden spots. Can\'t wait for the autumn leaves!' },
      { id: 'kai-2', title: 'Found a secret hiking trail', emoji: '🥾', date: '3 days ago', description: 'Discovered this unmarked path that leads to an amazing waterfall.' },
    ]
  },
  {
    id: 9,
    userId: "@miku_chill",
    name: "Miku",
    image: "/images/characters/char24.png",
    hobbies: ["Movies", "Coffee", "Yoga"],
    personality: ["Calm", "Kind"],
    events: [
      { id: 'miku-1', title: 'Cozy movie night at home', emoji: '🍿', date: '8 hours ago', description: 'Watched three Studio Ghibli films in a row. Perfect rainy day activity!' },
    ]
  },
  {
    id: 10,
    userId: "@yuto_cook",
    name: "Yuto",
    image: "/images/characters/char25.png",
    hobbies: ["Cooking", "Gaming", "Travel"],
    personality: ["Curious", "Optimist"],
    events: [
      { id: 'yuto-1', title: 'Tried a new ramen recipe', emoji: '🍜', date: '5 hours ago', description: 'Made tonkotsu broth from scratch. Simmered it for 12 hours!' },
      { id: 'yuto-2', title: 'Booked flight to Okinawa', emoji: '✈️', date: '2 days ago', description: 'First time visiting! Planning to explore the beaches and try local food.' },
    ]
  },
];

// 友達の友達一覧（検索候補）
export const FRIENDS_OF_FRIENDS_LIST: FriendProfile[] = [
  {
    id: 101,
    userId: "@yuki_art",
    name: "Yuki",
    image: "/images/characters/char16.png",
    hobbies: ["Art", "Photography", "Coffee"],
    personality: ["Creative", "Calm"],
    events: []
  },
  {
    id: 102,
    userId: "@haru_music",
    name: "Haru",
    image: "/images/characters/char17.png",
    hobbies: ["Music", "Gaming", "Movies"],
    personality: ["Energetic", "Optimist"],
    events: []
  },
  {
    id: 103,
    userId: "@ren_travel",
    name: "Ren",
    image: "/images/characters/char18.png",
    hobbies: ["Travel", "Hiking", "Cooking"],
    personality: ["Adventurous", "Kind"],
    events: []
  },
  {
    id: 104,
    userId: "@mei_yoga",
    name: "Mei",
    image: "/images/characters/char19.png",
    hobbies: ["Yoga", "Reading", "Coffee"],
    personality: ["Calm", "Thoughtful"],
    events: []
  },
  {
    id: 105,
    userId: "@taro_game",
    name: "Taro",
    image: "/images/characters/char20.png",
    hobbies: ["Gaming", "Anime", "Music"],
    personality: ["Curious", "Honest"],
    events: []
  },
  {
    id: 106,
    userId: "@sakura_photo",
    name: "Sakura",
    image: "/images/characters/char21.png",
    hobbies: ["Photography", "Art", "Travel"],
    personality: ["Creative", "Extrovert"],
    events: []
  },
  {
    id: 107,
    userId: "@kazu_cook",
    name: "Kazu",
    image: "/images/characters/char22.png",
    hobbies: ["Cooking", "Movies", "Gaming"],
    personality: ["Kind", "Introvert"],
    events: []
  },
  {
    id: 108,
    userId: "@nana_read",
    name: "Nana",
    image: "/images/characters/char23.png",
    hobbies: ["Reading", "Music", "Yoga"],
    personality: ["Thoughtful", "Honest"],
    events: []
  },
];

// 診断タイプ
export interface DiagnosticType {
  id: string;
  image: string;
  title: string;
  description: string;
  gradient: string;
  textDark?: boolean;
}

export const DIAGNOSTIC_TYPES: DiagnosticType[] = [
  {
    id: 'love',
    image: '/images/emoji/sparkling_heart_3d.png',
    title: 'Love Compatibility',
    description: 'Discover your romantic match potential',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 'friendship',
    image: '/images/emoji/people_hugging_3d.png',
    title: 'Friendship Diagnosis',
    description: 'Find your ideal friend type',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'hobbies',
    image: '/images/emoji/sparkles_3d.png',
    title: 'Hidden Common Hobbies',
    description: 'Uncover shared interests',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    id: 'marriage',
    image: '/images/emoji/ring_3d.png',
    title: 'Marriage Compatibility',
    description: 'Explore long-term potential',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'date',
    image: '/images/emoji/round_pushpin_3d.png',
    title: 'Date Plan Suggestions',
    description: 'Get personalized date ideas',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

// グループ診断タイプ（4〜8人用）
export interface GroupDiagnosticType {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

export const GROUP_DIAGNOSTIC_TYPES: GroupDiagnosticType[] = [
  {
    id: 'dna_soulmates',
    image: '/images/emoji/dna_3d.png',
    title: 'DNA-Level Soulmates',
    subtitle: 'Best Couple Award',
    description: 'Find the pair with the deepest genetic connection',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'chaos_catalyst',
    image: '/images/emoji/collision_3d.png',
    title: 'Volatile Chemistry',
    subtitle: 'Chaos Catalyst Duo Award',
    description: 'Warning: Do Not Mix! Explosive combo detected',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'one_night_mistake',
    image: '/images/emoji/see_no_evil_monkey_3d.png',
    title: 'One Night Mistake',
    subtitle: 'Regret-in-the-Making Award',
    description: 'The pair most likely to make questionable decisions',
    gradient: 'from-violet-500 to-purple-700',
  },
];

// AI会話のトリガー理由
export interface AIConversationTrigger {
  type: 'shared_hobby' | 'interesting_event' | 'sympathy';
  hobby?: string;        // 共通の趣味
  event?: FriendEvent;   // トリガーになったイベント
  reason: string;        // 表示用の理由テキスト
}

// DMメッセージ型
export interface DMMessage {
  id: string;
  sender: 'user' | 'other';
  message: string;
  timestamp: string;
  isAI?: boolean;  // AIが代わりに書いたメッセージか
  aiTrigger?: AIConversationTrigger;  // 最初のAIメッセージのみ
}

// DMチャット型
export interface DMChat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
  hasAIMessage?: boolean;  // AI会話があるか
  aiReason?: string;       // チャット一覧でのAI表示用
}

// DM チャットリスト（友達一覧の画像を使用）
export const DM_CHATS: DMChat[] = [
  {
    id: '1',
    name: 'Momo',
    avatar: '/images/characters/char16.png',
    lastMessage: "Ethiopian beans are the best! Would love to check it out sometime.",
    timestamp: '2h',
    unread: false,
    online: true,
    hasAIMessage: true,
    aiReason: "You both love Coffee",
  },
  {
    id: '2',
    name: 'Kento',
    avatar: '/images/characters/char17.png',
    lastMessage: "That cafe was amazing! 🍵",
    timestamp: '15m',
    unread: true,
    online: true,
    hasAIMessage: false,
  },
  {
    id: '3',
    name: 'Nina',
    avatar: '/images/characters/char18.png',
    lastMessage: "See you at the gaming event!",
    timestamp: '1h',
    unread: false,
    online: false,
    hasAIMessage: false,
  },
  {
    id: '4',
    name: 'Ryo',
    avatar: '/images/characters/char19.png',
    lastMessage: "I always mess up that part! Would love to learn your technique.",
    timestamp: '4h',
    unread: false,
    online: true,
    hasAIMessage: true,
    aiReason: "You both love Cooking",
  },
  {
    id: '5',
    name: 'Sora',
    avatar: '/images/characters/char20.png',
    lastMessage: "Great tips! Maybe we could do a photo walk together?",
    timestamp: '10h',
    unread: false,
    online: false,
    hasAIMessage: true,
    aiReason: "You both love Photography",
  },
  {
    id: '6',
    name: 'Leon',
    avatar: '/images/characters/char21.png',
    lastMessage: "Great playlist recommendation 🎵",
    timestamp: '2d',
    unread: false,
    online: false,
    hasAIMessage: false,
  },
];

// DM 会話詳細 (各チャットごとのメッセージ)
export const DM_MESSAGES_BY_CHAT: Record<string, DMMessage[]> = {
  '1': [
    // Momo - AI同士のラリー（4回）
    {
      id: 'ai-1',
      sender: 'other',
      message: "Hey! Momo found an amazing hidden cafe in Shimokita today ☕ You both love coffee - maybe you could check it out together?",
      timestamp: '14:30',
      isAI: true,
      aiTrigger: {
        type: 'shared_hobby',
        hobby: 'Coffee',
        event: { id: 'momo-1', title: 'Found a hidden cafe in Shimokita', emoji: '☕', date: '2 hours ago' },
        reason: "You both love Coffee"
      }
    },
    {
      id: 'ai-2',
      sender: 'user',
      message: "Oh nice! I love finding new coffee spots. What kind of beans do they use?",
      timestamp: '14:32',
      isAI: true,
    },
    {
      id: 'ai-3',
      sender: 'other',
      message: "They have single origin Ethiopian - your favorite! The latte art is beautiful too 🎨",
      timestamp: '14:35',
      isAI: true,
    },
    {
      id: 'ai-4',
      sender: 'user',
      message: "Ethiopian beans are the best! Would love to check it out sometime. Thanks for sharing!",
      timestamp: '14:38',
      isAI: true,
    },
  ],
  '2': [
    // Kento - 通常の会話
    { id: '1', sender: 'other', message: "Hey! Nice to meet you 👋", timestamp: '10:30' },
    { id: '2', sender: 'user', message: "Hi Kento! Nice to meet you too!", timestamp: '10:32' },
    { id: '3', sender: 'other', message: "I saw we both love gaming!", timestamp: '10:33' },
    { id: '4', sender: 'user', message: "Yes! What games do you play?", timestamp: '10:35' },
    { id: '5', sender: 'other', message: "That cafe was amazing! 🍵", timestamp: '10:36' },
  ],
  '3': [
    // Nina - 通常の会話
    { id: '1', sender: 'other', message: "Looking forward to the gaming event!", timestamp: '09:00' },
    { id: '2', sender: 'user', message: "Me too! What time should we meet?", timestamp: '09:15' },
    { id: '3', sender: 'other', message: "See you at the gaming event!", timestamp: '09:30' },
  ],
  '4': [
    // Ryo - AI同士のラリー（4回）
    {
      id: 'ai-1',
      sender: 'other',
      message: "Ryo just made homemade pasta from scratch! 🍝 Since you're both into cooking, maybe you could swap recipes?",
      timestamp: '16:45',
      isAI: true,
      aiTrigger: {
        type: 'shared_hobby',
        hobby: 'Cooking',
        event: { id: 'ryo-1', title: 'Made homemade pasta today', emoji: '🍝', date: '4 hours ago' },
        reason: "You both love Cooking"
      }
    },
    {
      id: 'ai-2',
      sender: 'user',
      message: "Wow, homemade pasta! That's impressive. Did you make the sauce too?",
      timestamp: '16:48',
      isAI: true,
    },
    {
      id: 'ai-3',
      sender: 'other',
      message: "Yes! Carbonara with fresh eggs. The key is tempering them slowly so they don't scramble 🥚",
      timestamp: '16:52',
      isAI: true,
    },
    {
      id: 'ai-4',
      sender: 'user',
      message: "I always mess up that part! Would love to learn your technique sometime.",
      timestamp: '16:55',
      isAI: true,
    },
  ],
  '5': [
    // Sora - AI同士のラリー（4回）
    {
      id: 'ai-1',
      sender: 'other',
      message: "Sora captured some incredible sunset photos yesterday! 📷 You both love photography - would love to see you share tips!",
      timestamp: '10:15',
      isAI: true,
      aiTrigger: {
        type: 'shared_hobby',
        hobby: 'Photography',
        event: { id: 'sora-2', title: 'Captured a beautiful sunset', emoji: '📷', date: '3 days ago' },
        reason: "You both love Photography"
      }
    },
    {
      id: 'ai-2',
      sender: 'user',
      message: "Those sunset shots look amazing! What camera settings did you use?",
      timestamp: '10:20',
      isAI: true,
    },
    {
      id: 'ai-3',
      sender: 'other',
      message: "Shot at f/8, ISO 100, with a graduated ND filter. Golden hour is magical! ✨",
      timestamp: '10:25',
      isAI: true,
    },
    {
      id: 'ai-4',
      sender: 'user',
      message: "Great tips! I've been wanting to try ND filters. Maybe we could do a photo walk together?",
      timestamp: '10:30',
      isAI: true,
    },
  ],
  '6': [
    // Leon - 通常の会話
    { id: '1', sender: 'other', message: "Have you heard this new album?", timestamp: '15:00' },
    { id: '2', sender: 'user', message: "Not yet! Send me the link?", timestamp: '15:30' },
    { id: '3', sender: 'other', message: "Great playlist recommendation 🎵", timestamp: '16:00' },
  ],
};

// --- 今日の一行 (Today's One Line) ---

export interface TodayOneLine {
  friendId: number;
  title: string;
  characterImage: string;
}

export const FRIEND_ONE_LINES: TodayOneLine[] = [
  { friendId: 1, title: "Hidden cafe in Shimokita changed my life", characterImage: "/images/characters/char16.png" },
  { friendId: 2, title: "Finally beat the boss after 50 tries!", characterImage: "/images/characters/char17.png" },
  { friendId: 3, title: "Sunrise yoga by the river was magical", characterImage: "/images/characters/char18.png" },
  { friendId: 4, title: "Made the perfect carbonara from scratch", characterImage: "/images/characters/char19.png" },
  { friendId: 5, title: "Mt. Takao trail had the best view ever", characterImage: "/images/characters/char20.png" },
  { friendId: 6, title: "10 hours into the new RPG already", characterImage: "/images/characters/char21.png" },
  { friendId: 7, title: "Digital art at Roppongi blew my mind", characterImage: "/images/characters/char22.png" },
  { friendId: 8, title: "Found a secret waterfall on a hidden trail", characterImage: "/images/characters/char23.png" },
  { friendId: 9, title: "Ghibli marathon on a rainy day = perfect", characterImage: "/images/characters/char24.png" },
  { friendId: 10, title: "12-hour tonkotsu broth was worth it", characterImage: "/images/characters/char25.png" },
];

export interface MyOneLineCandidate {
  id: number;
  title: string;
  characterImage: string;
}

export const MY_ONE_LINE_CANDIDATES: MyOneLineCandidate[] = [
  { id: 1, title: "Tokyo streets at golden hour hit different", characterImage: "/images/characters/char_me.png" },
  { id: 2, title: "Ethiopian pour-over before sunrise ritual", characterImage: "/images/characters/char_me.png" },
  { id: 3, title: "Lost in a Murakami novel all afternoon", characterImage: "/images/characters/char_me.png" },
];

// --- 4者チャットメッセージ (Four Person Chat) ---

export type FourPersonSender = 'user' | 'friend' | 'userAI' | 'friendAI';

export interface FourPersonMessage {
  id: string;
  sender: FourPersonSender;
  message: string;
  timestamp: string;
  isImage?: boolean;
  imageUrl?: string;
}

export const FOUR_PERSON_CHATS: Record<number, FourPersonMessage[]> = {
  1: [
    { id: 'fp-1-1', sender: 'userAI', message: "Hey! You both found amazing coffee spots recently ☕ Maybe you should check out each other's discoveries!", timestamp: '14:00' },
    { id: 'fp-1-2', sender: 'friendAI', message: "Momo just found this hidden gem in Shimokita with single-origin Ethiopian beans!", timestamp: '14:01' },
    { id: 'fp-1-3', sender: 'friend', message: "haha the AIs are at it again 😂 but yeah the cafe is really good!", timestamp: '14:03' },
    { id: 'fp-1-4', sender: 'user', message: "Right?? But honestly Ethiopian beans are my favorite, I need to check it out!", timestamp: '14:05' },
    { id: 'fp-1-5', sender: 'friendAI', message: "Fun fact: you both prefer dark roasts! Perfect cafe buddy match 🎯", timestamp: '14:06' },
  ],
  2: [
    { id: 'fp-2-1', sender: 'userAI', message: "Both of you are gamers! Kento just beat a crazy boss fight 🎮", timestamp: '15:00' },
    { id: 'fp-2-2', sender: 'friendAI', message: "Kento used the ice element combo strategy - Riku might want to try that too!", timestamp: '15:01' },
    { id: 'fp-2-3', sender: 'friend', message: "Yo! Have you played the new update yet?", timestamp: '15:03' },
    { id: 'fp-2-4', sender: 'user', message: "Not yet but I heard the final boss is insane!", timestamp: '15:05' },
  ],
  3: [
    { id: 'fp-3-1', sender: 'userAI', message: "Nina had a beautiful morning yoga session by the river today 🧘", timestamp: '09:00' },
    { id: 'fp-3-2', sender: 'friendAI', message: "You both appreciate calm mornings - maybe a joint session sometime?", timestamp: '09:01' },
    { id: 'fp-3-3', sender: 'friend', message: "The sunrise was incredible today! You should join next time", timestamp: '09:05' },
    { id: 'fp-3-4', sender: 'user', message: "I'd love that! I do yoga every morning too", timestamp: '09:08' },
  ],
  4: [
    { id: 'fp-4-1', sender: 'userAI', message: "Ryo made amazing homemade carbonara! 🍝 You both love cooking!", timestamp: '16:30' },
    { id: 'fp-4-2', sender: 'friendAI', message: "The secret is tempering the eggs slowly - Ryo nailed it today!", timestamp: '16:31' },
    { id: 'fp-4-3', sender: 'friend', message: "Thanks! It took me a few tries haha", timestamp: '16:35' },
    { id: 'fp-4-4', sender: 'user', message: "I always struggle with carbonara! What's your technique?", timestamp: '16:38' },
    { id: 'fp-4-5', sender: 'friend', message: "Low heat and constant stirring! I can show you sometime", timestamp: '16:40' },
  ],
  5: [
    { id: 'fp-5-1', sender: 'userAI', message: "Sora captured incredible sunset photos! 📷 You're both photography lovers!", timestamp: '10:00' },
    { id: 'fp-5-2', sender: 'friendAI', message: "Shot at f/8, ISO 100 with a graduated ND filter - golden hour magic!", timestamp: '10:01' },
    { id: 'fp-5-3', sender: 'friend', message: "Yeah the light was perfect! Want to do a photo walk?", timestamp: '10:05' },
    { id: 'fp-5-4', sender: 'user', message: "Definitely! I've been wanting to try ND filters", timestamp: '10:08' },
  ],
  6: [
    { id: 'fp-6-1', sender: 'userAI', message: "Leon just picked up a new collector's edition game! 🕹️", timestamp: '18:00' },
    { id: 'fp-6-2', sender: 'friendAI', message: "You both enjoy RPGs - might be fun to play together!", timestamp: '18:01' },
    { id: 'fp-6-3', sender: 'friend', message: "Already 10 hours in! The story is amazing", timestamp: '18:05' },
    { id: 'fp-6-4', sender: 'user', message: "No spoilers! I want to play it too", timestamp: '18:08' },
  ],
  7: [
    { id: 'fp-7-1', sender: 'userAI', message: "Akane visited an incredible art exhibition at Roppongi! 🖼️", timestamp: '13:00' },
    { id: 'fp-7-2', sender: 'friendAI', message: "You both love art - maybe visit the next exhibition together?", timestamp: '13:01' },
    { id: 'fp-7-3', sender: 'friend', message: "The digital art pieces were so inspiring!", timestamp: '13:05' },
    { id: 'fp-7-4', sender: 'user', message: "I love digital art! Which gallery was it?", timestamp: '13:08' },
  ],
  8: [
    { id: 'fp-8-1', sender: 'userAI', message: "Kai found a secret hiking trail with an amazing waterfall! 🥾", timestamp: '11:00' },
    { id: 'fp-8-2', sender: 'friendAI', message: "You both love outdoor adventures - perfect hiking partners!", timestamp: '11:01' },
    { id: 'fp-8-3', sender: 'friend', message: "The trail was unmarked but totally worth it", timestamp: '11:05' },
    { id: 'fp-8-4', sender: 'user', message: "That sounds amazing! Where is it?", timestamp: '11:08' },
  ],
  9: [
    { id: 'fp-9-1', sender: 'userAI', message: "Miku had a cozy Ghibli movie marathon! 🍿", timestamp: '20:00' },
    { id: 'fp-9-2', sender: 'friendAI', message: "Perfect rainy day activity - you both enjoy relaxing!", timestamp: '20:01' },
    { id: 'fp-9-3', sender: 'friend', message: "Three films in a row! My Neighbor Totoro is still the best", timestamp: '20:05' },
    { id: 'fp-9-4', sender: 'user', message: "I love Totoro! Spirited Away is my #1 though", timestamp: '20:08' },
  ],
  10: [
    { id: 'fp-10-1', sender: 'userAI', message: "Yuto made tonkotsu ramen from scratch - 12 hour broth! 🍜", timestamp: '19:00' },
    { id: 'fp-10-2', sender: 'friendAI', message: "You're both foodies who love challenging recipes!", timestamp: '19:01' },
    { id: 'fp-10-3', sender: 'friend', message: "The broth was so rich! Worth the 12 hours", timestamp: '19:05' },
    { id: 'fp-10-4', sender: 'user', message: "12 hours?! That's dedication. How'd it taste?", timestamp: '19:08' },
  ],
};

// --- 友達メモ (Friend Memos) ---

export interface FriendMemoData {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export const INITIAL_FRIEND_MEMOS: Record<number, FriendMemoData[]> = {
  1: [
    { id: 'memo-1-1', type: 'ai', content: "Momo loves discovering hidden spots in the city. She's an introvert who expresses herself through art and photography.", timestamp: '2 days ago' },
    { id: 'memo-1-2', type: 'user', content: "Met at the coffee meetup in Shibuya. Really into latte art!", timestamp: '1 week ago' },
  ],
  2: [
    { id: 'memo-2-1', type: 'ai', content: "Kento is energetic and loves competitive gaming. Great for co-op sessions!", timestamp: '3 days ago' },
  ],
  3: [
    { id: 'memo-3-1', type: 'ai', content: "Nina values mindfulness and quiet moments. She's a thoughtful listener.", timestamp: '1 day ago' },
  ],
  4: [
    { id: 'memo-4-1', type: 'ai', content: "Ryo is kind and romantic. He puts a lot of care into cooking for others.", timestamp: '4 days ago' },
    { id: 'memo-4-2', type: 'user', content: "Wants to open a small restaurant someday", timestamp: '2 weeks ago' },
  ],
  5: [
    { id: 'memo-5-1', type: 'ai', content: "Sora is an adventurous optimist who loves combining hiking with photography.", timestamp: '2 days ago' },
  ],
};

// --- 友達カード裏面データ (Friend Card Back) ---

export interface FriendCardBackData {
  friendId: number;
  hasBF: boolean;
  commonFriendsCount: number;
}

export const FRIEND_CARD_BACK_DATA: FriendCardBackData[] = [
  { friendId: 1, hasBF: false, commonFriendsCount: 3 },
  { friendId: 2, hasBF: false, commonFriendsCount: 2 },
  { friendId: 3, hasBF: true, commonFriendsCount: 4 },
  { friendId: 4, hasBF: true, commonFriendsCount: 1 },
  { friendId: 5, hasBF: false, commonFriendsCount: 5 },
  { friendId: 6, hasBF: false, commonFriendsCount: 2 },
  { friendId: 7, hasBF: true, commonFriendsCount: 3 },
  { friendId: 8, hasBF: false, commonFriendsCount: 4 },
  { friendId: 9, hasBF: true, commonFriendsCount: 2 },
  { friendId: 10, hasBF: false, commonFriendsCount: 3 },
];

// --- 新しいつながり提案 (New Connection Suggestion) ---

export const NEW_CONNECTION_SUGGESTION = {
  friendId: 101,
  name: "Yuki",
  image: "/images/characters/char16.png",
  compatibility: 92,
  reason: "You both love Art & Coffee",
};

// --- AI相談トピック (Consultation Topics) ---

export const CONSULTATION_TOPICS = [
  { id: 'work', label: 'Work/Project tips', emoji: '💼' },
  { id: 'makeup', label: 'How to make up', emoji: '🤝' },
  { id: 'approach', label: 'How to approach', emoji: '💬' },
];

// --- ユーザーの最近の出来事 (Recent Events) ---

export const MY_RECENT_EVENTS = [
  { id: 'my-1', title: 'Golden hour shoot in Shibuya', emoji: '📸', image: '/images/characters/char_me.png' },
  { id: 'my-2', title: 'New Ethiopian beans arrived', emoji: '☕', image: '/images/characters/char_me.png' },
  { id: 'my-3', title: 'Finished reading Norwegian Wood', emoji: '📚', image: '/images/characters/char_me.png' },
];

// 行動ログ型（JSONデータ形式に対応）
export type Sensitivity = 'public' | 'private' | 'sensitive';

export interface ActivityLog {
  id: string;
  user_id: string;
  title: string;
  description: string;
  start_time: string; // "2026-01-15 23:13:58+00" format
  end_time: string;
  location: string | null;
  location_point: string | null;
  image_ids: string; // JSON stringified array
  image_count: number;
  language: string;
  analysis_version: number;
  created_at: string;
  updated_at: string;
  sensitivity: Sensitivity;
}

