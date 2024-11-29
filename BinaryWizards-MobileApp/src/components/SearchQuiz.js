import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchedQuiz } from '../services/quizRequests';
import { fetchDifficulties } from '../services/createGame';
import { useNavigation } from '@react-navigation/native';
import { createGameId } from '../services/createGame';
import QuestionRangeSelector from './QuestionRangeSelector';
import QuizListItem from './QuizListItem';
import { styleSearchQuiz } from '../styles/searchQuiz';
import { SelectList } from 'react-native-dropdown-select-list';

export default function SearchQuiz() {
    const navigation = useNavigation();

    // State management
    const [text, setText] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [difficulties, setDifficulties] = useState([]);
    const [minQuestions, setMinQuestions] = useState(1);
    const [maxQuestions, setMaxQuestions] = useState(50);

    // Fetch difficulties on mount
    useEffect(() => {
        const fetchDifficultiesData = async () => {
            try {
                const response = await fetchDifficulties();
                setDifficulties(response);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Unable to fetch difficulties: ${error.message}`,
                });
            }
        };

        fetchDifficultiesData();
    }, []);

    // Infinite query for quizzes
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['quizzes', text, selectedDifficulty, minQuestions, maxQuestions],
        queryFn: ({ pageParam = 1 }) =>
            fetchSearchedQuiz({
                text,
                difficulty: selectedDifficulty,
                page: pageParam,
                maxQuestions,
                minQuestions,
            }),
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
        enabled: false, // Prevent automatic execution
    });

    // Search handler
    const handleSearch = () => {
        refetch();
    };

    // Handle game creation
    const handlePressCreate = async (quizId) => {
        try {
            const gameResponse = await createGameId(quizId, navigation);
            if (gameResponse?.game_id) {
                Toast.show({
                    type: 'success',
                    text1: 'Game Created',
                    text2: 'Game was created successfully!',
                });
            } else {
                throw new Error('Invalid game creation response.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to create game. Please try again later.',
            });
        }
    };

    return (
        <View style={styleSearchQuiz.container}>
            <Text style={styleSearchQuiz.text}>Browse Quiz</Text>
            <TextInput
                style={styleSearchQuiz.input}
                placeholder="Enter text to search for a quiz"
                value={text}
                onChangeText={setText}
            />
            <QuestionRangeSelector
                minQuestions={minQuestions}
                maxQuestions={maxQuestions}
                onMinChange={setMinQuestions}
                onMaxChange={setMaxQuestions}
            />
            <View style={styleSearchQuiz.picker}>
                <Text style={styleSearchQuiz.text}>Select Difficulty</Text>
                <SelectList
                    setSelected={(value) => setSelectedDifficulty(value)}
                    data={difficulties}
                    placeholder="Select a difficulty"
                    boxStyles={styleSearchQuiz.input}
                    dropdownStyles={styleSearchQuiz.selectListDropdown}
                />
            </View>
            <TouchableOpacity onPress={handleSearch} style={styleSearchQuiz.searchButton}>
                <Text style={styleSearchQuiz.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {isLoading && <ActivityIndicator style={styleSearchQuiz.loadingIndicator} />}

            <FlatList
                style={styleSearchQuiz.flatlist}
                data={data?.pages?.flatMap((page) => page?.quizzes || [])}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handlePressCreate(item.quiz_id)}
                    >
                        <QuizListItem
                            difficulty={item.difficulty}
                            title={item.title}
                            nbQuestions={item.nb_questions}
                            date_game_creation={item.created_at}
                        />
                    </Pressable>

                )}
                keyExtractor={(item) => item?.quiz_id} 
                onEndReached={hasNextPage ? fetchNextPage : null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage && <ActivityIndicator style={styleSearchQuiz.loadingIndicator} />
                }
                ListEmptyComponent={
                    !isLoading && (
                        <Text style={styleSearchQuiz.emptyMessage}>No quizzes found.</Text>
                    )
                }
            />
        </View>
    );
}
