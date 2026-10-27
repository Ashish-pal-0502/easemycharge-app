import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';
import apiClient from './../../api/client';

const BookingDetailsScreen = ({ navigation, route }) => {
  const { booking } = route.params || {};
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Booking not found</Text>
      </SafeAreaView>
    );
  }

  // --- Helper Functions ---
  const formatDate = (dateString) => moment(dateString).format('MMMM Do YYYY');
  const formatTime = (dateString) => moment(dateString).format('hh:mm A');
  
  // Calculate duration in hours/minutes
  const start = moment(booking.startTime);
  const end = moment(booking.endTime);
  const durationMins = end.diff(start, 'minutes');
  const durationHours = Math.floor(durationMins / 60);
  const remainingMins = durationMins % 60;
  const durationString = `${durationHours > 0 ? `${durationHours}h ` : ''}${remainingMins > 0 ? `${remainingMins}m` : ''}`;

  // Check if booking can be cancelled
  const isCancellable = 
    booking.status !== 'cancelled' && 
    booking.status !== 'completed' && 
    moment(booking.startTime).isAfter(moment());

  // Status styling
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return { bg: '#E6F7ED', text: '#1E8E3E', icon: 'checkmark-circle' };
      case 'completed':
        return { bg: '#E8F0FE', text: '#1A73E8', icon: 'checkmark-done-circle' };
      case 'cancelled':
        return { bg: '#FCE8E6', text: '#D93025', icon: 'close-circle' };
      default:
        return { bg: '#FFF4E6', text: '#E37400', icon: 'time' };
    }
  };

  const statusStyle = getStatusStyle(booking.status);

  // --- Cancel Logic ---
  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this charging session?',
      [
        { text: 'No, Keep it', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const res = await apiClient.patch(`/bookings/${booking._id}/cancel`, {
                reason: 'Cancelled by user via app',
              });

              if (!res.ok) {
                Alert.alert('Error', res.data?.message || 'Could not cancel booking.');
                return;
              }

              Alert.alert('Cancelled', 'Your booking has been cancelled.', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              Alert.alert('Network Error', 'Could not connect to the server.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Format Charger Address
  const chargerAddress = booking.chargerId?.address
    ? [
        booking.chargerId.address.line1,
        booking.chargerId.address.city,
        booking.chargerId.address.state,
      ]
        .filter(Boolean)
        .join(', ')
    : 'Address not available';

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        {/* Status Banner */}
        <View style={[styles.statusBanner, { backgroundColor: statusStyle.bg }]}>
          <Ionicons name={statusStyle.icon} size={28} color={statusStyle.text} />
          <Text style={[styles.statusBannerText, { color: statusStyle.text }]}>
            {booking.status?.toUpperCase() || 'PENDING'}
          </Text>
        </View>

        {/* Booking ID */}
        <Text style={styles.bookingIdText}>
          Booking ID: #{booking._id.slice(-8).toUpperCase()}
        </Text>

        {/* Charger Info Card */}
        <Text style={styles.sectionTitle}>Charger Details</Text>
        <View style={styles.card}>
          <View style={styles.chargerHeader}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="ev-station" size={28} color="#38B6FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.chargerName}>{booking.chargerId?.name || 'Charger'}</Text>
              <Text style={styles.chargerAddress} numberOfLines={2}>{chargerAddress}</Text>
            </View>
          </View>
        </View>

        {/* Date & Time Card */}
        <Text style={styles.sectionTitle}>Schedule</Text>
        <View style={styles.card}>
          <View style={styles.rowItem}>
            <View style={styles.iconRow}>
              <Ionicons name="calendar-outline" size={20} color="#797981" />
              <Text style={styles.rowLabel}>Date</Text>
            </View>
            <Text style={styles.rowValue}>{formatDate(booking.startTime)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <View style={styles.iconRow}>
              <Ionicons name="time-outline" size={20} color="#797981" />
              <Text style={styles.rowLabel}>Time</Text>
            </View>
            <Text style={styles.rowValue}>
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <View style={styles.iconRow}>
              <Ionicons name="hourglass-outline" size={20} color="#797981" />
              <Text style={styles.rowLabel}>Duration</Text>
            </View>
            <Text style={styles.rowValue}>{durationString}</Text>
          </View>
        </View>

        {/* Payment Summary Card */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.card}>
          <View style={styles.rowItem}>
            <Text style={styles.priceLabel}>Charging Fee</Text>
            <Text style={styles.priceValue}>₹{booking.totalAmount || 0}</Text>
          </View>
          
          {booking.discountAmount > 0 && (
            <View style={styles.rowItem}>
              <Text style={styles.priceLabel}>Discount</Text>
              <Text style={[styles.priceValue, { color: '#1E8E3E' }]}>- ₹{booking.discountAmount}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{booking.totalAmount || 0}</Text>
          </View>
        </View>

        {/* Cancel Button (Only if cancellable) */}
        {isCancellable && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelBooking}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#D93025" />
            ) : (
              <Text style={styles.cancelButtonText}>CANCEL BOOKING</Text>
            )}
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F7F9FC', paddingTop: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
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
  scrollContainer: { paddingHorizontal: 20, paddingTop: 10 },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusBannerText: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    marginLeft: 10,
    letterSpacing: 1,
  },
  bookingIdText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#14323A',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chargerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chargerName: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  chargerAddress: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    lineHeight: 20,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#797981',
    marginLeft: 8,
  },
  rowValue: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 8,
  },
  priceLabel: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#797981',
  },
  priceValue: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: '#000',
  },
  totalLabel: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
  },
  totalValue: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    color: '#38B6FF',
  },
  cancelButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#D93025',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  cancelButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#D93025',
    letterSpacing: 1,
  },
});