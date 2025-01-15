import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    color: '#ffffff',
    fontSize: 16,
    margin: 10,
    padding: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '90%',
  },
  buttonSelected: {
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderColor: '#8B2DF1',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlign: 'center',
    transition: '0.3s all',
  },
  container: {
    alignItems: 'center',
    height: '90%',
    justifyContent: 'flex-start',
    padding: 16,
  },
  navButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  text: {
    color: 'black',
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: '600',
  },
});
