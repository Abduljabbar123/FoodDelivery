import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES, icons, images, socials} from '../constants';
import {useTheme} from '../theme/ThemeProvider';
import {ScrollView} from 'react-native-virtualized-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AutoSlider from '../components/AutoSlider';
import SocialIcon from '../components/SocialIcon';
import {
  GET_FOOD_BY_CATOGERY_ID,
  GET_FOOD_BY_ID,
} from '../Redux/Reducers/FoodListing/action';

const FoodDetails = (props: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {dark} = useTheme();
  const refRBSheet = useRef<any>(null);
  const productId = props?.route?.params?.itemId;
  const [productDetail, setProductDetail] = useState({});
  const [loader, setLoader] = useState({
    products: false,
  });

  // Slider images
  const sliderImages = [
    productDetail?.image,
    productDetail?.image,
    productDetail?.image,
    productDetail?.image,
  ];

  useEffect(() => {
    getProductByCatogeryID(productId);
    console.log('productId', productId);
  }, [productId]);

  const getProductByCatogeryID = (id: string) => {
    console.log('ID ID ID ', id);
    try {
      setLoader({...loader, products: true});
      GET_FOOD_BY_ID(id, async res => {
        console.log('Detail Getting ===>', JSON.stringify(res?.foods, null, 2));
        if (res) {
          setProductDetail(res?.food);
        }
      });
    } catch (error) {
    } finally {
      setLoader({...loader, products: false});
    }

    return () => {
      setLoader({...loader, products: false});
    };
  };
  // render header
  const renderHeader = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <Image
              source={isFavorite ? icons.heart2 : icons.heart2Outline}
              resizeMode="contain"
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendIconContainer}
            onPress={() => refRBSheet.current.open()}>
            <Image
              source={icons.send2}
              resizeMode="contain"
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  /**
   * render content
   */
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('fooddetailsabout')}
          style={styles.headerTitleContainer}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            {productDetail ? productDetail?.name : 'Chicken Dry Food'}
          </Text>
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
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('foodreviews')}
          style={styles.reviewContainer}>
          <View style={styles.reviewLeftContainer}>
            <Fontisto name="star" size={20} color="orange" />
            <Text
              style={[
                styles.avgRating,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              {productDetail ? productDetail?.ratings : 4.8}
            </Text>
            <Text
              style={[
                styles.numReview,
                {
                  color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                },
              ]}>
              ({productDetail ? productDetail?.reviews : 4.8} reviews)
            </Text>
          </View>
          <Image
            source={icons.arrowRight}
            resizeMode="contain"
            style={[
              styles.arrowRightIcon,
              {
                tintColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('fooddetailsoffers')}
          style={styles.locationContainer}>
          <View style={styles.locationLeftContainer}>
            <MaterialIcons
              name="location-on"
              size={20}
              color={COLORS.primary}
            />
            <Text
              style={[
                styles.locationDistance,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              {productDetail ? productDetail?.distance : 3.4} km
            </Text>
          </View>
          <Image
            source={icons.arrowRight}
            resizeMode="contain"
            style={[
              styles.arrowRightIcon,
              {
                tintColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('fooddetailsoffers')}
          style={styles.deliverContainer}>
          <Text
            style={[
              styles.deliverText,
              {
                marginLeft: 26,
                color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
              },
            ]}>
            Deliver Now |{' '}
          </Text>
          <Image
            source={icons.moto}
            resizeMode="contain"
            style={styles.motoIcon}
          />
          <Text
            style={[
              styles.deliverText,
              {
                color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
              },
            ]}>
            $ {productDetail ? productDetail?.price : 3.4}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('fooddetailsoffers')}
          style={styles.offerContainer}>
          <View style={styles.offerLeftContainer}>
            <Image
              source={icons.discount}
              resizeMode="contain"
              style={styles.discountIcon}
            />
            <Text
              style={[
                styles.discountText,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Offers are available
            </Text>
          </View>
          <Image
            source={icons.arrowRight}
            resizeMode="contain"
            style={[
              styles.arrowRightIcon,
              {
                tintColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.area,
        {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
      ]}>
      <StatusBar hidden />
      <AutoSlider images={sliderImages} />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
      <View
        style={[
          styles.bookBottomContainer,
          {
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            borderTopColor: dark ? COLORS.dark1 : COLORS.white,
          },
        ]}>
        <Button
          title="Order Now"
          filled
          style={styles.bookingBtn}
          onPress={() => {
            navigation.navigate('fooddetailsadditem', {
              itemId: productId,
              productDetail: productDetail,
            });
          }}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={360}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.dark3 : COLORS.grayscale200,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 360,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: 'center',
          },
        }}>
        <Text
          style={[
            styles.bottomTitle,
            {
              color: dark ? COLORS.white : COLORS.greyscale900,
            },
          ]}>
          Share
        </Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
              marginVertical: 12,
            },
          ]}
        />
        <View style={styles.socialContainer}>
          <SocialIcon
            icon={socials.whatsapp}
            name="WhatsApp"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.twitter}
            name="X"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.facebook}
            name="Facebook"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.instagram}
            name="Instagram"
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View style={styles.socialContainer}>
          <SocialIcon
            icon={socials.yahoo}
            name="Yahoo"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.titktok}
            name="Tiktok"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.messenger}
            name="Chat"
            onPress={() => refRBSheet.current.close()}
          />
          <SocialIcon
            icon={socials.wechat}
            name="Wechat"
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 32,
    zIndex: 999,
    left: 16,
    right: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  sendIconContainer: {
    marginLeft: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  arrowRightIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
    marginVertical: 12,
  },
  separateLine: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.grayscale200,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 2,
  },
  reviewLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avgRating: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginHorizontal: 8,
  },
  numReview: {
    fontSize: 16,
    fontFamily: 'Urbanist Medium',
    color: COLORS.grayscale700,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  locationLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDistance: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginHorizontal: 8,
  },
  deliverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliverText: {
    fontSize: 16,
    fontFamily: 'Urbanist Medium',
    color: COLORS.grayscale700,
    marginHorizontal: 8,
  },
  motoIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 2,
  },
  offerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
  },
  discountText: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginVertical: 12,
  },
  bookBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 104,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
  },
  bookingBtn: {
    width: SIZES.width - 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    width: SIZES.width - 32,
  },
});

export default FoodDetails;
