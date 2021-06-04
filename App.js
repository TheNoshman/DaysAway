import React from 'react';
import { StyleSheet } from 'react-native';

// React navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import WelcomeLocationModal from './Screens/WelcomeLocationModal';
import HomeComponent from './Screens/Home';
import TripsComponent from './Screens/Trips';

// Tab bar
import BottomNavBar from './Components/Navbar';

// Navigation - Stack
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

// Navigation - Bottom tabs
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        {/* Modal welcome screen - enter location*/}
        <RootStack.Screen
          name="Welcome"
          component={WelcomeLocationModal}
          options={{ headerShown: false }}
        />
        {/* Main stack - home screen*/}
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// Main stack
const MainStackScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavBar {...props} />}>
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Trips" component={TripsComponent} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
    // <MainStack.Navigator>
    //   {/* Home screen */}
    //   <MainStack.Screen name="Home" component={HomeComponent} />
    // </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
