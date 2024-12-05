import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchedQuiz } from '../../services/quizRequests';
import { fetchDifficulties, createGameId } from '../../services/createGame';
import { useNavigation } from '@react-navigation/native';
import QuizListItem from '../QuizListItem';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from './styles';
import { logout } from '../../utils/asyncStorage';

export default function SearchQuiz() {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [difficulties, setDifficulties] = useState(['all']);
  const [minQuestions, setMinQuestions] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(50);

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

  const handlePressCreate = async (quizId) => {
    try {
      const gameResponse = await createGameId(quizId, navigation);
      if (gameResponse) {
        Toast.show({
          type: 'success',
          text1: 'Game Created',
          text2: 'Game was created successfully!',
        });
        navigation.navigate('GameScreen', { gameId: gameResponse.game_id });
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
      <Text style={styles.text}>Browse Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to search for a quiz"
        value={text}
        onChangeText={handleSearchText}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Select Difficulty</Text>
        <SelectList
          setSelected={(value) => {
            setSelectedDifficulty(value.toString().toLowerCase());
            refetch();
          }}
          data={difficulties}
          placeholder="Select a difficulty"
          boxStyles={styles.input}
          dropdownStyles={styles.selectListDropdown}
        />
        <Text style={styles.text}>Select the number of questions</Text>
        <View style={styles.rangeInputs}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Min</Text>
            <TextInput
              style={styles.input}
              value={minQuestions.toString()}
              keyboardType="numeric"
              placeholder="Min"
              onChangeText={(value) => {
                const newValue = parseInt(value, 10);
                setMinQuestions(newValue || 0);
                refetch();
              }}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Max</Text>
            <TextInput
              style={styles.input}
              value={maxQuestions.toString()}
              keyboardType="numeric"
              placeholder="Max"
              onChangeText={(value) => {
                const newValue = parseInt(value, 10);
                setMaxQuestions(newValue || 50);
                refetch();
              }}
            />
          </View>
        </View>
      </View>

      {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}

      <FlatList
        data={data?.pages?.flatMap((page) => page?.quizzes || [])}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePressCreate(item.quiz_id)}>
            <QuizListItem
              difficulty={item.difficulty}
              title={item.title}
              nbQuestions={item.nb_questions}
              date_game_creation={item.created_at}
            />
          </Pressable>
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
            <Text style={styles.emptyMessage}>No quizzes found.</Text>
          )
        }
      />
    </View>
  );
}
