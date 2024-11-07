import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styleContainer } from '../styles/container';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styleContainer.container}>
            <Text style={styleContainer.title}>BinaryWizards</Text>
            <View style={styles.buttonContainer}>
                <Button title="Play Quiz" onPress={() => navigation.navigate('Play')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Join or Continue" onPress={() => navigation.navigate('Join')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
});
