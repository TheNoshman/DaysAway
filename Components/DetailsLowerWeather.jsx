import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.topContainer}>
          <View style={styles.iconBox}>
            <Image
              style={styles.iconImage}
              source={{ uri: weatherIcon }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.weatherTitle}>
              {weatherData.current.condition.text}
            </Text>
            <Text style={styles.temp}>
              <Icon name="device-thermostat" size={15} color="black" />{' '}
              Temperature: {weatherData.current.temp_c}°c
            </Text>
            <Text style={styles.temp}>
              <Icon name="wb-sunny" size={15} color="black" /> Feels like:{' '}
              {weatherData.current.feelslike_c}°c
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}></View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    height: 300,
    margin: 10,
  },
  topContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    height: 120,

    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  bottomContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
  },
  iconBox: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 90,
    width: 90,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 100,
    margin: 10,
  },
  iconImage: {
    flex: 1,
  },
  rightBox: {
    flexGrow: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    marginLeft: 5,
    borderRadius: 10,
    padding: 5,
    paddingBottom: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  weatherTitle: {
    fontSize: 45,
  },
  temp: {
    fontSize: 16,
  },
});
