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
        colors={['rgba(0,0,0,0.2)', 'rgba(255,255,255,1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.5 }}
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
        <View style={styles.summaryBox} />
        {/* <Text style={styles.text}>{`Destination: ${card.destination}`}</Text>
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
          </Text> */}
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
        {/* </View> */}
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
    height: '65%',
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
    padding: 4,
  },
  image: {
    borderRadius: 10,
    flex: 1,
  },

  summaryBox: {
    // borderColor: 'red',
    // borderWidth: 2,
    alignItems: 'flex-start',
    height: '20%',
    width: '100%',
  },

  buttonsContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    width: '100%',
    height: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
});
