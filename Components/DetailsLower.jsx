import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailsLowerActivities from './DetailsLowerActivities';
import DetailsLowerStatus from './DetailsLowerStatus';
import DetailsLowerWeather from './DetailsLowerWeather';

// DETAILS LOWER WINDOW CONTAINING ACTIVITIES, JOURNEY AND WEATHER
export default function DetailsLower({ journey }) {
  const [selectedPage, setSelectedPage] = useState('act');

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.15)']}
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
              return <DetailsLowerActivities journey={journey} />;
            case 'sta':
              return <DetailsLowerStatus journey={journey} />;
            default:
              return <DetailsLowerWeather journey={journey} />;
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
    paddingBottom: 10,
  },
  upperMenu: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  upperText: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedUpperText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
