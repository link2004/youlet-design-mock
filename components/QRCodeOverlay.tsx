import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { USER_DATA } from '../constants';

interface QRCodeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeOverlay: React.FC<QRCodeOverlayProps> = ({ isOpen, onClose }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  if (!isOpen || !portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-[60] font-sans overflow-hidden flex flex-col pointer-events-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-16 right-6 p-2 rounded-full bg-white/10 active:scale-95 transition-transform"
        >
          <X size={20} className="text-white" />
        </button>

        {/* QR Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <img
            src={USER_DATA.characterAvatar}
            alt={USER_DATA.name}
            className="w-16 h-16 object-contain mb-3"
          />
          <h3 className="font-bold text-neutral-900 text-lg mb-1">{USER_DATA.name}</h3>
          <p className="text-neutral-500 text-sm mb-6">Scan to add as friend</p>

          {/* Mock QR Code - SVG grid pattern */}
          <div className="w-48 h-48 bg-white p-3 rounded-xl border-2 border-neutral-100">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* QR-like pattern */}
              {/* Corner squares */}
              <rect x="0" y="0" width="28" height="28" fill="black" />
              <rect x="4" y="4" width="20" height="20" fill="white" />
              <rect x="8" y="8" width="12" height="12" fill="black" />

              <rect x="72" y="0" width="28" height="28" fill="black" />
              <rect x="76" y="4" width="20" height="20" fill="white" />
              <rect x="80" y="8" width="12" height="12" fill="black" />

              <rect x="0" y="72" width="28" height="28" fill="black" />
              <rect x="4" y="76" width="20" height="20" fill="white" />
              <rect x="8" y="80" width="12" height="12" fill="black" />

              {/* Random data pattern */}
              <rect x="36" y="4" width="4" height="4" fill="black" />
              <rect x="44" y="4" width="4" height="4" fill="black" />
              <rect x="52" y="4" width="8" height="4" fill="black" />
              <rect x="36" y="12" width="8" height="4" fill="black" />
              <rect x="48" y="12" width="4" height="4" fill="black" />
              <rect x="60" y="12" width="4" height="4" fill="black" />
              <rect x="36" y="20" width="4" height="4" fill="black" />
              <rect x="48" y="20" width="8" height="4" fill="black" />
              <rect x="64" y="20" width="4" height="4" fill="black" />

              <rect x="4" y="36" width="4" height="4" fill="black" />
              <rect x="16" y="36" width="4" height="4" fill="black" />
              <rect x="36" y="36" width="4" height="4" fill="black" />
              <rect x="48" y="36" width="4" height="4" fill="black" />
              <rect x="60" y="36" width="4" height="4" fill="black" />
              <rect x="76" y="36" width="8" height="4" fill="black" />
              <rect x="92" y="36" width="4" height="4" fill="black" />

              <rect x="4" y="44" width="8" height="4" fill="black" />
              <rect x="20" y="44" width="4" height="4" fill="black" />
              <rect x="40" y="44" width="4" height="4" fill="black" />
              <rect x="52" y="44" width="8" height="4" fill="black" />
              <rect x="68" y="44" width="4" height="4" fill="black" />
              <rect x="80" y="44" width="4" height="4" fill="black" />
              <rect x="92" y="44" width="4" height="4" fill="black" />

              <rect x="4" y="52" width="4" height="4" fill="black" />
              <rect x="16" y="52" width="8" height="4" fill="black" />
              <rect x="36" y="52" width="4" height="4" fill="black" />
              <rect x="44" y="52" width="4" height="4" fill="black" />
              <rect x="56" y="52" width="4" height="4" fill="black" />
              <rect x="72" y="52" width="4" height="4" fill="black" />
              <rect x="84" y="52" width="8" height="4" fill="black" />

              <rect x="4" y="60" width="4" height="4" fill="black" />
              <rect x="12" y="60" width="4" height="4" fill="black" />
              <rect x="24" y="60" width="4" height="4" fill="black" />
              <rect x="40" y="60" width="8" height="4" fill="black" />
              <rect x="56" y="60" width="4" height="4" fill="black" />
              <rect x="68" y="60" width="8" height="4" fill="black" />
              <rect x="88" y="60" width="8" height="4" fill="black" />

              <rect x="36" y="76" width="4" height="4" fill="black" />
              <rect x="48" y="76" width="8" height="4" fill="black" />
              <rect x="64" y="76" width="4" height="4" fill="black" />
              <rect x="76" y="76" width="4" height="4" fill="black" />
              <rect x="88" y="76" width="8" height="4" fill="black" />

              <rect x="36" y="84" width="8" height="4" fill="black" />
              <rect x="52" y="84" width="4" height="4" fill="black" />
              <rect x="60" y="84" width="4" height="4" fill="black" />
              <rect x="72" y="84" width="8" height="4" fill="black" />
              <rect x="92" y="84" width="4" height="4" fill="black" />

              <rect x="36" y="92" width="4" height="4" fill="black" />
              <rect x="44" y="92" width="4" height="4" fill="black" />
              <rect x="56" y="92" width="8" height="4" fill="black" />
              <rect x="72" y="92" width="4" height="4" fill="black" />
              <rect x="80" y="92" width="4" height="4" fill="black" />
              <rect x="92" y="92" width="4" height="4" fill="black" />

              {/* Orange center logo */}
              <rect x="40" y="40" width="20" height="20" rx="4" fill="#fb923c" />
              <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Y</text>
            </svg>
          </div>

          <p className="text-neutral-400 text-xs mt-4">YouLet Profile Share</p>
        </div>
      </div>
    </div>,
    portalContainer
  );
};

export default QRCodeOverlay;
