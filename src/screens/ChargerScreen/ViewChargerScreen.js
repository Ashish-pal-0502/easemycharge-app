

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import RightArrow from '../../assets/welcome/rightArrow.png';
import { fonts } from './../../config/fonts';
import apiClient from './../../api/client';

const ViewChargerScreen = ({ navigation }) => {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchChargers = useCallback(async () => {
    try {
      const res = await apiClient.get('/chargers/mine/list');

    
      
      if (res.ok) {
        setChargers(res.data?.data || []);
      } else {
        // If the user is not an approved owner, the backend throws a 403
        if (res.status === 403) {
          Alert.alert('Access Denied', 'You need an approved owner profile to view chargers.');
        } else {
          Alert.alert('Error', res.data?.message || 'Failed to load chargers');
        }
        setChargers([]);
      }
    } catch (e) {
      console.warn('Failed to load chargers', e);
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Use useFocusEffect so it re-fetches every time you navigate back to this screen
  // (e.g., after adding a new charger, the list will automatically update)
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchChargers();
    }, [fetchChargers])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchChargers();
  };

  const renderItem = ({ item }) => {
    // Format the address safely based on your Mongoose schema
    const addressString = item.address
      ? [item.address.line1, item.address.city, item.address.state].filter(Boolean).join(', ')
      : 'No address provided';

    // Determine status pill colors based on backend `isActive` or `status`
    const isAvailable = item.isActive && item.status === 'active';
    const statusLabel = isAvailable ? 'Active' : 'Inactive';

    return (
      <TouchableOpacity
        style={styles.card}
  onPress={() => navigation.navigate('ChargerDetail', { charger: item })}>
        
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <View
            style={[
              styles.statusPill,
              isAvailable ? styles.statusAvailable : styles.statusInUse,
            ]}>
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>
        
        <Text style={styles.cardAddress} numberOfLines={2}>{addressString}</Text>
        
        <View style={styles.cardFooter}>
          <Text style={styles.cardMeta}>
            {item.connectorTypes?.[0] || 'N/A'} · {item.powerKW} kW
          </Text>
          <Text style={styles.cardPrice}>₹{item.pricePerUnit}/{item.pricingType === 'per_hour' ? 'hr' : 'kWh'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.headingText}>My Chargers</Text>
      <Text style={styles.subHeading}>
        {loading ? 'Loading…' : `${chargers.length} total`}{' '}
        <Image source={RightArrow} style={styles.rightArrow} />
      </Text>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#38B6FF" />
        </View>
      ) : chargers.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>No chargers yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap "Add Charger" to create your first one.
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddCharger')}>
            <Text style={styles.addButtonText}>ADD CHARGER</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={chargers}
          keyExtractor={item => item._id} 
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#38B6FF"
              colors={['#38B6FF']}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ViewChargerScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: { width: 20, height: 25, resizeMode: 'contain' },
  logo: {
    width: 42,
    height: 49,
    resizeMode: 'contain',
    position: 'absolute',
    left: '54%',
    transform: [{ translateX: -21 }],
  },
  headingText: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    color: '#000',
  },
  subHeading: {
    fontFamily: fonts.Medium,
    fontSize: 20,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#38B6FF',
  },
  rightArrow: { width: 20, height: 11 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    paddingHorizontal: 30,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: '#fff',
    letterSpacing: 1,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E5EAF0',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusAvailable: { backgroundColor: '#E6F7ED' },
  statusInUse: { backgroundColor: '#FFF4E6' },
  statusText: {
    fontFamily: fonts.Medium,
    fontSize: 11,
    color: '#000',
  },
  cardAddress: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#797981',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMeta: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#38B6FF',
  },
  cardPrice: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#000',
  },
});