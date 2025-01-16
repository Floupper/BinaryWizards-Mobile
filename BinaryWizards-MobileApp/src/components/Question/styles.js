import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  answerButtonBaseStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    color: 'black',
    margin: 10,
    padding: 10,
  },
  answerButtonTextStyle: {
    color: 'black',
    fontFamily: 'Mogula',
    fontSize: 20,
  },
  choicesContainer: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  questionContainer: {
    borderRadius: 25,
    height: '100%',
  },
  questionTitleContainer: {
    fontFamily: 'Mogula',
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
  },
});
