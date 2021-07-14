import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsLower() {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.bg}
    >
      <View style={styles.lowerContainer}></View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  lowerContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
    width: '100%',
  },
});
