import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
    padding: 20,
  },
  username: {
    fontSize: 16,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
  },
  selectedButton: {
    backgroundColor: '#28a745',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
});
