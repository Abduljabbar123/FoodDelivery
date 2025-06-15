import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import VerticalFoodCard from '../components/VerticalFoodCard';
import {useTheme} from '../theme/ThemeProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {discountProducts} from '../data';
import {GET_DISCOUNTED_PRICE} from '../Redux/Reducers/FoodListing/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import Loader from '../components/Loader';

const DiscountFoods = () => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [loader, setLoader] = useState<boolean>();
  const [discountedPriceItems, setDiscountedPriceItems] = useState([]);

  useEffect(() => {
    getAllDiscountedFoods();
  }, []);

  const getAllDiscountedFoods = () => {
    try {
      setLoader(true);
      GET_DISCOUNTED_PRICE((res: FModelListing) => {
        setDiscountedPriceItems(res?.food);
        console.log('res', JSON.stringify(res?.foods, null, 2));
        setLoader(false);
      });
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Discount guaranteed!👌" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {loader ? (
            <Loader />
          ) : (
            <FlatList
              data={discountedPriceItems || []}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{gap: 16}}
              showsVerticalScrollIndicator={false}
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
                    onPress={() =>
                      navigation.navigate('fooddetails', {
                        itemId: item?._id,
                      })
                    }
                  />
                );
              }}
            />
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
  scrollView: {
    marginVertical: 16,
  },
});

export default DiscountFoods;
