import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import { createGameId } from '../../services/createGame';
import { endStyle, endStyleText } from './endStyle';
import background from '../../../assets/endBackground.png';
import { getModeFromTimer } from '../../utils/timer';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function EndScreen({ route }) {
  const { quizId, correct_answers_nb, nb_questions_total, timer } =
    route.params;
  const navigation = useNavigation();

  const [isLoadingHome, setIsLoadingHome] = useState(false);
  const [isLoadingPlayAgain, setIsLoadingPlayAgain] = useState(false);

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

  const playAgain = async () => {
    setIsLoadingPlayAgain(true);
    try {
      const difficulty = getModeFromTimer(timer);
      await createGameId(quizId, difficulty, navigation);
    } catch (error) {
      console.error('Error restarting quiz:', error);
    } finally {
      setIsLoadingPlayAgain(false);
    }
  };

  return (
    <ImageBackground source={background} style={endStyle.imageBackground}>
      <View style={endStyle.endInformation}>
        <View style={styleContainer.middleSection}>
          <Text style={endStyleText.emoji}>🎉🎉</Text>
          <Text style={endStyleText.title}>Quiz Completed !</Text>
          <Text style={endStyleText.secondary}>
            Score : {correct_answers_nb}/{nb_questions_total}
          </Text>
        </View>
        <View style={endStyle.bottomSection}>
          <PrimaryButton
            isQuestion={false}
            onPress={backToHome}
            style={styleButton.enabledButton}
            disabled={isLoadingHome}
            text={isLoadingHome ? '' : 'Home page'}
          >
            {isLoadingHome && <ActivityIndicator color="#fff" />}
          </PrimaryButton>
          <PrimaryButton
            isQuestion={false}
            onPress={playAgain}
            style={styleButton.enabledButton}
            disabled={isLoadingPlayAgain}
            text={isLoadingPlayAgain ? '' : 'Restart quiz'}
          >
            {isLoadingPlayAgain && <ActivityIndicator color="#fff" />}
          </PrimaryButton>
        </View>
      </View>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
    </ImageBackground>
  );
}
