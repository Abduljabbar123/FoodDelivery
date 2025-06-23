import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ENV} from '../config/env';

interface HorizontalFoodCardProps {
  name: string;
  image: ImageSourcePropType;
  distance: string;
  price: string;
  fee: string;
  rating: number;
  numReviews: string;
  foodId: string;
  isFavorite?: boolean;
  isPromo?: boolean;
  onPress: () => void;
  onPressFavorite: () => void;
}

const HorizontalFoodCard: React.FC<HorizontalFoodCardProps> = ({
  name,
  image,
  distance,
  price,
  fee,
  rating,
  numReviews,
  foodId,
  isFavorite,
  isPromo = false,
  onPress,
  onPressFavorite,
}) => {
  const {dark} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: dark ? COLORS.dark2 : COLORS.white},
      ]}>
      <Image
        source={{uri: ENV.resourceURL + image}}
        resizeMode="cover"
        style={styles.image}
      />
      {isPromo && (
        <View style={styles.reviewContainer}>
          <Text style={styles.rating}>PROMO</Text>
        </View>
      )}
      <View style={styles.columnContainer}>
        <View style={styles.topViewContainer}>
          <Text
            style={[
              styles.name,
              {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
            ]}>
            {name}
          </Text>
        </View>
        <View style={styles.viewContainer}>
          <Text
            style={[
              styles.location,
              {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
            ]}>
            {distance ? distance : '1 km'} |{' '}
          </Text>
          <FontAwesome name="star" size={14} color="rgb(250, 159, 28)" />
          <Text
            style={[
              styles.location,
              {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
            ]}>
            {' '}
            {rating ? rating.toFixed(1) : '4.9'} (
            {numReviews ? numReviews : '1k'})
          </Text>
        </View>
        <View style={styles.bottomViewContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{price ? price : '$ 20.000'}</Text>
            <Text style={styles.location}> | </Text>
            <Image
              source={icons.moto}
              resizeMode="contain"
              style={styles.motoIcon}
            />
            <Text style={styles.location}>{fee ? fee : '$ 120'}</Text>
          </View>
          <TouchableOpacity onPress={onPressFavorite}>
            <Image
              source={isFavorite ? icons.heart2 : icons.heart2Outline}
              resizeMode="contain"
              style={[
                styles.heartIcon,
                {tintColor: isFavorite ? COLORS.red : COLORS.grayscale400},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 16,
    marginBottom: 12,
    height: 112,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  columnContainer: {
    flexDirection: 'column',
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginVertical: 4,
    marginRight: 40,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    marginVertical: 4,
  },
  bottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    marginRight: 8,
  },
  reviewContainer: {
    position: 'absolute',
    top: 16,
    left: 54,
    width: 46,
    height: 20,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    fontSize: 10,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
    marginLeft: 4,
  },
  topViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 164,
  },
  motoIcon: {
    height: 18,
    width: 18,
    tintColor: COLORS.primary,
    marginRight: 4,
  },
  heartIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
    marginLeft: 8,
  },
});

export default HorizontalFoodCard;
