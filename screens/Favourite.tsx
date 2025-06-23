import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {categories} from '../data';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '../theme/ThemeProvider';
import Button from '../components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import VerticalFoodCardFavourite from '../components/VerticalFoodCardFavourite';
import HorizontalFoodCardFavourite from '../components/HorizontalFoodCardFavourite';
import NotFoundCard from '../components/NotFound';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {FavoriteProduct} from '../Redux/Reducers/Favorites/actions.d';
import {
  GET_ALL_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES,
} from '../Redux/Reducers/Favorites/action';
import {ENV} from '../config/env';

interface Category {
  id: string;
  name: string;
}

interface Food {
  id: string;
  name: string;
  image: ImageSourcePropType;
  distance: string;
  price: string;
  fee: string;
  rating: number;
  numReviews: string;
  categoryId: string;
}

const Favourite = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const {dark, colors} = useTheme();
  const {favorites, loading} = useAppSelector(state => state.favorites);
  const [selectedBookmarkItem, setSelectedBookmarkItem] =
    useState<FavoriteProduct | null>(null);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>('row');

  const handleRemoveBookmark = () => {
    if (selectedBookmarkItem) {
      REMOVE_PRODUCT_FROM_FAVORITES(selectedBookmarkItem.food, response => {
        if (response.success) {
          refRBSheet.current.close();
        }
      });
    }
  };

  useEffect(() => {
    GET_ALL_FAVORITES((res: any) => {});
  }, []);

  // Handle empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text
        style={[
          styles.emptyText,
          {color: dark ? COLORS.white : COLORS.greyscale900},
        ]}>
        No favorites yet
      </Text>
      <Text
        style={[
          styles.emptySubText,
          {color: dark ? COLORS.grayscale200 : COLORS.grayscale700},
        ]}>
        Add some items to your favorites to see them here
      </Text>
    </View>
  );

  const renderHeader = () => (
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
          Favourite
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

  const renderMyBookmarkEvents = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([
      '1',
    ]);

    const filteredFavorites = favorites.filter(favorite => {
      const foodDetails = favorite.foodDetails as any;
      const categoryId = foodDetails?.category?._id || '1';
      return (
        selectedCategories.includes('1') ||
        selectedCategories.includes(categoryId)
      );
    });

    useEffect(() => {
      setResultsCount(filteredFavorites.length);
    }, [favorites, selectedCategories]);

    const renderCategoryItem = ({item}: {item: Category}) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id)
            ? COLORS.primary
            : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>
        <Text
          style={{
            color: selectedCategories.includes(item.id)
              ? COLORS.white
              : COLORS.primary,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    const toggleCategory = (categoryId: string) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    // Handle empty state
    if (favorites.length === 0) {
      return renderEmptyState();
    }

    return (
      <View>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
        </View>

        <View style={styles.reusltTabContainer}>
          <Text
            style={[
              styles.tabText,
              {
                color: dark ? COLORS.secondaryWhite : COLORS.black,
              },
            ]}>
            {resultsCount} found
          </Text>
          <View style={styles.viewDashboard}>
            <TouchableOpacity onPress={() => setSelectedTab('column')}>
              <Image
                source={
                  selectedTab === 'column'
                    ? icons.dashboard
                    : icons.dashboardOutline
                }
                resizeMode="contain"
                style={[
                  styles.dashboardIcon,
                  {
                    tintColor:
                      selectedTab === 'column'
                        ? COLORS.primary
                        : dark
                        ? COLORS.white
                        : COLORS.black,
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedTab('row')}>
              <Image
                source={
                  selectedTab === 'row'
                    ? icons.dashboard2
                    : icons.dashboard2Outline
                }
                resizeMode="contain"
                style={[
                  styles.dashboardIcon,
                  {
                    tintColor:
                      selectedTab === 'row'
                        ? COLORS.primary
                        : dark
                        ? COLORS.white
                        : COLORS.black,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {filteredFavorites.length === 0 ? (
          <NotFoundCard />
        ) : (
          <FlatList
            data={filteredFavorites}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const foodDetails = item.food as any;
              if (!foodDetails) {
                return null;
              }
              return selectedTab === 'row' ? (
                <HorizontalFoodCardFavourite
                  name={foodDetails?.name || 'Unknown Food'}
                  image={
                    foodDetails?.image
                      ? {uri: ENV.resourceURL + foodDetails.image}
                      : require('../assets/images/products/dry_food1.jpg')
                  }
                  distance={foodDetails?.distance || 'N/A'}
                  price={`$${foodDetails?.price || 0}`}
                  fee={foodDetails?.fee || '$0.00'}
                  rating={foodDetails?.rating || 0}
                  numReviews={foodDetails?.numReviews?.toString() || '0'}
                  onPress={() => {
                    navigation.navigate('foodDetails', {foodId: item.food});
                  }}
                  onFavoritePress={() => {
                    REMOVE_PRODUCT_FROM_FAVORITES(item._id, () => {});
                  }}
                />
              ) : (
                <VerticalFoodCardFavourite
                  name={foodDetails?.name || 'Unknown Food'}
                  image={
                    foodDetails?.image
                      ? {uri: ENV.resourceURL + foodDetails.image}
                      : require('../assets/images/products/dry_food1.jpg')
                  }
                  distance={foodDetails?.distance || 'N/A'}
                  price={`$${foodDetails?.price || 0}`}
                  fee={foodDetails?.fee || '$0.00'}
                  rating={foodDetails?.rating || 0}
                  numReviews={foodDetails?.numReviews?.toString() || '0'}
                  onPress={() => {
                    navigation.navigate('foodDetails', {foodId: item.food});
                  }}
                  onFavoritePress={() => {
                    REMOVE_PRODUCT_FROM_FAVORITES(item.food, () => {});
                  }}
                />
              );
            }}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
      ]}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {renderMyBookmarkEvents()}
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Remove from Favorites</Text>
          <Text style={styles.bottomSheetSubtitle}>
            Are you sure you want to remove this item from your favorites?
          </Text>
          <View style={styles.bottomSheetButtons}>
            <Button
              title="Cancel"
              onPress={() => refRBSheet.current.close()}
              style={styles.cancelButton}
              textColor={styles.cancelButtonText.color}
            />
            <Button
              title="Remove"
              onPress={handleRemoveBookmark}
              filled
              style={styles.removeButton}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  categoryContainer: {
    marginTop: 0,
  },
  reusltTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
    marginTop: 12,
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
  scrollContent: {
    padding: 16,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    marginBottom: 12,
  },
  bottomSheetSubtitle: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginBottom: 20,
  },
  bottomSheetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.primary,
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  removeButtonText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.grayscale200,
  },
});

export default Favourite;
