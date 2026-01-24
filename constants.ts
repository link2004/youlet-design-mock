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

// 友達プロフィール型
export interface FriendProfile {
  id: number;
  userId: string;  // @username 形式
  name: string;
  image: string;
  hobbies: string[];
  personality: string[];
}

// 友達一覧（交換済みカード）
export const FRIENDS_LIST: FriendProfile[] = [
  {
    id: 1,
    userId: "@momo_123",
    name: "Momo",
    image: "/images/characters/char16.png",
    hobbies: ["Photography", "Coffee", "Art"],
    personality: ["Introvert", "Creative"]
  },
  {
    id: 2,
    userId: "@kento_game",
    name: "Kento",
    image: "/images/characters/char17.png",
    hobbies: ["Gaming", "Anime", "Music"],
    personality: ["Extrovert", "Energetic"]
  },
  {
    id: 3,
    userId: "@nina_yoga",
    name: "Nina",
    image: "/images/characters/char18.png",
    hobbies: ["Reading", "Yoga", "Travel"],
    personality: ["Calm", "Thoughtful"]
  },
  {
    id: 4,
    userId: "@ryo_chef",
    name: "Ryo",
    image: "/images/characters/char19.png",
    hobbies: ["Cooking", "Movies", "Music"],
    personality: ["Kind", "Romantic"]
  },
  {
    id: 5,
    userId: "@sora_hike",
    name: "Sora",
    image: "/images/characters/char20.png",
    hobbies: ["Hiking", "Photography", "Cooking"],
    personality: ["Adventurous", "Optimist"]
  },
  {
    id: 6,
    userId: "@leon_play",
    name: "Leon",
    image: "/images/characters/char21.png",
    hobbies: ["Gaming", "Anime", "Coffee"],
    personality: ["Introvert", "Curious"]
  },
  {
    id: 7,
    userId: "@akane_art",
    name: "Akane",
    image: "/images/characters/char22.png",
    hobbies: ["Art", "Music", "Reading"],
    personality: ["Creative", "Honest"]
  },
  {
    id: 8,
    userId: "@kai_travel",
    name: "Kai",
    image: "/images/characters/char23.png",
    hobbies: ["Travel", "Hiking", "Photography"],
    personality: ["Adventurous", "Extrovert"]
  },
  {
    id: 9,
    userId: "@miku_chill",
    name: "Miku",
    image: "/images/characters/char24.png",
    hobbies: ["Movies", "Coffee", "Yoga"],
    personality: ["Calm", "Kind"]
  },
  {
    id: 10,
    userId: "@yuto_cook",
    name: "Yuto",
    image: "/images/characters/char25.png",
    hobbies: ["Cooking", "Gaming", "Travel"],
    personality: ["Curious", "Optimist"]
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
    personality: ["Creative", "Calm"]
  },
  {
    id: 102,
    userId: "@haru_music",
    name: "Haru",
    image: "/images/characters/char17.png",
    hobbies: ["Music", "Gaming", "Movies"],
    personality: ["Energetic", "Optimist"]
  },
  {
    id: 103,
    userId: "@ren_travel",
    name: "Ren",
    image: "/images/characters/char18.png",
    hobbies: ["Travel", "Hiking", "Cooking"],
    personality: ["Adventurous", "Kind"]
  },
  {
    id: 104,
    userId: "@mei_yoga",
    name: "Mei",
    image: "/images/characters/char19.png",
    hobbies: ["Yoga", "Reading", "Coffee"],
    personality: ["Calm", "Thoughtful"]
  },
  {
    id: 105,
    userId: "@taro_game",
    name: "Taro",
    image: "/images/characters/char20.png",
    hobbies: ["Gaming", "Anime", "Music"],
    personality: ["Curious", "Honest"]
  },
  {
    id: 106,
    userId: "@sakura_photo",
    name: "Sakura",
    image: "/images/characters/char21.png",
    hobbies: ["Photography", "Art", "Travel"],
    personality: ["Creative", "Extrovert"]
  },
  {
    id: 107,
    userId: "@kazu_cook",
    name: "Kazu",
    image: "/images/characters/char22.png",
    hobbies: ["Cooking", "Movies", "Gaming"],
    personality: ["Kind", "Introvert"]
  },
  {
    id: 108,
    userId: "@nana_read",
    name: "Nana",
    image: "/images/characters/char23.png",
    hobbies: ["Reading", "Music", "Yoga"],
    personality: ["Thoughtful", "Honest"]
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

// AI学習用質問（MBTI形式の5択）
export interface ProfileQuestion {
  id: string;
  question: string;
  category: 'personality' | 'lifestyle' | 'values' | 'preferences' | 'social';
}

// 回答選択肢（5段階）
export const ANSWER_OPTIONS = [
  { value: 'strongly_disagree', position: 1 },
  { value: 'disagree', position: 2 },
  { value: 'neutral', position: 3 },
  { value: 'agree', position: 4 },
  { value: 'strongly_agree', position: 5 },
] as const;

export type AnswerValue = typeof ANSWER_OPTIONS[number]['value'];

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  // Personality - 性格
  { id: 'q1', question: 'I prefer deep conversations over small talk.', category: 'personality' },
  { id: 'q2', question: 'I often think about the meaning of life.', category: 'personality' },
  { id: 'q3', question: 'I am usually the one to start conversations.', category: 'personality' },
  { id: 'q4', question: 'I stay calm under pressure.', category: 'personality' },

  // Lifestyle - ライフスタイル
  { id: 'q5', question: 'I am more of a night owl than a morning person.', category: 'lifestyle' },
  { id: 'q6', question: 'I prefer staying home over going out.', category: 'lifestyle' },
  { id: 'q7', question: 'I like to plan things in advance.', category: 'lifestyle' },
  { id: 'q8', question: 'I enjoy trying new foods and cuisines.', category: 'lifestyle' },

  // Values - 価値観
  { id: 'q9', question: 'Honesty is more important than kindness.', category: 'values' },
  { id: 'q10', question: 'Career success matters a lot to me.', category: 'values' },
  { id: 'q11', question: 'I believe in love at first sight.', category: 'values' },
  { id: 'q12', question: 'Family is my top priority.', category: 'values' },

  // Preferences - 好み
  { id: 'q13', question: 'I prefer texting over phone calls.', category: 'preferences' },
  { id: 'q14', question: 'I like receiving gifts as a sign of affection.', category: 'preferences' },
  { id: 'q15', question: 'Quality time together is important to me.', category: 'preferences' },
  { id: 'q16', question: 'I enjoy spontaneous adventures.', category: 'preferences' },

  // Social - 社交
  { id: 'q17', question: 'I feel energized after social gatherings.', category: 'social' },
  { id: 'q18', question: 'I have a small but close circle of friends.', category: 'social' },
  { id: 'q19', question: 'I enjoy meeting new people.', category: 'social' },
  { id: 'q20', question: 'I am comfortable being the center of attention.', category: 'social' },
];