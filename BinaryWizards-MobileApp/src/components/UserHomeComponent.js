import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SecondaryButton from './SecondaryButton';

export default function UserHomeComponent() {
  const [showOngoingGames, setShowOngoingGames] = useState(true);

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
        {/* <SecondaryButton
          text="Ongoing games"
          onPress={setShowOngoingGames(true)}
        />
        <SecondaryButton
          text="Search quiz"
          onPress={setShowOngoingGames(false)}
        /> */}
      </View>
      {showOngoingGames ? <Text>Ongoing games</Text> : <Text>Search quiz</Text>}
    </View>
  );
}
