import { StyleSheet } from 'react-native';

export const questionStyle = StyleSheet.create({
  container: { borderRadius: 25, height: '100%', overflow: 'hidden' },
  gradientContainer: {
    borderRadius: 30,
    height: '85%',
    padding: 10,
    width: '100%',
  },
  infoQuestions: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '100%',
  },
  infoQuestionsText: {
    color: '#716E6E',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
});
