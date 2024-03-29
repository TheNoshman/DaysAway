import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TRIP ITEM COMPONENT USED IN LIST FOR THE YOUR JOURNEYS TAB
export default function TripItem({ journey, navigation }) {
  const event = journey;
  const trip = journey.item;
  const hour = trip.travelTime.travelTimeDayjs.hour();
  const min = trip.travelTime.travelTimeDayjs.minute();
  const randomIndex = Math.floor(Math.random() * trip.cardPhotosArray.length);
  const dateAdded = trip.details[0].journeyRoute[0].request_time;

  return (
    <LinearGradient
      colors={['rgba(210,210,210, 1)', 'rgba(255,255,255,1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0.0, y: 0.8 }}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.touchContainer}
        onPress={() => navigation.navigate('Details', { event })}
      >
        <View style={styles.imageContainer}>
          <View style={styles.innerImageCont}>
            <Image
              style={styles.image}
              source={{
                uri: trip.cardPhotosArray[randomIndex].results[0].urls.thumb,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{trip.destination}</Text>
          <View style={styles.textLine}>
            <Icon name="timer" size={15} color="black" />
            <Text style={styles.text}>
              {` ${hour ? `${hour} ${hour > 1 ? 'hours ' : 'hour '}` : ''}${
                min > 0 ? `${min} ${min > 1 ? 'minutes' : 'minute'}` : ''
              }`}
            </Text>
          </View>
          <View style={styles.textLine}>
            <Icon name="flight-takeoff" size={15} color="black" />
            <Text style={styles.text}>{` ${trip.departureTime}`}</Text>
          </View>
          <View style={styles.textLine}>
            <Icon name="bookmark-border" size={15} color="black" />
            <Text style={styles.text}>{` ${dayjs(dateAdded).format(
              'DD/MM/YYYY',
            )}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.ticketButton}>
          <Icon name="confirmation-number" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="delete-forever" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 350,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 10,
  },
  touchContainer: { flexDirection: 'row' },
  imageContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerImageCont: {
    height: 85,
    width: 85,
    elevation: 10,
    borderRadius: 50,
  },
  image: {
    borderRadius: 50,
    flex: 1,
    padding: 5,
  },

  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    padding: 2,
    textAlignVertical: 'center',
  },
  ticketButton: {
    backgroundColor: '#88c5f7',
    height: 50,
    width: 50,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#f7888d',
    height: 50,
    width: 50,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
