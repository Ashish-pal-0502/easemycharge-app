
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import ChargerIcon from '../assets/BottomTabIcon/charger.png';
import MarketPlaceIcon from '../assets/BottomTabIcon/marketplace.png';
import ProfileIcon from '../assets/BottomTabIcon/profile.png';
import TripIcon from '../assets/BottomTabIcon/trip.png';

import HomeNavigator from './HomeNavigator';
import TripScreen from './../screens/BottomTabScreens/TripScreen';
import MarketPlaceNavigator from './MarketPlaceNavigator';
import AuthNavigator from './AuthNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#38B6FF'; 
const INACTIVE_COLOR = '#676B89'; 
const ACTIVE_BG = '#F2F9FF'; 

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Charger"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Charger" component={HomeNavigator} />
      <Tab.Screen name="Trip" component={TripScreen} />
      <Tab.Screen name="MarketPlace" component={MarketPlaceNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Define labels and icons for each route
        let label = '';
        let IconComponent;

        switch (route.name) {
          case 'Charger':
            label = 'Chargers';
            IconComponent = ChargerIcon;
            break;
          case 'Trip':
            label = 'Trip';
            IconComponent = TripIcon;
            break;
          case 'MarketPlace':
            label = 'Marketplace';
            IconComponent = MarketPlaceIcon;
            break;
          case 'Profile':
            label = 'Profile';
            IconComponent = ProfileIcon;
            break;
          default:
            label = route.name;
            IconComponent = null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={[
              styles.tabItem,
              isFocused && styles.tabItemFocused, // Applies blue bg and bottom border
            ]}
          >
            <View style={styles.iconWrapper}>
              {IconComponent && (
                <Image
                  source={IconComponent}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text
              style={[
                styles.label,
                { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    height: 80,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
  tabItemFocused: {
    backgroundColor: ACTIVE_BG,
    borderBottomWidth: 3,
    borderBottomColor: ACTIVE_COLOR,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_18pt-Medium', // Uses your Inter font
  },
});

export default AppNavigator;