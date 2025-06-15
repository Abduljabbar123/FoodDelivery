import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  AddNewAddress,
  Address,
  Chat,
  CreateNewPassword,
  EditProfile,
  ForgotPasswordEmail,
  ForgotPasswordMethods,
  Login,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Onboarding4,
  OtpVerification,
  Signup,
  Welcome,
} from '../screens';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
      setIsLoading(false); // Set loading state to false once the check is complete
    };

    checkIfFirstLaunch();
  }, []);

  if (isLoading) {
    return null; // Render a loader or any other loading state component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // replace the second onboaring1 with login in order to make the user not to see the onboarding
        // when login the next time
        // initialRouteName={isFirstLaunch ? 'onboarding1' : 'welcome'}>
        initialRouteName={'welcome'}>
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="createnewpassword" component={CreateNewPassword} />
        <Stack.Screen
          name="forgotpasswordemail"
          component={ForgotPasswordEmail}
        />
        <Stack.Screen
          name="forgotpasswordmethods"
          component={ForgotPasswordMethods}
        />
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="onboarding4" component={Onboarding4} />
        <Stack.Screen name="otpverification" component={OtpVerification} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
