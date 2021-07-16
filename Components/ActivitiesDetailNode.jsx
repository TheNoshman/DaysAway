import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ActivitiesDetailNode({ activity }) {
  const tags = activity.item.properties.kinds.split(',').map((element) => {
    return element.replace(/_/g, ' ');
  });
  const dist = activity.item.properties.dist.toFixed(0);

  return (
    <LinearGradient
      colors={['rgb(230,230,230)', 'rgba(255,255,255,1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View style={styles.topBox}>
        <Text style={styles.name}>{activity.item.properties.name}</Text>
        <TouchableOpacity style={styles.icon}>
          <Icon name="near-me" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.textLine}>
          <Icon name="star-border" size={15} color="black" />
          <Text> User rating: {activity.item.properties.rate}</Text>
        </View>
        <View style={styles.textLine}>
          <Icon name="directions-walk" size={15} color="black" />
          <Text> Distance from station: {dist}m</Text>
        </View>
      </View>
      <View style={styles.tagBox}>
        <Text style={styles.tag}>#{tags[0]}</Text>
        <Text style={styles.tag}>#{tags[1]}</Text>
        <Text style={styles.tag}>#{tags[2]}</Text>
        <Text style={styles.tag}>#{tags[3]}</Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 170,
    // borderColor: 'red',
    // borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    justifyContent: 'space-between',
  },
  topBox: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 75,
    width: 320,
    justifyContent: 'space-around',
    flex: 1,
  },
  name: {
    fontSize: 20,
    paddingLeft: 10,
  },
  icon: {
    position: 'absolute',
    left: 255,
    top: 5,
    backgroundColor: 'rgba(252,213,140,1)',
    padding: 13,
    borderRadius: 50,
    elevation: 3,
  },
  textLine: {
    // borderColor: 'red',
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagBox: {
    justifyContent: 'flex-start',
    // borderColor: 'red',
    // borderWidth: 2,
    width: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    // borderColor: 'red',
    // borderWidth: 2,
    backgroundColor: '#88c5f7',
    color: 'white',
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    elevation: 2,
  },
});
