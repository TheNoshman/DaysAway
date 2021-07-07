import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import IconButton from './IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

const Card = ({ card }) => {
  console.log('card = ', card);
  const hour = card.travelTime.travelTimeDayjs.hour();
  const min = card.travelTime.travelTimeDayjs.minute();
  const changingAt = [];
  card.details[0].journeyRoute.filter((el, i) => {
    if (i > 0) {
      changingAt.push(` ${el.station_name}`);
    }
  });

  return (
    <View activeOpacity={1}>
      <LinearGradient
        colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0.0, y: 0.8 }}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imageRow}>
            <View style={styles.imageShadow}>
              <Image
                style={styles.image}
                source={{ uri: card.cardPhotosArray[0].results[0].urls.small }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.imageShadow}>
              <Image
                style={styles.image}
                source={{ uri: card.cardPhotosArray[1].results[0].urls.small }}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={styles.imageRow}>
            <View style={styles.imageShadow}>
              <Image
                style={styles.image}
                source={{ uri: card.cardPhotosArray[2].results[0].urls.small }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.imageShadow}>
              <Image
                style={styles.image}
                source={{ uri: card.cardPhotosArray[3].results[0].urls.small }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.placeName}>{`${card.destination}`}</Text>
        </View>
        <View style={styles.summaryBoxContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.textContainer}>
              <View style={styles.textLine}>
                <Icon name="timer" size={20} color="black" />
                <Text style={styles.text}>
                  {` ${hour ? `${hour} ${hour > 1 ? 'hours ' : 'hour '}` : ''}${
                    min > 0 ? `${min} ${min > 1 ? 'minutes' : 'minute'}` : ''
                  }`}
                </Text>
              </View>
              <View style={styles.textLine}>
                <Icon name="flight-takeoff" size={20} color="black" />
                <Text style={styles.text}>{` ${card.departureTime}`}</Text>
              </View>
              <View style={styles.textLine}>
                <Icon name="sync-alt" size={20} color="black" />
                <Text style={styles.text}>
                  {`${
                    changingAt.length
                      ? `${changingAt.toString()}`
                      : 'No changes'
                  }`}
                </Text>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <IconButton
                name="remove"
                // onPress={() => console.log(`use ref ${useSwiper}`)}
                color="white"
                backgroundColor="#f7888d"
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
                backgroundColor="#88c5f7"
                size={45}
              />
            </View>
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
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  imageContainer: {
    height: '70%',
    width: '100%',

    borderRadius: 10,
    padding: 5,
  },
  imageRow: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
  },
  imageShadow: {
    elevation: 5,
    borderRadius: 10,
    flex: 1,
    padding: 1,
    margin: 5,
  },
  image: {
    borderRadius: 10,
    flex: 1,
  },

  placeContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(136,197,247, 1)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    top: '66%',
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },

  summaryBoxContainer: {
    alignItems: 'center',
    height: '30%',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  summaryBox: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    elevation: 3,
  },

  textContainer: {
    padding: 5,
    height: 90,
    marginTop: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  textLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    width: '100%',
    padding: 2,
    textAlignVertical: 'center',
  },

  buttonsContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
