import React from 'react';
import { FRIENDS_OF_FRIENDS_LIST } from '../constants';
import FriendAvatar from './FriendAvatar';

interface FriendsOfFriendsListProps {
  searchQuery: string;
}

const FriendsOfFriendsList: React.FC<FriendsOfFriendsListProps> = ({ searchQuery }) => {
  const filteredFriends = FRIENDS_OF_FRIENDS_LIST.filter(
    friend => friend.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
              friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-neutral-500 dark:text-neutral-400 px-1 mb-1">
        Friends of Friends
      </p>
      {filteredFriends.length === 0 ? (
        <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center py-8">
          No results found
        </p>
      ) : (
        filteredFriends.map(friend => (
          <div
            key={friend.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors cursor-pointer"
          >
            <FriendAvatar src={friend.image} alt={friend.name} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-black dark:text-white truncate">
                {friend.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {friend.userId}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendsOfFriendsList;
