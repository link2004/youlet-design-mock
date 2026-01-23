import React from 'react';

interface FriendAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

const FriendAvatar: React.FC<FriendAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto scale-[2.5] translate-y-[40%]"
      />
    </div>
  );
};

export default FriendAvatar;
