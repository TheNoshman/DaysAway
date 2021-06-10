import React from 'react';
import { Text, View } from 'react-native';

export default function Destination({ dest }) {
  console.log('dest,', dest);

  return (
    <View>
      <Text>{dest.destination_name}</Text>
    </View>
  );
}

// const styles = StyleSheet.create({});
