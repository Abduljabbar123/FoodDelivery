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

interface VerticalFoodCardProps {
  name: string;
  image: ImageSourcePropType;
  distance: string;
  price: string;
  fee: string;
  rating: number;
  numReviews: string;
  isFavorite?: boolean;
  foodId: string;
  onPress: () => void;
  onPressFavorite: () => void;
}

const VerticalFoodCard: React.FC<VerticalFoodCardProps> = ({
  name,
  image,
  distance,
  price,
  fee,
  rating,
  numReviews,
  isFavorite,
  foodId,
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
      <View style={styles.reviewContainer}>
        <Text style={styles.rating}>PROMO</Text>
      </View>
      <Text
        style={[
          styles.name,
          {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
        ]}>
        {name || ''}
      </Text>
      <View style={styles.viewContainer}>
        <Text
          style={[
            styles.location,
            {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
          ]}>
          {distance} |{' '}
        </Text>
        <FontAwesome name="star" size={14} color="rgb(250, 159, 28)" />
        <Text
          style={[
            styles.location,
            {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
          ]}>
          {' '}
          {rating ? rating : 0} ({numReviews ? numReviews : 0})
        </Text>
      </View>
      <View style={styles.bottomPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price ? price : 0.0}</Text>
          <Text style={styles.location}> | </Text>
          <Image
            source={icons.moto}
            resizeMode="contain"
            style={styles.motoIcon}
          />
          <Text style={styles.location}>{fee ? fee : 0}</Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: (SIZES.width - 32) / 2 - 12,
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 16,
    marginBottom: 12,
    marginRight: 8,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginVertical: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.grayscale700,
    marginVertical: 4,
  },
  bottomPriceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
    left: 16,
    width: 56,
    height: 20,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
    marginLeft: 4,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});

export default VerticalFoodCard;
