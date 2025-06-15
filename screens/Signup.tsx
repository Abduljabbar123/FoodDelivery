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
import {SIGN_UP} from '../Redux/Reducers/Auth/actions';
import {showSnackbar} from '../components/Snackbar';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
    name: isTestMode ? 'John Doe' : '',
  },
  inputValidities: {
    email: false,
    password: false,
    name: false,
  },
  formIsValid: false,
};

type Nav = {
  navigate: (value: string, params?: Record<string, unknown>) => void;
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
    if (!formState?.inputValues?.email) {
      showSnackbar({
        type: 'error',
        body: 'please enter the email',
        header: 'Validation failed',
      });
      return;
    }
    if (!formState?.inputValues?.password) {
      showSnackbar({
        type: 'error',
        body: 'please enter the password',
        header: 'Validation failed',
      });
      return;
    }
    if (!formState?.inputValues?.name) {
      showSnackbar({
        type: 'error',
        body: 'please enter the name',
        header: 'Validation failed',
      });
      return;
    }
    setLoading(true);
    try {
      SIGN_UP(formState?.inputValues, (res: any) => {
        if (res.success) {
          setLoading(false);
          // go for verification email
          console.log('email =======>', formState?.inputValues?.email);
          console.log('code =======>', res?.user?.code);
          navigate('otpverification', {
            email: formState?.inputValues?.email,
            code: res?.user?.code,
            screen: 'signup',
          });
          showSnackbar({
            type: 'success',
            body: res?.message,
            header: 'User Signup',
          });
        } else {
          console.log('error =======>', res?.message);
        }
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
            id="name"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['name']}
            placeholder="Name"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.user}
            keyboardType="name-phone-pad"
            value={formState.inputValues.name}
          />
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
            <Loader text="Signing Up..." color={COLORS.primary} size={50} />
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
