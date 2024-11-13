import { REACT_NATIVE_API_IP } from "@env";

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `http://${REACT_NATIVE_API_IP}:33012/categories`
    );

    const data = await response.json();

    const formattedCategories = data.map((category) => ({
      key: category.id,
      label: category.name,
      value: category.id,
    }));

    return formattedCategories;
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

export const fetchDifficulties = async () => {
  try {
    const response = await fetch(
      `http://${REACT_NATIVE_API_IP}:33012/difficulties`
    );
    const data = await response.json();

    const formattedDifficulties = data.map((difficulty) => ({
      label: difficulty,
      value: difficulty,
    }));

    return formattedDifficulties;
  } catch (error) {
    console.error("Error fetching difficulties", error);
  }
};

export const fetchQuestion = async ({ quizId }) => {
  try {
    const result = await fetch(
      `http://${REACT_NATIVE_API_IP}:33012/quiz/${quizId}/question`
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
    const response = await fetch(
      `http://${REACT_NATIVE_API_IP}:33012/quiz/${quizId}/question`,
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
    alert("Please select the number of questions");
    return;
  }

  if (category) {
    quizData = { ...quizData, category: Number(category) };
  }

  if (difficulty) {
    quizData = { ...quizData, difficulty: String(difficulty) };
  }

  console.log(quizData);

  await fetch(`http://${REACT_NATIVE_API_IP}:33012/quiz`, {
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

export async function resetQuiz(quizId, navigation) {
  await fetch(`http://${REACT_NATIVE_API_IP}:33012/quiz/${quizId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    navigation.navigate("Questions", { quizId: quizId });
  });
}
