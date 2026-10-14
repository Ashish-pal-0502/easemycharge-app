import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckoutHeader from './../../components/CheckoutComponent/CheckoutHeader';
import Steps from './../../components/CheckoutComponent/Steps';
import CouponCard from './../../components/Card/CouponCard';
import CheckIcon from './../../assets/filterModel/check.png';
import Continue from '../../assets/welcome/continue.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PhoneVerify1 = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
  };

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      setError('');
      setPhoneNumber('');
      navigation.navigate('PhoneVerify2'); // Navigate if phone number is valid
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckoutHeader />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={100}>
        <Steps activeStep={1} />
        <View style={styles.couponAlign}>
          <CouponCard />
        </View>
        <View style={styles.mobileContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="12345 67890"
              keyboardType="phone-pad"
              placeholderTextColor="#888"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox}>
              <Image source={CheckIcon} style={styles.checkboxImage} />
            </TouchableOpacity>
            <Text style={styles.notifyText}>
              Notify me on <Text style={styles.checkBoldText}>orders</Text>,{' '}
              <Text style={styles.checkBoldText}>updates</Text> and{' '}
              <Text style={styles.checkBoldText}>offers</Text>
            </Text>
          </View>

          <View style={styles.borderLine} />
        </View>
        <View style={styles.continueButtonAlign}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={handleContinue}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continue} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PhoneVerify1;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  couponAlign: {
    alignItems: 'center',
    marginTop: 20,
  },
  mobileContainer: {
    paddingHorizontal: 20,
    marginTop: 200,
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    padding: 10,
  },
  placeholder: {
    fontSize: 20,
    color: 'rgba(103, 107, 137, 0.37)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: 'rgba(207, 208, 208, 1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  checkboxImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  notifyText: {
    marginLeft: 12,
    fontSize: 12,
    color: 'rgba(103, 107, 137, 1)',
    fontFamily: fonts.SemiBold,
  },

  checkBoldText: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: fonts.SemiBold,
  },
  borderLine: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 20,
    width: '100%',
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
    marginTop: 40,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
