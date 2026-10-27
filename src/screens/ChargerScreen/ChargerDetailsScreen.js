// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons'; 
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Logo from '../../assets/logo/Logo.png';
// import Back from '../../assets/welcome/backbutton.png';
// import { fonts } from './../../config/fonts';

// const ChargerDetailsScreen = ({ navigation, route }) => {
//   // Extract the charger object passed from the list screen
//   const { charger } = route.params || {};


//   if (!charger) {
//     return (
//       <SafeAreaView style={styles.mainContainer}>
//         <Text style={{ textAlign: 'center', marginTop: 50 }}>Charger not found</Text>
//       </SafeAreaView>
//     );
//   }

//   // Format address
//   const addressString = charger.address
//     ? [
//         charger.address.line1,
//         charger.address.line2,
//         charger.address.city,
//         charger.address.state,
//         charger.address.pincode,
//       ]
//         .filter(Boolean)
//         .join(', ')
//     : 'No address provided';

//   const isActive = charger.isActive && charger.status === 'active';

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={Back} style={styles.backButton} />
//         </TouchableOpacity>
//         <Image source={Logo} style={styles.logo} />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}>
        
//         {/* Title & Status */}
//         <View style={styles.titleRow}>
//           <Text style={styles.headingText}>{charger.name}</Text>
//           <View style={[styles.statusPill, isActive ? styles.statusActive : styles.statusInactive]}>
//             <Text style={styles.statusText}>{isActive ? 'Active' : 'Inactive'}</Text>
//           </View>
//         </View>

//         {/* Location / Address Card */}
//         <View style={styles.card}>
//           <View style={styles.cardRow}>
//             <Ionicons name="location" size={20} color="#38B6FF" style={styles.iconMargin} />
//             <Text style={styles.addressText}>{addressString}</Text>
//           </View>
//           <View style={styles.mapPlaceholder}>
//             <Text style={styles.mapPlaceholderText}>
//                {charger.location?.coordinates?.[1]}, {charger.location?.coordinates?.[0]}
//             </Text>
//           </View>
//         </View>

//         {/* Specs Grid */}
//         <Text style={styles.sectionTitle}>Charger Specifications</Text>
//         <View style={styles.grid}>
//           <View style={styles.gridItem}>
//             <MaterialCommunityIcons name="ev-station" size={24} color="#14323A" />
//             <Text style={styles.gridLabel}>Connector</Text>
//             <Text style={styles.gridValue}>{charger.connectorTypes?.join(', ') || 'N/A'}</Text>
//           </View>
          
//           <View style={styles.gridItem}>
//             <MaterialCommunityIcons name="flash" size={24} color="#14323A" />
//             <Text style={styles.gridLabel}>Power</Text>
//             <Text style={styles.gridValue}>{charger.powerKW} kW</Text>
//           </View>

//           <View style={styles.gridItem}>
//             <Ionicons name="cash-outline" size={24} color="#14323A" />
//             <Text style={styles.gridLabel}>Pricing</Text>
//             <Text style={styles.gridValue}>
//               ₹{charger.pricePerUnit} / {charger.pricingType === 'per_hour' ? 'hr' : 'kWh'}
//             </Text>
//           </View>

//           <View style={styles.gridItem}>
//             <Ionicons name="star" size={24} color="#14323A" />
//             <Text style={styles.gridLabel}>Rating</Text>
//             <Text style={styles.gridValue}>
//               {charger.ratingAvg > 0 ? `${charger.ratingAvg} (${charger.ratingCount})` : 'New'}
//             </Text>
//           </View>
//         </View>

//         {/* Description (If you add it later) */}
//         {charger.description ? (
//           <>
//             <Text style={styles.sectionTitle}>About</Text>
//             <Text style={styles.descriptionText}>{charger.description}</Text>
//           </>
//         ) : null}

//         {/* Action Button */}
//         <TouchableOpacity 
//           style={styles.actionButton}
//           onPress={() => Alert.alert('Coming Soon', 'Editing chargers will be available in the next update!')}
//         >
//           <Text style={styles.actionButtonText}>EDIT CHARGER</Text>
//         </TouchableOpacity>
        
//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ChargerDetailsScreen;

// const styles = StyleSheet.create({
//   mainContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   backButton: { width: 20, height: 25, resizeMode: 'contain' },
//   logo: {
//     width: 42,
//     height: 49,
//     resizeMode: 'contain',
//     position: 'absolute',
//     left: '54%',
//     transform: [{ translateX: -21 }],
//   },
//   scrollContainer: { paddingHorizontal: 20, paddingTop: 20 },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headingText: {
//     fontFamily: fonts.Bold,
//     fontSize: 28,
//     color: '#000',
//     flex: 1,
//     marginRight: 10,
//   },
//   statusPill: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 100,
//   },
//   statusActive: { backgroundColor: '#E6F7ED' },
//   statusInactive: { backgroundColor: '#FFF4E6' },
//   statusText: {
//     fontFamily: fonts.Medium,
//     fontSize: 12,
//     color: '#000',
//   },
//   card: {
//     backgroundColor: '#F7F9FA',
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: '#E5EAF0',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   iconMargin: { marginRight: 8, marginTop: 2 },
//   addressText: {
//     fontFamily: fonts.Medium,
//     fontSize: 15,
//     color: '#333',
//     flex: 1,
//     lineHeight: 22,
//   },
//   mapPlaceholder: {
//     marginTop: 12,
//     height: 120,
//     backgroundColor: '#E5EAF0',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mapPlaceholderText: {
//     fontFamily: fonts.SemiBold,
//     color: '#797981',
//     fontSize: 14,
//   },
//   sectionTitle: {
//     fontFamily: fonts.Bold,
//     fontSize: 18,
//     color: '#14323A',
//     marginBottom: 16,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   gridItem: {
//     width: '48%',
//     backgroundColor: '#FFF',
//     borderWidth: 1,
//     borderColor: '#E5EAF0',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     alignItems: 'flex-start',
//   },
//   gridLabel: {
//     fontFamily: fonts.Medium,
//     fontSize: 12,
//     color: '#797981',
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   gridValue: {
//     fontFamily: fonts.Bold,
//     fontSize: 16,
//     color: '#000',
//   },
//   descriptionText: {
//     fontFamily: fonts.Medium,
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 22,
//     marginBottom: 24,
//   },
//   actionButton: {
//     marginTop: 10,
//     height: 56,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: '#38B6FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   actionButtonText: {
//     fontFamily: fonts.Bold,
//     fontSize: 15,
//     color: '#38B6FF',
//     letterSpacing: 1,
//   },
// });

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

import Logo from '../../assets/logo/Logo.png';
import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';
import useAuth from './../../auth/useAuth'; // <-- Import Auth
import apiClient from './../../api/client'; // <-- Import API client

const ChargerDetailsScreen = ({ navigation, route }) => {
  const { charger } = route.params || {};
  const { user } = useAuth(); // <-- Get current user
  const [bookingLoading, setBookingLoading] = useState(false);

  if (!charger) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Charger not found</Text>
      </SafeAreaView>
    );
  }

  // Check if current user is the owner of this charger
  const isOwner = charger.ownerId === user?._id || charger.ownerId?._id === user?._id;

  // Format address
  const addressString = charger.address
    ? [
        charger.address.line1,
        charger.address.line2,
        charger.address.city,
        charger.address.state,
        charger.address.pincode,
      ]
        .filter(Boolean)
        .join(', ')
    : 'No address provided';

  const isActive = charger.isActive && charger.status === 'active';

  // --- BOOKING LOGIC ---
  const handleBookCharger = async () => {
    // For this demo, we book for 1 hour starting now
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // +1 hour

    setBookingLoading(true);
    try {
      const res = await apiClient.post('/bookings/book-charger', {
        chargerId: charger._id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      if (!res.ok) {
        Alert.alert('Booking Failed', res.data?.message || 'Could not book this charger.');
        return;
      }

      // Success! Navigate to My Bookings (assuming this route is registered in your Tab/Navigator)
      Alert.alert('Success', 'Charger booked successfully!', [
        { 
          text: 'View My Bookings', 
          onPress: () => navigation.navigate('MyBookingsScreen') // Change this to your exact route name
        }
      ]);
      
    } catch (error) {
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setBookingLoading(false);
    }
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

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        {/* Title & Status */}
        <View style={styles.titleRow}>
          <Text style={styles.headingText}>{charger.name}</Text>
          <View style={[styles.statusPill, isActive ? styles.statusActive : styles.statusInactive]}>
            <Text style={styles.statusText}>{isActive ? 'Active' : 'Inactive'}</Text>
          </View>
        </View>

        {/* Location / Address Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="location" size={20} color="#38B6FF" style={styles.iconMargin} />
            <Text style={styles.addressText}>{addressString}</Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>
               {charger.location?.coordinates?.[1]}, {charger.location?.coordinates?.[0]}
            </Text>
          </View>
        </View>

        {/* Specs Grid */}
        <Text style={styles.sectionTitle}>Charger Specifications</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <MaterialCommunityIcons name="ev-station" size={24} color="#14323A" />
            <Text style={styles.gridLabel}>Connector</Text>
            <Text style={styles.gridValue}>{charger.connectorTypes?.join(', ') || 'N/A'}</Text>
          </View>
          
          <View style={styles.gridItem}>
            <MaterialCommunityIcons name="flash" size={24} color="#14323A" />
            <Text style={styles.gridLabel}>Power</Text>
            <Text style={styles.gridValue}>{charger.powerKW} kW</Text>
          </View>

          <View style={styles.gridItem}>
            <Ionicons name="cash-outline" size={24} color="#14323A" />
            <Text style={styles.gridLabel}>Pricing</Text>
            <Text style={styles.gridValue}>
              ₹{charger.pricePerUnit} / {charger.pricingType === 'per_hour' ? 'hr' : 'kWh'}
            </Text>
          </View>

          <View style={styles.gridItem}>
            <Ionicons name="star" size={24} color="#14323A" />
            <Text style={styles.gridLabel}>Rating</Text>
            <Text style={styles.gridValue}>
              {charger.ratingAvg > 0 ? `${charger.ratingAvg} (${charger.ratingCount})` : 'New'}
            </Text>
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        
        {/* 1. Book Button (Only if NOT owner and charger is active) */}
        { isActive && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleBookCharger}
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.primaryButtonText}>BOOK THIS CHARGER</Text>
            )}
          </TouchableOpacity>
        )}

        {/* 2. Edit Button (ONLY if user IS the owner) */}
        {isOwner && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => Alert.alert('Coming Soon', 'Editing chargers will be available in the next update!')}
          >
            <Text style={styles.secondaryButtonText}>EDIT CHARGER</Text>
          </TouchableOpacity>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChargerDetailsScreen;

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
  scrollContainer: { paddingHorizontal: 20, paddingTop: 20 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontFamily: fonts.Bold,
    fontSize: 28,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusActive: { backgroundColor: '#E6F7ED' },
  statusInactive: { backgroundColor: '#FFF4E6' },
  statusText: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    color: '#000',
  },
  card: {
    backgroundColor: '#F7F9FA',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconMargin: { marginRight: 8, marginTop: 2 },
  addressText: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  mapPlaceholder: {
    marginTop: 12,
    height: 120,
    backgroundColor: '#E5EAF0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontFamily: fonts.SemiBold,
    color: '#797981',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: '#14323A',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5EAF0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  gridLabel: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    color: '#797981',
    marginTop: 8,
    marginBottom: 4,
  },
  gridValue: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
  },
  
  // --- NEW BUTTON STYLES ---
  primaryButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38B6FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#FFF',
    letterSpacing: 1,
  },
  secondaryButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#38B6FF',
    letterSpacing: 1,
  },
});