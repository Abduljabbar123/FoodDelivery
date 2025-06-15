import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {SIZES, COLORS, icons} from '../constants';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeProvider';
import {Image} from 'react-native';

interface HeaderProps {
  title: string;
  onPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({title, onPress}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {colors, dark} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? COLORS.dark1 : COLORS.white,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          onPress ? onPress() : navigation.goBack();
        }}>
        <Image
          source={icons.back as ImageSourcePropType}
          resizeMode="contain"
          style={[
            styles.backIcon,
            {
              tintColor: colors.text,
            },
          ]}
        />
      </TouchableOpacity>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  } as ImageStyle,
  title: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
  } as TextStyle,
});

export default Header;
