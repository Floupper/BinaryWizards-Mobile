import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { SelectList } from 'react-native-dropdown-select-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import { styles } from './createGameStyles';
import { styleButton } from '../../styles/buttons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  fetchAndCreateQuiz,
  fetchCategories,
  fetchDifficulties,
} from '../../services/createGame';
import TimerModal from '../../components/TimerModal/TimerModal';

export default function CreateGame() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nbQuestions, setNbQuestions] = useState('10');
  const [difficulty, setDifficulty] = useState('');
  const [difficulties, setDifficulties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingDifficulties, setIsLoadingDifficulties] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimeMode, setIsTimeMode] = useState(false);
  const [timeModeDifficulty, setTimeModeDifficulty] = useState('none');

  const navigation = useNavigation();

  const handleTimerChoice = ({ timer }) => {
    if (timer !== null) {
      setTimeModeDifficulty(timer);
      setIsTimeMode(true);
    } else {
      setIsTimeMode(false);
      setTimeModeDifficulty(null);
    }
    setIsModalVisible(false);
  };

  const openModal = (checked) => {
    if (checked) {
      setIsModalVisible(true);
    } else {
      setIsTimeMode(false);
      setTimeModeDifficulty(null);
    }
  };

  const handleModalClose = () => {
    setIsTimeMode(false);
    setIsModalVisible(false);
  };

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
        timeModeDifficulty,
        navigation
      );
    } catch (error) {
      console.error('Error starting the quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        'rgba(41, 96, 240, 0.5)',
        'rgba(138, 43, 242, 0.5)',
        'rgba(228, 187, 145, 0.5)',
      ]}
      style={styles.mainContent}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Header />
          <Form
            categories={categories}
            nbQuestions={nbQuestions}
            handleNbQuestionsChange={handleNbQuestionsChange}
            difficulties={difficulties}
            setSelectedCategory={setSelectedCategory}
            setDifficulty={setDifficulty}
          />
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              isChecked={isTimeMode}
              size={35}
              iconImageStyle={{ width: 25, height: 25 }}
              fillColor="#ebebeb"
              unFillColor="white"
              onPress={(checked) => {
                openModal(!checked);
              }}
              useBuiltInState={false}
              checkIconImageSource={require('../../../assets/hourglass.png')}
              text={isTimeMode ? 'Disable time mode' : 'Enable time mode'}
              textStyle={{
                textDecorationLine: 'none',
              }}
            />
            <View>
              {isTimeMode ? (
                <View
                  style={{
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    Time mode difficulty :{' '}
                  </Text>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {timeModeDifficulty}
                  </Text>
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
          <View style={styles.header}>
            <PrimaryButton
              text={isLoading ? '' : 'Play'}
              onPress={handleStartPress}
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
            >
              {isLoading && <ActivityIndicator color="#fff" />}
            </PrimaryButton>
          </View>
        </View>
        <TimerModal
          visible={isModalVisible}
          handleTimerChoice={handleTimerChoice}
          onClose={handleModalClose}
        />
      </View>
    </LinearGradient>
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
