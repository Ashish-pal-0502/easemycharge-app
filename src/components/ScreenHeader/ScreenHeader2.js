

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';

const ScreenHeader2 = ({heading, brand}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      {/* Header row: back left, logo center, empty spacer right */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backWrapper}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        {/* Invisible spacer to keep the logo visually centered */}
        <View style={styles.backWrapper} />
      </View>

      <Text style={styles.headingText}>{heading}</Text>

      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>{brand}</Text>
      </View>
    </View>
  );
};

export default ScreenHeader2;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginTop: 20,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backWrapper: {
    width: 42, // matches logo width so the logo stays centered
    alignItems: 'flex-start',
  },
  backButton: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  logo: {
    width: 42,
    height: 49,
    resizeMode: 'contain',
  },
  headingText: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    textAlign: 'center',
    marginTop: 30,
  },
  brandContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 5,
    alignItems: 'flex-start',
  },
  brandText: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    color: '#38B6FF',
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
});