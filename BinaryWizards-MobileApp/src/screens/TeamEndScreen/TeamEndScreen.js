import React, { useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import { endStyle, endStyleText } from '../EndScreen/endStyle';
import background from '../../../assets/endBackground.png';

export default function TeamEndScreen() {
  const route = useRoute();
  const { data } = route.params || {};
  const navigation = useNavigation();
  const [isLoadingHome, setIsLoadingHome] = useState(false);

  const renderTeam = ({ item, index }) => {
    const [teamName, teamData] = item;
    const members = [...(teamData.members || [])].sort(
      (a, b) => b.score - a.score
    );

    return (
      <View key={teamName} style={styles.teamContainer}>
        <Text style={styles.teamName}>
          {index + 1}. {teamName} - Total: {teamData.total_score || 0} points
        </Text>
        {members.length > 0 ? (
          <FlatList
            data={members}
            renderItem={({ item }) => (
              <View style={styles.memberRow}>
                <Text style={styles.memberName}>
                  {item.username} - Score: {item.score}
                </Text>
              </View>
            )}
            keyExtractor={(member, idx) => `${teamName}-member-${idx}`}
          />
        ) : (
          <Text>No members listed.</Text>
        )}
      </View>
    );
  };

  const backToHome = async () => {
    setIsLoadingHome(true);
    try {
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error navigating to home:', error);
    } finally {
      setIsLoadingHome(false);
    }
  };

  return (
    <ImageBackground source={background} style={endStyle.imageBackground}>
      <View style={endStyle.endInformation}>
        <View style={styleContainer.middleSection}>
          <Text style={endStyleText.emoji}>🎉🎉</Text>
          <Text style={endStyleText.title}>Quiz Completed!</Text>
          <Text style={styles.title}>Leaderboard:</Text>
          {Object.entries(data).length > 0 ? (
            <FlatList
              data={Object.entries(data.ranking).sort(
                (a, b) => b[1].total_score - a[1].total_score
              )}
              renderItem={renderTeam}
              keyExtractor={(item) => item[0]}
            />
          ) : (
            <Text>No Leaderboard...</Text>
          )}
        </View>
        <View style={styleContainer.bottomSection}>
          <PrimaryButton
            isQuestion={false}
            onPress={backToHome}
            style={styleButton.enabledButton}
            disabled={isLoadingHome}
            text={isLoadingHome ? '' : 'Home Page'}
          >
            {isLoadingHome && <ActivityIndicator color="#fff" />}
          </PrimaryButton>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  memberName: {
    color: 'gray',
    fontFamily: 'Mogula',
    fontSize: 18,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  teamContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  teamName: {
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Mogula',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
