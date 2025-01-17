import axiosInstance from './axiosInstance';

export const fetchGameMode = async ({ navigation, gameId }) => {
  try {
    const response = await axiosInstance.get(`/game/${gameId}/get_mode`);
    if (response.status === 200) {
      const fetchedGameMode = response.data.game_mode;

      if (fetchedGameMode === 'team') {
        navigation.navigate('TeamLobby', {
          teamCode: gameId,
          gameMode: fetchedGameMode,
        });
      } else if (fetchedGameMode === 'scrum') {
        navigation.navigate('ScrumLobby', {
          gameId,
          gameMode: fetchedGameMode,
        });
      }
    } else {
      console.error('Error when fetching game mode');
    }
  } catch (error) {
    console.error('Error when fetching game mode from the server:', error);
  }
};
