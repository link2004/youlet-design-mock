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
      className="flex flex-col items-center gap-1.5 group"
    >
      <div className="w-full aspect-square rounded-2xl bg-white dark:bg-neutral-800 shadow-sm overflow-hidden transition-transform group-active:scale-95">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
        {name}
      </span>
    </button>
  );
};

export default FriendCard;
