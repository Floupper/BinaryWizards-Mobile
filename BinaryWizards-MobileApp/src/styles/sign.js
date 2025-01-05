import { StyleSheet } from 'react-native';

export const signStyles = StyleSheet.create({
  // Shared container styles
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inputsContainer: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    margin: 20,
    padding: 20,
    width: '90%',
  },

  // Input styles
  input: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: 'black',
    borderRadius: 10,
    color: 'white',
    marginTop: 20,
    padding: 10,
    width: '100%',
  },

  // Lines and navigation links
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '60%',
  },
  navigateLink: {
    color: '#0033FF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Text styles
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontWeight: '600',
    marginBottom: 15,
  },

  // Layout styles
  svgContainer: {
    height: '20%',
    width: '20%',
  },
  textContainer: {
    textAlign: 'left',
  },
  outerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
  },
  leaveScreenContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export const signBackgroundColors = ['#E4BB9180', '#8A2BF280', '#2960F080'];
