import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStartedGames } from "../services/userRequests";
import GameListItem from "./GameListItem";
import { useNavigation } from "@react-navigation/native";

export default function JoinQuizResumeGame() {
    const navigation = useNavigation();
    
    useEffect(() => {
        refetch();
    }, []);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['unfinished_games'],
        queryFn: ({ pageParam = 1 }) =>
            getStartedGames({
                navigation,
                page: pageParam,
            }),
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
        enabled: false,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resume Game</Text>

            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            )}

            <FlatList
                style={styles.flatlist}
                data={data?.pages?.flatMap((page) => page?.unfinished_games || [])}
                renderItem={({ item }) => <GameListItem item={item} />}
                keyExtractor={(item) => item?.game_id.toString()}
                onEndReached={hasNextPage ? fetchNextPage : null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage && <ActivityIndicator style={styles.loadingIndicator} />
                }
                ListEmptyComponent={
                    !isLoading && (
                        <Text style={styles.emptyMessage}>No games found.</Text>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    flatlist: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
    },
    emptyMessage: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
});