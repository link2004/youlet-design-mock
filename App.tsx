import React from 'react';
import { Settings, Bell, ChevronLeft, CreditCard, Pencil, Star, Moon, Sun } from 'lucide-react';
import { USER_DATA, MENU_ITEMS } from './constants';
import MenuItem from './components/MenuItem';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-black font-sans transition-colors duration-300">
      <div className="w-full max-w-md bg-cream dark:bg-gray-900 min-h-screen relative shadow-2xl pb-24 no-scrollbar overflow-y-auto transition-colors duration-300">
        
        {/* Mock Status Bar */}
        <div className="flex justify-between items-center px-6 py-3 text-black dark:text-white font-semibold text-sm">
          <span>13:42</span>
          <div className="flex items-center gap-1">
            <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-4 h-4 bg-black dark:bg-white rounded-full ml-2"></div>
            <div className="ml-1 text-[10px]">50</div>
            <div className="w-6 h-3 border border-black dark:border-white rounded-sm relative ml-1">
              <div className="absolute inset-0.5 bg-black dark:bg-white w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-cream dark:bg-gray-900 sticky top-0 z-40 transition-colors duration-300">
          <div className="w-10"></div> {/* Spacer for balance */}
          <h1 className="font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
            Youlet
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {darkMode ? (
                <Sun size={22} className="text-coral" />
              ) : (
                <Moon size={22} className="text-coral" />
              )}
            </button>
            <Settings size={22} className="text-coral" />
            <div className="relative">
              <Bell size={22} className="text-coral fill-coral/20" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        <div className="bg-salmon dark:bg-gray-800 px-4 py-3 flex items-center justify-between gap-3 mx-4 rounded-xl mt-2 mb-6 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-black dark:bg-gray-700 rounded-lg p-1.5 shrink-0">
               <CreditCard size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-gray-900 dark:text-gray-100 leading-tight">You're getting fewer matches</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Let's complete your profile</span>
            </div>
          </div>
          <button className="bg-coral text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm whitespace-nowrap active:scale-95 transition-transform">
            Configure
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            {/* Increased avatar size significantly */}
            <div className="w-72 h-72 flex items-center justify-center">
              <img 
                src={USER_DATA.avatar} 
                alt="Profile" 
                className="w-full h-full object-contain drop-shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
                  console.warn("Failed to load user avatar, switched to fallback.");
                }}
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-coral p-1.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm">
              <Pencil size={14} className="text-white" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{USER_DATA.name}</span>
            <ChevronLeft size={20} className="text-black dark:text-white rotate-180" strokeWidth={3} />
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {USER_DATA.age} years old • {USER_DATA.location}
          </div>
        </div>

        {/* Promo Button (Your story -> あなたを一言で表すなら...) */}
        <div className="px-4 mb-8">
          <button className="w-full bg-gradient-to-r from-blue-500 to-red-500 h-14 rounded-xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center">
             {/* Decorative star background effect */}
             <div className="absolute -right-4 -top-4 text-white/10 transform rotate-12">
               <Star size={80} fill="currentColor" />
             </div>
             <div className="absolute left-10 bottom-0 text-white/10 transform -rotate-12">
               <Star size={40} fill="currentColor" />
             </div>
             
             <span className="relative z-10 text-white font-bold text-lg tracking-wide">
               あなたを一言で表すなら...
             </span>
          </button>
        </div>

        {/* Menu List */}
        <div className="px-6 flex flex-col gap-1 pb-6">
          {MENU_ITEMS.map((item, idx) => (
            <MenuItem key={idx} {...item} />
          ))}
          {/* Add a fake extra item to ensure scrolling looks nice */}
          <div className="flex items-center justify-between py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-white/10 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200/80 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300">
                <Settings size={20} strokeWidth={2} />
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium text-[15px]">Settings</span>
            </div>
            <ChevronLeft size={20} className="text-gray-400 rotate-180" />
            </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default App;