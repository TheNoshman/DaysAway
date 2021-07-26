import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// +/ -/ UNDO BUTTON COMPONENT FOR CARD
const IconButton = ({ onPress, name, backgroundColor, color, size }) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  singleButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    padding: 10,
  },
});
export default IconButton;
