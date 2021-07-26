import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string } from 'prop-types';

// OVERLAY COMPONENT, STAMPS THE CARD WHEN SWIPING LEFT/ RIGHT
const OverlayLabel = ({ label, color }) => (
  <View style={[styles.overlayLabel, { borderColor: color }]}>
    <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
  </View>
);

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
};
const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  overlayLabelText: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default OverlayLabel;
