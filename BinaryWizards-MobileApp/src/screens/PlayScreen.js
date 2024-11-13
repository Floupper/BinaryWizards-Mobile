import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { styleContainer } from "../styles/container";
import { useNavigation } from "@react-navigation/native";

import { nbQuestionsOptions } from "../data/nbQuestionsOptions";
import { fetchAndCreateQuestion } from "../services/requests";
import { REACT_NATIVE_API_IP } from "@env";

export default function PlayScreen() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [nbQuestions, setNbQuestions] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [difficulties, setDifficulties] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://${REACT_NATIVE_API_IP}:3000/categories`);

                const data = await response.json();

                const formattedCategories = data.map((category) => ({
                    key: category.id,
                    label: category.name,
                    value: category.id,
                }));

                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        })();

        (async () => {
            try {
                const response = await fetch(`http://${REACT_NATIVE_API_IP}:3000/difficulties`);
                const data = await response.json();

                const formattedDifficulties = data.map((difficulty) => ({
                    label: difficulty,
                    value: difficulty,
                }));

                setDifficulties(formattedDifficulties);
            } catch (error) {
                console.error("Error fetching difficulties", error);
            }
        })();
    }, []);

    return (
        <View style={styleContainer.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Category</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCategory(value)}
                    items={categories}
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
                    items={difficulties}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title={"Start Game"} onPress={() => fetchAndCreateQuestion(selectedCategory, nbQuestions, difficulty, navigation)} />
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
