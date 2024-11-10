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


export const sendAnswer = async ({ quizId, answer }) => {
  try {
    const response = await fetch(`http://${REACT_NATIVE_API_IP}:3000/quiz/${quizId}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: answer }),
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