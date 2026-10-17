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
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="ProfileScreen">
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default ProfileNavigator;
