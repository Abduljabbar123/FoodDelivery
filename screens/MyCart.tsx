import {View, StyleSheet, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import {useTheme} from '../theme/ThemeProvider';
import {GET_ALL_PRODUCT_CART} from '../Redux/Reducers/FoodListing/action';
import Loader from '../components/Loader';
import {ENV} from '../config/env';

const MyCart = () => {
  const {dark, colors} = useTheme();
  const [loader, setLoader] = useState<boolean>(false);
  const [cartList, setCartList] = useState([]);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    getAllCartProducts();
  }, []);

  const getAllCartProducts = () => {
    try {
      setLoader(true);
      GET_ALL_PRODUCT_CART((res: any) => {
        console.log('CART PRODUCTS === ', JSON.stringify(res, null, 2));
        if (res?.cart) {
          setCartItem(res?.cart);
          setCartList(res?.cart?.items || []);
        }
        setLoader(false);
      });
    } catch (error) {
      console.log('Error fetching cart:', error);
    } finally {
      setLoader(false);
    }
  };

  const renderCartItem = ({item}: {item: any}) => {
    return (
      <CartItem
        image1={
          item?.food?.image
            ? {uri: ENV.resourceURL + item.food.image}
            : require('../assets/images/products/dry_food1.jpg')
        }
        image2={
          item?.food?.image
            ? {uri: ENV.resourceURL + item.food.image}
            : require('../assets/images/products/dry_food1.jpg')
        }
        image3={
          item?.food?.image
            ? {uri: ENV.resourceURL + item.food.image}
            : require('../assets/images/products/dry_food1.jpg')
        }
        name={item?.food?.name || 'Unknown Product'}
        numItems={item?.quantity || 1}
        distance={item?.food?.distance || 'N/A'}
        price={`$${item?.food?.price || 0}`}
        onPress={() => console.log('Cart item pressed:', item)}
      />
    );
  };

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={[
            styles.emptyText,
            {color: dark ? COLORS.white : COLORS.greyscale900},
          ]}>
          Your cart is empty
        </Text>
        <Text
          style={[
            styles.emptySubText,
            {color: dark ? COLORS.grayscale200 : COLORS.grayscale700},
          ]}>
          Add some items to your cart to see them here
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={{paddingBottom: 12}}>
          <Header title="My Cart" />
        </View>
        {loader ? (
          <Loader size={50} mainStyles={{marginTop: 50}} />
        ) : (
          <ScrollView
            contentContainerStyle={{
              marginVertical: 22,
              backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            }}
            showsVerticalScrollIndicator={false}>
            {cartList.length > 0 ? (
              <FlatList
                data={cartList}
                keyExtractor={(item, index) => item?._id || index.toString()}
                renderItem={renderCartItem}
              />
            ) : (
              renderEmptyCart()
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Urbanist Regular',
    textAlign: 'center',
  },
});

export default MyCart;
