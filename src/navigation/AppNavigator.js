import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import ChargerIcon from '../assets/BottomTabIcon/charger.png';
import MarketPlaceIcon from '../assets/BottomTabIcon/marketplace.png';
import ProfileIcon from '../assets/BottomTabIcon/profile.png';
import TripIcon from '../assets/BottomTabIcon/trip.png';

import HomeNavigator from './HomeNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MarketPlaceScreen from './../screens/BottomTabScreens/MarketPlaceScreen';
import TripScreen from './../screens/BottomTabScreens/TripScreen';
import ChargersScreen from './../screens/BottomTabScreens/ChargersScreen';
import MarketPlaceNavigator from './MarketPlaceNavigator';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Charger"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#7B61FF',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#1F1F25',
          borderTopWidth: 0,
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Charger"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ChargerIcon}
              style={[
                styles.icon,
                { tintColor: focused ? '#7B61FF' : '#888888' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Trip"
        component={TripScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={TripIcon}
              style={[
                styles.icon,
                { tintColor: focused ? '#7B61FF' : '#888888' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="MarketPlace"
        component={MarketPlaceNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={MarketPlaceIcon}
              style={[
                styles.icon,
                { tintColor: focused ? '#7B61FF' : '#888888' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ChargersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ProfileIcon}
              style={[
                styles.icon,
                { tintColor: focused ? '#7B61FF' : '#888888' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  icon: {
    width: 24,
    height: 24,
  },
};

export default AppNavigator;