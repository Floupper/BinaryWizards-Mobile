import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Modal Styles
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(244, 242, 238, 1)',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // Options Styles
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  optionBase: {
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    flex: 1,
    height: 60,
    justifyContent: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  optionEasy: {
    backgroundColor: '#6eff8d',
  },
  optionMedium: {
    backgroundColor: '#fffa6e',
  },
  optionHard: {
    backgroundColor: '#ff6e6e',
  },
});
