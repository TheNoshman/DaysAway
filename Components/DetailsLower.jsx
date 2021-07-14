import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailsLowerActivities from './DetailsLowerActivities';
import DetailsLowerStatus from './DetailsLowerStatus';
import DetailsLowerWeather from './DetailsLowerWeather';

export default function DetailsLower() {
  const [selectedPage, setSelectedPage] = useState('act');

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
            selectedPage === 'act'
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => setSelectedPage('act')}
        >
          Activities
        </Text>
        <Text
          style={
            selectedPage === 'sta'
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => setSelectedPage('sta')}
        >
          Journey Details
        </Text>
        <Text
          style={
            selectedPage === 'wea'
              ? { ...styles.upperText, ...styles.selectedUpperText }
              : styles.upperText
          }
          onPress={() => setSelectedPage('wea')}
        >
          Weather
        </Text>
      </View>
      <View>
        {(() => {
          switch (selectedPage) {
            case 'act':
              return <DetailsLowerActivities />;
            case 'sta':
              return <DetailsLowerStatus />;
            default:
              return <DetailsLowerWeather />;
          }
        })()}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  upperMenu: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  upperText: {
    // borderColor: 'red',
    // borderWidth: 2,
    fontSize: 18,
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
