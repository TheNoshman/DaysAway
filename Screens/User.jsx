import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default function User() {
  return (
    <ImageBackground
      source={require('../assets/homebg.png')}
      style={styles.bg}
      opacity={0.8}
    >
      <View>
        <Text>USER</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    justifyContent: 'center',
  },
});
