import React from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import TwoWheelerManuCard from './../../components/Card/TwoWheelerManuCard';
import ScreenHeader from './../../components/ScreenHeader/ScreenHeader';

import Image1 from '../../assets/heavyVehicleManufacturer/tata.png';
import {vehiclesByBrand} from '../../data/vehicles';


const HeavyVehicleManufacturer = ({navigation}) => {
  const images = [{id: 1, src: Image1, name: 'TataHeavyVehicle'}];

  // const handlePress = name => {
  //   console.log(`Clicked on ${name}`);

  //   switch (name) {
  //     case 'TataHeavyVehicle':
  //       navigation.navigate('TataHeavyVehicle');
  //       break;

  //     default:
  //       break;
  //   }
  // };

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
            <TwoWheelerManuCard imageSource={item.src} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HeavyVehicleManufacturer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'left',
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
