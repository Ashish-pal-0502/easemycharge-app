import { View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import ChooseVehicle from './../screens/HomeScreen/ChooseVehicle';
import ChooseVehicleBrand from './../screens/HomeScreen/ChooseVehicleBrand';
import HeavyVehicleManufacturer from './../screens/HomeScreen/HeavyVehicleManufacturer';
import Manufacturer from './../screens/HomeScreen/Manufacturer';
import ThreeWheelerManufacturer from './../screens/HomeScreen/ThreeWheelerManufacturer';
import TwoWheelerManufacturer from './../screens/HomeScreen/TwoWheelerManufacturer';
import VehicleList from './../screens/HomeScreen/VehicleList';
import OnboardingScreen from './../screens/OnboardingScreen/OnboardingScreen';
import GetStarted from './../screens/AuthScreen/GetStarted';
import WelcomeAuth from './../screens/AuthScreen/WelcomeAuth';
import GetVerified from './../screens/AuthScreen/GetVerified';
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="OnboardingScreen">

           <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="WelcomeAuth"
            component={WelcomeAuth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetVerified"
            component={GetVerified}
            options={{headerShown: false}}
          />
    
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
