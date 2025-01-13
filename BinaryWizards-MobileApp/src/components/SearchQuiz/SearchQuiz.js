import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchedQuiz } from '../../services/quizRequests';
import { fetchDifficulties, createGameId } from '../../services/createGame';
import { useNavigation } from '@react-navigation/native';
import QuizListItem from '../QuizListItem/QuizListItem';
import styles from './styles';
import TimerModal from '../TimerModal/TimerModal';
import DifficultyPicker from '../DifficultyPicker/DifficultyPicker';

export default function SearchQuiz() {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [difficulties, setDifficulties] = useState(['all']);
  const [minQuestions, setMinQuestions] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(50);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    // Fetch available difficulties
    const fetchDifficultiesData = async () => {
      try {
        const response = await fetchDifficulties();
        setDifficulties(['all', ...response]);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Unable to fetch difficulties: ${error.message}`,
        });
      }
    };

    fetchDifficultiesData();
  }, []);

  const setDifficultyAndRefetch = (value) => {
    setSelectedDifficulty(value);
    refetch();
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['quizzes', text, selectedDifficulty, minQuestions, maxQuestions],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchedQuiz({
        text,
        difficulty:
          selectedDifficulty === 'all' ? '' : selectedDifficulty.toLowerCase(),
        page: pageParam,
        maxQuestions,
        minQuestions,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    enabled: true,
  });

  const handleSearchText = (inputText) => {
    setText(inputText.trim());
    refetch();
  };

  const handleTimerChoice = ({ timer }) => {
    setIsModalVisible(false);
    handlePressCreate(quizId, timer);
  };

  const openModal = (quizId) => {
    setQuizId(quizId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handlePressCreate = async (quizId, timeModeDifficulty) => {
    try {
      const gameResponse = await createGameId(
        quizId,
        timeModeDifficulty,
        navigation
      );
      if (gameResponse) {
        Toast.show({
          type: 'success',
          text1: 'Game Created',
          text2: 'Game was created successfully!',
        });
        navigation.navigate('Questions', {
          gameId: gameResponse,
          timer: timeModeDifficulty,
        });
      } else {
        throw new Error('Invalid game creation response.');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create game. Please try again later.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Quiz</Text>
      <TextInput
        placeholder="Enter text to search for a quiz"
        value={text}
        onChangeText={handleSearchText}
        style={styles.input}
      />
      <View style={styles.form}>
        <Text style={styles.text}>Select the number of questions</Text>
        <View style={styles.inputGroup}>
          <View>
            <Text style={styles.label}>Min</Text>
            <TextInput
              value={minQuestions.toString()}
              keyboardType="numeric"
              placeholder="Min"
              onChangeText={(value) => {
                const newValue = parseInt(value, 10);
                setMinQuestions(newValue || 0);
                refetch();
              }}
              style={styles.numericInput}
            />
          </View>
          <View>
            <Text style={styles.label}>Max</Text>
            <TextInput
              value={maxQuestions.toString()}
              keyboardType="numeric"
              placeholder="Max"
              onChangeText={(value) => {
                const newValue = parseInt(value, 10);
                setMaxQuestions(newValue || 50);
                refetch();
              }}
              style={styles.numericInput}
            />
          </View>
        </View>
        <Text style={styles.text}>Select Difficulty</Text>
        <DifficultyPicker setSelectedDifficulty={setDifficultyAndRefetch} />
      </View>

      {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}

      <View style={{ width: '100%', flex: 1 }}>
        <FlatList
          data={data?.pages?.flatMap((page) => page?.quizzes || [])}
          renderItem={({ item }) => (
            <QuizListItem
              difficulty={item.difficulty}
              title={item.title}
              nbQuestions={item.nb_questions}
              quiz_id={item.quiz_id}
              openModal={openModal}
            />
          )}
          keyExtractor={(item) => item?.quiz_id.toString()}
          onEndReached={hasNextPage ? fetchNextPage : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage && (
              <ActivityIndicator style={styles.loadingIndicator} />
            )
          }
          ListEmptyComponent={
            !isLoading && (
              <View style={styles.emptyContainer}>
                <Text style={styles.noQuizzesFound}>No quizzes found.</Text>
              </View>
            )
          }
        />
      </View>
      <TimerModal
        visible={isModalVisible}
        handleTimerChoice={handleTimerChoice}
        onClose={handleModalClose}
        isCreateGame={false}
      />
    </View>
  );
}
