import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// DETAILS COMPONENT CONTAINING WEATHER INFO
export default function DetailsLowerWeather({ journey }) {
  const weatherData = journey.weatherData;
  // WEATHER ICON, INCREASE THE SIZE TO 128PX
  const weatherIcon = `https:${weatherData.current.condition.icon}`.replace(
    /64/g,
    '128',
  );

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
        <View style={styles.bottomContainer}>
          <Text style={styles.tag}>
            Cloud cover: {weatherData.current.cloud}/8
          </Text>
          <Text style={styles.tag}>
            Humidity: {weatherData.current.humidity}%
          </Text>
          <Text style={styles.tag}>
            Rain: {weatherData.current.precip_mm}mm
          </Text>
          <Text style={styles.tag}>UV index: {weatherData.current.uv}/ 8</Text>
          <Text style={styles.tag}>
            Visability: {weatherData.current.vis_miles} miles
          </Text>
          <Text style={styles.tag}>
            Wind speed: {weatherData.current.wind_mph}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  topContainer: {
    borderRadius: 10,
    alignItems: 'center',
    height: 120,

    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  iconBox: {
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

    marginLeft: 5,
    borderRadius: 10,
    padding: 5,
    paddingBottom: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  weatherTitle: {
    fontSize: 35,
  },
  temp: {
    fontSize: 16,
  },
  tag: {
    backgroundColor: 'rgba(252,213,140,1)',
    color: 'white',
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 4,
    paddingVertical: 2,
    paddingHorizontal: 5,
    elevation: 2,
  },
});
