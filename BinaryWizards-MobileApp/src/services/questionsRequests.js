import Toast from "react-native-toast-message";

export const fetchQuestion = async ({ gameId }) => {
    try {
      const result = await fetch(
        `${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}/game/${gameId}/question`
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
        `${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}/game/${gameId}/question`,
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
  