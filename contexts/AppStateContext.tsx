import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

// --- Types ---

export type OneLineState = 'ungenerated' | 'candidates' | 'confirmed';

export interface OneLine {
  id: number;
  title: string;
  characterImage: string;
}

export interface FriendMemo {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export interface AppState {
  oneLineState: OneLineState;
  selectedOneLine: OneLine | null;
  oneLineCandidates: OneLine[];
  cardPositions: Record<number, { x: number; y: number }>;
  friendMemos: Record<number, FriendMemo[]>;
  goedFriends: Set<number>;
}

// --- Actions ---

type AppAction =
  | { type: 'GENERATE_CANDIDATES'; candidates: OneLine[] }
  | { type: 'CONFIRM_ONELINE'; oneLine: OneLine }
  | { type: 'UPDATE_CARD_POSITION'; friendId: number; x: number; y: number }
  | { type: 'ADD_MEMO'; friendId: number; memo: FriendMemo }
  | { type: 'GO_FRIEND'; friendId: number };

// --- Reducer ---

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'GENERATE_CANDIDATES':
      return {
        ...state,
        oneLineState: 'candidates',
        oneLineCandidates: action.candidates,
      };
    case 'CONFIRM_ONELINE':
      return {
        ...state,
        oneLineState: 'confirmed',
        selectedOneLine: action.oneLine,
        oneLineCandidates: [],
      };
    case 'UPDATE_CARD_POSITION':
      return {
        ...state,
        cardPositions: {
          ...state.cardPositions,
          [action.friendId]: { x: action.x, y: action.y },
        },
      };
    case 'ADD_MEMO':
      return {
        ...state,
        friendMemos: {
          ...state.friendMemos,
          [action.friendId]: [
            ...(state.friendMemos[action.friendId] || []),
            action.memo,
          ],
        },
      };
    case 'GO_FRIEND':
      return {
        ...state,
        goedFriends: new Set([...state.goedFriends, action.friendId]),
      };
    default:
      return state;
  }
}

// --- Initial State ---

const initialState: AppState = {
  oneLineState: 'ungenerated',
  selectedOneLine: null,
  oneLineCandidates: [],
  cardPositions: {},
  friendMemos: {},
  goedFriends: new Set(),
};

// --- Blur Rules Hook ---

export interface BlurRules {
  blurTitle: boolean;
  blurImage: boolean;
  isFriendGoed: (friendId: number) => boolean;
}

// --- Context ---

interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export const useAppState = (): AppStateContextType => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};

export const useBlurRules = (): BlurRules => {
  const { state } = useAppState();

  return useMemo(() => {
    const blurTitle = state.oneLineState === 'ungenerated';
    const blurImage = state.oneLineState !== 'confirmed';

    return {
      blurTitle,
      blurImage,
      isFriendGoed: (friendId: number) => state.goedFriends.has(friendId),
    };
  }, [state.oneLineState, state.goedFriends]);
};

// --- Provider ---

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
