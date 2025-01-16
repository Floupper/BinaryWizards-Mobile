import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  answerButton: {
    alignItems: 'center',
    backgroundColor: '#8B2DF1',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  answerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  audioContainer: {
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 3,
    margin: 10,
    maxWidth: 200,
    padding: 10,
    width: '35%',
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    padding: 10,
  },
  notPlaying: {
    backgroundColor: '#8B2DF1',
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: '#8B2DF1',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  playButtonText: {
    color: 'white',
    fontFamily: 'Mogula',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playing: {
    backgroundColor: '#a04ff7',
  },
});
