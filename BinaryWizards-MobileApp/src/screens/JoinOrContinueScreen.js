import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { styleContainer } from '../styles/container';
import { checkQuizExists } from '../services/requests';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';

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
            <Text style={styles.label}>Quiz Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={setQuizId}
                placeholder="Enter the quiz code"
                value={quizId}
            />
            <PrimaryButton text="Join" onPress={handlePress} style={styleButton.button}/>
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
    label: {
        fontSize: 16,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
});
