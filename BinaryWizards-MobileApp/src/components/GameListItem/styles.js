import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '80%',
    elevation: 10, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
    shadowOpacity: 0.3, // on iOS
    shadowRadius: 4, // on iOS
  },
  text: {},
});

export default styles;
