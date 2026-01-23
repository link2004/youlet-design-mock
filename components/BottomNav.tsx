import React from 'react';
import { Layout, User, Compass } from 'lucide-react';
import { PageType } from '../App';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const NAV_ITEMS: { icon: typeof Layout; label: string; page: PageType }[] = [
  { icon: Layout, label: "Cards", page: 'cards' },
  { icon: Compass, label: "Diagnostic", page: 'diagnostic' },
  { icon: User, label: "Profile", page: 'profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div
        className="flex items-center gap-6 px-6 py-3 bg-neutral-300/60 dark:bg-neutral-700/60 rounded-full shadow-lg"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        {NAV_ITEMS.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => onNavigate(item.page)}
          >
            <item.icon
              size={24}
              className={`fill-current ${currentPage === item.page ? "text-orange-400" : "text-neutral-400 dark:text-neutral-500"}`}
              strokeWidth={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;