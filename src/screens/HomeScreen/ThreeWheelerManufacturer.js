import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ScreenHeader from './../../components/ScreenHeader/ScreenHeader';

import Image3 from '../../assets/threeWheelerManufacturer/euler.png';
import Image4 from '../../assets/threeWheelerManufacturer/kineticgreen.png';
import Image2 from '../../assets/threeWheelerManufacturer/mahindra.png';
import Image1 from '../../assets/threeWheelerManufacturer/piaggio.png';
import VehicleCard from '../../components/Card/VehicleCard';
import { vehiclesByBrand } from '../../data/vehicles';


const ThreeWheelerManufacturer = ({navigation}) => {
  const images = [
    {id: 1, src: Image1, name: 'Piaggio'},
    {id: 2, src: Image2, name: 'Mahindra'},
    {id: 3, src: Image3, name: 'Euler'},
    {id: 4, src: Image4, name: 'Kinetic Green'},
  ];

  
    const handlePress = name => {
    const vehicles = vehiclesByBrand?.[name] ?? [];
    navigation.navigate('VehicleList', {brand: name, vehicles});
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScreenHeader
        chooseVehicleType={'Manufacturer'}
        chooseVehicle={"Let's Choose Your Ride"}
      />
      <View style={styles.cardList}>
        {images.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item.name)}>
            <VehicleCard imageSource={item.src} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ThreeWheelerManufacturer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'left',
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
