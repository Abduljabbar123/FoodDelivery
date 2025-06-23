import {View, StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import Button from '../components/Button';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import AddressItem from '../components/AddressItem';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/ConfigureStore';
import {
  getAddresses,
  setDefaultAddress,
} from '../Redux/Reducers/Address/actions';
import {IAddress} from '../Redux/Reducers/Address/actions.d';

const CheckoutOrdersAddress = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {colors, dark} = useTheme();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const {addresses, loading} = useSelector((state: RootState) => state.address);

  // handle checkbox
  const handleCheckboxPress = (addressId: string) => {
    if (selectedItem === addressId) {
      // If the clicked item is already selected, deselect it
      setSelectedItem(null);
    } else {
      // Otherwise, select the clicked item
      setSelectedItem(addressId);
    }
  };

  // Handle apply button press
  const handleApply = () => {
    if (selectedItem) {
      setDefaultAddress(selectedItem, response => {
        if (response.success) {
          console.log('Default address set successfully');
          navigation.goBack();
        } else {
          console.log('Failed to set default address:', response.message);
        }
      });
    } else {
      // If no address is selected, just go back
      navigation.goBack();
    }
  };

  useEffect(() => {
    // Fetch addresses when the component mounts
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

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="Deliver To" />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginVertical: 12,
          }}
          showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  {color: dark ? COLORS.white : COLORS.gray},
                ]}>
                Loading addresses...
              </Text>
            </View>
          ) : addresses.length > 0 ? (
            addresses.map((address: IAddress) => (
              <AddressItem
                key={address._id}
                checked={selectedItem === address._id}
                onPress={() => handleCheckboxPress(address._id)}
                name={address.label || address.addressType}
                address={`${address.address}, ${address.city}, ${address.state} ${address.postCode}`}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  {color: dark ? COLORS.white : COLORS.gray},
                ]}>
                No addresses found
              </Text>
            </View>
          )}
          <Button
            title="Add New Address"
            style={{
              width: SIZES.width - 32,
              borderRadius: 32,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => navigation.navigate('addnewaddress')}
          />
        </ScrollView>
        <Button
          title="Apply"
          filled
          onPress={handleApply}
          style={styles.button}
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
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  addBtn: {
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary,
  },
  button: {
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutOrdersAddress;
