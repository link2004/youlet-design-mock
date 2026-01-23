import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import RankingScreen from './components/RankingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import FriendDetailScreen from './components/FriendDetailScreen';
import { DiagnosticType, GroupDiagnosticType, FriendProfile } from './constants';

export type PageType = 'cards' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'group-diagnostic-detail' | 'friend-detail' | 'ranking';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedGroupDiagnostic, setSelectedGroupDiagnostic] = useState<GroupDiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<FriendProfile[]>([]);
  const [shouldOpenSheet, setShouldOpenSheet] = useState(false);
  const [diagnosticEntryPoint, setDiagnosticEntryPoint] = useState<'diagnostic' | 'friend-detail' | null>(null);
  const [friendDetailEntryPoint, setFriendDetailEntryPoint] = useState<'cards' | 'ranking' | null>(null);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setDiagnosticEntryPoint('diagnostic');
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
    if (diagnosticEntryPoint === 'friend-detail') {
      setShouldOpenSheet(true);
      setCurrentPage('friend-detail');
    } else {
      setCurrentPage('diagnostic');
    }
    setSelectedDiagnostic(null);
    setDiagnosticEntryPoint(null);
  };

  const handleSelectFriendFromFeed = (friend: FriendProfile) => {
    setFriendDetailEntryPoint('cards');
    setSelectedFriend(friend);
    setShouldOpenSheet(false);
    setCurrentPage('friend-detail');
  };

  const handleSelectFriendFromRanking = (friend: FriendProfile) => {
    setFriendDetailEntryPoint('ranking');
    setSelectedFriend(friend);
    setShouldOpenSheet(false);
    setCurrentPage('friend-detail');
  };

  const handleBackFromFriendDetail = () => {
    const returnPage = friendDetailEntryPoint || 'cards';
    setSelectedFriend(null);
    setShouldOpenSheet(false);
    setFriendDetailEntryPoint(null);
    setCurrentPage(returnPage);
  };

  const handleSelectDiagnosticFromFriendDetail = (diagnostic: DiagnosticType) => {
    setDiagnosticEntryPoint('friend-detail');
    setShouldOpenSheet(false);
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
      case 'friend-detail':
        return (
          <>
            <FeedScreen
              currentPage="cards"
              onNavigate={setCurrentPage}
              onSelectFriend={handleSelectFriendFromFeed}
            />
            {currentPage === 'friend-detail' && selectedFriend && (
              <FriendDetailScreen
                friend={selectedFriend}
                onBack={handleBackFromFriendDetail}
                onSelectDiagnostic={handleSelectDiagnosticFromFriendDetail}
                initialSheetOpen={shouldOpenSheet}
              />
            )}
          </>
        );
      case 'ranking':
        return (
          <RankingScreen
            onSelectFriend={handleSelectFriendFromRanking}
            onBack={() => setCurrentPage('cards')}
          />
        );
      case 'diagnostic':
        return (
          <DiagnosticScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSelectDiagnostic={handleSelectDiagnostic}
            onSelectGroupDiagnostic={handleSelectGroupDiagnostic}
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
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} onSelectGroupDiagnostic={handleSelectGroupDiagnostic} />;
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
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} />;
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
