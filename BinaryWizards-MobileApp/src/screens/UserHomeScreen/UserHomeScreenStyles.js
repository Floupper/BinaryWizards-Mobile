import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  categoryContainer: {
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    elevation: 10,
    height: 150,
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: 200,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 45,
  },
  text: {
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontFamily: 'Mogula',
    fontSize: 40,
    marginBottom: 80,
  },
});
