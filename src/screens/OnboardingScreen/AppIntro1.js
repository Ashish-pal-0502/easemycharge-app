import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/Logo.png';
import RightArrowBg from '../../assets/appIntro/rightarrowbg.png';
import RightArrow from '../../assets/appIntro/rightarrow.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../config/fonts';

const AppIntro1 = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.appName}>EaseMyCharge</Text>
      </View>

      <View style={styles.bottomSection}>
        {/* <TouchableOpacity>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity> */}

        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AppIntro2')}>
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

export default AppIntro1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 100,
  },
  appName: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    color: '#000',
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
    marginLeft: 160,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#38B6FF', // Active screen indicator color
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
    resizeMode: 'contain', // Ensures the full background image is visible
  },
  arrow: {
    width: 20, // Increase width if needed to fit better
    height: 20, // Increase height if needed to fit better
    tintColor: '#fff', // Optional: change arrow color
    resizeMode: 'contain', // Ensures the arrow image fits within the background
  },
});
