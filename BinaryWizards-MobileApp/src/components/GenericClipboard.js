import React, { useState } from "react";
import { Text, View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";
import Feather from '@expo/vector-icons/Feather';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

export default function GenericClipboard({ text, id }) {
    const copyToClipboard = () => {
        Clipboard.setString(id);
        Toast.show({
            type: 'success',
            text1: 'Copied to clipboard',
            text2: `${text} copied to clipboard !`,
        });
    };

    return (
        <View style={styleContainer.gameIdContainer}>
            <Text style={styleText.gameIdText}>{text} : {id}</Text>
            <Feather name="copy" size={24} color="black" onPress={copyToClipboard} />
        </View>
    );
}