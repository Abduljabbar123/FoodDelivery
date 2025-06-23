import {View, StyleSheet, FlatList, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, SIZES} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/ConfigureStore';
import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from '../Redux/Reducers/Address/actions';
import UserAddressItem from '../components/UserAddressItem';
import {IAddress} from '../Redux/Reducers/Address/actions.d';

type Nav = {
  navigate: (value: string) => void;
};

// user address location screen
const Address = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation<Nav>();

  // Get addresses from Redux store
  const {addresses, loading} = useSelector((state: RootState) => state.address);

  // Load addresses on component mount
  useEffect(() => {
    getAddresses(response => {
      if (!response.success) {
        console.log('Failed to load addresses:', response.message);
      }
    });
  }, []);

  // Refresh addresses when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getAddresses(response => {
        if (!response.success) {
          console.log('Failed to refresh addresses:', response.message);
        }
      });
    }, []),
  );

  const renderAddressItem = ({item}: {item: IAddress}) => {
    const handleDelete = () => {
      Alert.alert(
        'Delete Address',
        'Are you sure you want to delete this address?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              deleteAddress(item._id, response => {
                if (response.success) {
                  console.log('Address deleted successfully');
                } else {
                  console.log('Failed to delete address:', response.message);
                }
              });
            },
          },
        ],
      );
    };

    const handleSetDefault = () => {
      setDefaultAddress(item._id, response => {
        if (response.success) {
          console.log('Default address set successfully');
        } else {
          console.log('Failed to set default address:', response.message);
        }
      });
    };

    return (
      <UserAddressItem
        name={item.label || item.addressType}
        address={`${item.address}, ${item.city}, ${item.state} ${item.postCode}`}
        isDefault={item.isDefault}
        onPress={() => console.log('Clicked address:', item._id)}
        onDelete={handleDelete}
        onSetDefault={handleSetDefault}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Address" />
        <ScrollView
          contentContainerStyle={{marginVertical: 12}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={addresses}
            keyExtractor={item => item._id}
            renderItem={renderAddressItem}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {loading ? 'Loading addresses...' : 'No addresses found'}
                </Text>
              </View>
            }
          />
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Add New Address"
          onPress={() => navigate('addnewaddress')}
          filled
          style={styles.btn}
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
  btnContainer: {
    alignItems: 'center',
  },
  btn: {
    width: SIZES.width - 32,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default Address;
