import React, { useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import { resetQuiz } from '../../services/endScreenRequests';
import { endStyle, endStyleText } from './endStyle';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundEndScreen from '../../../assets/backgroundEndScreen.svg';

export default function EndScreen({ route }) {
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
    <View style={{ flex: 1 }}>
      <BackgroundEndScreen
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(122, 155, 242, 0.3)',
            'rgba(138, 43, 242, 0.5)',
            'rgba(228, 187, 145, 0.3)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            width: '110%',
            height: '70%',
            borderRadius: 70,
            transform: [{ scale: 1.2 }],
          }}
        />
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
              text={isLoadingHome ? "" : "Home page"}
            >
              {isLoadingHome && <ActivityIndicator color="#fff" />}
            </PrimaryButton>
            <PrimaryButton
              isQuestion={false}
              onPress={playAgain}
              style={styleButton.enabledButton}
              disabled={isLoadingPlayAgain}
              text={isLoadingPlayAgain ? "" : "Restart quiz"}
            >
              {isLoadingPlayAgain && <ActivityIndicator color="#fff" />}
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}
