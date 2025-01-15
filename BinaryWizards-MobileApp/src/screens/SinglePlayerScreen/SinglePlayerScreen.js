import React from 'react';
import { ImageBackground, View } from 'react-native';
import { styles } from './SinglePlayerStyles';
import background from '../../../assets/backgrounds/singleplayerBackground.png';
import TopBar from '../../components/TopBar/TopBar';
import GameList from '../../components/GameList/GameList';
import SearchQuiz from '../../components/SearchQuiz/SearchQuiz';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import HomeButton from '../../components/HomeButton/HomeButton';

const queryClient = new QueryClient();

export default function SinglePlayerScreen() {
  const [token, setToken] = React.useState(null);
  const [showOngoingGames, setOngoingGames] = React.useState(true);

  const navigation = useNavigation();

  return (
    <QueryClientProvider client={queryClient}>
      <ImageBackground
        source={background}
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
      >
        <HomeButton text="Back" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <SecondaryButton
            text="Resume Game"
            onPress={() => setOngoingGames(true)}
            style={showOngoingGames ? styles.buttonSelected : styles.navButton}
            textStyle={styles.text}
          />
          <SecondaryButton
            text="Search Quiz"
            onPress={() => setOngoingGames(false)}
            style={showOngoingGames ? styles.navButton : styles.buttonSelected}
            textStyle={styles.text}
          />
        </View>

        <View style={{ flex: 1, width: '100%' }}>
          {showOngoingGames ? <GameList /> : <SearchQuiz />}
        </View>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{ borderBottomWidth: 2, borderBottomColor: '#9d03fc' }}
          ></View>
          <PrimaryButton
            isQuestion={false}
            text="Quick quiz"
            onPress={() => {
              navigation.navigate('Create');
            }}
            style={styles.button}
            textS
          />
        </View>
      </ImageBackground>
    </QueryClientProvider>
  );
}
