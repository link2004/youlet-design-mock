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
  User
} from 'lucide-react';

export const USER_DATA = {
  name: "Riku",
  age: 21,
  location: "Tokyo",
  avatar: "https://ftrfpbrgnjkqgzaggkdz.supabase.co/storage/v1/object/public/profile-avatar/generated-avatars/310d8ad9-e71a-4552-acf5-860332e691d5/20260121_043652.png"
};

// ユーザーの趣味・性格（Elements）
export const USER_ELEMENTS = [
  { label: "Photography", type: "hobby" },
  { label: "Coffee", type: "hobby" },
  { label: "Reading", type: "hobby" },
  { label: "Gaming", type: "hobby" },
  { label: "Music", type: "hobby" },
  { label: "Cooking", type: "hobby" },
  { label: "Travel", type: "hobby" },
  { label: "Anime", type: "hobby" },
  { label: "Hiking", type: "hobby" },
  { label: "Art", type: "hobby" },
  { label: "Movies", type: "hobby" },
  { label: "Yoga", type: "hobby" },
  { label: "Introvert", type: "personality" },
  { label: "Creative", type: "personality" },
  { label: "Curious", type: "personality" },
  { label: "Calm", type: "personality" },
  { label: "Kind", type: "personality" },
  { label: "Honest", type: "personality" },
  { label: "Optimist", type: "personality" },
];

export const STATS = [
  { icon: RotateCw, count: 3, color: "text-green-500", label: "Refresh" },
  { icon: Star, count: 2, color: "text-blue-500", label: "Stars" },
  { icon: Zap, count: 0, color: "text-purple-500", label: "Boosts" },
  { icon: Globe, count: 0, color: "text-yellow-500", label: "Web" },
];

export const MENU_ITEMS = [
  { icon: Pencil, label: "Edit profile" },
];

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

// 週間ランキングカテゴリ
export type RankingCategory = 'changes' | 'romance' | 'events' | 'emotions';

export const RANKING_CATEGORIES: { id: RankingCategory; label: string; emoji: string }[] = [
  { id: 'changes', label: '大きな変化', emoji: '🔄' },
  { id: 'romance', label: '恋愛の動き', emoji: '💕' },
  { id: 'events', label: '事件あり', emoji: '⚡' },
  { id: 'emotions', label: '感情の波', emoji: '🌊' },
];

// ランキングユーザーデータ
export interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  summary: string;
  score: number;
  trend: 'up' | 'down' | 'new';
  previousRank?: number;
}

export const WEEKLY_RANKINGS: Record<RankingCategory, RankingUser[]> = {
  changes: [
    {
      id: '1',
      name: 'Yuki',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
      summary: '転職して新しい街に引っ越した',
      score: 98,
      trend: 'new',
    },
    {
      id: '2',
      name: 'Takeshi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Takeshi',
      summary: '長年の夢だった起業を実現',
      score: 92,
      trend: 'up',
      previousRank: 5,
    },
    {
      id: '3',
      name: 'Mika',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mika',
      summary: '海外留学を決意、来月出発',
      score: 87,
      trend: 'up',
      previousRank: 8,
    },
    {
      id: '4',
      name: 'Kento',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kento',
      summary: '新しい趣味のバンド活動を開始',
      score: 82,
      trend: 'down',
      previousRank: 2,
    },
    {
      id: '5',
      name: 'Saki',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saki',
      summary: '資格試験に合格、キャリアアップ',
      score: 78,
      trend: 'new',
    },
  ],
  romance: [
    {
      id: '6',
      name: 'Haruka',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Haruka',
      summary: '3年付き合った彼と婚約',
      score: 99,
      trend: 'new',
    },
    {
      id: '7',
      name: 'Sota',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sota',
      summary: '片思いの相手に告白成功',
      score: 94,
      trend: 'up',
      previousRank: 4,
    },
    {
      id: '8',
      name: 'Rin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rin',
      summary: 'マッチングアプリで運命の出会い',
      score: 88,
      trend: 'new',
    },
    {
      id: '9',
      name: 'Daiki',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daiki',
      summary: '遠距離恋愛を乗り越えて同棲開始',
      score: 85,
      trend: 'up',
      previousRank: 6,
    },
    {
      id: '10',
      name: 'Ayaka',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayaka',
      summary: '復縁して再スタート',
      score: 79,
      trend: 'down',
      previousRank: 1,
    },
  ],
  events: [
    {
      id: '11',
      name: 'Ryo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryo',
      summary: '財布を落としたが親切な人が届けてくれた',
      score: 95,
      trend: 'new',
    },
    {
      id: '12',
      name: 'Nana',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nana',
      summary: '突然の雨でびしょ濡れに、でも素敵な出会い',
      score: 90,
      trend: 'up',
      previousRank: 3,
    },
    {
      id: '13',
      name: 'Yuto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuto',
      summary: '電車で有名人に遭遇',
      score: 84,
      trend: 'new',
    },
    {
      id: '14',
      name: 'Mai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
      summary: '懸賞で海外旅行が当選',
      score: 80,
      trend: 'up',
      previousRank: 7,
    },
    {
      id: '15',
      name: 'Kenji',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji',
      summary: '10年ぶりに幼馴染と再会',
      score: 75,
      trend: 'down',
      previousRank: 2,
    },
  ],
  emotions: [
    {
      id: '16',
      name: 'Aoi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aoi',
      summary: 'ペットとの別れを経験',
      score: 97,
      trend: 'new',
    },
    {
      id: '17',
      name: 'Tsubasa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tsubasa',
      summary: '親友の結婚式で感動の涙',
      score: 91,
      trend: 'up',
      previousRank: 4,
    },
    {
      id: '18',
      name: 'Hana',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hana',
      summary: '仕事のプレッシャーで限界寸前',
      score: 86,
      trend: 'new',
    },
    {
      id: '19',
      name: 'Shun',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shun',
      summary: '夢を諦めかけたが仲間に励まされた',
      score: 83,
      trend: 'up',
      previousRank: 9,
    },
    {
      id: '20',
      name: 'Emi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emi',
      summary: '家族との和解で心が軽くなった',
      score: 77,
      trend: 'down',
      previousRank: 1,
    },
  ],
};