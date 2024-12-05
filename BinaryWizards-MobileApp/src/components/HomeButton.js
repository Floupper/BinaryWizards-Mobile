import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { styleButton } from '../styles/buttons';

export default function HomeButton({ text }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={styleButton.homeButton}
      >
        <Icon name="arrowleft" size={30} color="#000" />
        <Text>{text}</Text>
      </Pressable>
    </View>
  );
}
