import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Filter from '../../assets/filterModel/filter.png';
import Search from '../../assets/filterModel/search.png';
import Logo from '../../assets/logo/Logo.png';
import FilterModal from './../../components/Model/FilterModal';

const ChargersScreen = () => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const onClose = () => {
    setFilterModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo on the left */}
        <Image source={Logo} style={styles.logo} />

        {/* Search bar with search and filter icons */}
        <View style={styles.searchBar}>
          <Image source={Search} style={styles.icon} />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#8e8e93"
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Image source={Filter} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <FilterModal visible={isFilterModalVisible} onClose={onClose} />
      </View>
    </SafeAreaView>
  );
};

export default ChargersScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 30,
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
    height: 41,
  },
  icon: {
    width: 18, // Adjusted icon size
    height: 18,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Ensures text is vertically centered
  },
});
