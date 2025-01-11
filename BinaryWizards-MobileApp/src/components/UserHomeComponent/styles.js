import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  text: {
    color: 'white',
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: '600',
  },
  textSelected: {
    color: '#8B2DF1',
    fontFamily: 'Mogula',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
