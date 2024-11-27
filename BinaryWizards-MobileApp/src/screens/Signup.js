import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
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
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);


    const navigation = useNavigation();

    const fetchUsernameAvailability = async () => {
        try {
            const available = await checkUsernameAvailability({ username });
            setIsUsernameAvailable(available);
            setUsernameError(!available);

            setUsername(username);
        } catch (error) {
            setUsernameError(true);
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
        if (password.length < 8) {
            setPasswordError(true);
        }

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
                setConfirmPasswordError(true);
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
                style={[
                    styleInput.input,
                    usernameError && { borderColor: 'red' }
                ]}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setUsernameError(false);
                }}
                onBlur={fetchUsernameAvailability}
            />
            {isUsernameAvailable === false && (
                <Text style={{ color: 'red' }}>Username is already taken.</Text>
            )}
            {isUsernameAvailable === true && (
                <Text style={{ color: 'green' }}>Username is available!</Text>
            )}

            <TextInput
                style={[
                    styleInput.input,
                    passwordError && { borderColor: 'red' }
                ]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(false);
                }}
                onBlur={() => {
                    if (password.length < 8) {
                        setPasswordError(true);
                    }
                }}
            />
            {password.length < 8 && password.length > 0 && (
                <Text style={{ color: 'red' }}>Password must be at least 8 characters long.</Text>
            )}

            <TextInput
                style={[
                    styleInput.input,
                    confirmPasswordError && { borderColor: 'red' }
                ]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setConfirmPasswordError(false);
                }}
                onBlur={() => {
                    if (password !== confirmPassword) {
                        setConfirmPasswordError(true);
                    }
                }}
            />
            {password !== confirmPassword && confirmPassword.length > 0 && (
                <Text style={{ color: 'red' }}>Passwords do not match.</Text>
            )}

            <PrimaryButton
                text="Sign Up"
                onPress={handlePress}
                style={styleButton.button}
            />
        </View>
    );
}