import { StyleSheet } from 'react-native';

export const endStyle = StyleSheet.create({
  endInformation: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
    height: '50%',
    padding: 20,
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const endStyleText = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7A00FF',
    textAlign: 'center',
    marginBottom: 10,
  },
  secondary: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  emoji: {
    fontSize: 36,
    textAlign: 'top',
    marginVertical: 10,
  },
});
