import React from 'react';
import { MapPin, X } from 'lucide-react';
import { MATCH_CANDIDATE, SHARED_INTERESTS } from '../constants';

interface ProfileCardProps {
  onAccept: () => void;
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onAccept, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50 animate-fade-in">
      <div className="relative bg-white dark:bg-neutral-800 rounded-3xl p-6 mx-6 shadow-2xl max-w-[280px] w-full animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
        >
          <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 dark:border-pink-400/30 shadow-lg">
            <img
              src={MATCH_CANDIDATE.avatar}
              alt={MATCH_CANDIDATE.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name & Location */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
            {MATCH_CANDIDATE.name}, {MATCH_CANDIDATE.age}
          </h3>
          <div className="flex items-center justify-center gap-1 text-neutral-500 dark:text-neutral-400 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{MATCH_CANDIDATE.location}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-5">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 text-center">
            Interests
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {MATCH_CANDIDATE.interests.map((interest) => {
              const isShared = SHARED_INTERESTS.includes(interest);
              return (
                <span
                  key={interest}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isShared
                      ? 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 ring-2 ring-pink-300 dark:ring-pink-400/50'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {interest}
                  {isShared && ' ✨'}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-pink-500 dark:text-pink-400 text-center mt-2">
            {SHARED_INTERESTS.length} shared interests!
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onAccept}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:from-pink-500 hover:to-rose-600 active:scale-[0.98] transition-all"
        >
          View AI-Chat History 💬
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
