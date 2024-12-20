import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userTokenEmitter from '../../utils/eventEmitter';

import { styleContainer } from '../../styles/container';
import TopBar from '../../components/TopBar';
import UserHomeComponent from '../../components/UserHomeComponent/UserHomeComponent';
import HomeComponent from '../../components/HomeComponent';
import PrimaryButton from '../../components/PrimaryButton';
import { styleButton } from '../../styles/buttons';
import { styles } from './homeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import Circles from '../../../assets/circles.svg';
import Iphone from '../../../assets/iphone.svg';
import HomeButton from '../../components/HomeButton';
import { BlurView } from 'expo-blur';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height
  );
  const navigation = useNavigation();

  useEffect(() => {
    const listener = (newToken) => {
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  const updateDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setWindowWidth(width);
    setWindowHeight(height);
  };

  useEffect(() => {
    updateDimensions();
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions
    );
    return () => subscription?.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styleContainer.mainContainer}>
        <LinearGradient
          colors={['#F1F1F1', '#C9D6FF']}
          style={{ width: windowWidth, height: windowHeight }}
        />
        <Circles
          style={[
            styles.svgBackground,
            { width: windowWidth, height: windowHeight },
          ]}
        />
        <BlurView
          intensity={5}
          style={[
            styles.blurContainer,
            { width: windowWidth, height: windowHeight },
          ]}
        >
          <Iphone
            style={[
              styles.backgroundImage,
              { width: windowWidth, height: windowHeight },
            ]}
          />
          <BlurView intensity={10} style={styles.container}>
            <View style={styles.homeButton}>
              <TopBar setHomeScreenUserToken={setUserToken} />
            </View>
            {userToken ? (
              <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                <UserHomeComponent />
                <View style={styleContainer.divider} />
                <PrimaryButton
                  isQuestion={false}
                  text="Create quiz"
                  onPress={() => navigation.navigate('Create')}
                  style={styleButton.enabledButton}
                />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <HomeComponent />
              </View>
            )}
          </BlurView>
        </BlurView>
      </View>
    </QueryClientProvider>
  );
}
