import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function QuestionRangeSelector({ minQuestions, maxQuestions, onMinChange, onMaxChange }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Select the number of questions</Text>
            <View style={styles.rangeInputs}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Min</Text>
                    <TextInput
                        style={styles.input}
                        value={minQuestions.toString()}
                        keyboardType="numeric"
                        placeholder="Min"
                        onChangeText={(value) => onMinChange(Number(value))}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Max</Text>
                    <TextInput
                        style={styles.input}
                        value={maxQuestions.toString()}
                        keyboardType="numeric"
                        placeholder="Max"
                        onChangeText={(value) => onMaxChange(Number(value))}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    rangeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    inputGroup: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
});