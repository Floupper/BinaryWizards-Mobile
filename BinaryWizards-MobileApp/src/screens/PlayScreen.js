import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { styleContainer } from "../styles/container";
import { useNavigation } from "@react-navigation/native";

export default function PlayScreen() {
    const [category, setCategory] = useState(null);
    const [nbQuestions, setNbQuestions] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const navigation = useNavigation();

    const categoryOptions = [
        { label: "Mythology", value: "mythology" },
        { label: "Sports", value: "sports" },
        { label: "Art", value: "art" },
        { label: "Geography", value: "geography" },
        { label: "Politics", value: "politics" },
        { label: "History", value: "history" },
        { label: "Celebrities", value: "celebrities" },
        { label: "Animals", value: "animals" },
        { label: "Vehicles", value: "vehicles" },
        { label: "Entertainment: Comics", value: "comics" },
        { label: "Science: Gadgets", value: "gadgets" },
        { label: "Entertainment: Japanese Anime & Manga", value: "anime_manga" },
        { label: "Entertainment: Cartoon & Animations", value: "cartoon_animations" },
        { label: "Science & Nature", value: "science_nature" },
        { label: "Science: Computer", value: "computer" },
        { label: "Science: Mathematics", value: "mathematics" },
        { label: "General Knowledge", value: "general_knowledge" },
        { label: "Entertainment: Books", value: "books" },
        { label: "Entertainment: Film", value: "film" },
        { label: "Entertainment: Music", value: "music" },
        { label: "Entertainment: Musicals & Theatres", value: "musicals_theatres" },
        { label: "Entertainment: Television", value: "television" },
        { label: "Entertainment: Video Games", value: "video_games" },
        { label: "Entertainment: Board Games", value: "board_games" }
    ];


    const nbQuestionsOptions = [
        { label: "5", value: "5" },
        { label: "10", value: "10" },
        { label: "15", value: "15" },
        { label: "20", value: "20" },
    ];

    const difficultyOptions = [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
    ];

    return (
        <View style={styleContainer.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Catégorie</Text>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={categoryOptions}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Nb. questions</Text>
                <RNPickerSelect
                    onValueChange={(value) => setNbQuestions(value)}
                    items={nbQuestionsOptions}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Difficulty</Text>
                <RNPickerSelect
                    onValueChange={(value) => setDifficulty(value)}
                    items={difficultyOptions}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title={"Start Game"} onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 30,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
