import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 16,
    width: '100%',
  },
  dropdown: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8f8f8',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    width: '70%',
  },
  emptyContainer: {
    flex: 1, // This ensures that the container takes up the full available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  emptyMessage: {
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  form: { marginBottom: 16, width: '80%' },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    width: '80%',
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: 'black',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  noQuizzesFound: {
    color: '#fff',
    fontFamily: 'Mogula',
    fontSize: 18,
    textAlign: 'center',
  },
  numericInput: {
    backgroundColor: '#f8f8f8',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    width: 100,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  rangeInputs: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  selectListDropdown: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 12,
    minHeight: 40,
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 12,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontFamily: 'Mogula',
    fontSize: 30,
    marginBottom: 16,
  },
});

export default styles;
