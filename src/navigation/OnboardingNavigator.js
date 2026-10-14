import { View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import AppIntro1 from './../screens/OnboardingScreen/AppIntro1';
import AppIntro2 from './../screens/OnboardingScreen/AppIntro2';
import AppIntro3 from './../screens/OnboardingScreen/AppIntro3';
import AppIntro4 from './../screens/OnboardingScreen/AppIntro4';
const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Stack.Navigator initialRouteName="AppIntro1">
          <Stack.Screen
            name="AppIntro1"
            component={AppIntro1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppIntro2"
            component={AppIntro2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppIntro3"
            component={AppIntro3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppIntro4"
            component={AppIntro4}
            options={{headerShown: false}}
          />
        
      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default OnboardingNavigator;
