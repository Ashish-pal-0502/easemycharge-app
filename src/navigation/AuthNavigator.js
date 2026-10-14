import { View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import WelcomeAuth from './../screens/AuthScreen/WelcomeAuth';
import GetStarted from './../screens/AuthScreen/GetStarted';
import GetVerified from './../screens/AuthScreen/GetVerified';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="WelcomeAuth">
          <Stack.Screen
            name="WelcomeAuth"
            component={WelcomeAuth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetVerified"
            component={GetVerified}
            options={{headerShown: false}}
          />
      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default AuthNavigator;
