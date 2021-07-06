import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import IconButton from './IconButton';

const { height } = Dimensions.get('window');

const Card = ({ card }) => {
  console.log('card = ', card);

  return (
    <View activeOpacity={1}>
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(255,255,255,1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
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
      </LinearGradient>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: height - 100,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  imageContainer: {
    height: 500,
    width: '100%',
    borderColor: 'red',
    borderWidth: 2,
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
