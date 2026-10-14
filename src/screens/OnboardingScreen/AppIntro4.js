import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/Logo.png';
import RightarrowBlack from '../../assets/appIntro/rightarrowblack.png';
import CenterImage from '../../assets/appIntro/journey.png';
import {fonts} from '../../config/fonts';

const AppIntro4 = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <Image source={Logo} style={styles.logo} />
        <TouchableOpacity style={styles.skipContainer}>
          <Text
            style={styles.skipText}
            onPress={() => navigation.navigate('Welcome')}>
            Skip
          </Text>
          <Image source={RightarrowBlack} style={styles.rightArrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.appName}>EaseMyCharge</Text>

        <Image source={CenterImage} style={styles.centerImage} />
        <Text style={styles.subheading}>Recharge Your Journey</Text>
        <Text style={styles.description}>
          Seamlessly Charge Your Electric Vehicle.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.indicators}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppIntro4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
  skipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.55)',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  rightArrow: {
    width: 18,
    height: 18,
    tintColor: 'rgba(0, 0, 0, 0.55)',
    resizeMode: 'contain',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 50,
  },
  appName: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    color: '#000',
  },
  centerImage: {
    width: 400,
    height: 280,
    resizeMode: 'contain',
    marginTop: 80,
  },
  subheading: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    color: '#000',
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: '#525252',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  backText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.55)',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#38B6FF',
  },
  getStartedButton: {
    backgroundColor: '#38B6FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.Medium,
  },
});
