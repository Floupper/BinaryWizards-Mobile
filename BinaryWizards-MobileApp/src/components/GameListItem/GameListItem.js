import React from 'react';
import { Text, View } from 'react-native';
import { styleContainer } from '../../styles/container';
import IconButton from '../IconButton';
import { resetQuiz } from '../../services/endScreenRequests';
import { checkGameExists } from '../../services/gamesRequests';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import styles from './styles';

export default function GameListItem({ item }) {
  const formattedDate = dayjs(item.date_game_creation).format('DD/MM/YYYY');
  const navigation = useNavigation();

  const getPlayIcon = () =>
    item.current_question_index > item.nb_questions_total ? 'reload1' : 'play';

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
    <View style={[styleContainer.gameListItem, styles.listItem]}>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{formattedDate}</Text>
      <Text style={styles.text}>
        {item.current_question_index}/{item.nb_questions_total}
      </Text>
      <View style={styles.iconContainer}>
        <IconButton icon={getPlayIcon()} onPress={handlePress} />
      </View>
    </View>
  );
}
