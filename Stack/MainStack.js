import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screens/Home';
import TripsScreen from '../Screens/Trips';
import LocationComponent from '../Screens/Location';
import UserScreen from '../Screens/User';
import SettingsScreen from '../Screens/Settings';

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
            iconName = 'commute';
          } else if (route.name === 'Location') {
            iconName = 'place';
          } else if (route.name === 'User') {
            iconName = 'account-circle';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
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
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Location" component={LocationComponent} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
export default MainStack;
