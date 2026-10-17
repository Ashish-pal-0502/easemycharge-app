

import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader2 from './../../components/ScreenHeader/ScreenHeader2';
import CarCard from './../../components/Card/CarCard';

const ChooseVehicleBrand = ({route, navigation}) => {
  const {manufacturer = '', brands = []} = route.params || {};

  const handlePress = brand => {
    navigation.navigate('VehicleList', {
      brand: brand.name,
      vehicles: brand.vehicles || [],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScreenHeader2 heading={'Choose Your EV'} brand={manufacturer} />
        <FlatList
          data={brands}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.brandsContainer}
          renderItem={({item}) => (
            <CarCard
              carImage={item.logo}
              carName={item.name}
              onPress={() => handlePress(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseVehicleBrand;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  brandsContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});