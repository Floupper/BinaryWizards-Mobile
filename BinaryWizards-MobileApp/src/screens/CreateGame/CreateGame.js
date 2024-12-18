import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import { styles } from './createGameStyles';
import { styleButton } from '../../styles/buttons';import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  fetchAndCreateQuiz,
  fetchCategories,
  fetchDifficulties,
} from '../../services/createGame';
import Circles from '../../../assets/circles.svg';

export default function CreateGame() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nbQuestions, setNbQuestions] = useState('10');
  const [difficulty, setDifficulty] = useState('');
  const [difficulties, setDifficulties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingDifficulties, setIsLoadingDifficulties] = useState(true);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height
  );
  const navigation = useNavigation();

  const updateDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setWindowWidth(width);
    setWindowHeight(height);
  };

  useEffect(() => {
    updateDimensions();
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions
    );
    return () => subscription?.remove();
  }, []);

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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#F1F1F1', '#C9D6FF']}
        style={{ width: '100%', height: '100%' }}
      />
      <Circles style={[styles.svgBackground, { width: windowWidth }]} />
      <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
        <View style={styles.mainContent}>
          <Header />
          <View style={styles.form}>
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
            <Header />
            <Form
              categories={categories}
              nbQuestions={nbQuestions}
              handleNbQuestionsChange={handleNbQuestionsChange}
              difficulties={difficulties}
              setSelectedCategory={setSelectedCategory}
              setDifficulty={setDifficulty}
            />
            <TimerModeCheckbox />
            <View style={styles.header}>
              <PrimaryButton
                text="Play"
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
                  difficulty === '' ||
                  selectedCategory === ''
                }
                style={[
                  styleButton.button,
                  (!nbQuestions ||
                    isNaN(parseInt(nbQuestions, 10)) ||
                    difficulty === '' ||
                    selectedCategory === '') && { backgroundColor: 'gray' },
                ]}
              />
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Create Quiz</Text>
  </View>
);

const InputField = ({ label, component }) => (
  <View style={styles.inputField}>
    <Text style={styles.label}>{label}</Text>
    {component}
  </View>
);

const TimerModeCheckbox = () => {
  return (
    <View style={styles.timerModeCheckbox}>
      <BouncyCheckbox
        size={35}
        iconImageStyle={{ width: 25, height: 25 }}
        fillColor="#ebebeb"
        unFillColor="white"
        onPress={() => {}}
        text="Enable time mode"
        textStyle={{
          color: 'black',
          textDecorationLine: 'none',
        }}
        checkIconImageSource={require('../../../assets/hourglass.png')}
      />
    </View>
  );
};
