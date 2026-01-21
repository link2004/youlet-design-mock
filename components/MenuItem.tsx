import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center justify-between py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-white/10 rounded-lg px-2 -mx-2 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-colors">
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className="text-neutral-900 dark:text-neutral-100 font-medium text-[15px]">{label}</span>
      </div>
      <ChevronRight size={20} className="text-neutral-400" />
    </div>
  );
};

export default MenuItem;