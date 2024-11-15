import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from "@env";
import Toast from "react-native-toast-message";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/categories/`);

    const data = await response.json();

    const formattedCategories = data.map((category) => ({
      key: category.id,
      label: category.name,
      value: category.name,
    }));

    return formattedCategories;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while fetching the categories',
    });
    console.error("Error fetching categories", error);
  }
};

export const fetchDifficulties = async () => {
  try {
    const response = await fetch(`${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/difficulties`);
    const data = await response.json();

    const formattedDifficulties = data.map((difficulty) => ({
      label: difficulty,
      value: String(difficulty).charAt(0).toUpperCase() + String(difficulty).slice(1),
    }));

    return formattedDifficulties;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while fetching the difficulties',
    });
    console.error("Error fetching difficulties", error);
  }
};

export const fetchQuestion = async ({ quizId }) => {
  try {
    const result = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz/${quizId}/question`
    );
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const json = await result.json();
    return json;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while fetching the question',
    });
    console.error("Error fetching question:", error);
    return null;
  }
};

export const sendAnswer = async ({ quizId, question_index, option_index }) => {
  try {
    const response = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz/${quizId}/question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_index: question_index,
          option_index: option_index,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while sending your answer',
    });
    console.error("Error:", error);
    return null;
  }
};

export async function fetchAndCreateQuiz(
  category,
  nbQuestions,
  difficulty,
  navigation
) {
  
  const quizData = {
    amount: null,
  };

  if (nbQuestions) {
    quizData.amount = Number(nbQuestions);
  }
  else{
    Toast.show({
      type: 'error',
      text1: 'Number of questions',
      text2: 'You must select a number of questions between 1 and 50',
    });
    return;
  }

  if (category) {
    quizData.category = Number(category);
  }

  if (difficulty) {
    quizData.difficulty = String(difficulty).toLowerCase();
  }

  await fetch(`${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  }).then(async (response) => {
    const data = await response.json();
    navigation.navigate("Questions", { quizId: data.quiz_id });
  }).catch((error) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while creating the quiz',
    });
    console.error("Error creating quiz:", error);
  });
}

export async function resetQuiz(quizId, navigation) {
  await fetch(`${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz/${quizId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    navigation.navigate("Questions", { quizId: quizId });
  });
}

export async function checkQuizExists(quizId) {
  try {
    const result = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz/${quizId}/question`
    );
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const json = await result.json();
    return json;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while fetching the question',
    });
    return null;
  }
}