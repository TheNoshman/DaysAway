import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Card = ({ card }) => {
  return (
    <View activeOpacity={1} style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: card.singlePlaceDetail.preview.source }}
        resizeMode="contain"
      />
      <View style={styles.photoDescriptionContainer}>
        <Text style={styles.text}>{`Destination: ${card.destination}`}</Text>
        <Text style={styles.text}>
          {`Journey duration: ${
            card.travelTime.travelTimeDayjs.hour()
              ? `${card.travelTime.travelTimeDayjs.hour()} ${
                  card.travelTime.travelTimeDayjs.hour() > 1
                    ? 'hours '
                    : 'hour '
                }`
              : ''
          }
          ${
            card.travelTime.travelTimeDayjs.minute() > 0
              ? `${card.travelTime.travelTimeDayjs.minute()} ${
                  card.travelTime.travelTimeDayjs.minute() > 1
                    ? 'minutes'
                    : 'minute'
                }`
              : ''
          }`}
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: height - 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
    height: 300,
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
});
