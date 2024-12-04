import Toast from 'react-native-toast-message';
import axiosInstance from '../utils/axiosInstance';

export const fetchSearchedQuiz = async ({
  text = '',
  difficulty = '',
  minQuestions,
  maxQuestions,
  page = 1,
}) => {
  try {
    // Dynamically build query parameters
    const params = new URLSearchParams();

    // Add text only if it has a value
    if (text.trim()) {
      params.append('text', text);
    }

    // Add difficulty if provided
    if (difficulty.trim && difficulty != 'all') {
      params.append('difficulty', difficulty);
    }

    // Add minQuestions and maxQuestions if both are provided
    if (minQuestions && maxQuestions) {
      params.append('minQuestions', minQuestions);
      params.append('maxQuestions', maxQuestions);
    }

    // Add standard parameters
    params.append('pageSize', 5);
    params.append('page', page);

    // Build the full URL
    const url = `/quiz/search?${params.toString()}`;

    // Make the request
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    Toast.show({
      text1: 'Error',
      text2: 'An error occurred while fetching quizzes.',
      type: 'error',
    });
    console.error('Error fetching quizzes:', error);
    return null;
  }
};
