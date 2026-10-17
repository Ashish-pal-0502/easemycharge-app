
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarCard from '../../components/Card/CarCard';
import ScreenHeader2 from './../../components/ScreenHeader/ScreenHeader2';

const VehicleList = ({route, navigation}) => {
  const {brand = '', vehicles = []} = route.params || {};



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScreenHeader2 heading={'Choose Your EV'} brand={brand} />
      
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
  },
  carsContainer: {
    alignItems: 'start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});