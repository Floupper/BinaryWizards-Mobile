import React, { useState } from 'react';
import { View, Button } from 'react-native';
import SecondaryButton from '../SecondaryButton';
import SearchQuiz from '../SearchQuiz/SearchQuiz';
import GameList from '../GameList/GameList';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function UserHomeComponent() {
  const [showOngoingGames, setShowOngoingGames] = useState(true);
  const navigation = useNavigation();

  const toggleShowOngoingGames = (value) => {
    setShowOngoingGames(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          text="Resume games"
          onPress={() => toggleShowOngoingGames(true)}
          style={showOngoingGames ? styles.buttonSelected : styles.button}
        />
        <SecondaryButton
          text="Search quiz"
          onPress={() => toggleShowOngoingGames(false)}
          style={showOngoingGames ? styles.button : styles.buttonSelected}
        />
      </View>
      {showOngoingGames ? <GameList /> : <SearchQuiz />}
    </View>
  );
}
