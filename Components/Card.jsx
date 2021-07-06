import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import IconButton from './IconButton';

const { height } = Dimensions.get('window');

const Card = ({ card }) => {
  console.log('card = ', card);
  const hour = card.travelTime.travelTimeDayjs.hour();
  const min = card.travelTime.travelTimeDayjs.minute();

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
            <Text style={styles.text}>
              {`Journey duration: ${
                hour ? `${hour} ${hour > 1 ? 'hours ' : 'hour '}` : ''
              }${min > 0 ? `${min} ${min > 1 ? 'minutes' : 'minute'}` : ''}`}
            </Text>

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
    // borderColor: 'red',
    // borderWidth: 2,
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
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: 'black',
    height: 50,
    width: '70%',
    top: '65%',
    zIndex: 2,
  },
  placeName: {
    fontSize: 20,
    color: 'black',
  },

  summaryBoxContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    alignItems: 'flex-start',
    height: '30%',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    zIndex: 0,
  },

  summaryBox: {
    // borderColor: 'red',
    // borderWidth: 2,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    elevation: 3,
    padding: 5,
    zIndex: 1,
  },

  buttonsContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // text: {
  //   textAlign: 'center',
  //   fontSize: 20,
  //   color: 'white',
  //   textShadowColor: 'black',
  //   textShadowRadius: 10,
  // },
});
