import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

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
      <View style={styles.boxOne}>
        <Text>Scheduled departure time: {journey.departureTime}</Text>
        <Text>
          Expected departure time:
          {
            journey.details[0].journeyRoute[0].departures.calculatedJourneys[0]
              .callingAt[0].expected_arrival_time
          }
        </Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Duration:
          {` ${hour ? `${hour} ${hour > 1 ? 'hours ' : 'hour '}` : ''}${
            min > 0 ? `${min} ${min > 1 ? 'minutes' : 'minute'}` : ''
          }`}
        </Text>
      </View>

      <View style={styles.boxOne}>
        <Text>Number of changes: {changingAt.length}</Text>
      </View>
      <View style={styles.boxOne}>
        <Text>Departing station distance from you: {stationDistance[1]}</Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Changing at:
          {`${changingAt.length ? `${changingAt.toString()}` : 'No changes'}`}
        </Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Scheduled arrival time:
          {journey.details[3].destination.aimed_arrival_time}
        </Text>
        <Text style={styles.text}>
          Expected arrival time:
          {journey.details[3].destination.expected_arrival_time}
        </Text>
      </View>

      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Train status:
          {
            journey.details[0].journeyRoute[0].departures.calculatedJourneys[0]
              .callingAt[0].status
          }
        </Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Arriving into destination on platform:
          {journey.details[3].destination.platform}
        </Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Station code:
          {journey.details[3].destination.station_code}
        </Text>
      </View>
      <View style={styles.boxOne}>
        <Text style={styles.text}>
          Station code:
          {journey.details[3].destination.station_code}
        </Text>
      </View>

      <View style={styles.boxOne}>
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 600,
  },
  boxOne: {
    borderColor: 'red',
    borderWidth: 2,
    height: 100,
    width: 100,
  },
});
