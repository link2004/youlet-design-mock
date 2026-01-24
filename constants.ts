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

// AI学習用質問
export interface ProfileQuestion {
  id: string;
  question: string;
  category: 'personality' | 'lifestyle' | 'values' | 'preferences' | 'social';
  placeholder: string;
}

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  // Personality
  {
    id: 'q1',
    question: 'How do you usually spend your weekends?',
    category: 'lifestyle',
    placeholder: 'e.g., Relaxing at home, exploring cafes...'
  },
  {
    id: 'q2',
    question: 'What makes you laugh the most?',
    category: 'personality',
    placeholder: 'e.g., Witty humor, silly jokes...'
  },
  {
    id: 'q3',
    question: 'Describe your ideal first date.',
    category: 'preferences',
    placeholder: 'e.g., A cozy dinner, a walk in the park...'
  },
  {
    id: 'q4',
    question: 'What are you most passionate about?',
    category: 'values',
    placeholder: 'e.g., Music, helping others...'
  },
  {
    id: 'q5',
    question: 'How do you handle stress?',
    category: 'personality',
    placeholder: 'e.g., Exercise, meditation, talking to friends...'
  },
  {
    id: 'q6',
    question: 'What\'s your love language?',
    category: 'preferences',
    placeholder: 'e.g., Words of affirmation, quality time...'
  },
  {
    id: 'q7',
    question: 'Are you more of a morning person or night owl?',
    category: 'lifestyle',
    placeholder: 'e.g., Early bird, definitely a night owl...'
  },
  {
    id: 'q8',
    question: 'What\'s a skill you\'d love to learn?',
    category: 'values',
    placeholder: 'e.g., Playing guitar, cooking...'
  },
  {
    id: 'q9',
    question: 'How do you prefer to communicate?',
    category: 'social',
    placeholder: 'e.g., Texting, video calls, in-person...'
  },
  {
    id: 'q10',
    question: 'What does friendship mean to you?',
    category: 'values',
    placeholder: 'e.g., Trust, being there for each other...'
  },
  {
    id: 'q11',
    question: 'Describe a perfect day off.',
    category: 'lifestyle',
    placeholder: 'e.g., Sleeping in, brunch, movie marathon...'
  },
  {
    id: 'q12',
    question: 'What\'s your biggest pet peeve?',
    category: 'personality',
    placeholder: 'e.g., Being late, dishonesty...'
  },
  {
    id: 'q13',
    question: 'Where do you see yourself in 5 years?',
    category: 'values',
    placeholder: 'e.g., Traveling the world, building a career...'
  },
  {
    id: 'q14',
    question: 'What\'s your favorite way to show affection?',
    category: 'preferences',
    placeholder: 'e.g., Giving gifts, spending quality time...'
  },
  {
    id: 'q15',
    question: 'How adventurous are you with food?',
    category: 'lifestyle',
    placeholder: 'e.g., Love trying new things, prefer familiar...'
  },
  {
    id: 'q16',
    question: 'What\'s a deal-breaker for you in relationships?',
    category: 'values',
    placeholder: 'e.g., Lack of communication, disrespect...'
  },
  {
    id: 'q17',
    question: 'How do you like to meet new people?',
    category: 'social',
    placeholder: 'e.g., Through friends, at events...'
  },
  {
    id: 'q18',
    question: 'What\'s something you\'re proud of?',
    category: 'personality',
    placeholder: 'e.g., My creativity, overcoming challenges...'
  },
  {
    id: 'q19',
    question: 'Do you prefer quiet nights in or going out?',
    category: 'social',
    placeholder: 'e.g., Cozy nights at home, clubbing...'
  },
  {
    id: 'q20',
    question: 'What do you value most in a partner?',
    category: 'preferences',
    placeholder: 'e.g., Kindness, sense of humor, ambition...'
  },
];