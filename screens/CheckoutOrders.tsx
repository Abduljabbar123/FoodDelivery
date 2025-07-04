import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';
import {COLORS, SIZES, icons, images} from '../constants';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import Button from '../components/Button';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import OrderSummaryCard from '../components/OrderSummaryCard';
import {GET_ALL_PRODUCT_CART} from '../Redux/Reducers/FoodListing/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/ConfigureStore';
import {getDefaultAddress} from '../Redux/Reducers/Address/actions';

const CheckoutOrders = (props: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {colors, dark} = useTheme();
  const productId = props?.route?.params?.productId;
  const productDetail = props?.route?.params?.productDetail;
  const quantity = props?.route?.params?.quantity;
  const [loader, setLoader] = useState<boolean>(false);
  const [cartList, setCartList] = useState([]);
  const [cartItem, setCartItem] = useState({});

  // Get default address from Redux store
  const {defaultAddress} = useSelector((state: RootState) => state.address);

  console.log('products', productDetail);
  console.log('product ID', productId);
  console.log('qunatity', quantity);

  useEffect(() => {
    getAllCartProducts();
    // Fetch default address
    getDefaultAddress(response => {
      if (!response.success) {
        console.log('Failed to load default address:', response.message);
      }
    });
  }, []);

  // Refresh default address when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getDefaultAddress(response => {
        if (!response.success) {
          console.log('Failed to refresh default address:', response.message);
        }
      });
    }, []),
  );

  const getAllCartProducts = () => {
    try {
      setLoader(true);
      GET_ALL_PRODUCT_CART((res: FModelListing) => {
        console.log('CART PRODUCTS === ', JSON.stringify(res, null, 2));
        if (res?.cart) {
          setCartItem(res?.cart);
          setCartList(res?.cart?.items);
        }
        setLoader(false);
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Checkout Orders" />
        <FlatList
          data={[1]}
          keyExtractor={(item, index) => index.toString()}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            marginTop: 12,
          }}
          renderItem={({item}) => (
            <View>
              <View
                style={[
                  styles.summaryContainer,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.summaryTitle,
                    {
                      color: dark ? COLORS.white : COLORS.greyscale900,
                    },
                  ]}>
                  Deliver To
                </Text>
                <View
                  style={[
                    styles.separateLine,
                    {
                      backgroundColor: dark
                        ? COLORS.grayscale700
                        : COLORS.grayscale200,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('checkoutordersaddress')}
                  style={styles.addressContainer}>
                  <View style={styles.addressLeftContainer}>
                    <View style={styles.view1}>
                      <View style={styles.view2}>
                        <Image
                          source={icons.location2}
                          resizeMode="contain"
                          style={styles.locationIcon}
                        />
                      </View>
                    </View>
                    <View style={styles.viewAddress}>
                      <View style={styles.viewView}>
                        <Text
                          style={[
                            styles.homeTitle,
                            {
                              color: dark ? COLORS.white : COLORS.greyscale900,
                            },
                          ]}>
                          {defaultAddress?.label ||
                            defaultAddress?.addressType ||
                            'Home'}
                        </Text>
                        {defaultAddress?.isDefault && (
                          <View style={styles.defaultView}>
                            <Text style={styles.defaultTitle}>Default</Text>
                          </View>
                        )}
                      </View>
                      <Text
                        style={[
                          styles.addressTitle,
                          {
                            color: dark
                              ? COLORS.grayscale200
                              : COLORS.grayscale700,
                          },
                        ]}>
                        {defaultAddress
                          ? `${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postCode}`
                          : 'No default address set'}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={icons.arrowRight}
                    resizeMode="contain"
                    style={[
                      styles.arrowRightIcon,
                      {
                        tintColor: dark ? COLORS.white : COLORS.greyscale900,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.summaryContainer,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}>
                <View style={styles.orderSummaryView}>
                  <Text
                    style={[
                      styles.summaryTitle,
                      {
                        color: dark ? COLORS.white : COLORS.greyscale900,
                      },
                    ]}>
                    Order Summary
                  </Text>
                  <TouchableOpacity style={styles.addItemView}>
                    <Text style={styles.addItemText}>Add Items</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.separateLine,
                    {
                      backgroundColor: dark
                        ? COLORS.grayscale700
                        : COLORS.grayscale200,
                    },
                  ]}
                />

                <FlatList
                  data={cartList}
                  keyExtractor={(item, index) => index.toString()}
                  nestedScrollEnabled
                  renderItem={({item}) => (
                    <>
                      <OrderSummaryCard
                        name={item?.food?.name}
                        image={item?.food?.image}
                        price={item?.food?.price + '$'}
                        onPress={() => console.log('Clicked')}
                      />
                      <View
                        style={[
                          styles.separateLine,
                          {
                            backgroundColor: dark
                              ? COLORS.grayscale700
                              : COLORS.grayscale200,
                          },
                        ]}
                      />
                      {/* <OrderSummaryCard
                        name="Chicken Dry Food"
                        image={images.dryFood1}
                        price="$8.00"
                        onPress={() => console.log('Clicked')}
                      />
                      <View
                        style={[
                          styles.separateLine,
                          {
                            backgroundColor: dark
                              ? COLORS.grayscale700
                              : COLORS.grayscale200,
                          },
                        ]}
                      />
                      <OrderSummaryCard
                        name="Chicken Treats"
                        image={images.treats1}
                        price="$4.00"
                        onPress={() => console.log('Clicked')}
                      /> */}
                    </>
                  )}
                />
              </View>
              <View
                style={[
                  styles.summaryContainer,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('paymentmethods')}
                  style={styles.viewItemTypeContainer}>
                  <View style={styles.viewLeftItemTypeContainer}>
                    <Image
                      source={icons.wallet2}
                      resizeMode="contain"
                      style={styles.walletIcon}
                    />
                    <Text
                      style={[
                        styles.viewItemTypeTitle,
                        {
                          color: dark
                            ? COLORS.grayscale200
                            : COLORS.grayscale700,
                        },
                      ]}>
                      Payment Methods
                    </Text>
                  </View>
                  <Image
                    source={icons.arrowRight}
                    resizeMode="contain"
                    style={styles.arrowRightIcon}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    styles.separateLine,
                    {
                      backgroundColor: dark
                        ? COLORS.grayscale700
                        : COLORS.grayscale200,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('addpromo')}
                  style={styles.viewItemTypeContainer}>
                  <View style={styles.viewLeftItemTypeContainer}>
                    <Image
                      source={icons.discount}
                      resizeMode="contain"
                      style={styles.walletIcon}
                    />
                    <Text
                      style={[
                        styles.viewItemTypeTitle,
                        {
                          color: dark
                            ? COLORS.grayscale200
                            : COLORS.grayscale700,
                        },
                      ]}>
                      Get Discounts
                    </Text>
                  </View>
                  <Image
                    source={icons.arrowRight}
                    resizeMode="contain"
                    style={styles.arrowRightIcon}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.summaryContainer,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                  },
                ]}>
                <View style={styles.view}>
                  <Text
                    style={[
                      styles.viewLeft,
                      {
                        color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                      },
                    ]}>
                    Subtitle
                  </Text>
                  <Text
                    style={[
                      styles.viewRight,
                      {color: dark ? COLORS.white : COLORS.greyscale900},
                    ]}>
                    $24.00
                  </Text>
                </View>
                <View style={styles.view}>
                  <Text
                    style={[
                      styles.viewLeft,
                      {
                        color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                      },
                    ]}>
                    Delivery Fee
                  </Text>
                  <Text
                    style={[
                      styles.viewRight,
                      {color: dark ? COLORS.white : COLORS.greyscale900},
                    ]}>
                    $2.00
                  </Text>
                </View>
                <View
                  style={[
                    styles.separateLine,
                    {
                      backgroundColor: dark
                        ? COLORS.greyScale800
                        : COLORS.grayscale200,
                    },
                  ]}
                />
                <View style={styles.view}>
                  <Text
                    style={[
                      styles.viewLeft,
                      {
                        color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                      },
                    ]}>
                    Total
                  </Text>
                  <Text
                    style={[
                      styles.viewRight,
                      {color: dark ? COLORS.white : COLORS.greyscale900},
                    ]}>
                    $26.00
                  </Text>
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

        <Button
          title="Place Order - $26.00"
          filled
          onPress={() => navigation.navigate('checkoutorderscompleted')}
          style={styles.placeOrderButton}
        />
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryContainer: {
    width: SIZES.width - 32,
    borderRadius: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 0,
    marginBottom: 12,
    marginTop: 12,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  viewLeft: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.grayscale700,
  },
  viewRight: {
    fontSize: 14,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
  },
  separateLine: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginVertical: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view1: {
    height: 52,
    width: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.tansparentPrimary,
  },
  view2: {
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  locationIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  viewView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  defaultView: {
    width: 64,
    height: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.tansparentPrimary,
    marginHorizontal: 12,
  },
  defaultTitle: {
    fontSize: 12,
    fontFamily: 'Urbanist Medium',
    color: COLORS.primary,
  },
  addressTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.grayscale700,
    marginVertical: 4,
    width: '80%',
  },
  viewAddress: {
    marginHorizontal: 0,
  },
  arrowRightIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.greyscale900,
  },
  orderSummaryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addItemView: {
    width: 78,
    height: 26,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1.4,
  },
  addItemText: {
    fontSize: 12,
    fontFamily: 'Urbanist Medium',
    color: COLORS.primary,
  },
  viewItemTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewLeftItemTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
    marginRight: 16,
  },
  viewItemTypeTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.grayscale700,
    marginRight: 16,
  },
  placeOrderButton: {
    marginBottom: 12,
    marginTop: 6,
  },
});

export default CheckoutOrders;
