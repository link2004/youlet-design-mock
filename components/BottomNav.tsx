import React from 'react';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        {NAV_ITEMS.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <item.icon
              size={24}
              className={item.active ? "text-black dark:text-white fill-current" : "text-gray-400 dark:text-gray-500"}
              strokeWidth={item.active ? 0 : 1.5}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;