import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Close from '../../assets/trip/close.png';
import NavigationStart from '../../assets/trip/navigationStart.png';
import Location from '../../assets/trip/location.png';
import EmptyImage from '../../assets/trip/emptyImage.png';
import Logo from '../../assets/logo/Logo.png';
import {fonts} from './../../config/fonts';

const TripScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* First row: Logo and first Search bar */}
        <Image source={Logo} style={styles.logo} />
        <View style={styles.searchBar}>
          <Image source={NavigationStart} style={styles.icon} />
          <TextInput
            placeholder="Your Current Location"
            style={styles.searchInput}
            placeholderTextColor="#8e8e93"
          />
          <Image source={Close} style={styles.icon} />
        </View>
      </View>

      {/* Second row: Second Search bar aligned to the right */}
      <View style={styles.secondSearchBarContainer}>
        <Text style={styles.secondLogoImagewidth}></Text>

        <View style={styles.searchBar}>
          <Image source={Location} style={styles.icon} />
          <TextInput
            placeholder="Your Destination Location"
            style={styles.searchInput}
            placeholderTextColor="#8e8e93"
          />
          <Image source={Close} style={styles.icon} />
        </View>
      </View>

      <Text style={styles.headingText}>Your recent searches</Text>
      {/* Centered Empty Image and Text */}
      <View style={styles.centeredContainer}>
        <Image source={EmptyImage} style={styles.emptyImage} />
        <Text style={styles.imageText}>
          Currently Searches History Are Empty
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TripScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 50,
  },
  secondLogoImagewidth: {
    width: 50,
  },
  secondSearchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 10,
  },
  emptyImage: {
    width: 300,
    height: 300,
  },
  headingText: {
    padding: 30,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    textAlign: 'left',
  },
  imageText: {
    color: 'rgba(0, 0, 0, 0.55)',
    fontSize: 16,
    fontFamily: fonts.SemiBold,
  },
});
