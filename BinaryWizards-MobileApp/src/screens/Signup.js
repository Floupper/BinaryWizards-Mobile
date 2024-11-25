import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { styleInput } from '../styles/input';
import { styleContainer } from '../styles/container';
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";
import Toast from 'react-native-toast-message';
import { createUser, checkUsernameAvailability } from '../services/SignUpRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

    const navigation = useNavigation();

    const fetchUsernameAvailability = async (username) => {
        try {
            const available = await checkUsernameAvailability({ username });
            setIsUsernameAvailable(available);
            if (available === false) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Username is already taken.',
                });
            } else {
                setUsername(username);
            }
        } catch (error) {
            console.error("Error checking username:", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occured while checking the username',
            });
            throw error;
        }
    };

    const handlePress = async () => {
        if (password === confirmPassword) {
            try {
                const response = await createUser({ username, password });
                if (response) {
                    AsyncStorage.setItem("userToken", response.token);
                    navigation.navigate('Signin');
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'User created successfully.',
                    });
                }
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match.',
            });
        }
    };

    return (
        <View style={styleContainer.container}>
            <TextInput
                style={styleInput.input}
                placeholder="Username"
                value={username}
                onChangeText={fetchUsernameAvailability}
            />
            {isUsernameAvailable === false && (
                <Text style={{ color: 'red' }}>Username is already taken.</Text>
            )}
            {isUsernameAvailable === true && (
                <Text style={{ color: 'green' }}>Username is available!</Text>
            )}
            <TextInput
                style={styleInput.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styleInput.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <PrimaryButton
                text="Sign Up"
                onPress={handlePress}
                style={styleButton.button}
            />
        </View>
    );
}