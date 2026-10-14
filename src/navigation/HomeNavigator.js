import { View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import ChooseVehicle from './../screens/HomeScreen/ChooseVehicle';
import Manufacturer from './../screens/HomeScreen/Manufacturer';
import ThreeWheelerManufacturer from './../screens/HomeScreen/ThreeWheelerManufacturer';
import HeavyVehicleManufacturer from './../screens/HomeScreen/HeavyVehicleManufacturer';
import TwoWheelerManufacturer from './../screens/HomeScreen/TwoWheelerManufacturer';
import ChooseVehicleBrand from './../screens/HomeScreen/ChooseVehicleBrand';
import VehicleList from './../screens/HomeScreen/VehicleList';
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="ChooseVehicle">
          <Stack.Screen
            name="ChooseVehicle"
            component={ChooseVehicle}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Manufacturer"
            component={Manufacturer}
            options={{headerShown: false}}
          />
                    <Stack.Screen
            name="ThreeWheelerManufacturer"
            component={ThreeWheelerManufacturer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HeavyVehicleManufacturer"
            component={HeavyVehicleManufacturer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TwoWheelerManufacturer"
            component={TwoWheelerManufacturer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChooseVehicleBrand"
            component={ChooseVehicleBrand}
            options={{headerShown: false}}
          />

          <Stack.Screen
  name="VehicleList"
  component={VehicleList}
  options={{headerShown: false}}
/>
      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default HomeNavigator;
