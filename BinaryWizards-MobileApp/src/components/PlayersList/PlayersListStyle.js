import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderColor: '#8B2DF1',
    borderRadius: 15,
    borderWidth: 3,
    flex: 1,
    padding: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  image: {
    height: 30,
    width: 27,
  },
  selectedButton: {
    backgroundColor: '#28a745',
  },
  title: {
    color: 'black',
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  username: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    fontFamily: 'Mogula',
    fontSize: 16,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
