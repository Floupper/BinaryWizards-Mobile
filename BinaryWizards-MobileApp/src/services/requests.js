import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from "@env";
import Toast from "react-native-toast-message";

export const fetchQuestion = async ({ gameId }) => {
  try {
    const result = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/game/${gameId}/question`
    );
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const json = await result.json();
    return json;
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
    const response = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/game/${gameId}/question`,
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
      type: "error",
      text1: "Error",
      text2: "An error occured while sending your answer",
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
  } else {
    Toast.show({
      type: "error",
      text1: "Number of questions",
      text2: "You must select a number of questions between 1 and 50",
    });
    return;
  }

  if (category === "") {
    Toast.show({
      type: "error",
      text1: "Category",
      text2: "You must select a category",
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
  })
    .then(async (response) => {
      const data = await response.json();
      navigation.navigate("Questions", { quizId: data.quiz_id });
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occured while creating the quiz",
      });
      console.error("Error creating quiz:", error);
    });
}

export async function resetQuiz(quizId, navigation) {
  await fetch(
    `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/quiz/${quizId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => {
    navigation.navigate("Questions", { quizId: quizId });
  });
}

export async function checkGameExists(gameId) {
  try {
    const response = await fetch(`${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/game/${gameId}/question`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
    
  } catch (error) {
    console.error("Error fetching game data:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Game does not exist",
    });
    return null;
  }
}

export async function createGame(quizId) {
  try {
    const response = await fetch(
      `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/game/${quizId}/create`
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
      text2: 'An error occured while creating the game',
    });
    console.error("Error creating game:", error);
    return null;
  }
}