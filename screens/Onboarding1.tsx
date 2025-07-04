import React, { useEffect } from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { COLORS, images } from '../constants';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type Nav = {
  navigate: (value: string) => void
}

const Onboarding1 = () => {
  const { navigate } = useNavigation<Nav>();
  // add useeffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('onboarding2');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); // run only once after component mounts

  return (
    <ImageBackground
      source={images.splashOnboarding}
      style={styles.area}>
      <LinearGradient
        // Background linear gradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}>
        <Text style={styles.greetingText}>Welcome to 👋</Text>
        <Text style={styles.logoName}>Taily</Text>
        <Text style={styles.subtitle}>The best pet food delivery app of the century to make your day great!</Text>
      </LinearGradient>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 270,
    paddingHorizontal: 16
  },
  greetingText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: "Urbanist Bold",
    marginVertical: 12
  },
  logoName: {
    fontSize: 76,
    color: COLORS.primary,
    fontFamily: 'extraBold',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 12,
    fontFamily: "Urbanist SemiBold",
  }
})

export default Onboarding1;