import React from 'react';

interface FriendCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col group w-full"
    >
      {/* Card with 2:3 aspect ratio for entire card (image + name) */}
      <div className="w-full aspect-[2/3] rounded-xl bg-white dark:bg-neutral-800 shadow-md border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden transition-transform group-active:scale-95 flex flex-col">
        <div className="flex-1 min-h-0 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="shrink-0 px-2 py-1.5 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600">
          <span className="text-[11px] text-neutral-700 dark:text-neutral-300 font-semibold block text-center truncate">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
};

export default FriendCard;
