import React from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';

const App: React.FC = () => {
  return (
    <IPhoneMockup>
      <PhoneScreen />
    </IPhoneMockup>
  );
};

export default App;
