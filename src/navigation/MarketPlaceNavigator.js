import 'react-native-gesture-handler';
import {View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from './../screens/CartScreen/CartScreen';
import PhoneVerify1 from './../screens/Checkout/PhoneVerify1';
import PhoneVerify2 from './../screens/Checkout/PhoneVerify2';
import AddressVerify1 from './../screens/Checkout/AddressVerify1';
import AddressVerify2 from './../screens/Checkout/AddressVerify2';
import PaymentVerify from './../screens/Checkout/PaymentVerify';
import MarketPlaceScreen from './../screens/BottomTabScreens/MarketPlaceScreen';
const Stack = createStackNavigator();

const MarketPlaceNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="MarketPlaceScreen">
          <Stack.Screen
            name="MarketPlaceScreen"
            component={MarketPlaceScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PhoneVerify1"
            component={PhoneVerify1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PhoneVerify2"
            component={PhoneVerify2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddressVerify1"
            component={AddressVerify1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddressVerify2"
            component={AddressVerify2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentVerify"
            component={PaymentVerify}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </View>
    </>
  );
};

export default MarketPlaceNavigator;
