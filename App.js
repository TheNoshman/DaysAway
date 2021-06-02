import React from 'react';
import { StyleSheet } from 'react-native';

// React navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import WelcomeLocationModal from './Screens/WelcomeLocationModal';
import HomeComponent from './Screens/Home';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

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
    <MainStack.Navigator>
      {/* Home screen */}
      <MainStack.Screen name="Home" component={HomeComponent} />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
