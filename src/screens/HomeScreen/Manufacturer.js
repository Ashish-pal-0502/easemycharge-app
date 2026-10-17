import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import RightArrow from '../../assets/welcome/rightArrow.png';
import ManufacturerCard from './../../components/Card/ManufacturerCard';
import {fonts} from './../../config/fonts';

import Image1 from '../../assets/manufacturer/tata.png';
import Image2 from '../../assets/manufacturer/mahindra.png';
import Image3 from '../../assets/manufacturer/hyundai.png';
import Image4 from '../../assets/manufacturer/mg.png';
import Image5 from '../../assets/manufacturer/kia.png';
import Image6 from '../../assets/manufacturer/bmw.png';
import Image7 from '../../assets/manufacturer/eyc.png';
import Image8 from '../../assets/manufacturer/mercedese.png';
import Image9 from '../../assets/manufacturer/centrion.png';
import Image10 from '../../assets/manufacturer/porsche.png';

// Brand lists per manufacturer — add as needed
import {vehiclesByBrand} from '../../data/vehicles';

const Manufacturer = ({navigation}) => {
  const images = [
    {id: 1, src: Image1, name: 'Tata'},
    {id: 2, src: Image2, name: 'Mahindra'},
    {id: 3, src: Image3, name: 'Hyundai'},
    {id: 4, src: Image4, name: 'MG'},
    {id: 5, src: Image5, name: 'Kia'},
    {id: 6, src: Image6, name: 'BMW'},
    {id: 7, src: Image7, name: 'Byd'},
    {id: 8, src: Image8, name: 'Mercedes'},
    {id: 9, src: Image9, name: 'Citroen'},
    {id: 10, src: Image10, name: 'Porsche'},
  ];

  const handlePress = name => {
    // Get the brand list for this manufacturer from the central data map
    const brandsForManufacturer = vehiclesByBrand[name] || [];

    navigation.navigate('ChooseVehicleBrand', {
      manufacturer: name,
      brands: brandsForManufacturer,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.headingText}>Let's Choose Your Ride</Text>
      <Text style={styles.vehicleType}>
        Manufacturer <Image source={RightArrow} style={styles.rightArrow} />
      </Text>

      <View style={styles.cardList}>
        {images.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item.name)}>
            <ManufacturerCard imageSource={item.src} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Manufacturer;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center'},
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {width: 20, height: 25, resizeMode: 'contain'},
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
  rightArrow: {width: 20, height: 11},
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
});