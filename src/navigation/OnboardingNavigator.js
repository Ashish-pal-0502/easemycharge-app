import { View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './../screens/OnboardingScreen/OnboardingScreen';
const Stack = createStackNavigator();

const OnboardingNavigator = () => {
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
      
        </Stack.Navigator>
      </View>
    </>
  );
};

export default OnboardingNavigator;
