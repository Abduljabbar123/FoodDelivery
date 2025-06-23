import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeProvider';
import {
  banners,
  categories,
  discountProducts,
  recommendedProducts,
} from '../data';
import {COLORS, icons, images, SIZES} from '../constants';
import SubHeaderItem from '../components/SubHeaderItem';
import Category from '../components/Category';
import VerticalFoodCard from '../components/VerticalFoodCard';
import HorizontalFoodCard from '../components/HorizontalFoodCard';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {
  GET_ALL_FOOD,
  GET_DISCOUNTED_PRICE,
  GET_FOOD_BY_CATOGERY_ID,
  setLoading,
} from '../Redux/Reducers/FoodListing/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import {GET_ALL_CATOGERIES} from '../Redux/Reducers/Catogery/action';
import {FCatogerylListing} from '../Redux/Reducers/Catogery/actions';
import {
  ADD_PRODUCT_TO_FAVORITES,
  GET_ALL_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES,
} from '../Redux/Reducers/Favorites/action';
import Categories from './Categories';
import Loader from '../components/Loader';
import {products} from '../data/index';
import {ENV} from '../config/env';
import {showSnackbar} from '../components/Snackbar';

interface BannerItem {
  id: number;
  discount: string;
  discountName: string;
  bottomTitle: string;
  bottomSubtitle: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const loaderProps = {
  size: 50,
  mainStyles: {marginTop: 20},
};

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {dark, colors} = useTheme();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const keyExtractor = (item: BannerItem) => item.id.toString();
  const {user} = useAppSelector(state => state.auth);
  const [search, setSearch] = useState('');

  // Get data from Redux store
  const {
    categories: listCatogeries,
    recommendedProducts: recomendedProductList,
    discountedProducts: discountedPriceItems,
    productsByCategory: productByCatogeries,
    loading,
  } = useAppSelector(state => state.foodListing);

  const {favorites} = useAppSelector(state => state.favorites);
  const [selectedCategories, setSelectedCategories] = useState(['']);

  const handleEndReached = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  const renderDot = (index: number) => {
    return (
      <View
        style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        key={index}
      />
    );
  };

  const renderBannerItem = ({item}: ListRenderItemInfo<BannerItem>) => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTopContainer}>
        <View>
          <Text style={styles.bannerDicount}>{item.discount} OFF</Text>
          <Text style={styles.bannerDiscountName}>{item.discountName}</Text>
        </View>
        <Text style={styles.bannerDiscountNum}>{item.discount}</Text>
      </View>
      <View style={styles.bannerBottomContainer}>
        <Text style={styles.bannerBottomTitle}>{item.bottomTitle}</Text>
        <Text style={styles.bannerBottomSubtitle}>{item.bottomSubtitle}</Text>
      </View>
    </View>
  );

  useLayoutEffect(() => {
    getAllCategories();
    getAllDiscountedFoods();
    getAllFavorites();
  }, []);

  const getAllCategories = () => {
    try {
      setLoading({categories: true, products: true, discountedItems: false});
      GET_ALL_FOOD((res: FModelListing) => {
        console.log('res', JSON.stringify(res?.foods, null, 2));
        setLoading({
          categories: false,
          products: false,
          discountedItems: false,
        });
      });
    } catch (error) {
      setLoading({categories: false, products: false, discountedItems: false});
    }

    try {
      GET_ALL_CATOGERIES((res: FModelListing) => {
        if (res?.categories && res?.categories.length > 0) {
          setSelectedCategories([res?.categories[0]._id]);
          getProductByCatogeryID(res?.categories[0]._id);
        }
        setLoading({
          categories: false,
          products: false,
          discountedItems: false,
        });
      });
    } catch (error) {
      setLoading({categories: false, products: false, discountedItems: false});
    }
  };

  const getProductByCatogeryID = (id: string) => {
    try {
      setLoading({categories: false, products: true, discountedItems: false});
      GET_FOOD_BY_CATOGERY_ID(id, async res => {
        setLoading({
          categories: false,
          products: false,
          discountedItems: false,
        });
      });
    } catch (error) {
      setLoading({categories: false, products: false, discountedItems: false});
    }
  };

  const getAllDiscountedFoods = () => {
    try {
      setLoading({categories: false, products: false, discountedItems: true});

      GET_DISCOUNTED_PRICE((res: FModelListing) => {
        console.log('res', JSON.stringify(res?.foods, null, 2));
        setLoading({
          categories: false,
          products: false,
          discountedItems: false,
        });
      });
    } catch (error) {
      setLoading({categories: false, products: false, discountedItems: false});
    }
  };

  const getAllFavorites = () => {
    GET_ALL_FAVORITES(() => {});
  };

  const productAddToFavorites = (foodId: string) => {
    const isFavorite = favorites.some(fav => fav.food._id === foodId);
    if (isFavorite) {
      REMOVE_PRODUCT_FROM_FAVORITES(foodId, () => {});
    } else {
      ADD_PRODUCT_TO_FAVORITES(foodId, () => {});
    }
  };

  /**
   * render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.viewLeft}>
          <Image
            source={
              user?.photo ? {uri: ENV.resourceURL + user.photo} : images.user1
            }
            resizeMode="cover"
            style={styles.userIcon}
          />
          <View style={styles.viewNameContainer}>
            <Text style={styles.greeeting}>Good Morning👋</Text>
            <Text
              style={[
                styles.title,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              {user?.name}
            </Text>
            <Text
              style={[
                styles.favoritesCount,
                {color: dark ? COLORS.white : COLORS.greyscale900},
              ]}>
              Favorites: {favorites.length}
            </Text>
          </View>
        </View>
        <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('notifications')}>
            <Image
              source={icons.notificationBell2}
              resizeMode="contain"
              style={[
                styles.bellIcon,
                {tintColor: dark ? COLORS.white : COLORS.greyscale900},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('favourite')}>
            <Image
              source={icons.heartOutline}
              resizeMode="contain"
              style={[
                styles.heartIcon,
                {tintColor: dark ? COLORS.white : COLORS.greyscale900},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Render search bar
   */
  const renderSearchBar = () => {
    const handleInputFocus = () => {
      navigation.navigate('search');
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('search')}
        style={[
          styles.searchBarContainer,
          {
            backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
          },
        ]}>
        <TouchableOpacity onPress={handleInputFocus}>
          <Image
            source={icons.search2}
            resizeMode="contain"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          // onFocus={handleInputFocus}
          onPress={handleInputFocus}
        />
        <TouchableOpacity onPress={handleInputFocus}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Render banner
   */
  const renderBanner = () => {
    return (
      <View style={styles.bannerItemContainer}>
        <FlatList
          data={banners}
          renderItem={renderBannerItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={event => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / SIZES.width,
            );
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.dotContainer}>
          {banners.map((_, index) => renderDot(index))}
        </View>
      </View>
    );
  };

  /**
   * Render categories
   */
  const renderCategories = () => {
    return (
      <View>
        <SubHeaderItem
          title="Categories"
          navTitle="See all"
          onPress={() => navigation.navigate('categories')}
        />
        <FlatList
          data={
            listCatogeries && listCatogeries.length > 0
              ? listCatogeries.slice(0, 8)
              : []
          }
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4} // Render two items per row
          renderItem={({item, index}) => (
            <Category
              name={item?.name || item?.name}
              icon={item?.image || item?.image}
              backgroundColor={dark ? COLORS.dark2 : COLORS.white}
              onPress={() => {
                if (item !== null) {
                  // navigation.navigate(item);
                }
              }}
            />
          )}
        />
      </View>
    );
  };

  /**
   * render discount foods
   */
  const renderDiscountedFoods = () => {
    return (
      <View>
        <SubHeaderItem
          title="Discounted Foods🔥"
          navTitle="See all"
          onPress={() => navigation.navigate('discountfoods')}
        />
        <FlatList
          data={discountedPriceItems || []}
          keyExtractor={(item, index) =>
            item._id?.toString() || index.toString()
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <VerticalFoodCard
                name={item?.name || ''}
                image={item?.image}
                distance={item?.distance || ''}
                price={item?.price?.toString() || '0'}
                fee={item?.fee || ''}
                rating={item?.rating || 0}
                numReviews={item?.numReviews?.toString() || '0'}
                foodId={item?._id || ''}
                isFavorite={favorites.some(fav => fav.food._id === item._id)}
                onPress={() =>
                  navigation.navigate('fooddetails', {
                    itemId: item?._id,
                  })
                }
                onPressFavorite={() => {
                  productAddToFavorites(item?._id || '');
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  /**
   * render recommended foods
   */
  const renderRecommendedFoods = () => {
    const renderCategoryItem = ({item}: {item: any}) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item?._id)
            ? COLORS.primary
            : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        key={item?._id}
        onPress={() => {
          setSelectedCategories([item?._id]);
          getProductByCatogeryID(item?._id);
        }}>
        <Text
          style={{
            color: selectedCategories.includes(item?._id)
              ? COLORS.white
              : COLORS.primary,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <SubHeaderItem
          title="Recommended For You!😍"
          navTitle="See all"
          onPress={() => navigation.navigate('recommendedfoods')}
        />
        <FlatList
          data={
            listCatogeries && listCatogeries.length > 0
              ? listCatogeries.slice(0, 8)
              : []
          }
          keyExtractor={(item, index) => item._id || index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View
          style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
            marginVertical: 16,
          }}>
          <FlatList
            data={productByCatogeries || []}
            keyExtractor={(item, index) =>
              item._id?.toString() || index.toString()
            }
            renderItem={({item}: {item: FModelListing}) => {
              return (
                <HorizontalFoodCard
                  name={item?.name || ''}
                  image={item?.image}
                  distance={item?.distance || ''}
                  price={item?.price?.toString() || '0'}
                  fee={item?.fee || ''}
                  rating={item?.rating || 0}
                  numReviews={item?.numReviews?.toString() || '0'}
                  foodId={item?._id || ''}
                  isFavorite={favorites.some(fav => fav.food._id === item._id)}
                  isPromo={item?.isPromo}
                  onPress={() => {
                    navigation.navigate('fooddetails', {
                      itemId: item?._id,
                    });
                  }}
                  onPressFavorite={() => {
                    productAddToFavorites(item?._id || '');
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSearchBar()}
          {renderBanner()}
          {loading?.categories === false ? (
            renderCategories()
          ) : (
            <Loader {...loaderProps} />
          )}
          {loading?.discountedItems === false && renderDiscountedFoods()}
          {loading?.products === false ? (
            renderRecommendedFoods()
          ) : (
            <Loader {...loaderProps} />
          )}
        </ScrollView>
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
  headerContainer: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeeting: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: 'gray',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  viewNameContainer: {
    marginLeft: 12,
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8,
  },
  heartIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    marginHorizontal: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
  },
  bannerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.white,
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: 'Urbanist Bold',
    color: COLORS.white,
  },
  bannerBottomContainer: {
    marginTop: 8,
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
    marginTop: 4,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
  },
  firstName: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.dark2,
    marginTop: 6,
  },
  bannerItemContainer: {
    width: '100%',
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  favoritesCount: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.greyscale900,
    marginTop: 4,
  },
});

export default Home;
