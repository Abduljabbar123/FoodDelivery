import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ActiveOrders, CancelledOrders, CompletedOrders} from '../tabs';
import {useTheme} from '../theme/ThemeProvider';
import {COLORS, icons, images, SIZES} from '../constants';

const renderScene = SceneMap({
  first: ActiveOrders,
  second: CompletedOrders,
  third: CancelledOrders,
});

// Define the types for the route and focused props
interface TabRoute {
  key: string;
  title: string;
}

interface RenderLabelProps {
  route: TabRoute;
  focused: boolean;
}

const Orders = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const layout = useWindowDimensions();
  const {dark, colors} = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Active'},
    {key: 'second', title: 'Completed'},
    {key: 'third', title: 'Cancelled'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      activeColor={COLORS.primary}
      inactiveColor={dark ? COLORS.white : COLORS.greyscale900}
      renderLabel={({route, focused}: RenderLabelProps) => (
        <Text
          style={[
            {
              color: focused ? COLORS.primary : 'gray',
              fontSize: 16,
              fontFamily: 'Urbanist SemiBold',
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );
  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.logo3}
              resizeMode="contain"
              style={[
                styles.backIcon,
                {
                  tintColor: COLORS.primary,
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
            My Orders
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
  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
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
});

export default Orders;
