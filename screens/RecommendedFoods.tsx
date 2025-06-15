import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import {categories, recommendedProducts} from '../data';
import HorizontalFoodCard from '../components/HorizontalFoodCard';
import {useTheme} from '../theme/ThemeProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GET_ALL_CATOGERIES} from '../Redux/Reducers/Catogery/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import {GET_FOOD_BY_CATOGERY_ID} from '../Redux/Reducers/FoodListing/action';
import Loader from '../components/Loader';
import {OverlayLoader} from '../components/OverlayLoader';

const loaderProps = {
  size: 200,
  mainStyles: {marginTop: 50},
};

const RecommendedFoods = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {dark, colors} = useTheme();
  const [selectedCategories, setSelectedCategories] = useState(['']);
  const [listCatogeries, setListCatogeries] = useState([]);
  const [productByCatogeries, setProductByCatogeries] = useState([]);

  const [loader, setLoader] = useState({
    categories: false,
    products: false,
  });

  useLayoutEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    setLoader({...loader, categories: true, products: true});
    try {
      GET_ALL_CATOGERIES((res: FModelListing) => {
        setListCatogeries(res?.categories);
        if (res?.categories.length > 0) {
          setSelectedCategories(res?.categories[0]._id);
          getProductByCatogeryID(res?.categories[0]._id);
        }
        setLoader({...loader, categories: false});
      });
    } catch (error) {
    } finally {
      setLoader({...loader, categories: false});
    }
  };

  const getProductByCatogeryID = (id: string) => {
    try {
      GET_FOOD_BY_CATOGERY_ID(id, async res => {
        setProductByCatogeries(res?.foods);
        setLoader({...loader, products: false});
      });
    } catch (error) {
    } finally {
      setLoader({...loader, products: false});
    }
  };

  // const filteredFoods = recommendedProducts.filter(
  //   food =>
  //     selectedCategories.includes('1') ||
  //     selectedCategories.includes(food.categoryId),
  // );

  // Category item
  const renderCategoryItem = ({item}: {item: {_id: string; name: string}}) => (
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
      onPress={() => {
        console.log(item?._id, 'item');
        setSelectedCategories(item?._id);
        getProductByCatogeryID(item?._id);
      }}>
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

  // // Toggle category selection
  // const toggleCategory = (categoryId: string) => {
  //   const updatedCategories = [...selectedCategories];
  //   const index = updatedCategories.indexOf(categoryId);

  //   if (index === -1) {
  //     updatedCategories.push(categoryId);
  //   } else {
  //     updatedCategories.splice(index, 1);
  //   }

  //   setSelectedCategories(updatedCategories);
  // };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Recommended For You!😍" />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {loader.categories ? (
            <Loader />
          ) : (
            <FlatList
              data={listCatogeries}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderCategoryItem}
            />
          )}
          <View
            style={{
              backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
              marginVertical: 16,
            }}>
            {loader.products ? (
              <Loader {...loaderProps} />
            ) : (
              <FlatList
                data={productByCatogeries}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <HorizontalFoodCard
                      key={item?._id}
                      name={item?.name}
                      image={item?.image}
                      distance={item?.distance}
                      price={item?.price}
                      fee={item?.fee}
                      rating={item?.rating}
                      numReviews={item?.numReviews}
                      isPromo={item?.isPromo}
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
          </View>
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
  scrollView: {
    marginVertical: 16,
  },
});

export default RecommendedFoods;
