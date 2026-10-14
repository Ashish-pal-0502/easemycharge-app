import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,

  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {RadioButton, DefaultTheme} from 'react-native-paper';
import CheckoutHeader from './../../components/CheckoutComponent/CheckoutHeader';
import Steps from './../../components/CheckoutComponent/Steps';
import CouponCard from './../../components/Card/CouponCard';
import Continue from '../../assets/welcome/continue.png';
import {fonts} from './../../config/fonts';
import CheckoutAddressCard from './../../components/Card/CheckoutAddressCard';

const addressData = [
  {
    id: '1',
    cityName: 'Lucknow',
    pincode: '226010',
    address: 'Block S, Flat 303, Satluj Apartment, Gomti Nagar',
  },
  {
    id: '2',
    cityName: 'Kanpur',
    pincode: '208001',
    address: 'Block A, House 101, Ganga Apartments, Civil Lines',
  },
];

const AddressVerify2 = ({navigation}) => {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const radioButtonTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#38B6FF', // Change this to your desired checked color
      background: '#38B6FF', // Background color for the radio button
      surface: '#38B6FF', // Surface color for the radio button
      placeholder: '#38B6FF', // Placeholder color for the radio button
      text: '#38B6FF', // Text color
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckoutHeader />
      <Steps activeStep={2} />
      <View style={styles.couponAlign}>
        <CouponCard />
      </View>
      <View style={styles.shippingAddressContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.shippingTitle}>Shipping Address</Text>
          <TouchableOpacity>
            <Text style={styles.addAddress}>+ Add Address</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={addressData}
          numColumns={2}
          renderItem={({item}) => (
            <CheckoutAddressCard
              cityName={item.cityName}
              pincode={item.pincode}
              address={item.address}
            />
          )}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>

      {/* Select Shipping Method Section */}
      <View style={styles.shippingMethodContainer}>
        <Text style={styles.shippingMethodTitle}>Select Shipping Method</Text>
        <View style={styles.shippingMethodBoxContainer}>
          {/* Shipping Method 1 */}
          <View style={styles.shippingMethodBox}>
            <View style={styles.shippingMethodContent}>
              <Text style={styles.boldText}>Free Shipping</Text>
              <Text style={styles.priceText}>Price: ₹0</Text>
            </View>
            <RadioButton
              value="free"
              status={
                selectedShippingMethod === 'free' ? 'checked' : 'unchecked'
              }
              onPress={() => setSelectedShippingMethod('free')}
              theme={radioButtonTheme}
            />
          </View>

          {/* Shipping Method 2 */}
          <View style={styles.shippingMethodBox}>
            <View style={styles.shippingMethodContent}>
              <Text style={styles.boldText}>Premium Shipping</Text>
              <Text style={styles.priceText}>Price: ₹5</Text>
            </View>
            <RadioButton
              value="standard"
              status={
                selectedShippingMethod === 'standard' ? 'checked' : 'unchecked'
              }
              onPress={() => setSelectedShippingMethod('standard')}
              theme={radioButtonTheme}
            />
          </View>
        </View>
      </View>

      <View style={styles.continueButtonAlign}>
        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => navigation.navigate('PaymentVerify')}>
          <Text style={styles.contButton}>CONTINUE</Text>
          <Image source={Continue} style={styles.continue} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddressVerify2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  couponAlign: {
    alignItems: 'center',
    marginTop: 10,
  },
  shippingAddressContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  shippingTitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  addAddress: {
    color: 'rgba(44, 161, 228, 1)',
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  continueButtonAlign: {
    paddingHorizontal: 15,
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 3,
    borderColor: '#38B6FF',
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
  },
  contButton: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  continue: {
    width: 25,
    height: 20,
    resizeMode: 'contain',
  },

  shippingMethodContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  shippingMethodTitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 10,
  },
  shippingMethodBoxContainer: {
    width: '100%',
    marginBottom: 10,
  },
  shippingMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(244, 245, 248, 1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 5,
    marginBottom: 15,
    padding: 15,
    height: 47,
  },
  shippingMethodContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  boldText: {
    fontFamily: fonts.SemiBold,
    fontSize: 12,
    color: '#000',
  },
  priceText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: fonts.Small,
  },
});
