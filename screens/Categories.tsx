import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
// import {categories} from '../data';
import Category from '../components/Category';
import {ScrollView} from 'react-native-virtualized-view';
import {useTheme} from '../theme/ThemeProvider';
import {GET_ALL_CATOGERIES} from '../Redux/Reducers/Catogery/action';
import {FModelListing} from '../Redux/Reducers/FoodListing/actions';
import Loader from '../components/Loader';

const Categories = () => {
  const {colors, dark} = useTheme();
  const [loader, setLoader] = useState<boolean>(false);
  const [listCatogeries, setListCatogeries] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    try {
      setLoader(true);
      GET_ALL_CATOGERIES((res: FModelListing) => {
        setListCatogeries(res?.categories);
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
        <Header title="More Category" />
        <ScrollView style={styles.scrollView}>
          {loader ? (
            <Loader />
          ) : (
            <FlatList
              data={listCatogeries?.length > 0 ? listCatogeries : []}
              keyExtractor={(item, index) => index.toString()}
              horizontal={false}
              numColumns={4} // Render two items per row
              renderItem={({item, index}) => (
                <Category
                  name={item?.name || item?.name}
                  icon={item?.image || item?.image}
                  backgroundColor={dark ? COLORS.dark2 : COLORS.white}
                  _id={item?._id || item?._id}
                  onPress={() => {
                    if (item !== null) {
                      // navigation.navigate(item);
                    }
                  }}
                />
              )}
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
    marginVertical: 22,
  },
});

export default Categories;
