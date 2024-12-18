import { StyleSheet } from 'react-native';

export const questionStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F2EE',
    height: '100%',
    padding: 10,
  },
  gradientContainer: {
    width: '100%',
    height: '85%',
    padding: 10,
    borderRadius: 30,
  },
  infoQuestions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  infoQuestionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#716E6E',
  },
  questionContainer: {
    height: '100%',
    backgroundColor: '#F4F2EE',
    borderRadius: 25,
  },
});
