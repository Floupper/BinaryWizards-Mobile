import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionEasy: {
    alignItems: 'center',
    backgroundColor: '#6eff8d',
    borderRadius: 5,
    flex: 1,
    height: 60,
    justifyContent: 'center',
    margin: 5,
  },
  optionHard: {
    alignItems: 'center',
    backgroundColor: '#ff6e6e',
    borderRadius: 5,
    flex: 1,
    height: 60,
    justifyContent: 'center',
    margin: 5,
  },
  optionMedium: {
    alignItems: 'center',
    backgroundColor: '#fffa6e',
    borderRadius: 5,
    flex: 1,
    height: 60,
    justifyContent: 'center',
    margin: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
