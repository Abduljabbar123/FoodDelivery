import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';
import Button from '../components/Button';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ENV} from '../config/env';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {
  ADD_PRODUCT_TO_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES,
  GET_ALL_FAVORITES,
} from '../Redux/Reducers/Favorites/action';
import {ADD_TO_CART} from '../Redux/Reducers/FoodListing/action';
import AutoSlider from '../components/AutoSlider';

interface RouteParams {
  itemId: string;
  productDetail: {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  };
}

const FoodDetailsAddItem = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {dark} = useTheme();
  const {favorites} = useAppSelector(state => state.favorites);
  const {itemId, productDetail} = route.params as RouteParams;

  // Extract food details from productDetail
  const foodId = itemId || productDetail?._id || '';
  const foodName = productDetail?.name || '';
  const foodImage = productDetail?.image || '';
  const foodPrice = productDetail?.price || 0;
  const foodDescription = productDetail?.description || '';

  // Slider images - same as FoodDetails.tsx
  const sliderImages: any = [foodImage, foodImage, foodImage, foodImage];

  const [quantity, setQuantity] = useState(1);

  const isFavorite = favorites.some(fav => fav.food._id === foodId);

  const handleFavoritePress = () => {
    if (isFavorite) {
      REMOVE_PRODUCT_FROM_FAVORITES(foodId, () => {});
    } else {
      ADD_PRODUCT_TO_FAVORITES(foodId, () => {});
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartData = {
      foodId: foodId,
      quantity: quantity,
      // Add size and crust if needed
    };

    ADD_TO_CART(cartData, response => {
      if (response.success) {
        Alert.alert('Success', 'Item added to cart successfully!', [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate('home'),
          },
          {
            text: 'View Cart',
            onPress: () => navigation.navigate('checkoutorders'),
          },
        ]);
      } else {
        Alert.alert('Error', response.message || 'Failed to add item to cart');
      }
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={[
            styles.backIcon,
            {tintColor: dark ? COLORS.white : COLORS.greyscale900},
          ]}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTitle,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        Food Details
      </Text>
      <TouchableOpacity onPress={handleFavoritePress}>
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
  );

  const renderFoodInfo = () => (
    <View style={styles.foodInfoContainer}>
      <Text
        style={[
          styles.foodName,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        {foodName}
      </Text>
      <Text
        style={[
          styles.foodDescription,
          {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
        ]}>
        {foodDescription}
      </Text>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={16} color="rgb(250, 159, 28)" />
        <Text
          style={[
            styles.ratingText,
            {color: dark ? COLORS.greyscale300 : COLORS.grayscale700},
          ]}>
          4.5 (120 reviews)
        </Text>
      </View>
    </View>
  );

  const renderSizeOptions = () => (
    <View style={styles.optionsContainer}>
      <Text
        style={[
          styles.optionsTitle,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        Size
      </Text>
      <View style={styles.optionsRow}>
        {['Small', 'Medium', 'Large'].map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.optionButton,
              selectedSize === size && styles.selectedOption,
            ]}
            onPress={() => setSelectedSize(size)}>
            <Text
              style={[
                styles.optionText,
                selectedSize === size && styles.selectedOptionText,
              ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCrustOptions = () => (
    <View style={styles.optionsContainer}>
      <Text
        style={[
          styles.optionsTitle,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        Crust
      </Text>
      <View style={styles.optionsRow}>
        {['Thin Crust', 'Thick Crust', 'Stuffed Crust'].map(crust => (
          <TouchableOpacity
            key={crust}
            style={[
              styles.optionButton,
              selectedCrust === crust && styles.selectedOption,
            ]}
            onPress={() => setSelectedCrust(crust)}>
            <Text
              style={[
                styles.optionText,
                selectedCrust === crust && styles.selectedOptionText,
              ]}>
              {crust}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantityContainer}>
      <Text
        style={[
          styles.quantityTitle,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        Quantity
      </Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(false)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.quantityText,
            {color: dark ? COLORS.white : COLORS.greyscale900},
          ]}>
          {quantity}
        </Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(true)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPriceSection = () => (
    <View style={styles.priceSection}>
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.priceLabel,
            {color: dark ? COLORS.white : COLORS.greyscale900},
          ]}>
          Total Price:
        </Text>
        <Text style={styles.priceValue}>
          ${(foodPrice * quantity).toFixed(2)}
        </Text>
      </View>
      <Button
        title="Add to Cart"
        filled
        onPress={handleAddToCart}
        style={styles.addToCartButton}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
      ]}>
      <AutoSlider images={sliderImages} />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFoodInfo()}
        {/* {renderSizeOptions()}
        {renderCrustOptions()} */}
        {renderQuantitySelector()}
      </ScrollView>
      {renderPriceSection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    position: 'absolute',
    top: 32,
    zIndex: 999,
    left: 16,
    right: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
  },
  imageContainer: {
    width: SIZES.width - 32,
    height: SIZES.height / 3,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  foodInfoContainer: {
    marginBottom: 16,
  },
  foodName: {
    fontSize: 28,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  foodDescription: {
    fontSize: 14,
    color: COLORS.grayscale700,
    fontFamily: 'Urbanist Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.grayscale700,
    fontFamily: 'Urbanist Regular',
    marginLeft: 8,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionsTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.grayscale200,
    marginRight: 12,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.grayscale700,
    fontFamily: 'Urbanist Regular',
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayscale200,
    borderRadius: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 24,
    color: COLORS.primary,
    fontFamily: 'Urbanist Medium',
  },
  quantityText: {
    fontSize: 20,
    color: COLORS.greyscale900,
    fontFamily: 'Urbanist SemiBold',
    marginHorizontal: 22,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 16,
    color: COLORS.grayscale700,
    fontFamily: 'Urbanist Regular',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    color: COLORS.primary,
    fontFamily: 'Urbanist Bold',
  },
  addToCartButton: {
    width: '60%',
  },
});

export default FoodDetailsAddItem;
