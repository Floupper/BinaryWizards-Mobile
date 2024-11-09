import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function QuestionComponent({
  question,
  selectedAnswer,
  correctAnswer,
}) {
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);

  useEffect(() => {
    setUserAnswerIndex(null);
  }, [question]);

  const sendUserAnswer = (index) => {
    if (userAnswerIndex === null) {
      setUserAnswerIndex(index);
      selectedAnswer(index);
    }
  };

  const getTextStyle = (index) => {
    if (index === correctAnswer?.correct) {
      return styles.correctChoiceText;
    }
    if (userAnswerIndex !== null && index === userAnswerIndex && correctAnswer?.correct !== userAnswerIndex) {
      return styles.wrongChoiceText;
    }
    return styles.choice;
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.titleContainer}>{question.question_text}</Text>
      {question.options && Array.isArray(question.options) ? (
        question.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              sendUserAnswer(index);
            }}
            style={[
              styles.choiceButton,
              index === correctAnswer?.correct && styles.correctChoiceButton,
              userAnswerIndex !== null &&
                index === userAnswerIndex &&
                correctAnswer?.correct !== userAnswerIndex &&
                styles.wrongChoiceButton,
            ]}
          >
            <Text style={getTextStyle(index)}>{option}</Text>
          </Pressable>
        ))
      ) : (
        <Text>Aucune option disponible</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: "transparent",
  },
  titleContainer: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  choiceButton: {
    borderColor: "#c7c7c7",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  choice: {
    color: "black",
    textAlign: "center",
  },
  correctChoiceButton: {
    borderColor: "#299900",
    borderWidth: 2,
  },
  correctChoiceText: {
    color: "#299900",
    textAlign: "center",
  },
  wrongChoiceButton: {
    borderColor: "#b00015",
    borderWidth: 2,
  },
  wrongChoiceText: {
    color: "#b00015",
    textAlign: "center",
  },
});
