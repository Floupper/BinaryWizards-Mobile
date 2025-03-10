import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
  },
  blurContainer: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  button: {
    marginTop: 20,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  container: {
    flex: 1,
  },
  form: {},
  formContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    width: '100%',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    height: 50,
    paddingHorizontal: 10,
    width: '90%',
  },
  inputField: {
    alignItems: 'center',
    margin: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  selectListBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    zIndex: 10,
  },
  selectListDropdown: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    zIndex: 10,
  },
  svgBackground: {
    position: 'absolute',
  },
  timerModeCheckbox: {
    alignItems: 'center',
    border: '1px solid red',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontFamily: 'Mogula',
    fontSize: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
