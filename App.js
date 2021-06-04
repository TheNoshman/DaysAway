import React from 'react';
import { StyleSheet } from 'react-native';

// React navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Modal screen
import WelcomeLocationModal from './Screens/WelcomeLocationModal';

// Main Stack w/ tab navigation
import MainStack from './Stack/MainStack';

// Navigation - Stack
const RootStack = createStackNavigator();

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
        {/* Main stack - home screen w/ tab nav*/}
        <RootStack.Screen
          name="Main"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
