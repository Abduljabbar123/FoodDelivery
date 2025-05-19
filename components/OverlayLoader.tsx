import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export const OverlayLoader = ({visible = false}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.overlayText}>Please wait...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderBox: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    marginTop: 10,
  },
});
