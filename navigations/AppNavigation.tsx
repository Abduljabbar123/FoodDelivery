import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  AddNewAddress,
  AddNewCard,
  AddPromo,
  Address,
  Call,
  CancelOrder,
  CancelOrderPaymentMethods,
  Categories,
  ChangeEmail,
  ChangePassword,
  ChangePIN,
  Chat,
  CheckoutOrders,
  CheckoutOrdersAddress,
  CheckoutOrdersCompleted,
  CreateNewPassword,
  CreateNewPIN,
  CustomerService,
  DiscountFoods,
  DriverDetails,
  EditProfile,
  Ereceipt,
  Favourite,
  FillYourProfile,
  Fingerprint,
  FoodDetails,
  FoodDetailsAbout,
  FoodDetailsAddItem,
  FoodDetailsOffers,
  FoodReviews,
  ForgotPasswordEmail,
  ForgotPasswordMethods,
  ForgotPasswordPhoneNumber,
  GiveTipForDriver,
  Inbox,
  Login,
  MyCart,
  Notifications,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Onboarding4,
  Orders,
  OtpVerification,
  PaymentMethods,
  Profile,
  RateTheDriver,
  RateTheStore,
  RecommendedFoods,
  Search,
  SearchingDriver,
  SettingsHelpCenter,
  SettingsInviteFriends,
  SettingsLanguage,
  SettingsNotifications,
  SettingsPayment,
  SettingsPrivacyPolicy,
  SettingsSecurity,
  Signup,
  TopupConfirmPIN,
  TopupEwalletAmount,
  TopupMethods,
  TrackDriver,
  TransactionHistory,
  VideoCall,
  VoiceCall,
  Wallet,
  Welcome,
  WhatsYourMood,
} from '../screens';
import TopupEReceipt from '../screens/TopupEreceipt';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
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
        initialRouteName="(tabs)">
        {/* <Stack.Screen name="(tabs)" component={BottomTabNavigation} /> */}
        <Stack.Screen name="addnewaddress" component={AddNewAddress} />
        <Stack.Screen name="addnewcard" component={AddNewCard} />
        <Stack.Screen name="addpromo" component={AddPromo} />
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="call" component={Call} />
        <Stack.Screen name="cancelorder" component={CancelOrder} />
        <Stack.Screen
          name="cancelorderpaymentmethods"
          component={CancelOrderPaymentMethods}
        />
        <Stack.Screen name="categories" component={Categories} />
        <Stack.Screen name="changeemail" component={ChangeEmail} />
        <Stack.Screen name="changepassword" component={ChangePassword} />
        <Stack.Screen name="changepin" component={ChangePIN} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="checkoutorders" component={CheckoutOrders} />
        <Stack.Screen
          name="checkoutordersaddress"
          component={CheckoutOrdersAddress}
        />
        <Stack.Screen
          name="checkoutorderscompleted"
          component={CheckoutOrdersCompleted}
        />
        <Stack.Screen name="createnewpassword" component={CreateNewPassword} />
        <Stack.Screen name="createnewpin" component={CreateNewPIN} />
        <Stack.Screen name="customerservice" component={CustomerService} />
        <Stack.Screen name="discountfoods" component={DiscountFoods} />
        <Stack.Screen name="driverdetails" component={DriverDetails} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="ereceipt" component={Ereceipt} />
        <Stack.Screen name="favourite" component={Favourite} />
        <Stack.Screen name="fillyourprofile" component={FillYourProfile} />
        <Stack.Screen name="fingerprint" component={Fingerprint} />
        <Stack.Screen name="fooddetails" component={FoodDetails} />
        <Stack.Screen name="fooddetailsabout" component={FoodDetailsAbout} />
        <Stack.Screen
          name="fooddetailsadditem"
          component={FoodDetailsAddItem}
        />
        <Stack.Screen name="fooddetailsoffers" component={FoodDetailsOffers} />
        <Stack.Screen name="foodreviews" component={FoodReviews} />
        <Stack.Screen
          name="forgotpasswordemail"
          component={ForgotPasswordEmail}
        />
        <Stack.Screen
          name="forgotpasswordmethods"
          component={ForgotPasswordMethods}
        />
        <Stack.Screen
          name="forgotpasswordphonenumber"
          component={ForgotPasswordPhoneNumber}
        />
        <Stack.Screen name="givetipfordriver" component={GiveTipForDriver} />
        <Stack.Screen name="inbox" component={Inbox} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="mycart" component={MyCart} />
        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="onboarding4" component={Onboarding4} />
        <Stack.Screen name="orders" component={Orders} />
        <Stack.Screen name="otpverification" component={OtpVerification} />
        <Stack.Screen name="paymentmethods" component={PaymentMethods} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="ratethedriver" component={RateTheDriver} />
        <Stack.Screen name="ratethestore" component={RateTheStore} />
        <Stack.Screen name="recommendedfoods" component={RecommendedFoods} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="searchingdriver" component={SearchingDriver} />
        <Stack.Screen
          name="settingshelpcenter"
          component={SettingsHelpCenter}
        />
        <Stack.Screen
          name="settingsinvitefriends"
          component={SettingsInviteFriends}
        />
        <Stack.Screen name="settingslanguage" component={SettingsLanguage} />
        <Stack.Screen
          name="settingsnotifications"
          component={SettingsNotifications}
        />
        <Stack.Screen name="settingspayment" component={SettingsPayment} />
        <Stack.Screen
          name="settingsprivacypolicy"
          component={SettingsPrivacyPolicy}
        />
        <Stack.Screen name="settingssecurity" component={SettingsSecurity} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="topupconfirmpin" component={TopupConfirmPIN} />
        <Stack.Screen name="topupereceipt" component={TopupEReceipt} />
        <Stack.Screen
          name="topupewalletamount"
          component={TopupEwalletAmount}
        />
        <Stack.Screen name="topupmethods" component={TopupMethods} />
        <Stack.Screen name="trackdriver" component={TrackDriver} />
        <Stack.Screen
          name="transactionhistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="videochat" component={VideoCall} />
        <Stack.Screen name="voicecall" component={VoiceCall} />
        <Stack.Screen name="wallet" component={Wallet} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="whatsyourmood" component={WhatsYourMood} />
        <Stack.Screen name="(tabs)" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
