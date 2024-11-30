import { StyleSheet } from 'react-native';

export const styleButton = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleQuestion: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#120000',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Shadow on android
    shadowColor: '#000', // on iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
    shadowOpacity: 0.3, // on iOS
    shadowRadius: 4, // on iOS
  },
  homeButton: {
    margin: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export const determineButtonStyle = (index, userAnswerIndex, correctAnswer) => {
  if (userAnswerIndex === null) {
    return '#FFFFFF';
  } else if (index === correctAnswer?.correct_option_index) {
    return 'green';
  } else if (index === correctAnswer?.user_answer_index) {
    return 'red';
  } else {
    return 'white';
  }
};
