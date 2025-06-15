import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants';
import {FontFamily} from '../constants/theme';

interface LoaderProps {
  size?: number;
  color?: string;
  text?: string;
  mainStyles?: {};
}
const Loader = (props: LoaderProps) => {
  return (
    <View style={{...styles.container, ...props?.mainStyles}}>
      <ActivityIndicator size={props?.size} color={COLORS.primary} />
      {props?.text && (
        <Text style={[styles.text, {color: props.color}]}>{props?.text}</Text>
      )}
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
