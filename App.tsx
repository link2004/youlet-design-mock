import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import RankingScreen from './components/RankingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import DMScreen from './components/DMScreen';
import FriendDetailScreen from './components/FriendDetailScreen';
import { DiagnosticType, GroupDiagnosticType, FriendProfile } from './constants';

export type PageType = 'cards' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'group-diagnostic-detail' | 'ranking' | 'dm' | 'friend-detail';

type DiagnosticTabType = 'pair' | 'group';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedGroupDiagnostic, setSelectedGroupDiagnostic] = useState<GroupDiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<FriendProfile[]>([]);
  const [diagnosticTab, setDiagnosticTab] = useState<DiagnosticTabType>('pair');

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

  const handleSelectFriendFromFeed = (friend: FriendProfile) => {
    setSelectedFriend(friend);
    setCurrentPage('friend-detail');
  };

  const handleSelectFriendFromRanking = (friend: FriendProfile) => {
    setSelectedFriend(friend);
    setCurrentPage('friend-detail');
  };

  const handleBackFromFriendDetail = () => {
    setSelectedFriend(null);
    setCurrentPage('cards');
  };

  const handleDiagnosticFromFriendDetail = (diagnostic: DiagnosticType) => {
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const handleDMFromFriendDetail = () => {
    setCurrentPage('dm');
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
        return (
          <FeedScreen
            currentPage="cards"
            onNavigate={setCurrentPage}
            onSelectFriend={handleSelectFriendFromFeed}
          />
        );
      case 'friend-detail':
        return (
          <>
            <FeedScreen
              currentPage="cards"
              onNavigate={setCurrentPage}
              onSelectFriend={handleSelectFriendFromFeed}
            />
            {selectedFriend && (
              <FriendDetailScreen
                friend={selectedFriend}
                onBack={handleBackFromFriendDetail}
                onDiagnostic={handleDiagnosticFromFriendDetail}
                onDM={handleDMFromFriendDetail}
              />
            )}
          </>
        );
      case 'ranking':
        return (
          <RankingScreen
            onBack={() => setCurrentPage('cards')}
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
      case 'dm':
        return (
          <DMScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        );
      case 'profile':
      default:
        return <PhoneScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <IPhoneMockup>
      {renderScreen()}
    </IPhoneMockup>
  );
};

export default App;
