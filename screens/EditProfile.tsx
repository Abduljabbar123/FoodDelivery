import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input from '../components/Input';
import {getFormatedDate} from 'react-native-modern-datepicker';
import DatePickerModal from '../components/DatePickerModal';
import Button from '../components/Button';
import RNPickerSelect from 'react-native-picker-select';
import {useTheme} from '../theme/ThemeProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {GET_USER, UPDATE_USERPROFILE} from '../Redux/Reducers/Auth/actions';
import {ENV} from '../config/env copy';
import Loader from '../components/Loader';

interface Item {
  flag: string;
  item: string;
  code: string;
}

interface RenderItemProps {
  item: Item;
}

const isTestMode = false;

const initialState = {
  inputValues: {
    fullName: '',
    email: '',
    nickname: '',
    phoneNumber: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
    phoneNumber: false,
  },
  formIsValid: false,
};

// edit profile screen
const EditProfile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const {dark} = useTheme();
  const {user, userLoading} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      console.log(
        'ENV.resourceURL + user?.photo',
        ENV.resourceURL + user?.photo,
      );
      setImage({
        uri: ENV.resourceURL + user?.photo || images.user1,
        name: user?.photo ? user?.photo.split('/').pop() : 'profile.jpg',
        type: 'image/jpeg',
      });
    }
  }, [user]);

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const handleGenderChange = (value: any) => {
    setSelectedGender(value);
  };

  const today = new Date();
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD',
  );

  const [startedDate, setStartedDate] = useState('12/12/2023');
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  useEffect(() => {
    // Initialize form with user data from Redux
    if (user) {
      inputChangedHandler('fullName', user?.name || '');
      inputChangedHandler('email', user?.email || '');
      inputChangedHandler('nickname', user?.nickname || '');
      inputChangedHandler('phoneNumber', user?.number || user?.phone_no || '');

      console.log('user?.email', user?.email);
    }
  }, [user]);

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

  // Image Profile handler
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        let imageUri = response.assets[0].uri;
        setImage({
          uri: imageUri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  // fectch codes from rescountries api
  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        let areaData = data.map((item: any) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a: any) => a.code == 'US');

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  // render countries codes modal
  function RenderAreasCodesModal() {
    const renderItem = ({item}: RenderItemProps) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            setSelectedArea(item), setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />
          <Text style={{fontSize: 16, color: '#fff'}}>{item.item}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={item => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  const editProfile = () => {
    if (!user?._id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    const formData = new FormData();
    console.log('image uri', image);
    console.log('formState', formState.inputValues.fullName);

    formData.append('name', formState.inputValues.fullName || '');
    formData.append('nickname', formState.inputValues.nickname || '');
    formData.append('email', formState.inputValues.email || '');
    formData.append('number', formState.inputValues.phoneNumber || '');
    formData.append('image', {
      uri: image?.uri,
      name: image?.name || 'profile.jpg',
      type: image?.type || 'image/jpeg',
    });
    formData.append('country_code', selectedArea?.callingCode || '');

    console.log('form Data', formData);

    UPDATE_USERPROFILE(user._id, formData, res => {
      if (res.success) {
        getCurrentUser();
      } else {
        Alert.alert('Error', res?.message || 'Failed to update profile');
      }
    });
  };

  const getCurrentUser = () => {
    if (!user?._id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    GET_USER(user._id, res => {
      if (res.success) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to fetch updated user data');
      }
    });
  };

  if (userLoading) {
    return (
      <SafeAreaView
        style={[
          styles.area,
          {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
        ]}>
        <View
          style={[
            styles.container,
            {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
          ]}>
          <Header title="Personal Profile" />
          <Loader size={50} mainStyles={{marginTop: 50}} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.area,
        {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
      ]}>
      <View
        style={[
          styles.container,
          {backgroundColor: dark ? COLORS.dark1 : COLORS.white},
        ]}>
        <Header title="Personal Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', marginVertical: 12}}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? images.user1 : image}
                resizeMode="cover"
                style={styles.avatar}
              />
              <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder="Full Name"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues['fullName']}
            />
            <Input
              id="nickname"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Nickname"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              value={formState.inputValues['nickname']}
            />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder="Email"
              editable={false}
              value={formState.inputValues['email']}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              keyboardType="email-address"
            />
            <View
              style={{
                width: SIZES.width - 32,
              }}>
              <TouchableOpacity
                style={[
                  styles.inputBtn,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  },
                ]}
                onPress={handleOnPressStartDate}>
                <Text style={{...FONTS.body4, color: COLORS.grayscale400}}>
                  {startedDate}
                </Text>
                <Feather
                  name="calendar"
                  size={24}
                  color={COLORS.grayscale400}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}>
              <TouchableOpacity
                style={styles.selectFlagContainer}
                onPress={() => setModalVisible(true)}>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={icons.down}
                    resizeMode="contain"
                    style={styles.downIcon}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 5}}>
                  <Image
                    source={{uri: selectedArea?.flag}}
                    resizeMode="contain"
                    style={styles.flagIcon}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 5}}>
                  <Text
                    style={{color: dark ? COLORS.white : '#111', fontSize: 12}}>
                    {selectedArea?.callingCode}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Phone Number Text Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                selectionColor="#111"
                keyboardType="numeric"
                value={formState.inputValues.phoneNumber}
                onChangeText={text => inputChangedHandler('phoneNumber', text)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <DatePickerModal
        open={openStartDatePicker}
        startDate={startDate}
        selectedDate={startedDate}
        onClose={() => setOpenStartDatePicker(false)}
        onChangeStartDate={date => setStartedDate(date)}
      />
      {RenderAreasCodesModal()}
      <View style={styles.bottomContainer}>
        <Button
          title="Update"
          filled
          style={styles.continueButton}
          onPress={() => {
            editProfile();
          }}
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
    padding: 16,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 6,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: '#111',
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'space-between',
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width - 32,
    alignItems: 'center',
  },
  continueButton: {
    width: SIZES.width - 32,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 6,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
});

export default EditProfile;
