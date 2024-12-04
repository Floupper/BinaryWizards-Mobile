import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

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