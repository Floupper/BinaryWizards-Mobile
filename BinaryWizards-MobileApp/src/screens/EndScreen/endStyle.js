import { StyleSheet } from 'react-native';

export const endStyle = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  endInformation: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
    height: '50%',
    justifyContent: 'space-between',
    padding: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: '80%',
  },
  imageBackground: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export const endStyleText = StyleSheet.create({
  emoji: {
    fontSize: 36,
    marginVertical: 10,
    textAlign: 'top',
  },
  secondary: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  title: {
    color: '#7A00FF',
    fontFamily: 'Mogula',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
