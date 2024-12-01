import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SecondaryButton from './SecondaryButton';
import SearchQuiz from './SearchQuiz';

export default function UserHomeComponent() {
  const [showOngoingGames, setShowOngoingGames] = useState(true);

  const toggleShowOngoingGames = (value) => {
    setShowOngoingGames(value);
  };

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
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
      {showOngoingGames ? <Text>Ongoing games</Text> : <SearchQuiz />}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonSelected: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
});
