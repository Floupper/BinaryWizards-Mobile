import { StyleSheet } from 'react-native';

export const styleContainer = StyleSheet.create({
  bottomSection: {
    margin: 80,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  gameIdContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    textAlign: 'center',
  },
  gameList: {
    alignItems: 'center',
    border: '0.1rem solid black',
    borderRadius: 10,
    flex: 1,
    margin: 10,
    padding: 10,
  },
  gameListColumns: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  gameListColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  gameListItem: {
    alignItems: 'center',
    border: '0.1rem solid lightgray',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainContainer: {
    backgroundColor: '#F4F2EE',
    flex: 1,
  },
  middleSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  questionTitleContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  quizIdContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    textAlign: 'center',
  },
  quizListItem: {
    alignItems: 'center',
    border: '0.1rem solid lightgray',
    borderRadius: 10,
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
});
