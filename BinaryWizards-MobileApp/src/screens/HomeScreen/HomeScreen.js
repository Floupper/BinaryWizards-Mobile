import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import userTokenEmitter from '../../utils/eventEmitter';
import TopBar from '../../components/TopBar/TopBar';
import UserHomeScreen from '../UserHomeScreen/UserHomeScreen';
import mainBackground from '../../../assets/backgrounds/mainBackground.png';
import ResumeGame from '../../components/ResumeGame';

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const listener = (newToken) => {
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={mainBackground}>
      <TopBar setHomeScreenUserToken={setUserToken} />
      {userToken ? <UserHomeScreen /> : <ResumeGame />}
    </ImageBackground>
  );
}
