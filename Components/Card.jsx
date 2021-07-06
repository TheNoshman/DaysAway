import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import IconButton from './IconButton';

const { height } = Dimensions.get('window');

const Card = ({ card }) => {
  console.log('card = ', card);

  return (
    <View activeOpacity={1} style={styles.card}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: card.cardPhotosArray[0].results[0].urls.small }}
          resizeMode="contain"
        />
        <Image
          style={styles.image}
          source={{ uri: card.cardPhotosArray[1].results[0].urls.small }}
          resizeMode="contain"
        />
        <Image
          style={styles.image}
          source={{ uri: card.cardPhotosArray[2].results[0].urls.small }}
          resizeMode="contain"
        />
        <Image
          style={styles.image}
          source={{ uri: card.cardPhotosArray[3].results[0].urls.small }}
          resizeMode="contain"
        />
      </View>

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
        <View style={styles.buttonsContainer}>
          <IconButton
            name="remove"
            // onPress={() => console.log(`use ref ${useSwiper}`)}
            color="white"
            backgroundColor="#ffb01f"
            size={45}
          />
          <IconButton
            name="undo"
            // onPress={() => setCardIndex(cardIndex - 1)}
            color="white"
            backgroundColor="#d1d1d1"
            size={20}
          />
          <IconButton
            name="add"
            // onPress={() => swiperEl.onSwipedRight}
            color="white"
            backgroundColor="#00dbdb"
            size={45}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: height - 100,
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
