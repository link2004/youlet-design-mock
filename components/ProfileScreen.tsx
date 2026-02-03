import React, { useState, useEffect } from 'react';
import { Settings, ChevronLeft, ChevronRight, Moon, Sun, Share2, Sparkles, BookOpen } from 'lucide-react';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import StoryView from './StoryView';
import QRCodeOverlay from './QRCodeOverlay';
import { USER_DATA, MY_RECENT_EVENTS } from '../constants';
import { useAppState } from '../contexts/AppStateContext';
import { PageType } from '../App';

interface ProfileScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onGenerateOneLine?: () => void;
}

const MenuLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-neutral-900 rounded-xl active:scale-[0.98] transition-transform"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-neutral-900 dark:text-neutral-100">{label}</span>
    </div>
    <ChevronRight size={20} className="text-neutral-400" />
  </button>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentPage, onNavigate, onGenerateOneLine }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [hasBF, setHasBF] = useState(false);
  const { state } = useAppState();

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

            {/* Profile Card */}
            <div className="flex flex-col items-center mt-4 mb-4 px-6">
              <div className="w-32 h-44 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden mb-3">
                <div className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800">
                  <img
                    src={USER_DATA.characterAvatar}
                    alt="Profile"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <h2 className="text-xl font-serif italic font-bold text-neutral-900 dark:text-white">{USER_DATA.name}</h2>

              {/* BF Toggle */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {hasBF ? '💑 In a relationship' : '💛 Single'}
                </span>
                <button
                  onClick={() => setHasBF(!hasBF)}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                    hasBF ? 'bg-orange-400' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                      hasBF ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Today's One Line */}
            <div className="px-6 mb-4">
              <h3 className="font-bold text-sm text-black dark:text-white mb-2">Today's One Line</h3>
              {state.oneLineState === 'ungenerated' ? (
                <button
                  onClick={onGenerateOneLine}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold text-sm active:scale-[0.98] transition-transform shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Generate Your One Line
                </button>
              ) : state.selectedOneLine ? (
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl">
                  <img
                    src={state.selectedOneLine.characterImage}
                    alt="You"
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <span className="text-sm font-medium text-neutral-900 dark:text-white flex-1">
                    {state.selectedOneLine.title}
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">Generating...</p>
                </div>
              )}
            </div>

            {/* Recent Events */}
            <div className="px-6 mb-4">
              <h3 className="font-bold text-sm text-black dark:text-white mb-2">Recent Events</h3>
              <div className="flex flex-col gap-2">
                {MY_RECENT_EVENTS.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl">
                    <span className="text-lg shrink-0">{event.emoji}</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white flex-1">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 flex flex-col gap-3 pb-4">
              <button
                onClick={() => setShowStory(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-red-500 py-4 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-4"
              >
                <span className="relative z-10 text-white font-serif italic font-bold text-sm tracking-wide text-center leading-snug">
                  Read Your Story
                </span>
              </button>

              <button
                onClick={() => setShowQR(true)}
                className="w-full bg-white dark:bg-neutral-800 py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-700"
              >
                <Share2 size={18} className="text-orange-400" />
                <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Share Profile (QR)
                </span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="px-6 pb-6">
              <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                More
              </h2>
              <div className="flex flex-col gap-2">
                <MenuLink
                  icon={<Sparkles size={20} className="text-pink-500" />}
                  label="Diagnostic"
                  onClick={() => onNavigate('diagnostic')}
                />
                <MenuLink
                  icon={<BookOpen size={20} className="text-blue-500" />}
                  label="Log"
                  onClick={() => onNavigate('log')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settings Screen */}
        <div
          className={`absolute inset-0 bg-cream dark:bg-black transition-transform duration-300 ease-out z-50 ${
            showSettings ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
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

            <div className="px-6 mt-6">
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
      {showStory && <StoryView onClose={() => setShowStory(false)} />}

      {/* QR Code Overlay */}
      <QRCodeOverlay isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
};

export default ProfileScreen;
