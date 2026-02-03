import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';
import RankingScreen from './components/RankingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import ChatScreen from './components/ChatScreen';
import FriendCardBack from './components/FriendCardBack';
import LogScreen from './components/LogScreen';
import OneLineGenerateScreen from './components/OneLineGenerateScreen';
import { AppStateProvider } from './contexts/AppStateContext';
import { DiagnosticType, GroupDiagnosticType, FriendProfile } from './constants';

export type PageType = 'home' | 'chat' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'group-diagnostic-detail' | 'ranking' | 'friend-detail' | 'friend-card-back' | 'log' | 'oneline-generate';

type DiagnosticTabType = 'pair' | 'group';

const AppInner: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedGroupDiagnostic, setSelectedGroupDiagnostic] = useState<GroupDiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<FriendProfile[]>([]);
  const [diagnosticTab, setDiagnosticTab] = useState<DiagnosticTabType>('pair');
  const [showOneLineGenerate, setShowOneLineGenerate] = useState(false);
  // For GO → 4P chat navigation
  const [goFriendId, setGoFriendId] = useState<number | null>(null);
  const [fromGo, setFromGo] = useState(false);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const handleSelectGroupDiagnostic = (diagnostic: GroupDiagnosticType) => {
    setSelectedGroupDiagnostic(diagnostic);
    setSelectedGroupMembers([]);
    setCurrentPage('group-diagnostic-detail');
  };

  const handleBackFromGroupDiagnosticDetail = () => {
    setSelectedGroupDiagnostic(null);
    setSelectedGroupMembers([]);
    setCurrentPage('diagnostic');
  };

  const handleBackFromDiagnosticDetail = () => {
    setCurrentPage('diagnostic');
    setSelectedDiagnostic(null);
  };

  // Friend card tap → FriendCardBack (replaces FriendDetailScreen)
  const handleSelectFriendFromFeed = (friend: FriendProfile) => {
    setSelectedFriend(friend);
    setCurrentPage('friend-card-back');
  };

  const handleSelectFriendFromRanking = (friend: FriendProfile) => {
    setSelectedFriend(friend);
    setCurrentPage('friend-card-back');
  };

  const handleBackFromFriendCardBack = () => {
    setSelectedFriend(null);
    setCurrentPage('home');
  };

  const handleDiagnosticFromFriendCardBack = (diagnostic: DiagnosticType) => {
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const handleChatFromFriendCardBack = () => {
    setCurrentPage('chat');
  };

  // GO → Navigate to 4P chat
  const handleGoFriend = (friendId: number) => {
    setGoFriendId(friendId);
    setFromGo(true);
    setCurrentPage('chat');
  };

  // Center card tap → Profile
  const handleTapCenter = () => {
    setCurrentPage('profile');
  };

  // Generate one line
  const handleGenerateOneLine = () => {
    setShowOneLineGenerate(true);
  };

  // GO from friend card back → 4P chat
  const handleGoFromFriendCardBack = (friendId: number) => {
    setSelectedFriend(null);
    setGoFriendId(friendId);
    setFromGo(true);
    setCurrentPage('chat');
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeScreen
            currentPage="home"
            onNavigate={setCurrentPage}
            onSelectFriend={handleSelectFriendFromFeed}
            onTapCenter={handleTapCenter}
            onGoFriend={handleGoFriend}
          />
        );
      case 'friend-card-back':
        return (
          <>
            <HomeScreen
              currentPage="home"
              onNavigate={setCurrentPage}
              onSelectFriend={handleSelectFriendFromFeed}
              onTapCenter={handleTapCenter}
              onGoFriend={handleGoFriend}
            />
            {selectedFriend && (
              <FriendCardBack
                friend={selectedFriend}
                onBack={handleBackFromFriendCardBack}
                onDiagnostic={handleDiagnosticFromFriendCardBack}
                onChat={handleChatFromFriendCardBack}
                onGo={handleGoFromFriendCardBack}
              />
            )}
          </>
        );
      case 'ranking':
        return (
          <RankingScreen
            onBack={() => setCurrentPage('home')}
            onSelectFriend={handleSelectFriendFromRanking}
          />
        );
      case 'diagnostic':
        return (
          <DiagnosticScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSelectDiagnostic={handleSelectDiagnostic}
            onSelectGroupDiagnostic={handleSelectGroupDiagnostic}
            activeTab={diagnosticTab}
            onTabChange={setDiagnosticTab}
          />
        );
      case 'group-diagnostic-detail':
        if (selectedGroupDiagnostic) {
          return (
            <DiagnosticDetailScreen
              groupDiagnostic={selectedGroupDiagnostic}
              onBack={handleBackFromGroupDiagnosticDetail}
              selectedGroupMembers={selectedGroupMembers}
              onSelectGroupMembers={setSelectedGroupMembers}
            />
          );
        }
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} onSelectGroupDiagnostic={handleSelectGroupDiagnostic} activeTab={diagnosticTab} onTabChange={setDiagnosticTab} />;
      case 'diagnostic-detail':
        if (selectedDiagnostic) {
          return (
            <DiagnosticDetailScreen
              diagnostic={selectedDiagnostic}
              onBack={handleBackFromDiagnosticDetail}
              selectedFriend={selectedFriend}
              onSelectFriend={setSelectedFriend}
            />
          );
        }
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} onSelectGroupDiagnostic={handleSelectGroupDiagnostic} activeTab={diagnosticTab} onTabChange={setDiagnosticTab} />;
      case 'chat':
        const chatProps = {
          currentPage: currentPage as PageType,
          onNavigate: (page: PageType) => {
            setGoFriendId(null);
            setFromGo(false);
            setCurrentPage(page);
          },
          ...(goFriendId ? { initialFourPersonFriendId: goFriendId, fromGo } : {}),
        };
        // Reset GO state after rendering
        return <ChatScreen {...chatProps} />;
      case 'log':
        return (
          <LogScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        );
      case 'profile':
      default:
        return (
          <ProfileScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onGenerateOneLine={handleGenerateOneLine}
          />
        );
    }
  };

  return (
    <IPhoneMockup>
      {renderScreen()}
      <OneLineGenerateScreen
        isOpen={showOneLineGenerate}
        onClose={() => setShowOneLineGenerate(false)}
      />
    </IPhoneMockup>
  );
};

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <AppInner />
    </AppStateProvider>
  );
};

export default App;
