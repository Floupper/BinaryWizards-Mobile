import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';

import { styleContainer } from '../styles/container';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  fetchAndCreateQuiz,
  fetchCategories,
  fetchDifficulties,
} from '../services/createGame';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';

export default function CreateGame() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nbQuestions, setNbQuestions] = useState('10');
  const [difficulty, setDifficulty] = useState('');
  const [difficulties, setDifficulties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingDifficulties, setIsLoadingDifficulties] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );
      } catch (error) {
        console.error('Error fetching categories:', error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching categories',
          text2: 'Please try again later',
          position: 'bottom',
        });
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const loadDifficulties = async () => {
      setIsLoadingDifficulties(true);
      try {
        const fetchedDifficulties = await fetchDifficulties();
        setDifficulties(
          Array.isArray(fetchedDifficulties) ? fetchedDifficulties : []
        );
      } catch (error) {
        console.error('Error fetching difficulties:', error);
        Toast.show({
          type: 'error',
          text1: 'Error fetching difficulties',
          text2: 'Please try again later',
          position: 'bottom',
        });
        setDifficulties([]);
      } finally {
        setIsLoadingDifficulties(false);
      }
    };

    loadCategories();
    loadDifficulties();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setNbQuestions('10');
      setSelectedCategory('');
      setDifficulty('');
    }, [])
  );

  const handleNbQuestionsChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 50) {
      setNbQuestions(value);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Please enter a number between 1 and 50',
        position: 'bottom',
      });
      setNbQuestions(''); // Reset field if value is not valid
    }
  };

  const handleStartPress = async () => {
    setIsLoading(true);
    try {
      await fetchAndCreateQuiz(
        selectedCategory,
        nbQuestions,
        difficulty,
        navigation
      );
    } catch (error) {
      console.error('Error starting the quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styleContainer.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>

        {isLoadingCategories ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <SelectList
            setSelected={(value) => setSelectedCategory(value)}
            data={
              categories.length > 0
                ? categories
                : [{ key: '0', value: 'No categories available' }]
            }
            placeholder="Select a category"
            boxStyles={styles.input}
            dropdownStyles={styles.selectListDropdown}
            defaultOption={
              categories.length > 0
                ? null
                : { key: '0', value: 'No categories available' }
            }
          />
        )}
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Number of question</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter the number of questions"
          value={nbQuestions}
          onChangeText={handleNbQuestionsChange}
          maxLength={2} // Limit input to 2 characters
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Difficulty</Text>
        {isLoadingDifficulties ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <SelectList
            setSelected={(value) => setDifficulty(value)}
            data={
              difficulties.length > 0
                ? difficulties
                : [{ key: '0', value: 'No difficulties available' }]
            }
            placeholder="Select a difficulty"
            boxStyles={styles.input}
            dropdownStyles={styles.selectListDropdown}
            defaultOption={
              difficulties.length > 0
                ? null
                : { key: '0', value: 'No difficulties available' }
            }
          />
        )}
      </View>

      <View>
        <PrimaryButton
          onPress={handleStartPress}
          text={isLoading ? '' : 'Play'}
          isQuestion={false}
          disabled={
            isLoading ||
            !nbQuestions ||
            isNaN(parseInt(nbQuestions, 10)) ||
            difficulty === ''
          }
          style={[
            styleButton.enabledButton,
            (isLoading ||
              !nbQuestions ||
              isNaN(parseInt(nbQuestions, 10)) ||
              difficulty === '') && { backgroundColor: 'gray' },
          ]}
        >
          {isLoading && <ActivityIndicator color="#fff" />}
        </PrimaryButton>
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    height: 50,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    width: '90%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 20,
    width: '100%',
  },
  selectListDropdown: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 12,
    width: '90%',
  },
});
