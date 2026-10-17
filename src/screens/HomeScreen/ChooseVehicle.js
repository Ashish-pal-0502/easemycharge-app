import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import RightArrow from '../../assets/welcome/rightArrow.png';
import {fonts} from './../../config/fonts';

const ChooseVehicle = ({navigation}) => {
  const handlePress = vehicleType => {
    console.log(`${vehicleType} clicked`);

    switch (vehicleType) {
      case 'Two Wheeler':
        navigation.navigate('TwoWheelerManufacturer');
        break;
      case 'Three Wheeler':
        navigation.navigate('ThreeWheelerManufacturer');
        break;
      case 'Four Wheeler':
        navigation.navigate('Manufacturer');
        break;
      case 'Other':
        navigation.navigate('HeavyVehicleManufacturer');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.headingText}>Choose Your Vehicle</Text>
      <Text style={styles.vehicleType}>
        Type of Vehicle <Image source={RightArrow} style={styles.rightArrow} />
      </Text>

      <View style={styles.vehicleContainer}>
        <TouchableOpacity
          style={styles.vehicleBox}
          onPress={() => handlePress('Two Wheeler')}>
          <Text style={styles.vehicleText}>Two Wheeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vehicleBox}
          onPress={() => handlePress('Three Wheeler')}>
          <Text style={styles.vehicleText}>Three Wheeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vehicleBox}
          onPress={() => handlePress('Four Wheeler')}>
          <Text style={styles.vehicleText}>Four Wheeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vehicleBox}
          onPress={() => handlePress('Other')}>
          <Text style={styles.vehicleText}>Other</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseVehicle;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
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
  headingText: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    color: '#000000',
  },
  vehicleType: {
    fontFamily: fonts.Medium,

    fontSize: 20,
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
  vehicleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  vehicleBox: {
    width: '40%',
    height: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38B6FF',
    borderRadius: 14,
    marginBottom: 30,
  },
  vehicleText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
