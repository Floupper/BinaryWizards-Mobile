import React from 'react';
import { View, TextInput } from 'react-native';
import { styleInput } from '../styles/input';
import { styleContainer } from '../styles/container';
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";

export default function Signup() {
    return (
        <View style={styleContainer.container}>
            <TextInput
                style={styleInput.input}
                placeholder="Username"
            />
            <TextInput
                style={styleInput.input}
                placeholder="Password"
            />
            <TextInput
                style={styleInput.input}
                placeholder="Confirm Password"
            />
            <PrimaryButton
                text="Sign Up"
                // onPress={handlePress}
                style={styleButton.button}
            />
        </View>
    );
}