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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'; // Make sure moment is installed (it is in your package.json)

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';
import apiClient from './../../api/client';

const MyBookingScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch Bookings (Handles both initial load, refresh, and pagination)
  const fetchBookings = useCallback(async (pageNum = 1, isRefresh = false) => {
    if (pageNum === 1 && !isRefresh) setLoading(true);
    if (pageNum > 1) setLoadingMore(true);

    try {
      const res = await apiClient.get(`/bookings/mine?page=${pageNum}&limit=10`);
      
      if (res.ok) {
        const newBookings = res.data?.data || [];
        const meta = res.data?.meta;

        if (isRefresh || pageNum === 1) {
          setBookings(newBookings);
        } else {
          setBookings(prev => [...prev, ...newBookings]);
        }

        // Check if there are more pages
        if (meta) {
          setHasMore(pageNum < Math.ceil(meta.total / meta.limit));
        } else {
          setHasMore(newBookings.length === 10); // Fallback
        }
      } else {
        Alert.alert('Error', res.data?.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.warn('Fetch bookings error:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  // Refetch every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchBookings(1);
    }, [fetchBookings])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchBookings(1, true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBookings(nextPage);
    }
  };

  // Helper to format dates
  const formatDate = (dateString) => {
    return moment(dateString).format('MMM Do, YYYY');
  };
  
  const formatTime = (dateString) => {
    return moment(dateString).format('hh:mm A');
  };

  // Helper to determine status styling
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return { bg: '#E6F7ED', text: '#1E8E3E' }; // Green
      case 'completed':
        return { bg: '#E8F0FE', text: '#1A73E8' }; // Blue
      case 'cancelled':
      case 'failed':
        return { bg: '#FCE8E6', text: '#D93025' }; // Red
      default:
        return { bg: '#FFF4E6', text: '#E37400' }; // Orange (Pending)
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    const chargerName = item.chargerId?.name || 'Unknown Charger';

    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BookingDetails', { booking: item })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="ev-station" size={24} color="#38B6FF" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.chargerName} numberOfLines={1}>{chargerName}</Text>
            <Text style={styles.bookingId}>ID: {item._id.slice(-6).toUpperCase()}</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {item.status?.toUpperCase() || 'PENDING'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#797981" />
            <Text style={styles.detailText}>{formatDate(item.startTime)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#797981" />
            <Text style={styles.detailText}>
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
            </Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>₹{item.totalAmount || 0}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.headingText}>My Bookings</Text>
      <Text style={styles.subHeading}>
        {loading ? 'Loading…' : `${bookings.length} bookings found`}
      </Text>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#38B6FF" />
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={64} color="#D3EAF7" />
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>
            You haven't booked any charging sessions yet.
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Charger')} // Change to your Home/Charger tab route
          >
            <Text style={styles.actionButtonText}>FIND A CHARGER</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ marginVertical: 20 }} color="#38B6FF" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F7F9FC', paddingTop: 20 },
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
    fontFamily: fonts.Bold,
    fontSize: 32,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    color: '#000',
  },
  subHeading: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    color: '#797981',
  },
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    textAlign: 'center',
    marginBottom: 24,
  },
  actionButton: {
    paddingHorizontal: 30,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: '#fff',
    letterSpacing: 1,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  
  // Card Styles
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  chargerName: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  bookingId: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    color: '#797981',
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: fonts.Bold,
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 12,
    borderRadius: 10,
  },
  priceLabel: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#797981',
  },
  priceValue: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
  },
});