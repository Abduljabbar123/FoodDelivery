import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '../theme/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {COLORS, icons, images, SIZES} from '../constants';
import SettingsItem from '../components/SettingsItem';
import Button from '../components/Button';
import {LOGOUT} from '../Redux/Reducers/Auth/actions';
import {showSnackbar} from '../components/Snackbar';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {ENV} from '../config/env';
import Loader from '../components/Loader';

type Nav = {
  navigate: (value: string) => void;
};

const Profile = () => {
  const refRBSheet = useRef<any>(null);
  const {dark, colors, setScheme} = useTheme();
  const {navigate} = useNavigation<Nav>();
  const {user, userLoading} = useAppSelector(state => state.auth);
  const [image, setImage] = useState<any>(images.user1);
  const [isDarkMode, setIsDarkMode] = useState(dark);

  useEffect(() => {
    if (user?.photo) {
      setImage({
        uri: ENV.resourceURL + user.photo,
        name: user.photo ? user.photo.split('/').pop() : 'profile.jpg',
        type: 'image/jpeg',
      });
    } else {
      setImage(images.user1);
    }
  }, [user]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setScheme(isDarkMode ? 'light' : 'dark');
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image
            source={images.logo3}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}>
            Profile
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[
              styles.headerIcon,
              {
                tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderProfile = () => {
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
          setImage({uri: imageUri});
        }
      });
    };

    if (userLoading) {
      return <Loader size={50} mainStyles={{marginTop: 50}} />;
    }

    return (
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={image === null ? images.logo3 : image}
            resizeMode="cover"
            style={styles.avatar}
          />
          <TouchableOpacity onPress={pickImage} style={styles.picContainer}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.title,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {user?.name || 'User Name'}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
          ]}>
          {user?.email || 'user@example.com'}
        </Text>
        {user?.nickname && (
          <Text
            style={[
              styles.subtitle,
              {color: dark ? COLORS.secondaryWhite : COLORS.greyscale900},
            ]}>
            {user.nickname}
          </Text>
        )}
      </View>
    );
  };

  const renderSettings = () => {
    return (
      <View style={styles.settingsContainer}>
        <SettingsItem
          icon={icons.cartOutline}
          name="My Cart"
          onPress={() => navigate('mycart')}
        />
        <SettingsItem
          icon={icons.bell3}
          name="My Notification"
          onPress={() => navigate('notifications')}
        />
        <SettingsItem
          icon={icons.location2Outline}
          name="Address"
          onPress={() => navigate('address')}
        />
        <SettingsItem
          icon={icons.userOutline}
          name="Edit Profile"
          onPress={() => navigate('editprofile')}
        />
        <SettingsItem
          icon={icons.bell2}
          name="Notification"
          onPress={() => navigate('settingsnotifications')}
        />
        <SettingsItem
          icon={icons.wallet2Outline}
          name="Payment"
          onPress={() => navigate('settingspayment')}
        />
        <SettingsItem
          icon={icons.shieldOutline}
          name="Security"
          onPress={() => navigate('settingssecurity')}
        />
        <TouchableOpacity
          onPress={() => navigate('settingslanguage')}
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.more}
              resizeMode="contain"
              style={[
                styles.settingsIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
            <Text
              style={[
                styles.settingsName,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Language & Region
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.rightLanguage,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              English (US)
            </Text>
            <Image
              source={icons.arrowRight}
              resizeMode="contain"
              style={[
                styles.settingsArrowRight,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.show}
              resizeMode="contain"
              style={[
                styles.settingsIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}
            />
            <Text
              style={[
                styles.settingsName,
                {
                  color: dark ? COLORS.white : COLORS.greyscale900,
                },
              ]}>
              Dark Mode
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? '#fff' : COLORS.white}
              trackColor={{false: '#EEEEEE', true: COLORS.primary}}
              ios_backgroundColor={COLORS.white}
              style={styles.switch}
            />
          </View>
        </TouchableOpacity>
        <SettingsItem
          icon={icons.lockedComputerOutline}
          name="Privacy Policy"
          onPress={() => navigate('settingsprivacypolicy')}
        />
        <SettingsItem
          icon={icons.infoCircle}
          name="Help Center"
          onPress={() => navigate('settingshelpcenter')}
        />
        <SettingsItem
          icon={icons.people4}
          name="Invite Friends"
          onPress={() => navigate('settingsinvitefriends')}
        />
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.logoutContainer}>
          <View style={styles.logoutLeftContainer}>
            <Image
              source={icons.logout}
              resizeMode="contain"
              style={[
                styles.logoutIcon,
                {
                  tintColor: 'red',
                },
              ]}
            />
            <Text
              style={[
                styles.logoutName,
                {
                  color: 'red',
                },
              ]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, {backgroundColor: colors.background}]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderSettings()}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={SIZES.height * 0.8}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          },
        }}>
        <Text style={styles.bottomTitle}>Logout</Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />
        <Text
          style={[
            styles.bottomSubtitle,
            {
              color: dark ? COLORS.white : COLORS.black,
            },
          ]}>
          Are you sure you want to log out?
        </Text>
        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          <Button
            title="Yes, Logout"
            filled
            style={styles.logoutButton}
            onPress={() => {
              refRBSheet.current.close();
              LOGOUT();
              showSnackbar({
                type: 'success',
                body: 'Logout Successful',
                header: 'Logout',
              });
            }}
          />
        </View>
      </RBSheet>
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
    marginBottom: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 32,
    tintColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  profileContainer: {
    alignItems: 'center',
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
  },
  picContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: 'Urbanist Medium',
    marginTop: 4,
  },
  settingsContainer: {
    marginVertical: 12,
  },
  settingsItemContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  settingsName: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  settingsArrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLanguage: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginRight: 8,
  },
  switch: {
    marginLeft: 8,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust the size of the switch
  },
  logoutContainer: {
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  logoutLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  logoutName: {
    fontSize: 18,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist SemiBold',
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 28,
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12,
  },
});

export default Profile;
