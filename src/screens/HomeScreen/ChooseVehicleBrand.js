// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   Text,
//   FlatList,
// } from 'react-native';
// import ScreenHeader2 from './../../components/ScreenHeader/ScreenHeader2';

// const ChooseVehicleBrand = ({route, navigation}) => {
//   const {manufacturer = '', brands = []} = route.params || {};

//   console.log("jan", manufacturer, brands)

//   const handlePress = brand => {
//     navigation.navigate('VehicleList', {
//       brand: brand.name,
//       vehicles: brand.vehicles || [],
//     });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.mainContainer}>
//         <ScreenHeader2 heading={'Choose Your EV'} brand={manufacturer} />
//         <FlatList
//           data={brands}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.brandsContainer}
//           renderItem={({item}) => (
//             <TouchableOpacity
//               style={styles.brandCard}
//               onPress={() => handlePress(item)}>
//               <Image source={item.logo} style={styles.brandLogo} />
//               <Text style={styles.brandName}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ChooseVehicleBrand;

// const styles = StyleSheet.create({
//   safeArea: {flex: 1},
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   brandsContainer: {
//     alignItems: 'flex-start',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   brandCard: {
//     width: '45%',
//     marginHorizontal: 8,
//     marginBottom: 20,
//     padding: 15,
//     borderRadius: 14,
//     borderWidth: 2,
//     borderColor: '#38B6FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   brandLogo: {width: 80, height: 80, resizeMode: 'contain', marginBottom: 10},
//   brandName: {fontSize: 16, fontWeight: 'bold', color: '#000'},
// });

import React from 'react';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
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