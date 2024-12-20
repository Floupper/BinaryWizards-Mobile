import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStartedGames } from '../../services/userRequests';
import GameListItem from '../GameListItem/GameListItem';
import styles from './styles';

export default function GameList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['unfinished_games'],
      queryFn: ({ pageParam = 1 }) => getStartedGames(pageParam),
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });

  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleContainerLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    setContainerHeight(height);
  };

  const handleContentLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    setContentHeight(height);
  };

  useEffect(() => {
    fetchNextPage();
    if (
      hasNextPage &&
      containerHeight + contentHeight < 0.9 * containerHeight
    ) {
      fetchNextPage();
    }
  }, [data, containerHeight, contentHeight, fetchNextPage, hasNextPage]);

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      {isLoading && !data && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}

      <FlatList
        data={data?.pages?.flatMap((page) => page?.unfinished_games || [])}
        renderItem={({ item }) => <GameListItem item={item} />}
        keyExtractor={(item) => item.game_id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.loadingIndicator} />
          ) : null
        }
        ListEmptyComponent={
          !isLoading && <Text style={styles.emptyMessage}>No games found.</Text>
        }
        onLayout={handleContentLayout}
      />
    </View>
  );
}
