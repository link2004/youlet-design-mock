import React, { useState, useEffect } from 'react';
import { Settings, ChevronLeft, Star, Moon, Sun } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import StoryView from './StoryView';
import ProfileCardFlip from './ProfileCardFlip';
import { PageType } from '../App';

interface PhoneScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ currentPage, onNavigate }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Main Screen */}
        <div className="absolute inset-0">
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
            {/* Header */}
            <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
              <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
                YouLet
              </h1>
              <div className="flex-1" />
              <button
                onClick={() => setShowSettings(true)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Settings size={22} className="text-orange-400" />
              </button>
            </div>

            {/* Profile Card with Flip */}
            <ProfileCardFlip />

            {/* Menu List */}
            <div className="px-6 flex flex-col gap-1 pb-4">
              {MENU_ITEMS.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
            </div>

            {/* Promo Cards - Bottom Section */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setShowStory(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-red-500 py-5 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-4"
              >
                <div className="absolute -right-2 -top-2 text-white/10 transform rotate-12">
                  <Star size={48} fill="currentColor" />
                </div>
                <div className="absolute left-2 bottom-0 text-white/10 transform -rotate-12">
                  <Star size={24} fill="currentColor" />
                </div>
                <span className="relative z-10 text-white font-serif italic font-bold text-sm tracking-wide text-center leading-snug">
                  Read Your Story
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Screen - Overlays on top */}
        <div
          className={`absolute inset-0 bg-cream dark:bg-black transition-transform duration-300 ease-out z-50 ${
            showSettings ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
            {/* Settings Header */}
            <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center gap-1 text-neutral-700 dark:text-neutral-400"
              >
                <ChevronLeft size={24} strokeWidth={2} />
                <span className="text-base font-medium">Back</span>
              </button>
              <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-bold text-lg text-black dark:text-white">
                Settings
              </h1>
              <div className="flex-1" />
            </div>

            {/* Settings Content */}
            <div className="px-6 mt-6">
              {/* Appearance Section */}
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  Appearance
                </h2>
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      {darkMode ? (
                        <Moon size={20} className="text-neutral-600 dark:text-neutral-400" />
                      ) : (
                        <Sun size={20} className="text-neutral-600 dark:text-neutral-400" />
                      )}
                      <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                        Dark Mode
                      </span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                        darkMode ? 'bg-white' : 'bg-neutral-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                          darkMode ? 'left-6 bg-black' : 'left-1 bg-white'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Story View Modal */}
      {showStory && (
        <StoryView onClose={() => setShowStory(false)} />
      )}
    </div>
  );
};

export default PhoneScreen;
