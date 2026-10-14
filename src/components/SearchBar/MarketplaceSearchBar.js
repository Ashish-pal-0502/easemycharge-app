import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import SearchIcon from '../../assets/marketplace/search.png';
import MicIcon from '../../assets/marketplace/mic.png';

const MarketplaceSearchBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={SearchIcon} style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search categories..."
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={MicIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default MarketplaceSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.19)',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(245, 242, 247, 0.67)',
    height: 50,
    marginHorizontal: 20,
    marginTop: 10,
  },

  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
