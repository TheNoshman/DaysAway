import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/Home';
import TripsScreen from '../Screens/Trips';
import LocationComponent from '../Screens/Location';

const Tab = createBottomTabNavigator();

function MainStack({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Trips') {
            iconName = focused ? 'train' : 'train-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'pin' : 'pin-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ffb01f',
        inactiveTintColor: 'gray',
      }}
      initialRouteName={'Home'}
    >
      <Tab.Screen name="Location" component={LocationComponent} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
    </Tab.Navigator>
  );
}
export default MainStack;
