import { StyleSheet } from "react-native";

export const styleButton = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3552b0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});



export const determineButtonStyle = (index) => {
  if (userAnswerIndex === null) {
    return "#3552b0"; 
  } else if (index === correctAnswer?.correct_option_index) {
    return "green";
  } else if (index === correctAnswer?.user_answer_index) {
    return "red";
  } else {
    return "gray";
  }
};