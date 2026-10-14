
import React from 'react';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import CarCard from '../../components/Card/CarCard';
import ScreenHeader2 from './../../components/ScreenHeader/ScreenHeader2';

const VehicleList = ({route, navigation}) => {
  const {brand = '', vehicles = []} = route.params || {};

  console.log("br", brand, vehicles)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScreenHeader2 heading={'Choose Your EV'} brand={brand} />
        {/* Car Cards */}
        <FlatList
          data={vehicles}
          renderItem={({item}) => (
            <CarCard carImage={item.image} carName={item.name} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.carsContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 50,
  },
  carsContainer: {
    alignItems: 'start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});