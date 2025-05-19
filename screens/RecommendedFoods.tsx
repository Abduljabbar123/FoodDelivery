import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { categories, recommendedProducts } from '../data';
import HorizontalFoodCard from '../components/HorizontalFoodCard';
import { useTheme } from '../theme/ThemeProvider';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const RecommendedFoods = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { dark, colors } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState(["1"]);

  const filteredFoods = recommendedProducts.filter(food => selectedCategories.includes("1") || selectedCategories.includes(food.categoryId));

   // Category item
   const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
        style={{
            backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
            padding: 10,
            marginVertical: 5,
            borderColor: COLORS.primary,
            borderWidth: 1.3,
            borderRadius: 24,
            marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>

        <Text style={{
            color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
        }}>{item.name}</Text>
    </TouchableOpacity>
);

   // Toggle category selection
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


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Recommended For You!😍" />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
          <View style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
            marginVertical: 16
          }}>
            <FlatList
              data={filteredFoods}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 16 }}
              renderItem={({ item }) => {
                return (
                  <HorizontalFoodCard
                    name={item.name}
                    image={item.image}
                    distance={item.distance}
                    price={item.price}
                    fee={item.fee}
                    rating={item.rating}
                    numReviews={item.numReviews}
                    isPromo={item.isPromo}
                    onPress={() => navigation.navigate("fooddetails")}
                  />
                )
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  scrollView: {
    marginVertical: 16
  }
})

export default RecommendedFoods