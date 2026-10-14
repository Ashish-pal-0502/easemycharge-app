

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CheckoutHeader from './../../components/CheckoutComponent/CheckoutHeader';
import Continue from '../../assets/welcome/continue.png';
import EditIcon from '../../assets/user/edit.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OTP_LENGTH = 4;

const PhoneVerify2 = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('+9199898908797');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState('01:09');

  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    } else if (digit && index === OTP_LENGTH - 1) {
      inputs.current[index]?.blur();
    }
  };

  const handleKeyPress = (e, index) => {
    // Backspace on empty box -> jump to previous box
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckoutHeader />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={100}
        keyboardShouldPersistTaps="handled">
        <View style={styles.verifyContainer}>
          <Text style={styles.verifyHeading}>Verify Phone</Text>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Code is sent to{' '}
              <Text style={styles.messageTextBold}>{phoneNumber}</Text>
            </Text>
            <Image source={EditIcon} style={styles.editIcon} />
          </View>

          <Text style={styles.otpTimer}>{timer}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                importantForAutofill="yes"
              />
            ))}
          </View>

          <Text style={styles.resendText}>Didn’t receive code?</Text>

          <TouchableOpacity>
            <Text style={styles.resendButton}>Send again</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.continueButtonAlign}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={() => navigation.navigate('AddressVerify1')}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continue} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PhoneVerify2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  verifyContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  verifyHeading: {
    fontSize: 30,
    fontFamily: fonts.SemiBold,
    color: '#000',
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 14,
    color: 'rgba(103, 107, 137, 1)',
    marginRight: 5,
    fontFamily: fonts.Medium,
  },
  messageTextBold: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 1)',
    marginRight: 5,
    fontFamily: fonts.Medium,
  },
  editIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  otpTimer: {
    fontSize: 43,
    fontFamily: fonts.Bold,
    color: '#000',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1.2,
    borderColor: 'rgba(32, 41, 76, 0.21)',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    fontFamily: fonts.SemiBold,
    color: '#000',
    paddingVertical: 0,
  },
  resendText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    color: 'rgba(103, 107, 137, 1)',
    fontFamily: fonts.Medium,
  },
  resendButton: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
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
    marginTop: 270,
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
});