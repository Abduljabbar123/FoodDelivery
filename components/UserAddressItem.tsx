import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES, icons} from '../constants';
import {useTheme} from '../theme/ThemeProvider';

interface UserAddressItemProps {
  name: string;
  address: string;
  isDefault?: boolean;
  onPress: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const UserAddressItem: React.FC<UserAddressItemProps> = ({
  name,
  address,
  isDefault = false,
  onPress,
  onDelete,
  onSetDefault,
}) => {
  const {dark} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: dark ? COLORS.greyscale900 : COLORS.grayscale100,
        },
      ]}>
      <TouchableOpacity onPress={onPress} style={styles.mainContent}>
        <View style={styles.routeLeftContainer}>
          <View style={styles.locationIcon1}>
            <View style={styles.locationIcon2}>
              <Image
                source={icons.location2 as ImageSourcePropType}
                resizeMode="contain"
                style={styles.locationIcon3}
              />
            </View>
          </View>
          <View style={styles.addressInfo}>
            <View style={styles.nameContainer}>
              <Text
                style={[
                  styles.routeName,
                  {
                    color: dark ? COLORS.white : COLORS.greyscale900,
                  },
                ]}>
                {name}
              </Text>
              {isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.routeAddress,
                {
                  color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                },
              ]}>
              {address}
            </Text>
          </View>
        </View>
        <Image
          source={icons.editPencil as ImageSourcePropType}
          resizeMode="contain"
          style={styles.editIcon}
        />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onSetDefault}
          style={[
            styles.actionButton,
            styles.setDefaultButton,
            isDefault && styles.disabledButton,
          ]}
          disabled={isDefault}
          activeOpacity={0.7}>
          <Image
            source={icons.star as ImageSourcePropType}
            resizeMode="contain"
            style={[
              styles.buttonIcon,
              {tintColor: isDefault ? COLORS.gray : COLORS.primary},
            ]}
          />
          <Text
            style={[
              styles.buttonText,
              {color: isDefault ? COLORS.gray : COLORS.primary},
            ]}>
            {isDefault ? 'Default' : 'Set Default'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          style={[styles.actionButton, styles.deleteButton]}
          activeOpacity={0.7}>
          <Image
            source={icons.trash as ImageSourcePropType}
            resizeMode="contain"
            style={[styles.buttonIcon, {tintColor: COLORS.red}]}
          />
          <Text style={[styles.buttonText, {color: COLORS.red}]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayscale100,
  },
  routeLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon1: {
    height: 52,
    width: 52,
    borderRadius: 999,
    marginRight: 12,
    backgroundColor: COLORS.tansparentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon2: {
    height: 36,
    width: 36,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon3: {
    height: 16,
    width: 16,
    tintColor: COLORS.white,
  },
  routeName: {
    fontSize: 18,
    color: COLORS.greyscale900,
    fontFamily: 'Urbanist Bold',
    marginBottom: 6,
  },
  routeAddress: {
    fontSize: 12,
    color: COLORS.grayscale700,
    fontFamily: 'Urbanist Regular',
  },
  editIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressInfo: {
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: 'Urbanist Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  setDefaultButton: {
    // marginRight: 8 - removed since we're using gap
  },
  disabledButton: {
    backgroundColor: COLORS.greyscale300,
  },
  buttonIcon: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
  },
  deleteButton: {
    backgroundColor: COLORS.greyscale300,
  },
});

export default UserAddressItem;
