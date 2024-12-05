import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  emptyMessage: {
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
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
    height: 40,
    paddingHorizontal: 12,
    width: '100%',
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
  },
  loadingIndicator: {
    marginVertical: 16,
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
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
