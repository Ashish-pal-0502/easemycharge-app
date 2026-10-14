import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import MarketplaceCard from './../../components/Card/MarketplaceCard';

import Battery from '../../assets/marketplace/battery.png';
import Charger from '../../assets/marketplace/charger.png';
import Back from '../../assets/welcome/backbutton.png';
import Icon from '../../assets/BottomTabIcon/marketplace.png';
import {fonts} from './../../config/fonts';
import MarketplaceSearchBar from './../../components/SearchBar/MarketplaceSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';


const data = [
  {
    id: '1',
    title: 'Battery',
    image: Battery,
    description: '120 Products',
    price: '500',
  },
  {
    id: '2',
    title: 'Charger',
    image: Charger,
    description: '120 Products',
    price: '500',
  },
  {
    id: '3',
    title: 'Battery',
    image: Battery,
    description: '120 Products',
    price: '500',
  },
  {
    id: '4',
    title: 'Charger',
    image: Charger,
    description: '120 Products',
    price: '500',
  },
  {
    id: '5',
    title: 'Charger',
    image: Charger,
    description: '120 Products',
    price: '500',
  },
];

const MarketPlaceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} onPress={() => navigation.goBack()}>
        <Image source={Back} style={styles.backButton} />
        <Text style={styles.headingText}>MarketPlace</Text>
      </View>

      <MarketplaceSearchBar />

      <View style={styles.borderLine} />

      <View style={styles.section}>
        <View style={styles.iconContainer}>
          <Image source={Icon} style={styles.icon} />
        </View>
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>Pure Power, Pure Pleasure</Text>
          <Text style={styles.sectionDescription}>
            Marketplace for EV parts
          </Text>
        </View>
      </View>

      {/* Cards List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MarketplaceCard
            id={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
            price={item.price}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default MarketPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  backButton: {
    width: 24,
    height: 20,
    marginRight: 12,
  },
  headingText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: fonts.Medium,
  },
  borderLine: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  iconContainer: {
    backgroundColor: '#EBEEF2',
    padding: 6,
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  sectionText: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    margin: 10,
  },
});
