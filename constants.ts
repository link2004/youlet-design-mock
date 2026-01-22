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

// 友達一覧（交換済みカード）
export const FRIENDS_LIST = [
  { id: 1, name: "Momo", image: "/images/characters/char16.png" },
  { id: 2, name: "Kento", image: "/images/characters/char17.png" },
  { id: 3, name: "Nina", image: "/images/characters/char18.png" },
  { id: 4, name: "Ryo", image: "/images/characters/char19.png" },
  { id: 5, name: "Sora", image: "/images/characters/char20.png" },
  { id: 6, name: "Leon", image: "/images/characters/char21.png" },
  { id: 7, name: "Akane", image: "/images/characters/char22.png" },
  { id: 8, name: "Kai", image: "/images/characters/char23.png" },
  { id: 9, name: "Miku", image: "/images/characters/char24.png" },
  { id: 10, name: "Yuto", image: "/images/characters/char25.png" },
];