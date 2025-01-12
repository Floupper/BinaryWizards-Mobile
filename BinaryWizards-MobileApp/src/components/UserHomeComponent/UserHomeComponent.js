import React, { useState } from 'react';
import { View } from 'react-native';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import { styleButton } from '../../styles/buttons';
import SearchQuiz from '../SearchQuiz/SearchQuiz';
import GameList from '../GameList/GameList';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../PrimaryButton';

export default function UserHomeComponent() {
  const [showOngoingGames, setShowOngoingGames] = useState(true);
  const navigation = useNavigation();

  const toggleShowOngoingGames = (value) => {
    setShowOngoingGames(value);
  };

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <SecondaryButton
          text="Resume games"
          onPress={() => toggleShowOngoingGames(true)}
          style={showOngoingGames ? styles.buttonSelected : styles.button}
          textStyle={showOngoingGames ? styles.textSelected : styles.text}
        />
        <SecondaryButton
          text="Search quiz"
          onPress={() => toggleShowOngoingGames(false)}
          style={showOngoingGames ? styles.button : styles.buttonSelected}
          textStyle={showOngoingGames ? styles.text : styles.textSelected}
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
          text="Create quiz"
          onPress={() => {
            navigation.navigate('Create');
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
}
