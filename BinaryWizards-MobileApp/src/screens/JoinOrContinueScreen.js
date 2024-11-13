import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styleContainer } from '../styles/container';
import { useNavigation } from '@react-navigation/native';

export default function JoinScreen() {
    const [text, onChangeText] = React.useState('');
    const navigation = useNavigation();

    const handlePress = () => {
        if (text.trim()) {
            navigation.navigate("Questions", { quizId: text });
        } else {
            alert("Please enter a game code");
        }
    };

    return (
        <View style={styleContainer.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder="Enter the game code"
                value={text}
            />
            <TouchableOpacity onPress={handlePress} style={styles.icon}>
                <Icon name="playcircleo" size={100} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    icon: {
        marginTop: 20,
    },
});
