import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import { resetQuiz } from '../../services/endScreenRequests';
import { endStyle, endStyleText } from '../EndScreen/endStyle';
import background from '../../../assets/endBackground.png';

export default function ScrumEndScreen({ route }) {
  const { quizId, correct_answers_nb, nb_questions_total } = route.params;
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
      await resetQuiz(quizId, navigation);
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
