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
import CenterImage from '../../assets/appIntro/trips.png';
import RightArrowBg from '../../assets/appIntro/rightarrowbg.png';
import RightArrow from '../../assets/appIntro/rightarrow.png';
import {fonts} from './../../config/fonts';

const AppIntro3 = ({navigation}) => {
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
        <Text style={styles.subheading}>Plan EV Trips</Text>
        <Text style={styles.description}>
          Effotlessly plan your EV trips with smart trip planning.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.indicators}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AppIntro4')}>
          <View style={styles.arrowContainer}>
            <Image
              source={RightArrowBg}
              style={styles.arrowBg}
              resizeMode="contain"
            />
            <Image
              source={RightArrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppIntro3;

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
  arrowContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBg: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  arrow: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
});
