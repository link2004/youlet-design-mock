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
  avatar: "https://ftrfpbrgnjkqgzaggkdz.supabase.co/storage/v1/object/public/profile-avatar/generated-avatars/310d8ad9-e71a-4552-acf5-860332e691d5/20260121_043652.png"
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

// DM チャットリスト（友達一覧の画像を使用）
export const DM_CHATS = [
  {
    id: '1',
    name: 'Momo',
    avatar: '/images/characters/char16.png',
    lastMessage: "You should! Want to go on a photo walk sometime?",
    timestamp: '2m',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Kento',
    avatar: '/images/characters/char17.png',
    lastMessage: "That cafe was amazing! 🍵",
    timestamp: '15m',
    unread: true,
    online: true,
  },
  {
    id: '3',
    name: 'Nina',
    avatar: '/images/characters/char18.png',
    lastMessage: "See you at the gaming event!",
    timestamp: '1h',
    unread: false,
    online: false,
  },
  {
    id: '4',
    name: 'Ryo',
    avatar: '/images/characters/char19.png',
    lastMessage: "The cherry blossoms are so beautiful this year",
    timestamp: '3h',
    unread: false,
    online: true,
  },
  {
    id: '5',
    name: 'Sora',
    avatar: '/images/characters/char20.png',
    lastMessage: "Let me know when you finish that book!",
    timestamp: '1d',
    unread: false,
    online: false,
  },
  {
    id: '6',
    name: 'Leon',
    avatar: '/images/characters/char21.png',
    lastMessage: "Great playlist recommendation 🎵",
    timestamp: '2d',
    unread: false,
    online: false,
  },
];

// DM 会話詳細 (Momo との会話)
export const DM_MESSAGES: Array<{
  id: string;
  sender: 'user' | 'other';
  message: string;
  timestamp: string;
}> = [
  { id: '1', sender: 'other', message: "Hey! Nice to meet you 👋", timestamp: '10:30' },
  { id: '2', sender: 'user', message: "Hi Momo! Nice to meet you too!", timestamp: '10:32' },
  { id: '3', sender: 'other', message: "I saw we both love photography!", timestamp: '10:33' },
  { id: '4', sender: 'user', message: "Yes! I'm really into street photography lately.", timestamp: '10:35' },
  { id: '5', sender: 'other', message: "That's awesome! Do you have a favorite camera?", timestamp: '10:36' },
  { id: '6', sender: 'user', message: "I use a Fujifilm X100V. The colors are amazing!", timestamp: '10:38' },
  { id: '7', sender: 'other', message: "Nice choice! I've been wanting to try Fujifilm.", timestamp: '10:40' },
  { id: '8', sender: 'user', message: "You should! Want to go on a photo walk sometime?", timestamp: '10:42' },
];

