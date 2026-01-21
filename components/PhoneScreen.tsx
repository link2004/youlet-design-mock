import React from 'react';
import { Settings, ChevronLeft, Star, Moon, Sun } from 'lucide-react';
import { USER_DATA, MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import BottomNav from './BottomNav';

const PhoneScreen: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [showSettings, setShowSettings] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      {/* Status Bar - fits under Dynamic Island */}
      <div className="flex justify-between items-center px-6 pt-[18px] pb-2 text-black dark:text-white font-semibold text-sm shrink-0 z-50">
        <span className="w-12">13:42</span>
        <div className="flex-1" /> {/* Spacer for Dynamic Island */}
        <div className="flex items-center gap-1.5 w-20 justify-end">
          {/* Cellular signal */}
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[11px] bg-black dark:bg-white rounded-[1px]" />
          </div>
          {/* WiFi */}
          <svg className="w-4 h-3 text-black dark:text-white" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-[11px] border-[1.5px] border-black dark:border-white rounded-[3px] relative flex items-center p-[1.5px]">
              <div className="h-full bg-black dark:bg-white rounded-[1px]" style={{ width: '80%' }} />
            </div>
            <div className="w-[3px] h-[5px] bg-black dark:bg-white rounded-r-[1px] -ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Main Screen */}
        <div className="absolute inset-0">
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
            {/* Header */}
            <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
              <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
                Youlet
              </h1>
              <div className="flex-1" />
              <button
                onClick={() => setShowSettings(true)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Settings size={22} className="text-coral dark:text-gray-400" />
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-6 mb-6">
              <div className="relative mb-2">
                <div className="w-56 h-56 flex items-center justify-center">
                  <img
                    src={USER_DATA.avatar}
                    alt="Profile"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
                    }}
                  />
                </div>
                {/* Foot shadow */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-6 rounded-[50%] bg-white/35 blur-lg"
                />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{USER_DATA.name}</span>
                <ChevronLeft size={20} className="text-black dark:text-white rotate-180" strokeWidth={3} />
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {USER_DATA.age} years old • {USER_DATA.location}
              </div>
            </div>

            {/* Promo Cards - Horizontal Scroll with Snap */}
            <div
              className="mb-8 flex gap-3 overflow-x-auto no-scrollbar"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'auto',
                paddingLeft: 'calc(50% - 144px)',
                paddingRight: 'calc(50% - 144px)'
              }}
            >
              <button
                className="w-72 bg-gradient-to-r from-blue-500 to-red-500 py-6 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-6 flex-shrink-0"
                style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
              >
                <div className="absolute -right-4 -top-4 text-white/10 transform rotate-12">
                  <Star size={80} fill="currentColor" />
                </div>
                <div className="absolute left-10 bottom-0 text-white/10 transform -rotate-12">
                  <Star size={40} fill="currentColor" />
                </div>
                <span className="relative z-10 text-white font-bold text-base tracking-wide text-center leading-relaxed">
                  あなたの物語を読む
                </span>
              </button>
              <button
                className="w-72 py-6 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-6 flex-shrink-0"
                style={{
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                  background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
                }}
              >
                {/* Stars */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-1 h-1 bg-white/80 rounded-full blur-[1px] top-3 left-8" />
                  <div className="absolute w-1.5 h-1.5 bg-white/60 rounded-full blur-[2px] top-6 right-12" />
                  <div className="absolute w-1 h-1 bg-white/70 rounded-full blur-[1px] top-10 left-16" />
                  <div className="absolute w-0.5 h-0.5 bg-white/50 rounded-full blur-[1px] top-4 right-6" />
                  <div className="absolute w-1 h-1 bg-white/60 rounded-full blur-[2px] bottom-4 left-10" />
                  <div className="absolute w-0.5 h-0.5 bg-white/70 rounded-full blur-[1px] bottom-6 right-8" />
                  <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full blur-[2px] top-8 left-6" />
                  <div className="absolute w-1 h-1 bg-white/60 rounded-full blur-[1px] bottom-3 right-16" />
                </div>
                <span className="relative z-10 text-white font-bold text-base tracking-wide text-center leading-relaxed">
                  あなたを構成する要素
                </span>
              </button>
            </div>

            {/* Menu List */}
            <div className="px-6 flex flex-col gap-1 pb-6">
              {MENU_ITEMS.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
              <div
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-between py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-white/10 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200/80 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300">
                    <Settings size={20} strokeWidth={2} />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium text-[15px]">Settings</span>
                </div>
                <ChevronLeft size={20} className="text-gray-400 rotate-180" />
              </div>
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
                className="flex items-center gap-1 text-coral dark:text-gray-400"
              >
                <ChevronLeft size={24} strokeWidth={2} />
                <span className="text-base font-medium">Back</span>
              </button>
              <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-lg text-black dark:text-white">
                Settings
              </h1>
              <div className="flex-1" />
            </div>

            {/* Settings Content */}
            <div className="px-6 mt-6">
              {/* Appearance Section */}
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Appearance
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      {darkMode ? (
                        <Moon size={20} className="text-gray-600 dark:text-gray-400" />
                      ) : (
                        <Sun size={20} className="text-gray-600 dark:text-gray-400" />
                      )}
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        Dark Mode
                      </span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                        darkMode ? 'bg-white' : 'bg-gray-300'
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

      <BottomNav />
    </div>
  );
};

export default PhoneScreen;
