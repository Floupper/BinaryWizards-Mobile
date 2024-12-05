import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  fetchAndCreateQuiz,
  fetchCategories,
  fetchDifficulties,
} from '../../services/createGame';
import PrimaryButton from '../../components/PrimaryButton';
import { styles } from './createGameStyles';
import { styleButton } from '../../styles/buttons';

import Circles from '../../../assets/circles.svg';
import Iphone from '../../../assets/iphone.svg';
import HomeButton from '../../components/HomeButton';

export default function CreateGame() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nbQuestions, setNbQuestions] = useState('10');
  const [difficulty, setDifficulty] = useState('');
  const [difficulties, setDifficulties] = useState([]);
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
    (async () => {
      setCategories(await fetchCategories());
      setDifficulties(await fetchDifficulties());
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
      setNbQuestions('');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F1F1F1', '#C9D6FF']}
        style={{ width: windowWidth, height: windowHeight }}
      />
      <Circles
        style={[
          styles.svgBackground,
          { width: windowWidth, height: windowHeight },
        ]}
      />
      <BlurView
        intensity={5}
        style={[
          styles.blurContainer,
          { width: windowWidth, height: windowHeight },
        ]}
      >
        <View style={styles.mainContent}>
          <Iphone
            style={[
              styles.backgroundImage,
              { width: windowWidth, height: windowHeight },
            ]}
          />
          <BlurView intensity={20} style={styles.formContainer}>
            <View style={styles.homeButton}>
              <HomeButton text={'Back'} />
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
      </BlurView>
    </View>
  );
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Create Quiz</Text>
  </View>
);

const Form = ({
  categories,
  nbQuestions,
  handleNbQuestionsChange,
  difficulties,
  setSelectedCategory,
  setDifficulty,
}) => (
  <View style={styles.form}>
    <InputField
      label="Category"
      component={
        <SelectList
          setSelected={setSelectedCategory}
          data={categories}
          placeholder="Category"
          search={false}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      }
    />
    <InputField
      label="Number of Questions"
      component={
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={nbQuestions}
          onChangeText={handleNbQuestionsChange}
          maxLength={2}
        />
      }
    />
    <InputField
      label="Difficulty"
      component={
        <SelectList
          setSelected={setDifficulty}
          data={difficulties}
          placeholder="Difficulty"
          search={false}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      }
    />
  </View>
);

const InputField = ({ label, component }) => (
  <View style={styles.inputField}>
    <Text style={styles.label}>{label}</Text>
    {component}
  </View>
);
