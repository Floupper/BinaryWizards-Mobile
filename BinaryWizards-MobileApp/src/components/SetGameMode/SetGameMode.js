import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../utils/axiosInstance';

export default function SetGameMode({ route }) {
  const [gameId] = useState(route.params.gameId);
  const [gameMode, setGameMode] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGameMode = async () => {
      try {
        const response = await axiosInstance.get(`/game/${gameId}/get_mode`);
        if (response.status === 200) {
          const fetchedGameMode = response.data.game_mode;
          setGameMode(fetchedGameMode);

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

    fetchGameMode();
  }, [gameId]);
}
