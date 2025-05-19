import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants';
import {FontFamily} from '../constants/theme';

const Loader = ({
  size = 'large',
  color = COLORS.primary,
  text = 'Loading...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {text && <Text style={[styles.text, {color}]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FontFamily.urbanistMediumItalic,
  },
});

export default Loader;
