import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SecondaryButton from './SecondaryButton';
import SearchQuiz from './SearchQuiz';
import GameList from './GameList';

export default function UserHomeComponent() {
  const [showOngoingGames, setShowOngoingGames] = useState(true);

  const toggleShowOngoingGames = (value) => {
    setShowOngoingGames(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          text="Ongoing games"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    transition: '0.3s all',
  },
  buttonSelected: {
    backgroundColor: '#3552B0',
    borderWidth: 1,
    borderColor: '#3552B0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    shadowColor: '#3552B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    transition: '0.3s all',
  },
});