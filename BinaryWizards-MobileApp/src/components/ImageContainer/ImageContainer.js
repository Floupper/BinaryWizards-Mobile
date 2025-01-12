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
}) {
  return (
    <View style={styles.container}>
      {options.map(({ option_content, option_index }) => (
        <Pressable
          key={option_index}
          style={[styles.imageContainer, determineButtonStyle(option_index)]}
          onPress={() => onPress(option_index)}
        >
          <Image
            source={{ uri: option_content.content }}
            style={styles.image}
          />
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
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
    padding: 5,
  },
});
