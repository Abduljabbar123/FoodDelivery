import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {categories, products, ratings} from '../data';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import VerticalFoodCard from '../components/VerticalFoodCard';
import HorizontalFoodCard from '../components/HorizontalFoodCard';
import NotFoundCard from '../components/NotFound';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {async} from 'validate.js';
import {
  GET_ALL_FOOD,
  GET_FILTERED_PRODUCTS,
} from '../Redux/Reducers/FoodListing/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import {GET_ALL_CATOGERIES} from '../Redux/Reducers/Catogery/action';

interface SliderHandleProps {
  enabled: boolean;
  markerStyle: object;
}

const CustomSliderHandle: React.FC<SliderHandleProps> = ({
  enabled,
  markerStyle,
}) => {
  return (
    <View
      style={[
        markerStyle,
        {
          backgroundColor: enabled ? COLORS.primary : 'lightgray',
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
          width: 20,
          height: 20,
        },
      ]}
    />
  );
};

const Search = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const {dark, colors} = useTheme();
  const [selectedCategories, setSelectedCategories] = useState([
    '6841c000faf7ece7b8fc2122',
  ]);
  const [selectedRating, setSelectedRating] = useState(['1']);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range
  const [searchQuery, setSearchQuery] = useState('');

  const [listCatogeries, setListCatogeries] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [loader, setLoader] = useState({
    categories: false,
    products: false,
  });

  useEffect(() => {
    getAllCatogeriesAndProducts();
  }, []);

  const getAllCatogeriesAndProducts = async () => {
    try {
      setLoader({...loader, categories: true, products: false});

      GET_ALL_CATOGERIES((res: FModelListing) => {
        setListCatogeries(res?.categories);
        console.log(
          'List Catogeries ===>',
          JSON.stringify(res?.categories, null, 2),
        );
        setLoader({...loader, categories: false});
      });
    } catch (error) {
    } finally {
      setLoader({...loader, categories: false});
    }

    return () => {
      setLoader({...loader, categories: false, products: false});
    };
  };

  const getFilteredProducts = async () => {
    console.log('Search Query ===>', searchQuery);
    console.log('Selected Categories ===>', selectedCategories);
    console.log('Selected Rating ===>', selectedRating);
    console.log('Price Range ===>', priceRange);

    try {
      setLoader({...loader, categories: false, products: true});
      GET_FILTERED_PRODUCTS(
        priceRange[1],
        searchQuery,
        selectedCategories,
        selectedRating,
        (res: FModelListing) => {
          setFilterProducts(res?.foods);
          setResultsCount(res?.count);
          console.log(
            'Filtered Products ===',
            JSON.stringify(res?.foods, null, 2),
          );

          // setSelectedCategories(res?.products);
        },
      );
    } finally {
      setLoader({...loader, products: false});
    }
  };

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };
  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={[
                styles.backIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            Searchs
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[
              styles.moreIcon,
              {
                tintColor: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render content
   */
  const renderContent = () => {
    const [selectedTab, setSelectedTab] = useState('row');
    // const [filteredFoods, setFilteredFoods] = useState(products);

    useEffect(() => {
      // handleSearch();
      getFilteredProducts();
    }, [searchQuery, selectedTab]);

    // const handleSearch = () => {
    //   const allFoods = products.filter(food =>
    //     food.name.toLowerCase().includes(searchQuery.toLowerCase()),
    //   );
    //   setFilteredFoods(allFoods);
    //   setResultsCount(allFoods.length);
    // };

    return (
      <View>
        {/* Search bar */}
        <View
          style={[
            styles.searchBarContainer,
            {
              backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Image
              source={icons.search2}
              resizeMode="contain"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
            style={[
              styles.searchInput,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Image
              source={icons.filter}
              resizeMode="contain"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.reusltTabContainer}>
            <Text
              style={[
                styles.tabText,
                {
                  color: dark ? COLORS.secondaryWhite : COLORS.black,
                },
              ]}>
              {resultsCount} founds
            </Text>
            <View style={styles.viewDashboard}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('column');
                  setSearchQuery(''); // Clear search query when changing tab
                }}>
                <Image
                  source={
                    selectedTab === 'column'
                      ? icons.document2
                      : icons.document2Outline
                  }
                  resizeMode="contain"
                  style={styles.dashboardIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('row');
                  setSearchQuery(''); // Clear search query when changing tab
                }}>
                <Image
                  source={
                    selectedTab === 'row'
                      ? icons.dashboard
                      : icons.dashboardOutline
                  }
                  resizeMode="contain"
                  style={styles.dashboardIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Results container  */}
          <View>
            {/* Events result list */}
            <View
              style={{
                backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
                marginVertical: 16,
              }}>
              {resultsCount && resultsCount > 0 ? (
                <>
                  {selectedTab === 'row' ? (
                    <FlatList
                      data={filterProducts}
                      keyExtractor={item => item._id}
                      numColumns={2}
                      columnWrapperStyle={{gap: 16}}
                      renderItem={({item}) => {
                        return (
                          <VerticalFoodCard
                            name={item?.name}
                            image={item?.image}
                            distance={item?.distance}
                            price={item?.price}
                            fee={item?.fee}
                            rating={item?.rating}
                            numReviews={item?.numReviews}
                            onPress={() => {
                              navigation.navigate('fooddetails', {
                                itemId: item?._id,
                              });
                            }}
                          />
                        );
                      }}
                    />
                  ) : (
                    <FlatList
                      data={filterProducts}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <HorizontalFoodCard
                            name={item?.name}
                            image={item?.image}
                            distance={item?.distance}
                            price={item?.price}
                            fee={item?.fee}
                            rating={item?.rating}
                            numReviews={item?.numReviews}
                            onPress={() => {
                              navigation.navigate('fooddetails', {
                                itemId: item?._id,
                              });
                            }}
                          />
                        );
                      }}
                    />
                  )}
                </>
              ) : (
                <NotFoundCard />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // toggle rating selection
  const toggleRating = (ratingId: string) => {
    const updatedRatings = [...selectedRating];
    const index = updatedRatings.indexOf(ratingId);

    if (index === -1) {
      updatedRatings.push(ratingId);
    } else {
      updatedRatings.splice(index, 1);
    }

    setSelectedRating(updatedRatings);
  };

  // Function to toggle selected cuisine
  const toggleCuisine = (cuisineId: string) => {
    // Check if the cuisine is already selected
    if (selectedCuisines.includes(cuisineId)) {
      // If selected, remove it
      setSelectedCuisines(selectedCuisines.filter(id => id !== cuisineId));
    } else {
      // If not selected, add it
      setSelectedCuisines([...selectedCuisines, cuisineId]);
    }
  };

  // Category item
  const renderCategoryItem = ({item}: {item: {id: string; name: string}}) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item._id)
          ? COLORS.primary
          : 'transparent',
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => setSelectedCategories(item._id)}>
      <Text
        style={{
          color: selectedCategories.includes(item._id)
            ? COLORS.white
            : COLORS.primary,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRatingItem = ({item}: {item: {id: string; title: string}}) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedRating.includes(item.id)
          ? COLORS.primary
          : 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => toggleRating(item.id)}>
      <View style={{marginRight: 6}}>
        <FontAwesome
          name="star"
          size={12}
          color={
            selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
          }
        />
      </View>
      <Text
        style={{
          color: selectedRating.includes(item.id)
            ? COLORS.white
            : COLORS.primary,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <View>{renderContent()}</View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={true}
          height={480}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: dark ? COLORS.dark3 : '#000',
            },
            container: {
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              height: 480,
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
            Filter
          </Text>
          <View style={styles.separateLine} />
          <View style={{width: SIZES.width - 32}}>
            <Text
              style={[
                styles.sheetTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Category
            </Text>
            <FlatList
              data={listCatogeries}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderCategoryItem}
            />
            <Text
              style={[
                styles.sheetTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Filter
            </Text>
            <MultiSlider
              values={priceRange}
              sliderLength={SIZES.width - 32}
              onValuesChange={handleSliderChange}
              min={0}
              max={1000}
              step={1}
              allowOverlap={false}
              snapped
              minMarkerOverlapDistance={40}
              customMarker={CustomSliderHandle}
              selectedStyle={{backgroundColor: COLORS.primary}}
              unselectedStyle={{backgroundColor: 'lightgray'}}
              containerStyle={{height: 40}}
              trackStyle={{height: 3}}
            />

            <Text
              style={[
                styles.sheetTitle,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Rating
            </Text>
            <FlatList
              data={ratings}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderRatingItem}
            />
          </View>

          <View style={styles.separateLine} />

          <View style={styles.bottomContainer}>
            <Button
              title="Reset"
              style={{
                width: (SIZES.width - 32) / 2 - 8,
                backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                borderRadius: 32,
                borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              }}
              textColor={dark ? COLORS.white : COLORS.primary}
              onPress={() => refRBSheet.current.close()}
            />
            <Button
              title="Filter"
              filled
              style={styles.logoutButton}
              onPress={() => {
                getFilteredProducts();
                refRBSheet.current.close();
              }}
            />
          </View>
        </RBSheet>
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
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
    marginLeft: 16,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginBottom: 16,
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
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  tabBtn: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32,
  },
  selectedTab: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32,
  },
  tabBtnText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  selectedTabText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
  },
  resultLeftView: {
    flexDirection: 'row',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width,
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 12,
  },
  separateLine: {
    height: 0.4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    marginVertical: 12,
  },
  reusltTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
  },
  viewDashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    justifyContent: 'space-between',
  },
  dashboardIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },
  tabText: {
    fontSize: 20,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
  },
});

export default Search;
function setLoader(arg0: any) {
  throw new Error('Function not implemented.');
}
