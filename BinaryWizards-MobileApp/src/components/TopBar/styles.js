import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    height: 35,
    marginRight: 10,
    width: 32,
  },
  topBar: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 10,
  },
  topBarText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
