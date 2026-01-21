import React from 'react';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 bg-gray-200/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-lg">
        {NAV_ITEMS.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <item.icon
              size={24}
              className={`fill-current ${item.active ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
              strokeWidth={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;