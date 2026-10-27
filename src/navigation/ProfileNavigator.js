import { View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import BookingDetailsScreen from './../screens/MyBookings/BookingDetailScreen';
import MyBookingScreen from './../screens/MyBookings/MyBookingScreen';
import EditProfileScreen from './../screens/ProfileScreen/EditProfileScreen';
import HelpSupportScreen from './../screens/UtilityScreens/HelpSupportScreen';
import PrivacyPolicyScreen from './../screens/UtilityScreens/PrivacyPolicyScreen';
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
          <Stack.Screen
            name="MyBookingScreen"
            component={MyBookingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookingDetails"
            component={BookingDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HelpSupportScreen"
            component={HelpSupportScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}} 
        />


      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default ProfileNavigator;
