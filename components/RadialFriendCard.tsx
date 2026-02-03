import React, { useRef, useCallback } from 'react';
import { FriendProfile } from '../constants';

interface RadialFriendCardProps {
  friend: FriendProfile;
  x: number;
  y: number;
  blurTitle: boolean;
  blurImage: boolean;
  isGoed: boolean;
  onDragEnd: (friendId: number, x: number, y: number) => void;
  onClick: (friend: FriendProfile) => void;
}

const RadialFriendCard: React.FC<RadialFriendCardProps> = ({
  friend,
  x,
  y,
  blurTitle,
  blurImage,
  isGoed,
  onDragEnd,
  onClick,
}) => {
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x, y });
  const cardRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    startPos.current = { x: e.clientX - currentPos.current.x, y: e.clientY - currentPos.current.y };
    cardRef.current?.setPointerCapture(e.pointerId);
    if (cardRef.current) {
      cardRef.current.style.zIndex = '20';
      cardRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(1.1)`;
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    currentPos.current = { x: newX, y: newY };
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(1.1)`;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    cardRef.current?.releasePointerCapture(e.pointerId);
    if (cardRef.current) {
      cardRef.current.style.zIndex = '10';
      cardRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(1)`;
    }
    onDragEnd(friend.id, currentPos.current.x, currentPos.current.y);
    if (!hasMoved.current) {
      onClick(friend);
    }
  }, [friend, onDragEnd, onClick]);

  // Update position ref when props change
  currentPos.current = { x, y };

  return (
    <div
      ref={cardRef}
      className="absolute touch-none cursor-grab active:cursor-grabbing"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) scale(1)`,
        zIndex: 10,
        transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="flex flex-col items-center" style={{ width: 48 }}>
        {/* Card image */}
        <div className="relative w-12 h-16 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-600 overflow-hidden">
          <div className={`w-full h-full flex items-center justify-center p-0.5 ${blurImage && !isGoed ? 'blur-sm' : ''}`}>
            <img
              src={friend.image}
              alt={friend.name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          {/* Blur overlay */}
          {blurImage && !isGoed && (
            <div className="absolute inset-0 bg-neutral-200/40 dark:bg-neutral-700/40" />
          )}
        </div>
        {/* Name label */}
        <span className={`mt-1 text-[9px] font-semibold text-neutral-700 dark:text-neutral-300 text-center leading-tight ${blurTitle ? 'blur-[3px]' : ''}`}>
          {friend.name}
        </span>
      </div>
    </div>
  );
};

export default RadialFriendCard;
