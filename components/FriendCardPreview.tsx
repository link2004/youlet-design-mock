import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft } from 'lucide-react';
import { FriendProfile } from '../constants';

interface FriendCardPreviewProps {
  friend: FriendProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onExchange: () => void;
}

const FriendCardPreview: React.FC<FriendCardPreviewProps> = ({
  friend,
  isOpen,
  onClose,
  onExchange
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  if (!isOpen || !friend || !portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 flex flex-col pointer-events-auto">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header with close button */}
        <div className="flex items-center px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
            aria-label="Close"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Card display - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-56 aspect-[2/3] rounded-3xl bg-white shadow-2xl border-2 border-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-50 to-neutral-100">
              <img
                src={friend.image}
                alt={friend.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-3 bg-white border-t border-neutral-200">
              <span className="text-base text-neutral-700 font-semibold block text-center truncate">
                {friend.name}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xl font-bold text-white">{friend.name}</p>
          <p className="text-sm text-white/70">{friend.userId}</p>
        </div>

        {/* Exchange button */}
        <div className="px-6 pb-8">
          <button
            onClick={onExchange}
            className="w-full py-4 bg-orange-400 text-white font-bold rounded-full active:scale-95 transition-transform"
          >
            Exchange Card
          </button>
        </div>
      </div>
    </div>,
    portalContainer
  );
};

export default FriendCardPreview;
