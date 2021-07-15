import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DetailsLowerStatus({ journey }) {
  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const station = reduxStationList.filter((el) => {
    return el.value.code === reduxSelectedStation.code;
  });
  const stationDistance = station[0].label.split(',');
  const hour = journey.travelTime.travelTimeDayjs.hour();
  const min = journey.travelTime.travelTimeDayjs.minute();
  const changingAt = [];
  journey.details[0].journeyRoute.filter((el, i) => {
    if (i > 0) {
      changingAt.push(` ${el.station_name}`);
    }
  });
  const callingAt =
    journey.details[0].journeyRoute[0].departures.calculatedJourneys[0]
      .callingAt;
  return (
    <View style={styles.container}>
      <View style={styles.topInnerContainer}>
        <LinearGradient
          colors={['rgba(210,210,210, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.boxOne}
        >
          <Text style={styles.boxOneSmallText}>Scheduled departure time: </Text>

          <Text style={styles.boxOneLargeText}>
            <Icon name="departure-board" size={40} color="#f7888d" />
            {journey.departureTime}
          </Text>
          <Text style={styles.boxOneSmallText}>Expected departure time:</Text>
          <Text style={styles.boxOneLargeText}>
            <Icon name="pending-actions" size={40} color="#fc943f" />
            {
              journey.details[0].journeyRoute[0].departures
                .calculatedJourneys[0].callingAt[0].expected_arrival_time
            }
          </Text>
        </LinearGradient>
        <View style={styles.topInnerContainerRight}>
          <LinearGradient
            colors={['rgba(210,210,210, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.boxTwo}
          >
            <Text style={styles.text}>Duration:</Text>

            <Text style={styles.boxTwoLargeText}>
              <Icon name="hourglass-empty" size={35} color="#f7888d" />

              {` ${hour ? `${hour}` : `${min}`}`}
            </Text>
            <Text>
              {` ${hour ? `${hour > 1 ? 'hours ' : 'hour '}` : ''}${
                min > 0 ? `${min > 1 ? 'minutes' : 'minute'}` : ''
              }`}
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(210,210,210, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.boxTwo}
          >
            <Text style={styles.text}>Duration:</Text>

            <Text style={styles.boxTwoLargeText}>
              <Icon name="hourglass-empty" size={35} color="#f7888d" />

              {` ${hour ? `${hour}` : `${min}`}`}
            </Text>
            <Text>
              {` ${hour ? `${hour > 1 ? 'hours ' : 'hour '}` : ''}${
                min > 0 ? `${min > 1 ? 'minutes' : 'minute'}` : ''
              }`}
            </Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.box}>
        <Icon name="hourglass-empty" size={40} color="#f7888d" />
        <Text>Number of changes: {changingAt.length}</Text>
      </View>
      <View style={styles.box}>
        <Text>Departing station distance from you: {stationDistance[1]}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          Changing at:
          {`${changingAt.length ? `${changingAt.toString()}` : 'No changes'}`}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          Scheduled arrival time:
          {journey.details[3].destination.aimed_arrival_time}
        </Text>
        <Text style={styles.text}>
          Expected arrival time:
          {journey.details[3].destination.expected_arrival_time}
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}>
          Train status:
          {
            journey.details[0].journeyRoute[0].departures.calculatedJourneys[0]
              .callingAt[0].status
          }
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          Arriving into destination on platform:
          {journey.details[3].destination.platform}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          Station code:
          {journey.details[3].destination.station_code}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          Station code:
          {journey.details[3].destination.station_code}
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}>Calling at:</Text>
        <FlatList
          data={callingAt}
          keyExtractor={(item) => item.station_code}
          renderItem={({ item, index }) => <Text>{item.station_name}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 600,
  },
  topInnerContainer: {
    // borderColor: 'red',
    // borderWidth: 2,

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 4,
  },
  topInnerContainerRight: {
    // borderColor: 'red',
    // borderWidth: 2,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boxOne: {
    height: 200,
    width: 200,
    margin: 5,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  boxOneSmallText: {
    fontSize: 16,
  },
  boxOneLargeText: {
    fontSize: 50,
  },
  boxTwo: {
    height: 94,
    width: 110,
    margin: 5,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  boxTwoLargeText: {
    // borderColor: 'red',
    // borderWidth: 2,
    fontSize: 40,
  },
  box: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 100,
    width: 100,
  },
});
