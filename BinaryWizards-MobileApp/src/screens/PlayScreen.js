import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message"; // Import du toast
import { SelectList } from "react-native-dropdown-select-list"; // Import de SelectList

import { styleContainer } from "../styles/container";
import { useNavigation } from "@react-navigation/native";

import { fetchAndCreateQuestion, fetchCategories, fetchDifficulties } from "../services/requests";

export default function PlayScreen() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [nbQuestions, setNbQuestions] = useState("");
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
            setNbQuestions(""); // Réinitialise si la valeur n'est pas valide
        }
    };

    return (
        <View style={styleContainer.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Category</Text>
                <SelectList
                    setSelected={(value) => setSelectedCategory(value)}
                    data={categories}
                    placeholder="Select category"
                    boxStyles={styles.input}
                    dropdownStyles={styles.selectListDropdown}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Nb. questions</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter number of questions"
                    value={nbQuestions}
                    onChangeText={handleNbQuestionsChange}
                    maxLength={2} // Limite l'entrée à deux chiffres
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Difficulty</Text>
                <SelectList
                    setSelected={(value) => setDifficulty(value)}
                    data={difficulties}
                    placeholder="Select difficulty"
                    boxStyles={styles.input}
                    dropdownStyles={styles.selectListDropdown}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={"Start Game"}
                    onPress={() => fetchAndCreateQuestion(selectedCategory, nbQuestions, difficulty, navigation)}
                    disabled={!nbQuestions || isNaN(parseInt(nbQuestions, 10))}
                />
            </View>

            <Toast />
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
    input: {
        height: 50,
        width: '90%',
        marginHorizontal: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: 'center',
        borderColor: 'gray',
        color: 'black',
    },
    buttonContainer: {
        marginTop: 30,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    selectListDropdown: {
        width: '90%',
        marginHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
});
