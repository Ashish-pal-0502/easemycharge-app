import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import RightArrow from '../../assets/welcome/rightArrow.png';
import {fonts} from './../../config/fonts';
import colors from './../../config/colors';
import {useNavigation} from '@react-navigation/native';

const ScreenHeader = ({chooseVehicle, chooseVehicleType}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton}></Image>
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.textHeading}>{chooseVehicle}</Text>
      <Text style={styles.vehicleType}>
        {chooseVehicleType}
        <Image source={RightArrow} style={styles.rightArrow} />
      </Text>
    </SafeAreaView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginTop: 85,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    position: 'absolute',
    left: '54%',
    transform: [{translateX: -21}],
  },
  textHeading: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    color: colors.secondary,
  },
  vehicleType: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    color: '#38B6FF',
  },
  rightArrow: {
    width: 20,
    height: 11,
  },
});
