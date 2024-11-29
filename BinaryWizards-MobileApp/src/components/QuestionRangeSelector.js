import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { styleSearchQuiz } from '../styles/searchQuiz';

export default function QuestionRangeSelector({ minQuestions, maxQuestions, onMinChange, onMaxChange }) {
    return (
        <View style={styleSearchQuiz.container}>
            <Text style={styleSearchQuiz.text}>Select the number of questions</Text>
            <View style={styleSearchQuiz.rangeInputs}>
                <View style={styleSearchQuiz.inputGroup}>
                    <Text style={styleSearchQuiz.label}>Min</Text>
                    <TextInput
                        style={styleSearchQuiz.input}
                        value={minQuestions.toString()}
                        keyboardType="numeric"
                        placeholder="Min"
                        onChangeText={(value) => onMinChange(Number(value))}
                    />
                </View>
                <View style={styleSearchQuiz.inputGroup}>
                    <Text style={styleSearchQuiz.label}>Max</Text>
                    <TextInput
                        style={styleSearchQuiz.input}
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
