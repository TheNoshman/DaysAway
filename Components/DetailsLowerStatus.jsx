import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { useState } from 'react';

// DETAILS COMPONENT CONTAINING JOURNEY INFO
export default function DetailsLowerStatus({ journey }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  }, [time, setTime]);

  const reduxStationList = useSelector((state) => state.reduxTrainStationList);
  const reduxSelectedStation = useSelector(
    (state) => state.reduxSelectedTrainStation,
  );
  const station = reduxStationList.filter((el) => {
    return el.value.code === reduxSelectedStation.code;
  });
  const stationDistance = station[0].label.split(',');
  const dist = stationDistance[1].split(' ');

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
      {/* #################### FIRST BLOCK ###################### */}
      <View style={{ ...styles.topInnerContainer, paddingLeft: 4 }}>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
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
            colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.boxTwo}
          >
            <View style={styles.boxThreeSmallText}>
              <Icon name="hourglass-empty" size={25} color="#f7888d" />
              <Text>Duration:</Text>
            </View>
            <Text style={styles.boxFourLargeText}>
              {` ${hour ? `${hour}:${min}` : `${min}`}`}
            </Text>
            <Text>{` ${hour ? '' : 'minutes'}`}</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.boxThree}
          >
            <View style={styles.boxThreeSmallText}>
              <Icon name="schedule" size={25} color="#fc943f" />
              <Text>Time now:</Text>
            </View>
            <Text style={styles.boxFourLargeText}>
              {' '}
              {time.toLocaleTimeString()}
            </Text>
          </LinearGradient>
        </View>
      </View>

      {/* #################### SECOND BLOCK ###################### */}
      <View style={{ ...styles.topInnerContainer, paddingRight: 4 }}>
        <View style={styles.topInnerContainerRight}>
          <LinearGradient
            colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.boxTwo}
          >
            <Text style={styles.boxOneSmallText}>Number of changes:</Text>
            <View style={styles.changesBox}>
              <Icon name="alt-route" size={35} color="#f7888d" />
              <Text style={styles.boxTwoLargeText}>{changingAt.length}</Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.statusBox}
          >
            <Text style={styles.boxOneSmallText}>Train status:</Text>

            <Text style={styles.boxThreeLargeText}>
              {
                journey.details[0].journeyRoute[0].departures
                  .calculatedJourneys[0].callingAt[0].status
              }
            </Text>
          </LinearGradient>
        </View>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.boxFour}
        >
          <View style={styles.callingAtTitleBox}>
            <Text style={styles.boxFourLargeText}>Calling at:</Text>
            <Icon name="multiple-stop" size={35} color="#fc943f" />
          </View>
          <FlatList
            data={callingAt}
            keyExtractor={(item) => item.station_code}
            renderItem={({ item, index }) => (
              <Text
                style={styles.listText}
              >{`\u2022 ${item.station_name}`}</Text>
            )}
          />
        </LinearGradient>
      </View>

      {/* #################### THRID BLOCK ###################### */}
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.bottomBoxes}
        >
          <View style={styles.callingAtTitleBox}>
            <Text style={styles.boxFiveTitle}>Changing at:</Text>
            <Icon name="published-with-changes" size={25} color="#f7888d" />
          </View>
          <Text style={styles.boxFourLargeText}>
            {`${changingAt.length ? `${changingAt.toString()}` : 'No changes'}`}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.bottomBoxes}
        >
          <Text style={styles.boxTwoSmallText}>Scheduled arrival time: </Text>

          <Text style={styles.boxSevenLargeText}>
            <Icon name="departure-board" size={25} color="#f7888d" />{' '}
            {journey.details[3].destination.aimed_arrival_time}
          </Text>
          <Text style={styles.boxTwoSmallText}>Expected arrival time:</Text>
          <Text style={styles.boxSevenLargeText}>
            <Icon name="pending-actions" size={25} color="#fc943f" />{' '}
            {journey.details[3].destination.expected_arrival_time}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ ...styles.bottomBoxes, ...styles.bottomRight }}
        >
          <View style={styles.bottom}>
            <Icon name="format-list-numbered" size={35} color="#f7888d" />

            <Text style={styles.boxFiveTitle}>Departing platform:</Text>
            <Text style={styles.boxTwoLargeText}>
              {journey.details[3].destination.platform}
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(220,220,220, 1)', 'rgba(255,255,255,1)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ ...styles.bottomBoxes, ...styles.bottomRight }}
        >
          <Text style={styles.boxFiveTitle}>Station distance:</Text>
          <View style={styles.changesBoxThree}>
            <Icon name="directions-walk" size={35} color="#fc943f" />
            <Text style={styles.boxTwoLargeText}>{dist[1]}</Text>
          </View>
          <Text>
            {dist[2]} {dist[3]}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  topInnerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
  },
  topInnerContainerRight: {
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
    fontSize: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  boxTwoLargeText: {
    fontSize: 40,
  },
  boxThree: {
    height: 94,
    width: 110,
    margin: 5,
    borderRadius: 10,
    elevation: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statusBox: {
    height: 94,
    width: 110,
    margin: 5,
    borderRadius: 10,
    elevation: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boxThreeLargeText: {
    fontSize: 25,
    color: 'green',
  },
  boxThreeSmallText: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    // flexDirection: 'row',
  },
  boxFour: {
    height: 200,
    width: 200,
    margin: 5,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  callingAtTitleBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 16,
    margin: 2,
  },
  boxFourLargeText: {
    color: 'black',
    fontSize: 25,
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  boxFiveTitle: {
    color: 'black',
    fontSize: 16,
  },
  changesBox: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  changesBoxThree: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bottomBoxes: {
    height: 140,
    width: 155,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 10,
    fontSize: 16,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  bottomRight: {
    alignItems: 'center',
  },
  boxSevenLargeText: {
    color: 'black',
    fontSize: 35,
    justifyContent: 'space-around',
  },
  bottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
