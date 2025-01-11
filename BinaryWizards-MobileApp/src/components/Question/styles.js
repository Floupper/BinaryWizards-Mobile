import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  answerButtonBaseStyle: {
    padding: 10,
    margin: 10,
    color: 'black',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
    shadowOpacity: 0.3, // on iOS
    shadowRadius: 4, // on iOS
    opacity: 1,
  },
  questionContainer: {
    backgroundColor: '#F4F2EE',
    borderRadius: 25,
    height: '100%',
  },
});
