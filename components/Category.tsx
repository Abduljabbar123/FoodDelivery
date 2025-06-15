import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {ENV} from '../config/env';

interface CategoryProps {
  _id?: string;
  name: string;
  icon: ImageSourcePropType;
  backgroundColor: string;
  onPress?: () => void | null;
}

const Category: React.FC<CategoryProps> = ({
  _id,
  name,
  icon,
  backgroundColor,
  onPress,
}) => {
  const {dark} = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.iconContainer, {backgroundColor}]}>
        <Image
          source={{uri: ENV.resourceURL + icon}}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.name,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
    width: (SIZES.width - 32) / 4,
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    height: 24,
    width: 24,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
  },
});

export default Category;
