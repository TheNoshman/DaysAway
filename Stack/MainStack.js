import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            iconName = 'home';
          } else if (route.name === 'Trips') {
            iconName = 'train';
          } else if (route.name === 'Location') {
            iconName = 'my-location';
          }
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(252,160,0,1)',
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
