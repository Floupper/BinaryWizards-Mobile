import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";

import { styleContainer } from "../styles/container";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
    fetchAndCreateQuiz,
    fetchCategories,
    fetchDifficulties,
} from "../services/createGame";
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";

export default function CreateGame() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [nbQuestions, setNbQuestions] = useState("10");
    const [difficulty, setDifficulty] = useState("");
    const [difficulties, setDifficulties] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            setCategories(await fetchCategories());
        })();

        (async () => {
            setDifficulties(await fetchDifficulties());
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setNbQuestions("10");
            setSelectedCategory("");
            setDifficulty("");
        }, [])
    );

    const handleNbQuestionsChange = (value) => {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 50) {
            setNbQuestions(value);
        } else {
            Toast.show({
                type: "error",
                text1: "Invalid Input",
                text2: "Please enter a number between 1 and 50",
                position: "bottom",
            });
            setNbQuestions(""); // Reset field if value is not valid
        }
    };

    return (
        <View style={styleContainer.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Category</Text>
                <SelectList
                    setSelected={(value) => setSelectedCategory(value)}
                    data={categories}
                    placeholder="Select a category"
                    boxStyles={styles.input}
                    dropdownStyles={styles.selectListDropdown}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Number of question</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter the number of questions"
                    value={nbQuestions}
                    onChangeText={handleNbQuestionsChange}
                    maxLength={2} // Limit input to 2 characters
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Difficulty</Text>
                <SelectList
                    setSelected={(value) => setDifficulty(value)}
                    data={difficulties}
                    placeholder="Select a difficulty"
                    boxStyles={styles.input}
                    dropdownStyles={styles.selectListDropdown}
                />
            </View>

            <View>
                <PrimaryButton
                    text="Start"
                    onPress={() =>
                        fetchAndCreateQuiz(
                            selectedCategory,
                            nbQuestions,
                            difficulty,
                            navigation
                        )
                    }
                    disabled={
                        !nbQuestions ||
                        isNaN(parseInt(nbQuestions, 10)) ||
                        difficulty === ""
                    }
                    style={[
                        styleButton.button,
                        (!nbQuestions ||
                            isNaN(parseInt(nbQuestions, 10)) ||
                            difficulty === "") && { backgroundColor: "gray" },
                    ]}
                />
            </View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 20,
        width: "100%",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        width: "90%",
        marginHorizontal: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        borderColor: "gray",
        color: "black",
    },
    selectListDropdown: {
        width: "90%",
        marginHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
});




// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { styleContainer } from '../styles/container';
// import { createGame } from '../services/gamesRequests';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native';
// import PrimaryButton from '../components/PrimaryButton';
// import { styleButton } from '../styles/buttons';

// export default function CreateGame() {
//     const [quizId, setQuizId] = useState('');
//     const { navigate } = useNavigation();

//     const handlePress = async () => {
//         if (quizId.trim()) {
//             const gameResponse = await createGame(quizId);
//             if (gameResponse && gameResponse.game_id) {
//                 navigate('Questions', { quizId, gameId: gameResponse.game_id });
//             }
//             else {
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Error',
//                     text2: 'Please enter a valid code.',
//                 });
//             }
//         } else {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: 'Please enter a quiz code.',
//             });
//         };
//     }


//     return (
//         <View style={styleContainer.container}>
//             <Text style={styles.label}>Quiz Code</Text>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setQuizId}
//                 placeholder="Enter the quiz code"
//                 value={quizId}
//             />
//             <PrimaryButton text="Join" onPress={handlePress} style={styleButton.button} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     input: {
//         height: 50,
//         width: '90%',
//         margin: 12,
//         borderWidth: 1,
//         borderRadius: 10,
//         fontSize: 18,
//         textAlign: 'center',
//     },
//     icon: {
//         marginTop: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         paddingHorizontal: 10,
//     },
// });
