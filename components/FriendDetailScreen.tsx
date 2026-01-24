import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, MessageCircle, Heart } from 'lucide-react';
import { FriendProfile } from '../constants';
import StatusBar from './StatusBar';

interface FriendDetailScreenProps {
  friend: FriendProfile;
  onBack: () => void;
  onDiagnostic?: () => void;
  onDM?: () => void;
}

const FriendDetailScreen: React.FC<FriendDetailScreenProps> = ({ friend, onBack, onDiagnostic, onDM }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  if (!portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 font-sans overflow-hidden flex flex-col pointer-events-auto">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <StatusBar variant="light" className="relative z-10" />

      {/* Header with back button */}
      <div className="relative z-10 flex items-center px-4 py-2 shrink-0">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content - Card + Actions */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Large Friend Card - Original Design */}
        <div style={{ width: '220px', height: '330px' }} className="rounded-3xl bg-white shadow-2xl border-2 border-white/80 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-50 to-neutral-100">
            <img
              src={friend.image}
              alt={friend.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="shrink-0 px-4 py-3 bg-white border-t border-neutral-200">
            <span className="text-base text-neutral-700 font-semibold block text-center truncate">
              {friend.name}
            </span>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-white font-serif italic font-black text-2xl mt-4">{friend.name}</h2>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6 w-full max-w-[260px]">
          <button
            onClick={onDM}
            className="flex items-center gap-4 w-full py-4 px-8 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-white shrink-0" />
            <span className="text-lg text-white font-bold">Message</span>
          </button>

          <button
            onClick={onDiagnostic}
            className="flex items-center gap-4 w-full py-4 px-8 rounded-2xl bg-orange-400 shadow-lg active:scale-95 transition-transform"
          >
            <Heart className="w-6 h-6 text-white shrink-0" />
            <span className="text-lg text-white font-bold">Compatibility</span>
          </button>
        </div>
      </div>
    </div>,
    portalContainer
  );
};

export default FriendDetailScreen;
