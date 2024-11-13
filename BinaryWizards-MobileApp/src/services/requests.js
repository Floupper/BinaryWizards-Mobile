import { REACT_NATIVE_API_IP } from "@env";

export const fetchQuestion = async ({ quizId }) => {
  try {
    const result = await fetch(
      `http://${REACT_NATIVE_API_IP}:3000/quiz/${quizId}/question`
    );
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const json = await result.json();
    return json;
  } catch (error) {
    console.error("Error fetching question:", error);
    return null;
  }
};

export const sendAnswer = async ({ quizId, question_index, option_index }) => {
  try {
    const response = await fetch(`http://${REACT_NATIVE_API_IP}:3000/quiz/${quizId}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_index: question_index, option_index: option_index }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchAndCreateQuestion(category, nbQuestions, difficulty, navigation) {
  const quizData = {
    category: Number(category),
    amount: Number(nbQuestions),
    difficulty: String(difficulty),
  };

  await fetch(`http://${REACT_NATIVE_API_IP}:3000/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  }).then(async (response) => {
    const data = await response.json();
    navigation.navigate("Questions", { quizId: data.quiz_id });
  });
}