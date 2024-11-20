import React from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styleContainer } from '../styles/container';
import { styleText } from '../styles/text';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styleContainer.container}>
            <Text style={styleText.title}>Quiz</Text>
            <PrimaryButton text="Join quiz" onPress={() => navigation.navigate('Join')} style={styleButton.button}/>
        </View>
    );
}