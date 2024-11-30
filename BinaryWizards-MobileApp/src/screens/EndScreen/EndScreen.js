import { Text, View } from 'react-native';
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

  const backToHome = () => {
    navigation.navigate('Home');
  };

  const playAgain = () => {
    resetQuiz(quizId, navigation);
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
              disabled={false}
              text={'Home page'}
              onPress={backToHome}
              style={styleButton.button}
            />
            <PrimaryButton
              disabled={false}
              text={'Restart quiz'}
              onPress={playAgain}
              style={styleButton.button}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
