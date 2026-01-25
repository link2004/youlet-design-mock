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

// 行動ログ型
export interface ActivityLog {
  id: string;
  date: string; // "2026-01-24" format
  title: string;
  time: string; // "9:00-15:00" format
  category: 'school' | 'work' | 'leisure' | 'food' | 'other';
  images: string[]; // 複数の写真URL
}

// 行動ログのモックデータ（90日分: 2026-01-25 から 2025-10-27）
export const ACTIVITY_LOGS: ActivityLog[] = [
  // ========== January 2026 ==========
  // 1/25 (土)
  { id: '1', date: '2026-01-25', title: '彼女とLINE電話3時間', time: '1:00-4:00', category: 'other', images: [] },
  { id: '2', date: '2026-01-25', title: '昼まで爆睡', time: '4:00-13:00', category: 'other', images: [] },
  { id: '3', date: '2026-01-25', title: '渋谷のおしゃれカフェでパンケーキ', time: '14:00-15:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop',
  ] },
  { id: '4', date: '2026-01-25', title: 'ケンタとゲーセンでUFOキャッチャー対決', time: '16:00-18:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
  ] },

  // 1/24 (金)
  { id: '5', date: '2026-01-24', title: '経済学のテスト、ヤバかった', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '6', date: '2026-01-24', title: '学食で唐揚げ定食', time: '12:30-13:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },
  { id: '7', date: '2026-01-24', title: 'カフェバイト（新人教育担当）', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 1/23 (木)
  { id: '8', date: '2026-01-23', title: 'ゼミで卒論テーマ発表', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '9', date: '2026-01-23', title: '彼女とお揃いのマフラー買った', time: '15:00-17:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop',
  ] },
  { id: '10', date: '2026-01-23', title: '新宿の家系ラーメン', time: '19:00-20:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },

  // 1/22 (水)
  { id: '11', date: '2026-01-22', title: 'マーケティング論の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '12', date: '2026-01-22', title: '図書館で試験勉強', time: '13:00-17:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '13', date: '2026-01-22', title: 'カフェバイト', time: '18:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 1/21 (火)
  { id: '14', date: '2026-01-21', title: '英語プレゼンで緊張しまくり', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '15', date: '2026-01-21', title: 'サークルの先輩と池袋で飲み', time: '19:00-23:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 1/20 (月)
  { id: '16', date: '2026-01-20', title: '1限から経営学', time: '9:00-10:30', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '17', date: '2026-01-20', title: '彼女とスタバでまったり', time: '14:00-16:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },
  { id: '18', date: '2026-01-20', title: 'ジムで筋トレ', time: '19:00-21:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  ] },

  // 1/19 (日)
  { id: '19', date: '2026-01-19', title: '一日中ゴロゴロNetflix', time: '10:00-18:00', category: 'leisure', images: [] },
  { id: '20', date: '2026-01-19', title: 'UberEatsでピザ頼んだ', time: '19:00-20:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
  ] },

  // 1/18 (土)
  { id: '21', date: '2026-01-18', title: 'カフェバイト（土曜は忙しい）', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },
  { id: '22', date: '2026-01-18', title: '彼女と夜景見に行った', time: '20:00-23:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop',
  ] },

  // 1/17 (金)
  { id: '23', date: '2026-01-17', title: '統計学の小テスト', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '24', date: '2026-01-17', title: 'ヒロキとビリヤード', time: '15:00-18:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
  ] },

  // 1/16 (木)
  { id: '25', date: '2026-01-16', title: 'ゼミのグループワーク', time: '10:00-16:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '26', date: '2026-01-16', title: '中華料理屋で麻婆豆腐', time: '18:00-19:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },

  // 1/15 (水)
  { id: '27', date: '2026-01-15', title: '会計学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },
  { id: '28', date: '2026-01-15', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 1/14 (火)
  { id: '29', date: '2026-01-14', title: '法学入門のレポート提出', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '30', date: '2026-01-14', title: 'タカシの誕生日パーティー', time: '19:00-24:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=300&h=300&fit=crop',
  ] },

  // 1/13 (月・祝) 成人の日
  { id: '31', date: '2026-01-13', title: '成人式で久々に中学の友達に会った', time: '10:00-14:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=300&h=300&fit=crop',
  ] },
  { id: '32', date: '2026-01-13', title: '同窓会で終電逃してカラオケオール', time: '18:00-29:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=300&h=300&fit=crop',
  ] },

  // 1/12 (日)
  { id: '33', date: '2026-01-12', title: 'テスト勉強会@ファミレス', time: '13:00-19:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '34', date: '2026-01-12', title: '焼き鳥屋でサク飲み', time: '20:00-22:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&h=300&fit=crop',
  ] },

  // 1/11 (土)
  { id: '35', date: '2026-01-11', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },
  { id: '36', date: '2026-01-11', title: '彼女と映画「新作SF」観た', time: '19:00-22:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=300&fit=crop',
  ] },

  // 1/10 (金)
  { id: '37', date: '2026-01-10', title: '冬休み明け初授業、眠すぎ', time: '9:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '38', date: '2026-01-10', title: 'ラーメン二郎系に挑戦', time: '18:00-19:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },

  // 1/9 (木)
  { id: '39', date: '2026-01-09', title: '成人式のスーツ試着', time: '13:00-16:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop',
  ] },

  // 1/8 (水)
  { id: '40', date: '2026-01-08', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 1/7 (火)
  { id: '41', date: '2026-01-07', title: 'ヒロキとスノボ旅行計画', time: '14:00-17:00', category: 'leisure', images: [] },
  { id: '42', date: '2026-01-07', title: '回転寿司でお腹いっぱい', time: '19:00-21:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop',
  ] },

  // 1/6 (月)
  { id: '43', date: '2026-01-06', title: 'カフェバイト（正月明けで混雑）', time: '10:00-19:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 1/5 (日)
  { id: '44', date: '2026-01-05', title: '彼女と初詣デート@明治神宮', time: '11:00-15:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=300&fit=crop',
  ] },
  { id: '45', date: '2026-01-05', title: '表参道でクレープ', time: '16:00-17:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },

  // 1/4 (土)
  { id: '46', date: '2026-01-04', title: 'ケンタと初ゲーム大会', time: '14:00-22:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
  ] },

  // 1/3 (金)
  { id: '47', date: '2026-01-03', title: '箱根駅伝見ながらダラダラ', time: '8:00-14:00', category: 'other', images: [] },
  { id: '48', date: '2026-01-03', title: '祖父母の家でおせち', time: '17:00-21:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 1/2 (木)
  { id: '49', date: '2026-01-02', title: '家族で初売り@イオンモール', time: '10:00-17:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop',
  ] },

  // 1/1 (水) 元旦
  { id: '50', date: '2026-01-01', title: '地元の神社で初詣', time: '0:30-2:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop',
  ] },
  { id: '51', date: '2026-01-01', title: '家族でお雑煮', time: '12:00-14:00', category: 'food', images: [] },

  // ========== December 2025 ==========
  // 12/31 (水) 大晦日
  { id: '52', date: '2025-12-31', title: '大掃除手伝い', time: '10:00-15:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop',
  ] },
  { id: '53', date: '2025-12-31', title: '年越しそば食べた', time: '18:00-19:00', category: 'food', images: [] },
  { id: '54', date: '2025-12-31', title: 'サークル仲間と年越しカウントダウン', time: '22:00-26:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
  ] },

  // 12/30 (火)
  { id: '55', date: '2025-12-30', title: '部屋の大掃除', time: '10:00-17:00', category: 'other', images: [] },
  { id: '56', date: '2025-12-30', title: '彼女とLINE電話', time: '22:00-24:00', category: 'other', images: [] },

  // 12/29 (月)
  { id: '57', date: '2025-12-29', title: 'カフェバイト（年末シフト）', time: '10:00-20:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 12/28 (日)
  { id: '58', date: '2025-12-28', title: '高校の友達と忘年会', time: '18:00-24:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
  ] },

  // 12/27 (土)
  { id: '59', date: '2025-12-27', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 12/26 (金)
  { id: '60', date: '2025-12-26', title: '彼女とアウトレットでお買い物', time: '11:00-18:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=300&fit=crop',
  ] },
  { id: '61', date: '2025-12-26', title: 'ハンバーガー食べた', time: '13:00-14:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
  ] },

  // 12/25 (木) クリスマス
  { id: '62', date: '2025-12-25', title: '彼女とクリスマスディナー@表参道', time: '18:00-22:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543934638-bd2e138430c4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },
  { id: '63', date: '2025-12-25', title: 'プレゼント交換した（めっちゃ喜んでくれた）', time: '22:30-23:30', category: 'other', images: [] },

  // 12/24 (水) クリスマスイブ
  { id: '64', date: '2025-12-24', title: '彼女とイルミネーションデート', time: '17:00-22:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1543934638-bd2e138430c4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop',
  ] },

  // 12/23 (火)
  { id: '65', date: '2025-12-23', title: 'カフェバイト（クリスマス前で激混み）', time: '10:00-20:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 12/22 (月)
  { id: '66', date: '2025-12-22', title: '冬休み前最後の授業', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '67', date: '2025-12-22', title: 'クリスマスプレゼント選び', time: '15:00-19:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=300&fit=crop',
  ] },

  // 12/21 (日)
  { id: '68', date: '2025-12-21', title: 'ケンタとカラオケでオールナイト', time: '22:00-30:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
  ] },

  // 12/20 (土)
  { id: '69', date: '2025-12-20', title: 'サークルの忘年会（飲みすぎた）', time: '18:00-24:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 12/19 (金)
  { id: '70', date: '2025-12-19', title: 'レポート3つ提出で死にそう', time: '9:00-18:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },

  // 12/18 (木)
  { id: '71', date: '2025-12-18', title: 'ゼミ発表（教授に褒められた）', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '72', date: '2025-12-18', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 12/17 (水)
  { id: '73', date: '2025-12-17', title: 'レポート執筆でカフェに籠る', time: '10:00-18:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },

  // 12/16 (火)
  { id: '74', date: '2025-12-16', title: '講義2コマ', time: '10:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },
  { id: '75', date: '2025-12-16', title: '彼女と駅で待ち合わせ（ドキドキした）', time: '18:00-18:30', category: 'other', images: [] },
  { id: '76', date: '2025-12-16', title: '彼女とイタリアンディナー', time: '18:30-21:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 12/15 (月)
  { id: '77', date: '2025-12-15', title: '経営学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '78', date: '2025-12-15', title: 'ジムで筋トレ', time: '19:00-21:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  ] },

  // 12/14 (日)
  { id: '79', date: '2025-12-14', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 12/13 (土)
  { id: '80', date: '2025-12-13', title: 'タカシとヒロキと鍋パーティー', time: '18:00-24:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
  ] },

  // 12/12 (金)
  { id: '81', date: '2025-12-12', title: '英語のテスト', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '82', date: '2025-12-12', title: 'つけ麺食べに行った', time: '13:00-14:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },

  // 12/11 (木)
  { id: '83', date: '2025-12-11', title: 'ゼミのグループワーク', time: '10:00-16:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '84', date: '2025-12-11', title: 'カフェバイト', time: '18:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 12/10 (水)
  { id: '85', date: '2025-12-10', title: 'マーケティングの課題提出', time: '9:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },

  // 12/9 (火)
  { id: '86', date: '2025-12-09', title: '講義後に彼女とカフェ', time: '15:00-18:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },

  // 12/8 (月)
  { id: '87', date: '2025-12-08', title: '1限から経営学（眠い）', time: '9:00-10:30', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '88', date: '2025-12-08', title: 'ジムで有酸素運動', time: '19:00-20:30', category: 'other', images: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
  ] },

  // 12/7 (日)
  { id: '89', date: '2025-12-07', title: '一日中レポート書いてた', time: '10:00-20:00', category: 'school', images: [] },

  // 12/6 (土)
  { id: '90', date: '2025-12-06', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },
  { id: '91', date: '2025-12-06', title: 'ケンタと居酒屋', time: '20:00-23:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 12/5 (金)
  { id: '92', date: '2025-12-05', title: '統計学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '93', date: '2025-12-05', title: '先輩の就活相談に乗った', time: '15:00-17:00', category: 'other', images: [] },

  // 12/4 (木)
  { id: '94', date: '2025-12-04', title: 'ゼミで文献レビュー発表', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '95', date: '2025-12-04', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 12/3 (水)
  { id: '96', date: '2025-12-03', title: '会計学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },
  { id: '97', date: '2025-12-03', title: 'タピオカ飲んだ', time: '14:00-15:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },

  // 12/2 (火)
  { id: '98', date: '2025-12-02', title: '講義2コマ', time: '10:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },

  // 12/1 (月)
  { id: '99', date: '2025-12-01', title: '経営学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '100', date: '2025-12-01', title: 'ジムで筋トレ', time: '19:00-21:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  ] },

  // ========== November 2025 ==========
  // 11/30 (日)
  { id: '101', date: '2025-11-30', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 11/29 (土)
  { id: '102', date: '2025-11-29', title: '彼女と紅葉デート@高尾山', time: '9:00-17:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=300&h=300&fit=crop',
  ] },
  { id: '103', date: '2025-11-29', title: '山頂でおにぎり食べた', time: '12:30-13:30', category: 'food', images: [] },

  // 11/28 (金)
  { id: '104', date: '2025-11-28', title: '英語の小テスト', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '105', date: '2025-11-28', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 11/27 (木)
  { id: '106', date: '2025-11-27', title: 'ゼミのディスカッション', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '107', date: '2025-11-27', title: '焼肉食べ放題でお腹壊した', time: '18:00-21:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&h=300&fit=crop',
  ] },

  // 11/26 (水)
  { id: '108', date: '2025-11-26', title: 'レポート提出日で図書館に籠る', time: '10:00-18:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },

  // 11/25 (火)
  { id: '109', date: '2025-11-25', title: '講義後にヒロキとラーメン', time: '15:00-16:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },
  { id: '110', date: '2025-11-25', title: 'カフェバイト', time: '18:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 11/24 (月・祝) 勤労感謝の日の振替休日
  { id: '111', date: '2025-11-24', title: 'サークル仲間と温泉旅行', time: '8:00-20:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1545079968-1feb95494244?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
  ] },

  // 11/23 (日) 勤労感謝の日
  { id: '112', date: '2025-11-23', title: '一日中ゲーム三昧', time: '10:00-22:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
  ] },

  // 11/22 (土)
  { id: '113', date: '2025-11-22', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 11/21 (金)
  { id: '114', date: '2025-11-21', title: 'マーケティングのプレゼン', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '115', date: '2025-11-21', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 11/20 (木)
  { id: '116', date: '2025-11-20', title: 'ゼミで発表準備', time: '10:00-16:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },

  // 11/19 (水)
  { id: '117', date: '2025-11-19', title: '講義2コマ', time: '9:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '118', date: '2025-11-19', title: 'おしゃれカフェ巡り', time: '16:00-19:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },

  // 11/18 (火)
  { id: '119', date: '2025-11-18', title: '統計学の課題', time: '10:00-17:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },

  // 11/17 (月)
  { id: '120', date: '2025-11-17', title: '経営学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '121', date: '2025-11-17', title: 'ボーリング大会で惨敗', time: '15:00-19:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=300&h=300&fit=crop',
  ] },

  // 11/16 (日)
  { id: '122', date: '2025-11-16', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 11/15 (土)
  { id: '123', date: '2025-11-15', title: '彼女と水族館デート', time: '11:00-17:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=300&h=300&fit=crop',
  ] },
  { id: '124', date: '2025-11-15', title: 'シーフードパスタ食べた', time: '18:00-19:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop',
  ] },

  // 11/14 (金)
  { id: '125', date: '2025-11-14', title: '英語のスピーチ発表', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '126', date: '2025-11-14', title: 'ジムで筋トレ', time: '19:00-21:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  ] },

  // 11/13 (木)
  { id: '127', date: '2025-11-13', title: 'ゼミのディベート大会', time: '10:00-17:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },

  // 11/12 (水)
  { id: '128', date: '2025-11-12', title: '講義後にスタバ', time: '14:00-16:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  ] },
  { id: '129', date: '2025-11-12', title: 'カフェバイト', time: '18:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 11/11 (火)
  { id: '130', date: '2025-11-11', title: '講義2コマ', time: '10:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '131', date: '2025-11-11', title: 'ポッキーの日だからポッキー食べた', time: '15:30-16:00', category: 'food', images: [] },

  // 11/10 (月)
  { id: '132', date: '2025-11-10', title: '経営学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '133', date: '2025-11-10', title: 'ケンタとタカシとゲーム大会', time: '18:00-24:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
  ] },

  // 11/9 (日)
  { id: '134', date: '2025-11-09', title: 'カフェバイト', time: '10:00-18:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop',
  ] },

  // 11/8 (土)
  { id: '135', date: '2025-11-08', title: '彼女と映画デート', time: '14:00-18:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=300&fit=crop',
  ] },
  { id: '136', date: '2025-11-08', title: 'ポップコーン食べすぎた', time: '14:30-17:00', category: 'food', images: [] },

  // 11/7 (金)
  { id: '137', date: '2025-11-07', title: 'レポート提出', time: '9:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },

  // 11/6 (木)
  { id: '138', date: '2025-11-06', title: 'ゼミで文献購読', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '139', date: '2025-11-06', title: 'インドカレー屋でナン食べ放題', time: '13:00-14:30', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },

  // 11/5 (水)
  { id: '140', date: '2025-11-05', title: '会計学のテスト', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '141', date: '2025-11-05', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 11/4 (火)
  { id: '142', date: '2025-11-04', title: '講義後に図書館で勉強', time: '14:00-19:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },

  // 11/3 (月・祝) 文化の日
  { id: '143', date: '2025-11-03', title: '学園祭で焼きそば売った', time: '10:00-17:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop',
  ] },
  { id: '144', date: '2025-11-03', title: 'サークルの打ち上げ', time: '18:00-23:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
  ] },

  // 11/2 (日)
  { id: '145', date: '2025-11-02', title: '学園祭2日目（模擬店手伝い）', time: '10:00-18:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop',
  ] },

  // 11/1 (土)
  { id: '146', date: '2025-11-01', title: '学園祭1日目（準備）', time: '8:00-20:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
  ] },

  // ========== October 2025 ==========
  // 10/31 (金) ハロウィン
  { id: '147', date: '2025-10-31', title: '渋谷でハロウィンパーティー', time: '19:00-26:00', category: 'leisure', images: [
    'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1604073461950-f3a48e7deb2b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop',
  ] },
  { id: '148', date: '2025-10-31', title: '仮装の準備', time: '14:00-18:00', category: 'other', images: [] },

  // 10/30 (木)
  { id: '149', date: '2025-10-30', title: 'ゼミの発表', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  ] },
  { id: '150', date: '2025-10-30', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
  ] },

  // 10/29 (水)
  { id: '151', date: '2025-10-29', title: '講義2コマ', time: '9:00-15:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop',
  ] },
  { id: '152', date: '2025-10-29', title: '彼女から告白された記念日', time: '19:00-22:00', category: 'other', images: [] },

  // 10/28 (火)
  { id: '153', date: '2025-10-28', title: '統計学の講義', time: '10:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  ] },
  { id: '154', date: '2025-10-28', title: 'カフェバイト', time: '17:00-22:00', category: 'work', images: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  ] },

  // 10/27 (月)
  { id: '155', date: '2025-10-27', title: '経営学の講義', time: '9:00-12:00', category: 'school', images: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  ] },
  { id: '156', date: '2025-10-27', title: '新宿の二郎系ラーメン', time: '13:00-14:00', category: 'food', images: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  ] },
  { id: '157', date: '2025-10-27', title: 'ジムで筋トレ', time: '19:00-21:00', category: 'other', images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  ] },
];

