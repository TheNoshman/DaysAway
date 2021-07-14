import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsLower() {
  const [activitiesSelected, setActivitesSelected] = useState(true);
  const [weatherSelected, setWeatherSelected] = useState(false);
  const [statusSelected, setStatusSelected] = useState(false);
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.mainContainer}
    >
      <View style={styles.upperMenu}>
        <Text
          style={
            activitiesSelected
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => {
            setActivitesSelected(true);
            setStatusSelected(false);
            setWeatherSelected(false);
          }}
        >
          Activities
        </Text>
        <Text
          style={
            statusSelected
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => {
            setActivitesSelected(false);
            setStatusSelected(true);
            setWeatherSelected(false);
          }}
        >
          Train Status
        </Text>
        <Text
          style={
            weatherSelected
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => {
            setActivitesSelected(false);
            setStatusSelected(false);
            setWeatherSelected(true);
          }}
        >
          Weather
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,
  },
  upperMenu: {
    borderColor: 'red',
    borderWidth: 2,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  upperText: {
    borderColor: 'red',
    borderWidth: 2,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedUpperText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

/* <Text> journey details</Text>
  <Text>From</Text>
  <Text>To</Text>
  <Text>Departing</Text>
  <Text>Arriving</Text>
  <Text>Changing at</Text>
  <Text>Travel time</Text>
  <Text>Train status</Text>
  <Text>Weather</Text>
  <Text>Things to see</Text> */
