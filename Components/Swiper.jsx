import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React from 'react';

// ENVIRONMENT VARIABLES
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// IMAGES
const Foods = [
  { id: '1', uri: require('../assets/01.jpg') },
  { id: '2', uri: require('../assets/02.jpg') },
  { id: '3', uri: require('../assets/03.jpg') },
  { id: '4', uri: require('../assets/04.jpg') },
];

export default function Swiper() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }}></View>
      <View style={{ flex: 1 }}>{this.renderUsers()}</View>
      <View style={{ height: 60 }}></View>
    </View>
  );
}
