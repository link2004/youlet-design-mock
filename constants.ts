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

// 過去の相性診断結果
export const PAST_COMPATIBILITY_RESULTS = [
  {
    id: 1,
    name: "Yuki",
    age: 22,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_12.png",
    compatibilityScore: 92,
    sharedInterests: 4,
    date: "2026-01-20",
  },
  {
    id: 2,
    name: "Hana",
    age: 24,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_8.png",
    compatibilityScore: 87,
    sharedInterests: 3,
    date: "2026-01-18",
  },
  {
    id: 3,
    name: "Sora",
    age: 21,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_5.png",
    compatibilityScore: 85,
    sharedInterests: 3,
    date: "2026-01-15",
  },
  {
    id: 4,
    name: "Mei",
    age: 23,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_3.png",
    compatibilityScore: 78,
    sharedInterests: 2,
    date: "2026-01-12",
  },
  {
    id: 5,
    name: "Rina",
    age: 20,
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png",
    compatibilityScore: 72,
    sharedInterests: 2,
    date: "2026-01-10",
  },
];