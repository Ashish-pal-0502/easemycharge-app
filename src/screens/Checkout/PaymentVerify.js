import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckoutHeader from './../../components/CheckoutComponent/CheckoutHeader';
import Steps from './../../components/CheckoutComponent/Steps';
import PhonePe from '../../assets/paymentIcon/phonepe.png';
import GooglePay from '../../assets/paymentIcon/googlepay.png';
import Paytm from '../../assets/paymentIcon/paytm.png';
import Upi from '../../assets/paymentIcon/upi.png';
import {fonts} from './../../config/fonts';
import LinearGradient from 'react-native-linear-gradient';
import PaymentSuccessModel from './../../components/Model/PaymentSuccessModel';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PaymentVerify = () => {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentSuccessModel, setPaymentSuccessModel] = useState(false);

  const paymentMethods = [
    {id: '1', name: 'PhonePe', image: PhonePe},
    {id: '2', name: 'Google Pay', image: GooglePay},
    {id: '3', name: 'Paytm', image: Paytm},
    {id: '4', name: 'UPI', image: Upi},
  ];

  const close = () => {
    setPaymentSuccessModel(false);
  };

  const onGoHome = () => {
    navigation.navigate('MarketPlaceScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckoutHeader />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={100}>
        <Steps activeStep={3} />

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.selectPaymentTitle}>Select Payment Method</Text>

          <View style={styles.paymentOptionsContainer}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentBox,
                  selectedPayment === method.id && styles.selectedPaymentBox,
                ]}
                onPress={() => setSelectedPayment(method.id)}>
                <Image source={method.image} style={styles.paymentImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gradient Border Below Payment Section */}
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.05)',
            'rgba(0, 0, 0, 0.28)',
            'rgba(0, 0, 0, 0.05)',
          ]}
          style={styles.gradientBorder}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />

        {/* UPI Payment Section */}
        <View style={styles.upiPaymentContainer}>
          <Text style={styles.upiPaymentTitle}>Payment via UPI ID</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.upiInput}
              placeholder="Enter UPI ID*"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
            />
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => setPaymentSuccessModel(true)}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            You will receive a payment request on your UPI App.
          </Text>
        </View>

        {/* Gradient Border with "OR" Text */}
        <View style={styles.orContainer}>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.05)',
              'rgba(0, 0, 0, 0.28)',
              'rgba(0, 0, 0, 0.05)',
            ]}
            style={styles.gradientBorderWithText}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
          <Text style={styles.orText}>OR</Text>
        </View>

        {/* UPI Payment Link Section */}
        <View style={styles.upiPaymentContainer}>
          <Text style={styles.upiPaymentTitle}>Get Payment Link</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.upiInput}
              placeholder="12345 67890"
              keyboardType="phone-pad"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
            />
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            You will get a payment link on this phone number
          </Text>
        </View>
        <PaymentSuccessModel
          visible={paymentSuccessModel}
          onClose={close}
          subTotal={'500'}
          amountPaid={'340'}
          onGoHome={onGoHome}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PaymentVerify;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paymentMethodContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  selectPaymentTitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 10,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paymentBox: {
    width: 63,
    height: 63,
    marginBottom: 10,
    backgroundColor: 'rgba(244, 245, 248, 1)',
    borderRadius: 23,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    margin: 6,
  },
  selectedPaymentBox: {
    borderColor: '#38B6FF',
  },
  paymentImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  gradientBorder: {
    height: 1,
    marginTop: 20,
    marginHorizontal: 15,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    position: 'relative',
    marginTop: 40,
  },
  gradientBorderWithText: {
    height: 1,
    flex: 1,
  },
  orText: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: fonts.Medium,
  },
  upiPaymentContainer: {
    paddingHorizontal: 15,
    marginTop: 40,
  },
  upiPaymentTitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiInput: {
    flex: 1,
    fontSize: 16,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginRight: 10,
    color: 'black',
    height: 51,
    width: 20,
  },
  payButton: {
    backgroundColor: '#38B6FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 106,
    height: 51,
  },
  payButtonText: {
    color: '#fff',
    fontFamily: fonts.Medium,
    fontSize: 18,
    textAlign: 'center',
  },
  helperText: {
    marginTop: 10,
    fontSize: 13,
    color: 'rgba(103, 107, 137, 1)',
    fontFamily: fonts.Regular,
  },
});
