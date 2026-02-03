import React, { useMemo, useCallback } from 'react';
import { FRIENDS_LIST, FriendProfile, NEW_CONNECTION_SUGGESTION } from '../constants';
import { useAppState, useBlurRules } from '../contexts/AppStateContext';
import RadialFriendCard from './RadialFriendCard';
import RadialCenterCard from './RadialCenterCard';

interface RadialGraphProps {
  onSelectFriend: (friend: FriendProfile) => void;
  onTapCenter: () => void;
  containerWidth?: number;
  containerHeight?: number;
}

const RadialGraph: React.FC<RadialGraphProps> = ({
  onSelectFriend,
  onTapCenter,
  containerWidth = 375,
  containerHeight = 400,
}) => {
  const { state, dispatch } = useAppState();
  const { blurTitle, blurImage, isFriendGoed } = useBlurRules();

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Card dimensions for offset (center the card on the calculated position)
  const cardW = 48;
  const cardH = 72;
  const centerCardW = 56;
  const centerCardH = 80; // includes name

  const friends = FRIENDS_LIST;

  const defaultPositions = useMemo(() => {
    const positions: Record<number, { x: number; y: number }> = {};
    const n = friends.length;
    const radiusX = Math.min(containerWidth * 0.35, 130);
    const radiusY = Math.min(containerHeight * 0.36, 160);

    friends.forEach((f, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      positions[f.id] = {
        x: centerX + radiusX * Math.cos(angle) - cardW / 2,
        y: centerY + radiusY * Math.sin(angle) - cardH / 2,
      };
    });
    return positions;
  }, [friends, containerWidth, containerHeight, centerX, centerY]);

  const getPosition = useCallback((friendId: number) => {
    return state.cardPositions[friendId] || defaultPositions[friendId] || { x: 0, y: 0 };
  }, [state.cardPositions, defaultPositions]);

  const handleDragEnd = useCallback((friendId: number, x: number, y: number) => {
    dispatch({ type: 'UPDATE_CARD_POSITION', friendId, x, y });
  }, [dispatch]);

  // SVG lines from center to each friend card
  const lines = useMemo(() => {
    return friends.map(f => {
      const pos = getPosition(f.id);
      return {
        id: f.id,
        x1: centerX,
        y1: centerY,
        x2: pos.x + cardW / 2,
        y2: pos.y + cardH / 2,
      };
    });
  }, [friends, getPosition, centerX, centerY]);

  // New connection node (only shown when confirmed)
  const showNewConnection = state.oneLineState === 'confirmed';

  return (
    <div className="relative" style={{ width: containerWidth, height: containerHeight }}>
      {/* SVG connection lines */}
      <svg className="absolute inset-0 pointer-events-none" width={containerWidth} height={containerHeight}>
        {lines.map(line => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(251, 146, 60, 0.15)"
            strokeWidth={1.5}
          />
        ))}
        {/* New connection line */}
        {showNewConnection && (
          <line
            x1={centerX}
            y1={centerY}
            x2={containerWidth - 40}
            y2={containerHeight - 40}
            stroke="rgba(251, 146, 60, 0.3)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )}
      </svg>

      {/* Center card */}
      <div
        className="absolute"
        style={{
          left: centerX - centerCardW / 2,
          top: centerY - centerCardH / 2,
          zIndex: 15,
        }}
      >
        <RadialCenterCard
          oneLineState={state.oneLineState}
          onTap={onTapCenter}
        />
      </div>

      {/* Friend cards */}
      {friends.map(friend => {
        const pos = getPosition(friend.id);
        return (
          <RadialFriendCard
            key={friend.id}
            friend={friend}
            x={pos.x}
            y={pos.y}
            blurTitle={blurTitle}
            blurImage={blurImage}
            isGoed={isFriendGoed(friend.id)}
            onDragEnd={handleDragEnd}
            onClick={onSelectFriend}
          />
        );
      })}

      {/* New connection suggestion node */}
      {showNewConnection && (
        <div
          className="absolute flex flex-col items-center animate-pulse"
          style={{
            left: containerWidth - 64,
            top: containerHeight - 64,
            zIndex: 10,
          }}
        >
          <div className="w-10 h-14 rounded-lg bg-gradient-to-b from-orange-200 to-orange-300 dark:from-orange-800 dark:to-orange-900 shadow-md border border-dashed border-orange-400 overflow-hidden flex items-center justify-center">
            <img
              src={NEW_CONNECTION_SUGGESTION.image}
              alt={NEW_CONNECTION_SUGGESTION.name}
              className="w-full h-full object-contain opacity-60"
              draggable={false}
            />
          </div>
          <span className="mt-0.5 text-[8px] font-semibold text-orange-500 dark:text-orange-400">
            {NEW_CONNECTION_SUGGESTION.name}?
          </span>
        </div>
      )}
    </div>
  );
};

export default RadialGraph;
