import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, icons} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {ENV} from '../config/env';

// Define prop types
interface OrderSummaryCardProps {
  name: string;
  image: any; // Type for image source, generally could be a number for static images or an object for network images
  price: string;
  onPress: () => void;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  name,
  image,
  price,
  onPress,
}) => {
  const {dark} = useTheme();
  // State variable to hold the quantity value
  const [quantity, setQuantity] = useState<string>('1x');

  return (
    <View style={styles.container}>
      <View style={styles.viewLeftContainer}>
        <Image
          source={{uri: ENV.resourceURL + image}}
          resizeMode="contain"
          style={styles.image}
        />
        <View>
          <Text
            style={[
              styles.name,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            {name}
          </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      <View style={styles.viewRightContainer}>
        <TextInput
          placeholder="1x"
          placeholderTextColor={COLORS.primary}
          style={styles.input}
          value={quantity} // Bind TextInput value to state variable
          onChangeText={text => setQuantity(text)} // Handle text input changes
        />
        <TouchableOpacity onPress={onPress}>
          <Image
            source={icons.editPencil}
            resizeMode="contain"
            style={styles.editPencilIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.primary,
  },
  viewRightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
  },
  input: {
    height: 32,
    width: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
    color: COLORS.primary,
  },
  editPencilIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
  },
});

export default OrderSummaryCard;
