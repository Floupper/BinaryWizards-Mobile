import React from 'react';
import { Text, View } from 'react-native';
import { resetQuiz } from '../../services/endScreenRequests';
import { checkGameExists } from '../../services/gamesRequests';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

export default function GameListItem({ item }) {
  const formattedDate = dayjs(item.date_game_creation).format('DD/MM/YYYY');
  const navigation = useNavigation();

  const getPlayIcon = () =>
    item.current_question_index > item.nb_questions_total ? 'reload1' : 'play';

  const getQuizTitle = () => {
    const title = item.title ? item.title : `Untitled quiz`;
    const maxLength = 20;
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const handlePress = async () => {
    try {
      if (item.current_question_index > item.nb_questions_total) {
        await resetQuiz(item.quiz_id, navigation);
      } else {
        const response = await checkGameExists(item.game_id);
        if (response === null) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: "Game id doesn't exist",
          });
        } else {
          navigation.navigate('Questions', {
            gameId: item.game_id,
            question: response,
            quizId: response.quiz_id,
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getQuizTitle()}</Text>
      <Text style={styles.text}>{formattedDate}</Text>
      <Text style={styles.text}>
        {item.current_question_index}/{item.nb_questions_total}
      </Text>
      <Icon name={getPlayIcon()} size={30} color="#000" onPress={handlePress} />
    </View>
  );
}
