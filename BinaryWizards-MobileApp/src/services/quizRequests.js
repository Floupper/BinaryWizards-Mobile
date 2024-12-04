import Toast from "react-native-toast-message";
import axiosInstance from "../utils/axiosInstance";

export const fetchSearchedQuiz = async ({ text = '', difficulty = '', minQuestions, maxQuestions, page = 1 }) => {
  try {
    // Dynamically build query parameters
    const params = new URLSearchParams();

    // Add text only if it has a value
    if (text.trim()) {
      params.append('text', text);
    }

    // Add difficulty if provided and not 'all'
    if (difficulty && difficulty !== 'all') {
      params.append('difficulty', difficulty);
    }

    params.append('minQuestions', minQuestions > 0 ? minQuestions : 0);
    params.append('maxQuestions', maxQuestions > 0 ? maxQuestions : 50);

    // Add standard parameters
    params.append('pageSize', 5); 
    params.append('page', page); 

    // Build the full URL for the search query
    const url = `/quiz/search?${params.toString()}`;

    // Make the request
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    // Show error toast message
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occurred while fetching quizzes.",
    });
    console.error('Error fetching quizzes:', error);
    return null; // Return null on error
  }
};