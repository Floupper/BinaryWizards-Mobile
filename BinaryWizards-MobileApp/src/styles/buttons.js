import { StyleSheet } from 'react-native';

export const styleButton = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 10,
    color: 'white',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Shadow on android
    shadowColor: '#000', // on iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
    shadowOpacity: 0.3, // on iOS
    shadowRadius: 4, // on iOS
  },
  disabledButton: {
    backgroundColor: '#050505',
    opacity: 0.6,
  },
  disabledText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  enabledButton: {
    backgroundColor: '#000',
    padding: 10,
    color: 'white',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Shadow on android
    shadowColor: '#000', // on iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
    shadowOpacity: 0.3, // on iOS
    shadowRadius: 4, // on iOS
    opacity: 1,
  },
  homeButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    margin: 10,
  },
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
});
