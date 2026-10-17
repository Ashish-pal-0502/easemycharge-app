


import React from 'react';
import {StyleSheet, View} from 'react-native';
import ScreenHeader from './../../components/ScreenHeader/ScreenHeader';
import VehicleCard from './../../components/Card/VehicleCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image1 from '../../assets/twoWheelerManufacturer/ather.png';
import Image2 from '../../assets/twoWheelerManufacturer/ola.png';
import Image3 from '../../assets/twoWheelerManufacturer/okinawa.png';
import Image4 from '../../assets/twoWheelerManufacturer/revolt.png';

import {vehiclesByBrand} from '../../data/vehicles';

const TwoWheelerManufacturer = ({navigation}) => {
  const manufacturers = [
    {id: 1, src: Image1, name: 'Ather'},
    {id: 2, src: Image2, name: 'Ola'},
    {id: 3, src: Image3, name: 'Okinawa'},
    {id: 4, src: Image4, name: 'Revolt'},
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
        {manufacturers.map(item => (
          <VehicleCard
            key={item.id}
            imageSource={item.src}
            onPress={() => handlePress(item.name)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TwoWheelerManufacturer;

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
