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

// DM チャットリスト
export const DM_CHATS = [
  {
    id: '1',
    name: 'Emily',
    avatar: 'https://ftrfpbrgnjkqgzaggkdz.supabase.co/storage/v1/object/public/profile-avatar/generated-avatars/7e9e5d27-4daa-426f-b4c7-e31e5a2c8045/20260121_043055.png',
    lastMessage: "You should! Want to go on a photo walk sometime?",
    timestamp: '2m',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Yuki',
    avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_21.png',
    lastMessage: "That cafe was amazing! 🍵",
    timestamp: '15m',
    unread: true,
    online: true,
  },
  {
    id: '3',
    name: 'Takeshi',
    avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_7.png',
    lastMessage: "See you at the gaming event!",
    timestamp: '1h',
    unread: false,
    online: false,
  },
  {
    id: '4',
    name: 'Sakura',
    avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_22.png',
    lastMessage: "The cherry blossoms are so beautiful this year",
    timestamp: '3h',
    unread: false,
    online: true,
  },
  {
    id: '5',
    name: 'Kenji',
    avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_8.png',
    lastMessage: "Let me know when you finish that book!",
    timestamp: '1d',
    unread: false,
    online: false,
  },
  {
    id: '6',
    name: 'Mio',
    avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_23.png',
    lastMessage: "Great playlist recommendation 🎵",
    timestamp: '2d',
    unread: false,
    online: false,
  },
];

// DM 会話詳細 (Emily との会話)
export const DM_MESSAGES: Array<{
  id: string;
  sender: 'user' | 'other';
  message: string;
  timestamp: string;
}> = [
  { id: '1', sender: 'other', message: "Hey! Nice to meet you 👋", timestamp: '10:30' },
  { id: '2', sender: 'user', message: "Hi Emily! Nice to meet you too!", timestamp: '10:32' },
  { id: '3', sender: 'other', message: "I saw we both love photography!", timestamp: '10:33' },
  { id: '4', sender: 'user', message: "Yes! I'm really into street photography lately.", timestamp: '10:35' },
  { id: '5', sender: 'other', message: "That's awesome! Do you have a favorite camera?", timestamp: '10:36' },
  { id: '6', sender: 'user', message: "I use a Fujifilm X100V. The colors are amazing!", timestamp: '10:38' },
  { id: '7', sender: 'other', message: "Nice choice! I've been wanting to try Fujifilm.", timestamp: '10:40' },
  { id: '8', sender: 'user', message: "You should! Want to go on a photo walk sometime?", timestamp: '10:42' },
];