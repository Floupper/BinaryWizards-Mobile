import Toast from "react-native-toast-message";
import axiosInstance from "../utils/axiosInstance";

export const fetchQuestion = async ({ gameId }) => {
  try {
    const response = await axiosInstance.get(`/game/${gameId}/question`)
    return response.data;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occured while fetching the question",
    });
    console.error("Error fetching question:", error);
    return null;
  }
};

export const sendAnswer = async ({ gameId, question_index, option_index }) => {
  try {
    const response = await axiosInstance.post(`/game/${gameId}/question`, {
      question_index: question_index,
      option_index: option_index,
    });

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error.response.status == 400) {
      Toast.show({
        type: "success",
        text1: "Resynchronization with the game",
        text2: "Actualization of the question",
      });
      const newQuestionData = await fetchQuestion({ gameId });
      return { resynchronize: true, data: newQuestionData };
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occured while sending your answer",
      });
      console.error("Error:", error);
    }
    return null;
  }
};
