import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
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

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let categories = await fetchCategories();
      if (!categories) {
        setCategories([]);
        navigation.navigate('Home');
      }
      setCategories(categories);
    })();

    (async () => {
      let difficulties = await fetchDifficulties();
      if (difficulties == null) {
        setDifficulties([]);
        navigation.navigate('Home');
      }
      setDifficulties(difficulties);
    })();
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

  return (
    <View style={styleContainer.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>
        <SelectList
          setSelected={(value) => setSelectedCategory(value)}
          data={categories}
          placeholder="Select a category"
          boxStyles={styles.input}
          dropdownStyles={styles.selectListDropdown}
        />
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
        <SelectList
          setSelected={(value) => setDifficulty(value)}
          data={difficulties}
          placeholder="Select a difficulty"
          boxStyles={styles.input}
          dropdownStyles={styles.selectListDropdown}
        />
      </View>

      <View>
        <PrimaryButton
          text="Start"
          onPress={() =>
            fetchAndCreateQuiz(
              selectedCategory,
              nbQuestions,
              difficulty,
              navigation
            )
          }
          disabled={
            !nbQuestions ||
            isNaN(parseInt(nbQuestions, 10)) ||
            difficulty === ''
          }
          style={[
            styleButton.button,
            (!nbQuestions ||
              isNaN(parseInt(nbQuestions, 10)) ||
              difficulty === '') && { backgroundColor: 'gray' },
          ]}
        />
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
