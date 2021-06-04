import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

function MyTabBar({ navigation }) {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Trips');
      }}
    />
  );
}

export default MyTabBar;
