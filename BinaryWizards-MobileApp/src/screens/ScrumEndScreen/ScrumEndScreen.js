import React, { useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import { endStyle, endStyleText } from '../EndScreen/endStyle';
import background from '../../../assets/endBackground.png';

export default function ScrumEndScreen() {
  const route = useRoute();
  const { data } = route.params || {};
  const { ranking = [] } = data || {};
  const navigation = useNavigation();

  const [isLoadingHome, setIsLoadingHome] = useState(false);

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
          <Text style={endStyleText.title}>Quiz Completed !</Text>
          {/* <Text style={endStyleText.secondary}>
            Score : {correct_answers_nb}/{nb_questions_total}
          </Text> */}
          <Text style={styles.title}>Classement :</Text>
          {ranking.length > 0 ? (
            ranking.map((entry, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.rank}>{index + 1}.</Text>
                <Text style={styles.username}>{entry.username}</Text>
                <Text style={styles.score}>{entry.score} points</Text>
              </View>
            ))
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
            text={isLoadingHome ? '' : 'Home page'}
          >
            {isLoadingHome && <ActivityIndicator color="#fff" />}
          </PrimaryButton>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    width: 30,
    fontWeight: 'bold',
  },
  username: {
    flex: 1,
  },
  score: {
    width: 100,
    textAlign: 'right',
  },
});
