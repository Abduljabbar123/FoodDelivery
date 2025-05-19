import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {use, useCallback, useEffect, useReducer, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, icons, images} from '../constants';
import Header from '../components/Header';
import {reducer} from '../utils/reducers/formReducers';
import {validateInput} from '../utils/actions/formActions';
import Input from '../components/Input';
import CheckBox from '@react-native-community/checkbox';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import OrSeparator from '../components/OrSeparator';
import {useTheme} from '../theme/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {Overlay} from 'react-native-maps';
import {OverlayLoader} from '../components/OverlayLoader';
import Loader from '../components/Loader';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

type Nav = {
  navigate: (value: string) => void;
};

const Signup = () => {
  const {navigate} = useNavigation<Nav>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const {colors, dark} = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

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

  // Implementing apple authentication
  const appleAuthHandler = () => {
    console.log('Apple Authentication');
  };

  // Implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log('Facebook Authentication');
  };

  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log('Google Authentication');
  };

  const SignUpUser = () => {
    // navigate('fillyourprofile')

    setLoading(true);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 500);

    const params = {
      name: '',
      email: formState?.inputValues?.email,
      password: formState?.inputValues?.password,
      confirmPassword: formState?.inputValues?.password,
      phone_no: '',
      address: '',
      userType: '',
    };
    // if (!data.fname) {
    //   setLoading(false);
    //   showSnackbar({
    //     type: 'error',
    //     header: 'Validation failed',
    //     body: 'First Name is required.',
    //   });
    //   return;
    // } else if (!data.lname) {
    //   setLoading(false);
    //   showSnackbar({
    //     type: 'error',
    //     header: 'Validation failed',
    //     body: 'Last Name is required.',
    //   });
    //   return;
    // }
    // userSchema
    //   .validate(params)
    //   .then(() => {
    //     // Front and back image validation
    //     if (userType === 'renter' && (!frontImage || !backImage)) {
    //       setLoading(false);
    //       showSnackbar({
    //         type: 'error',
    //         header: 'Validation failed',
    //         body: 'Please add both front and back license images.',
    //       });
    //       return;
    //     }

    //     // Checkbox validation
    //     if (!acceptTerms) {
    //       setLoading(false);
    //       showSnackbar({
    //         type: 'error',
    //         header: 'Validation failed',
    //         body: 'Please accept the Terms and Conditions.',
    //       });
    //       return;
    //     }
    //     //
    //     const formData = new FormData();
    //     // for (const property in params) {
    //     //   formData.append(property, params[property as keyof typeof params]);
    //     // }
    //     formData.append('name', `${data?.fname + ' ' + data?.lname}`),
    //       formData.append('email', data?.email.toLowerCase());
    //     formData.append('password', data?.password);
    //     formData.append('confirmPassword', data?.repeat_password);
    //     formData.append('phone_no', data?.phone_no);
    //     if (data?.address[0]?.location?.area !== '') {
    //       data?.address?.forEach((addressObj, index) => {
    //         formData.append(
    //           `address[${index}][location][area]`,
    //           addressObj.location.area,
    //         );
    //         formData.append(
    //           `address[${index}][location][lat]`,
    //           addressObj.location.lat,
    //         );
    //         formData.append(
    //           `address[${index}][location][lng]`,
    //           addressObj.location.lng,
    //         );
    //       });

    //       // formData.append('address[0]', JSON.stringify(data?.address[0]));
    //     }
    //     formData.append('role', userType);
    //     if (userType === 'renter' && frontImage?.name) {
    //       formData.append('license_front', frontImage);
    //     }
    //     if (userType === 'renter' && backImage?.name) {
    //       formData.append('license_back', backImage);
    //     }
    //     SIGN_UP(formData, ({success}) => {
    //       setLoading(false);
    //       if (success) {
    //         showSnackbar({
    //           header: 'Success',
    //           type: 'success',
    //           body: 'You have successfully registered to Baddour.',
    //         });
    //         navigation.navigate('Verification', {
    //           email: data?.email.toLowerCase(),
    //         });
    //       }
    //     });
    //   })
    //   .catch(e => {
    //     // crashlytics().log('SIGNUP SCREEN.');
    //     // crashlytics().recordError(e);
    //     setLoading(false);
    //     showSnackbar({
    //       type: 'error',
    //       header: 'Validation failed.',
    //       body: e.message,
    //     });
    //   });
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title="" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo3}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            Create Your Account
          </Text>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder="Email"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
            value={formState.inputValues.email}
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.padlock}
            secureTextEntry={true}
            value={formState.inputValues.password}
          />
          <View style={styles.checkBoxContainer}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={styles.checkbox}
                value={isChecked}
                boxType="square"
                onTintColor={isChecked ? COLORS.primary : 'gray'}
                onFillColor={isChecked ? COLORS.primary : 'gray'}
                onCheckColor={COLORS.white}
                onValueChange={setChecked}
                tintColors={{true: COLORS.primary, false: 'gray'}}
              />
              <View style={{flex: 1}}>
                <Text
                  style={[
                    styles.privacy,
                    {
                      color: dark ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  By continuing you accept our Privacy Policy
                </Text>
              </View>
            </View>
          </View>
          {loading ? (
            <Loader />
          ) : (
            <Button
              title="Sign Up"
              filled
              onPress={() => {
                SignUpUser();
              }}
              style={styles.button}
            />
          )}
          <View>
            <OrSeparator text="or continue with" />
            <View style={styles.socialBtnContainer}>
              <SocialButton
                icon={icons.appleLogo}
                onPress={appleAuthHandler}
                tintColor={dark ? COLORS.white : COLORS.black}
              />
              <SocialButton
                icon={icons.facebook}
                onPress={facebookAuthHandler}
              />
              <SocialButton icon={icons.google} onPress={googleAuthHandler} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.bottomLeft,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigate('login')}>
            <Text style={styles.bottomRight}> Sign In</Text>
          </TouchableOpacity>
        </View>
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
  logo: {
    width: 100,
    height: 100,
    // tintColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 22,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  checkbox: {
    marginRight: Platform.OS === 'ios' ? 8 : 14,
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: COLORS.black,
  },
  socialTitle: {
    fontSize: 19.25,
    fontFamily: 'Urbanist Medium',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 26,
  },
  socialBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'absolute',
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: 'Urbanist Regular',
    color: 'black',
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: 'Urbanist Medium',
    color: COLORS.primary,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
  },
});

export default Signup;
