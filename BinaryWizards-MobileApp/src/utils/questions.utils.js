export const determineButtonTextStyle = ({
  buttonIndex,
  userAnswerIndex,
  correctAnswerIndex,
  isTimeUp,
}) => {
  if (userAnswerIndex === null || correctAnswerIndex === null) {
    return { color: 'black' };
  }

  if (isTimeUp) {
    if (buttonIndex === correctAnswerIndex) {
      return { color: 'green' };
    }
    return { color: 'red' };
  }

  if (buttonIndex === correctAnswerIndex) {
    return { color: 'green' };
  }
  if (buttonIndex === userAnswerIndex && buttonIndex !== correctAnswerIndex) {
    return { color: 'red' };
  }
  return { color: 'black' };
};

export const determineButtonStyle = ({
  buttonIndex,
  correctAnswerIndex,
  userAnswerIndex,
  isTimeUp,
}) => {
  console.log(buttonIndex, userAnswerIndex, correctAnswerIndex, isTimeUp);
  const COLORS = {
    default: '#e5e7eb',
    correct: 'green',
    incorrect: 'red',
    unanswered: '#e5e7eb',
    timeUp: 'orange',
  };

  if (userAnswerIndex === null || correctAnswerIndex === null) {
    return { borderColor: COLORS.default };
  }

  if (isTimeUp) {
    if (buttonIndex === correctAnswerIndex) {
      return { borderColor: COLORS.correct };
    }
    return { borderColor: COLORS.incorrect };
  }

  if (buttonIndex === correctAnswerIndex) {
    return { borderColor: COLORS.correct };
  }
  if (buttonIndex === userAnswerIndex && buttonIndex !== correctAnswerIndex) {
    return { borderColor: COLORS.incorrect };
  }
  return { borderColor: COLORS.default };
};
