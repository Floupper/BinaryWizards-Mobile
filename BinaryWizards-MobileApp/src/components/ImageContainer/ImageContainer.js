import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

//Props validation
ImageContainer.propTypes = {
  options: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  determineButtonStyle: PropTypes.func.isRequired,
};

export default function ImageContainer({
  options,
  onPress,
  determineButtonStyle,
  userAnswerIndex,
  correctAnswerIndex,
}) {
  return (
    <View style={styles.container}>
      {options.map(({ option_content, option_index }) => (
        <Pressable
          key={option_index}
          style={[
            styles.imageContainer,
            determineButtonStyle({
              buttonIndex: option_index,
              userAnswerIndex,
              correctAnswerIndex,
            }),
          ]}
          onPress={() => onPress(option_index)}
        >
          <Image source={{ uri: option_content }} style={styles.image} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 8,
    height: 100,
    resizeMode: 'cover',
    width: 100,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    color: 'black',
    margin: 10,
    padding: 10,
  },
});
