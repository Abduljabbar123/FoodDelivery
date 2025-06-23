import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {
  useRef,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {icons, SIZES, COLORS, FONTS} from '../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {commonStyles} from '../styles/CommonStyles';
import Input from '../components/Input';
import {validateInput} from '../utils/actions/formActions';
import {reducer} from '../utils/reducers/formReducers';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {mapDarkStyle, mapStandardStyle} from '../data/mapData';
import {addAddress, getAddresses} from '../Redux/Reducers/Address/actions';
import {IAddressRequest} from '../Redux/Reducers/Address/actions.d';

const initialState = {
  inputValues: {
    address: '',
    street: '',
    postalCode: '',
    appartment: '',
    city: '',
    state: '',
    country: '',
    instructions: '',
  },
  inputValidities: {
    address: false,
    street: false,
    postalCode: false,
    appartment: false,
    city: false,
    state: false,
    country: false,
    instructions: false,
  },
  formIsValid: false,
};

type Nav = {
  navigate: (value: string) => void;
};

const AddNewAddress = () => {
  const {navigate} = useNavigation<Nav>();
  const navigation = useNavigation<NavigationProp<any>>();
  const bottomSheetRef = useRef<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {dark, colors} = useTheme();

  const handleLabelSelection = (label: string) => {
    setSelectedLabel(label);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // open the modal on component mount
  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const addNewAddress = () => {
    // Validate form
    if (!formState.formIsValid) {
      Alert.alert('Error', 'Please fill in all required fields correctly');
      return;
    }

    if (!selectedLabel) {
      Alert.alert(
        'Error',
        'Please select an address type (Home, Work, or Other)',
      );
      return;
    }

    const addressData: IAddressRequest = {
      addressType: selectedLabel,
      label: selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1),
      address: formState.inputValues.address,
      apartment: formState.inputValues.appartment,
      street: formState.inputValues.street,
      city: formState.inputValues.city,
      state: formState.inputValues.state,
      postCode: formState.inputValues.postalCode,
      country: formState.inputValues.country,
      isDefault: false,
      latitude: 48.8566,
      longitude: 2.3522,
      instructions: formState.inputValues.instructions,
    };

    // Call the Redux action
    addAddress(addressData, response => {
      if (response.success) {
        getAddresses(response => {
          if (response.success) {
            Alert.alert('Success', 'Address added successfully', [
              {
                text: 'OK',
                onPress: () => {
                  // Refresh addresses before going back
                  getAddresses(response => {
                    if (response.success) {
                      navigation.goBack();
                    } else {
                      console.log(
                        'Failed to refresh addresses:',
                        response.message,
                      );
                      navigation.goBack();
                    }
                  });
                },
              },
            ]);
          } else {
            Alert.alert('Error', response.message || 'Failed to get addresses');
          }
        });
      } else {
        Alert.alert('Error', response.message || 'Failed to add address');
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar hidden={true} />

      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: 999999,
          elevation: 999999,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('Back button pressed');
            navigation.goBack();
          }}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={{
            position: 'absolute',
            top: 50,
            left: 16,
            height: 45,
            width: 45,
            borderRadius: 22.5,
            backgroundColor: COLORS.black,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.7}>
          <Image
            source={icons.arrowLeft}
            resizeMode="contain"
            style={{
              height: 24,
              width: 24,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 77,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.black}}>
            Add New Address
          </Text>
        </View>
      </View>

      <MapView
        style={styles.map}
        customMapStyle={dark ? mapDarkStyle : mapStandardStyle}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 48.8566,
            longitude: 2.3522,
          }}
          image={icons.googleMaps}
          title="Move"
          description="Address"
          onPress={() => console.log('Move to another screen')}>
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text
                  style={{
                    ...FONTS.body4,
                    fontWeight: 'bold',
                    color: COLORS.black,
                  }}>
                  User Address
                </Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Modal instead of RBSheet to fix touch interference */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
            ]}>
            {/* Back button inside modal */}
            <TouchableOpacity
              onPress={() => {
                console.log('Modal back button pressed');
                setIsModalVisible(false);
              }}
              style={styles.modalBackButton}
              activeOpacity={0.7}>
              <Image
                source={icons.arrowLeft}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>

            {/* Title inside modal */}
            <Text
              style={[
                styles.modalTitle,
                {color: dark ? COLORS.white : COLORS.black},
              ]}>
              Add New Address
            </Text>

            {/* Draggable handle */}
            <View style={styles.dragHandle} />

            <View
              style={{
                width: SIZES.width - 32,
                marginHorizontal: 16,
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
                nestedScrollEnabled={true}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginVertical: 0}}>
                    <View
                      style={{
                        marginTop: 0,
                        width: SIZES.width - 32,
                      }}>
                      <Text
                        style={[
                          commonStyles.inputHeader,
                          {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                          },
                        ]}>
                        Address
                      </Text>
                      <Input
                        id="address"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['address']}
                        placeholder="3235 Royal Ln. mesa, new jersy 34567"
                        placeholderTextColor={
                          dark ? COLORS.grayTie : COLORS.black
                        }
                      />
                    </View>
                    <View style={{marginTop: 12}}>
                      <Text
                        style={[
                          commonStyles.inputHeader,
                          {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                          },
                        ]}>
                        Appartment
                      </Text>
                      <Input
                        id="appartment"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['appartment']}
                        placeholder="2143"
                        placeholderTextColor={
                          dark ? COLORS.grayTie : COLORS.black
                        }
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                      }}>
                      <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                        <Text
                          style={[
                            commonStyles.inputHeader,
                            {
                              color: dark ? COLORS.white : COLORS.greyscale900,
                            },
                          ]}>
                          Street
                        </Text>
                        <Input
                          id="street"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['street']}
                          placeholder="hason nagar"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                        />
                      </View>
                      <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                        <Text
                          style={[
                            commonStyles.inputHeader,
                            {
                              color: dark ? COLORS.white : COLORS.greyscale900,
                            },
                          ]}>
                          Post Code
                        </Text>
                        <Input
                          id="postalCode"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['postalCode']}
                          placeholder="3456"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                        />
                      </View>
                    </View>

                    {/* City and State Row */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                      }}>
                      <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                        <Text
                          style={[
                            commonStyles.inputHeader,
                            {
                              color: dark ? COLORS.white : COLORS.greyscale900,
                            },
                          ]}>
                          City
                        </Text>
                        <Input
                          id="city"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['city']}
                          placeholder="New York"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                        />
                      </View>
                      <View style={{width: (SIZES.width - 32) / 2 - 10}}>
                        <Text
                          style={[
                            commonStyles.inputHeader,
                            {
                              color: dark ? COLORS.white : COLORS.greyscale900,
                            },
                          ]}>
                          State
                        </Text>
                        <Input
                          id="state"
                          onInputChanged={inputChangedHandler}
                          errorText={formState.inputValidities['state']}
                          placeholder="NY"
                          placeholderTextColor={
                            dark ? COLORS.grayTie : COLORS.black
                          }
                        />
                      </View>
                    </View>

                    {/* Country Field */}
                    <View style={{marginTop: 12}}>
                      <Text
                        style={[
                          commonStyles.inputHeader,
                          {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                          },
                        ]}>
                        Country
                      </Text>
                      <Input
                        id="country"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['country']}
                        placeholder="USA"
                        placeholderTextColor={
                          dark ? COLORS.grayTie : COLORS.black
                        }
                      />
                    </View>

                    {/* Instructions Field */}
                    <View style={{marginTop: 12}}>
                      <Text
                        style={[
                          commonStyles.inputHeader,
                          {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                          },
                        ]}>
                        Instructions (Optional)
                      </Text>
                      <Input
                        id="instructions"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['instructions']}
                        placeholder="Delivery instructions, landmarks, etc."
                        placeholderTextColor={
                          dark ? COLORS.grayTie : COLORS.black
                        }
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Urbanist Regular',
                      marginBottom: 2,
                      color: dark ? COLORS.white : COLORS.greyscale900,
                    }}>
                    AVAILABLE TIME
                  </Text>
                  <View style={{flexDirection: 'row', marginVertical: 13}}>
                    <TouchableOpacity
                      style={[
                        styles.checkboxContainer,
                        selectedLabel === 'home' && styles.selectedCheckbox,
                        {
                          borderColor: dark
                            ? COLORS.primary
                            : COLORS.greyscale900,
                        },
                      ]}
                      onPress={() => handleLabelSelection('home')}>
                      <Text
                        style={[
                          selectedLabel === 'home' && styles.checkboxText,
                          {
                            color:
                              selectedLabel === 'home'
                                ? COLORS.white
                                : dark
                                ? COLORS.primary
                                : COLORS.greyscale900,
                          },
                        ]}>
                        Home
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.checkboxContainer,
                        selectedLabel === 'work' && styles.selectedCheckbox,
                        {
                          borderColor: dark
                            ? COLORS.primary
                            : COLORS.greyscale900,
                        },
                      ]}
                      onPress={() => handleLabelSelection('work')}>
                      <Text
                        style={[
                          selectedLabel === 'work' && styles.checkboxText,
                          {
                            color:
                              selectedLabel === 'work'
                                ? COLORS.white
                                : dark
                                ? COLORS.primary
                                : COLORS.greyscale900,
                          },
                        ]}>
                        Work
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.checkboxContainer,
                        selectedLabel === 'other' && styles.selectedCheckbox,
                        {
                          borderColor: dark
                            ? COLORS.primary
                            : COLORS.greyscale900,
                        },
                      ]}
                      onPress={() => handleLabelSelection('other')}>
                      <Text
                        style={[
                          selectedLabel === 'other' && styles.checkboxText,
                          {
                            color:
                              selectedLabel === 'other'
                                ? COLORS.white
                                : dark
                                ? COLORS.primary
                                : COLORS.greyscale900,
                          },
                        ]}>
                        Other
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    filled
                    title="SAVE LOCATION"
                    onPress={() => {
                      addNewAddress();
                    }}
                    style={{
                      borderRadius: 30,
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    zIndex: 1,
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 'auto',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  body3: {
    fontSize: 12,
    color: COLORS.grayscale700,
    marginVertical: 3,
  },
  h3: {
    fontSize: 12,
    color: COLORS.grayscale700,
    marginVertical: 3,
    fontFamily: 'Urbanist Bold',
    marginRight: 6,
  },
  btn1: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  roundedCheckBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
  },
  starContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 20,
    paddingBottom: 20,
  },
  dragHandle: {
    height: 5,
    width: 40,
    borderRadius: 3,
    backgroundColor: COLORS.gray2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    marginVertical: 12,
    alignSelf: 'center',
  },
});

export default AddNewAddress;
