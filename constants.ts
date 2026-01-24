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

// AI学習用質問（MBTI形式の4択）
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