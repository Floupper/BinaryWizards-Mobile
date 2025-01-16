import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  audioContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ddd',
    margin: 10,
    padding: 10,
    width: 180,
  },
  playButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playing: {
    backgroundColor: '#28a745',
  },
  notPlaying: {
    backgroundColor: '#007bff',
  },
  answerButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  answerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
