import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 10,
  },
});
export default IconButton;
