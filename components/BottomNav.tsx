import React from 'react';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 px-4 pb-8 pt-2 z-50 transition-colors duration-300">
      <div className="flex justify-between items-center">
        {NAV_ITEMS.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1 cursor-pointer w-1/5">
            <item.icon
              size={26}
              className={item.active ? "text-coral dark:text-white fill-current" : "text-gray-400 dark:text-gray-600"}
              strokeWidth={item.active ? 0 : 2}
            />
            <span className={`text-[10px] font-medium ${item.active ? "text-coral dark:text-white" : "text-gray-400 dark:text-gray-600"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;