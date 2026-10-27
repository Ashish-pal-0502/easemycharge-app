
  import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    PermissionsAndroid, 
    Platform,          
  } from 'react-native';
  import React, { useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import Geolocation from '@react-native-community/geolocation'; 

  import Logo from '../../assets/logo/Logo.png';
  import Back from '../../assets/welcome/backbutton.png';
  import RightArrow from '../../assets/welcome/rightArrow.png';
  import { fonts } from './../../config/fonts';
  import apiClient from './../../api/client';
  import useAuth from './../../auth/useAuth';

  // Match enums from your backend schema
  const CONNECTOR_TYPES = ['Type2', 'CCS', 'CHAdeMO', 'GBT', 'Bharat_AC001', 'Other'];
  const POWER_OPTIONS = [3.3, 7.4, 11, 22, 50]; 
  const PRICING_TYPES = ['per_kwh', 'per_hour'];

  const AddChargerScreen = ({ navigation }) => {
    const { user } = useAuth();
    
    // Form State
    const [name, setName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const [connectorType, setConnectorType] = useState('Type2');
    const [powerKW, setPowerKW] = useState(7.4);
    const [pricingType, setPricingType] = useState('per_hour');
    const [pricePerUnit, setPricePerUnit] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);

    // Check if user is an approved owner
    const isApprovedOwner = user?.roles?.includes('owner') && 
                            user?.ownerProfile?.approvalStatus === 'approved';

    const handleUseCurrentLocation = async () => {
      // 1. Request permission on Android
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Location permission is required to auto-fill coordinates.');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }

      setLoadingLocation(true);

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toString());
          setLongitude(longitude.toString());
          setLoadingLocation(false);
          Alert.alert('Success', 'Location fetched successfully!');
        },
        (error) => {
          console.warn(error);
          Alert.alert(
            'Location Error', 
            'Could not get your current location. Please ensure GPS is on and try again.'
          );
          setLoadingLocation(false);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000, 
          maximumAge: 10000 
        }
      );
    };

    const handleSubmit = async () => {
      // 1. Basic Validation
      if (!name.trim() || !addressLine.trim() || !city.trim() || !pricePerUnit) {
        Alert.alert('Missing Fields', 'Please fill in all required fields.');
        return;
      }
        if (!pincode.trim() || pincode.trim().length !== 6) {
        Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode.');
        return;
      }
      if (!latitude || !longitude) {
        Alert.alert('Missing Location', 'Please provide latitude and longitude.');
        return;
      }
      if (isNaN(Number(pricePerUnit)) || isNaN(Number(latitude)) || isNaN(Number(longitude))) {
        Alert.alert('Invalid Input', 'Price and coordinates must be valid numbers.');
        return;
      }

      setLoading(true);
      try {
        const payload = {
          name: name.trim(),
          address: {
            line1: addressLine.trim(),
            city: city.trim(),
            state: state.trim(),
            pincode: pincode.trim(),
          },
          longitude: Number(longitude), 
          latitude: Number(latitude),
          connectorTypes: [connectorType], 
          powerKW: Number(powerKW),
          pricingType: pricingType,
          pricePerUnit: Number(pricePerUnit),
        };

        // console.log("payload...", payload)

        // 3. Send API Request
        const res = await apiClient.post('/chargers/add-charger', payload);

          // console.log("res", res)

        if (!res.ok) {
          Alert.alert('Failed', res.data?.message || 'Could not add charger');
          return;
        }

          navigation.replace('ViewCharger');

        // Alert.alert('Success', 'Charger added successfully!', [
        //   { text: 'OK', onPress: () => navigation.goBack() }
        // ]);
        
      } catch (error) {
        Alert.alert('Error', 'Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          <Image source={Logo} style={styles.logo} />
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.headingText}>Add Charger</Text>
          <Text style={styles.subHeading}>
            Fill in the details{' '}
            <Image source={RightArrow} style={styles.rightArrow} />
          </Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Charger Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Home Charger 1"
              placeholderTextColor="#797981"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />

            <Text style={styles.label}>Address Line *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 123 Main St"
              placeholderTextColor="#797981"
              value={addressLine}
              onChangeText={setAddressLine}
              editable={!loading}
            />
            
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChangeText={setCity}
                  editable={!loading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. MH"
                  value={state}
                  onChangeText={setState}
                  editable={!loading}
                />
              </View>
            </View>

              <Text style={styles.label}>Pincode *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 400001"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
              editable={!loading}
            />

            <View style={styles.coordHeaderRow}>
              <Text style={styles.sectionTitle}>Location Coordinates *</Text>
              <TouchableOpacity 
                onPress={handleUseCurrentLocation} 
                disabled={loadingLocation || loading}
                style={styles.locationButton}
              >
                {loadingLocation ? (
                  <ActivityIndicator size="small" color="#38B6FF" />
                ) : (
                  <Text style={styles.locationButtonText}> Use Current</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>Latitude *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 19.0760"
                  keyboardType="numeric"
                  value={latitude}
                  onChangeText={setLatitude}
                  editable={!loading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Longitude *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 72.8777"
                  keyboardType="numeric"
                  value={longitude}
                  onChangeText={setLongitude}
                  editable={!loading}
                />
              </View>
            </View>

            <Text style={styles.label}>Connector Type</Text>
            <View style={styles.chipRow}>
              {CONNECTOR_TYPES.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, connectorType === t && styles.chipActive]}
                  onPress={() => setConnectorType(t)}
                  disabled={loading}>
                  <Text style={[styles.chipText, connectorType === t && styles.chipTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Power Rating (kW)</Text>
            <View style={styles.chipRow}>
              {POWER_OPTIONS.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[styles.chip, powerKW === p && styles.chipActive]}
                  onPress={() => setPowerKW(p)}
                  disabled={loading}>
                  <Text style={[styles.chipText, powerKW === p && styles.chipTextActive]}>
                    {p} kW
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Pricing Type</Text>
            <View style={styles.chipRow}>
              {PRICING_TYPES.map(pt => (
                <TouchableOpacity
                  key={pt}
                  style={[styles.chip, pricingType === pt && styles.chipActive]}
                  onPress={() => setPricingType(pt)}
                  disabled={loading}>
                  <Text style={[styles.chipText, pricingType === pt && styles.chipTextActive]}>
                    {pt === 'per_kwh' ? 'Per kWh' : 'Per Hour'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Price (₹) *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 150"
              placeholderTextColor="#797981"
              value={pricePerUnit}
              onChangeText={setPricePerUnit}
              keyboardType="numeric"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>ADD CHARGER</Text>
            )}
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };

  export default AddChargerScreen;

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
    scrollContainer: { paddingBottom: 40 },
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
      color: '#38B6FF',
      marginBottom: 20,
    },
    rightArrow: { width: 20, height: 11 },
    formContainer: { paddingHorizontal: 20 },
    label: {
      fontFamily: fonts.SemiBold,
      fontSize: 14,
      color: '#14323A',
      marginTop: 16,
      marginBottom: 8,
    },
    sectionTitle: {
      fontFamily: fonts.Bold,
      fontSize: 16,
      color: '#000',
      marginTop: 24,
      marginBottom: 10,
    },
    textInput: {
      width: '100%',
      height: 52,
      backgroundColor: '#F2F2F2',
      borderRadius: 12,
      paddingHorizontal: 16,
      fontFamily: fonts.Medium,
      fontSize: 15,
      color: '#000',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 100,
      borderWidth: 1.5,
      borderColor: '#38B6FF',
      backgroundColor: '#fff',
      marginRight: 8,
      marginBottom: 8,
    },
    chipActive: { backgroundColor: '#38B6FF' },
    chipText: {
      fontFamily: fonts.Medium,
      fontSize: 14,
      color: '#38B6FF',
    },
    chipTextActive: { color: '#fff' },
    submitButton: {
      marginTop: 30,
      marginHorizontal: 20,
      height: 56,
      borderRadius: 100,
      backgroundColor: '#38B6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitText: {
      fontFamily: fonts.Bold,
      fontSize: 15,
      color: '#fff',
      letterSpacing: 1,
    },
    coordHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 10,
    },
    locationButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: '#E6F4FF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#38B6FF',
    },
    locationButtonText: {
      fontFamily: fonts.SemiBold,
      fontSize: 12,
      color: '#38B6FF',
    },
  });