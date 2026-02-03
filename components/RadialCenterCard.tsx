import React from 'react';
import { USER_DATA } from '../constants';
import { OneLineState } from '../contexts/AppStateContext';

interface RadialCenterCardProps {
  oneLineState: OneLineState;
  onTap: () => void;
}

const RadialCenterCard: React.FC<RadialCenterCardProps> = ({ oneLineState, onTap }) => {
  return (
    <button
      onClick={onTap}
      className="relative flex flex-col items-center active:scale-95 transition-transform"
      style={{ width: 56 }}
    >
      {/* Glowing ring when ungenerated */}
      {oneLineState === 'ungenerated' && (
        <div className="absolute -inset-2 rounded-2xl border-2 border-orange-400 animate-pulse opacity-60" />
      )}
      {/* Card */}
      <div className="w-14 h-[72px] rounded-xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-orange-400 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-1">
          <img
            src={USER_DATA.characterAvatar}
            alt={USER_DATA.name}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>
      <span className="mt-1 text-[10px] font-bold text-orange-500 dark:text-orange-400">
        {USER_DATA.name}
      </span>
    </button>
  );
};

export default RadialCenterCard;
