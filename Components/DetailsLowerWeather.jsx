import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function DetailsLowerWeather({ journey }) {
  const weatherData = journey.weatherData;

  console.log('weather data = ', weatherData);
  const weatherIcon = `https:${weatherData.current.condition.icon}`.replace(
    /64/g,
    '128',
  );
  console.log('icon =', weatherIcon);

  return (
    <View>
      <LinearGradient
        colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.mainContainer}
      >
        <View style={styles.iconBox}>
          <Image
            style={styles.iconImage}
            source={{ uri: weatherIcon }}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
    height: 400,
    margin: 10,
  },
  iconBox: { borderColor: 'red', borderWidth: 2, height: 150, width: 150 },
  iconImage: {
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    borderRadius: 100,
    height: 150,
    width: 150,
    zIndex: 2,
  },
});
