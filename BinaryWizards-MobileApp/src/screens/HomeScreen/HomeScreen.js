import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import userTokenEmitter from '../../utils/eventEmitter';
import TopBar from '../../components/TopBar/TopBar';
import UserHomeComponent from '../../components/UserHomeComponent/UserHomeComponent';
import { styles } from './homeScreenStyles';
import mainBackground from '../../../assets/backgrounds/mainBackground.png';
import userBackground from '../../../assets/backgrounds/userBackground.png';
import ResumeGame from '../../components/ResumeGame';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const [background, setBackground] = useState(mainBackground);

  useEffect(() => {
    const listener = (newToken) => {
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  useEffect(() => {
    setBackground(userToken ? userBackground : mainBackground);
  }, [userToken]);

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <TopBar setHomeScreenUserToken={setUserToken} />
      {userToken ? <UserHomeScreen /> : <ResumeGame />}
    </ImageBackground>
  );
}
