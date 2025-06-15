import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {COLORS} from '../constants';
import {OtpInput} from 'react-native-otp-entry';
import Button from '../components/Button';
import {useTheme} from '../theme/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {VERIFY_EMAIL} from '../Redux/Reducers/Auth/actions';
import {showSnackbar} from '../components/Snackbar';
import Loader from '../components/Loader';
type Nav = {
  navigate: (value: string) => void;
};

const OTPVerification = ({route}: any) => {
  const {navigate} = useNavigation<Nav>();
  const [time, setTime] = useState(59);
  const {colors, dark} = useTheme();
  const params = route?.params;
  const [otp, setOtp] = useState('');
  const [filled, setFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const title = () => {
    if (params?.screen === 'signup') {
      return 'Account Verification';
    } else {
      return 'Password Reset';
    }
  };
  const messageTxt = () => {
    if (params?.screen === 'signup') {
      return `Code has been send to your ${params?.email}`;
    }
  };

  const verifyCode = () => {
    console.log('data', otp.length);
    if (otp.length < 4) {
      showSnackbar({
        type: 'error',
        body: 'please enter the code',
        header: 'Validation failed',
      });
      return;
    }
    const data = {
      email: params?.email,
      code: params?.code,
    };
    if (!data?.email || !data?.code) {
      showSnackbar({
        type: 'error',
        body: `email: ${data?.email} code: ${data?.code}`,
        header: 'Validation Failed',
      });
      return;
    }

    try {
      setLoading(true);
      console.log('verify-email data', JSON.stringify(data, null, 2));
      VERIFY_EMAIL(data, (res: any) => {
        if (res?.success) {
          navigate('login');
          showSnackbar({
            type: 'success',
            body: res?.message,
            header: 'Success',
          });
          console.log('verify-email data', JSON.stringify(res, null, 2));
        }
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Header title={title()} />
        <ScrollView>
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}>
            {messageTxt()}
          </Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={text => {
              setOtp(text);
              if (text.length === 4) {
                setFilled(true);
              } else {
                setFilled(false);
              }
            }}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            onFilled={text => {
              console.log(`OTP is ${text}`);
              setFilled(true);
            }}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
                borderColor: dark ? COLORS.gray : COLORS.secondaryWhite,
                borderWidth: 0.4,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: dark ? COLORS.white : COLORS.black,
              },
            }}
          />
          <View style={styles.codeContainer}>
            <Text
              style={[
                styles.code,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Resend code in
            </Text>
            <Text style={styles.time}>{`  ${time}  `}</Text>
            <Text
              style={[
                styles.code,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              s
            </Text>
          </View>
        </ScrollView>
        {filled ? (
          !loading ? (
            <Button
              title="Verify"
              style={styles.button}
              filled
              onPress={() => {
                if (params?.screen === 'signup') {
                  verifyCode();
                } else {
                  navigate('createnewpassword');
                }
              }}
            />
          ) : (
            <Loader size={50} color={COLORS.primary} text="Verifying..." />
          )
        ) : (
          <></>
        )}
        {/* {loading && <Loader />} */}
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
  title: {
    fontSize: 18,
    fontFamily: 'Urbanist Medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 54,
  },
  OTPStyle: {
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  code: {
    fontSize: 18,
    fontFamily: 'Urbanist Medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'Urbanist Medium',
    fontSize: 18,
    color: COLORS.primary,
  },
  button: {
    borderRadius: 32,
  },
});

export default OTPVerification;
