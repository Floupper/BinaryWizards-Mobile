import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    borderBottomWidth: 1,
    borderColor: '#8B2DF1',
    color: '#ffffff',
    elevation: 3,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlign: 'center',
    transition: '0.3s all',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 20,
    width: '90%',
  },
});
