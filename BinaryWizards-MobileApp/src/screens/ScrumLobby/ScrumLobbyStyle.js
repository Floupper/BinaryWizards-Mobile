import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playersList: {
    maxHeight: '80%',
    overflowY: 'scroll',
  },
  shareButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});
