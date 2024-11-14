import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styleContainer } from '../styles/container';
import { checkQuizExists } from '../services/requests';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function JoinScreen() {
    const [quizId, setQuizId] = React.useState('');
    const { navigate } = useNavigation();

    const handlePress = async () => {
        if (quizId.trim()) {
            const response = await checkQuizExists(quizId);
            if(response){
                navigate('Questions', { quizId, questions: response });
            }
            else{
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Quiz does not exist',
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter a quiz code',
            });
        }
    };
    

    return (
        <View style={styleContainer.container}>
            <TextInput
                style={styles.input}
                onChangeText={setQuizId}
                placeholder="Enter the quiz code"
                value={quizId}
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
