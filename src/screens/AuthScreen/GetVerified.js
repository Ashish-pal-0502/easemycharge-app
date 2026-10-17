

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Logo from '../../assets/logo/Logo.png';
import Continue from '../../assets/welcome/continue.png';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

const OTP_LENGTH = 4;

const GetVerified = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '');

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    } else if (digit && index === OTP_LENGTH - 1) {
      inputs.current[index]?.blur();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.backBtnWrapper} />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <Text style={styles.headerText}>Let's get you verified</Text>

        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>
            Enter the OTP sent to{' '}
            <Text style={styles.otpTextNumber}>9999999999</Text>
          </Text>
          
          <View style={styles.inputRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            <Text style={styles.timerText}>Resend OTP in</Text>
            <Text style={styles.resendText}>00:21</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={() => navigation.replace('ChooseVehicle')}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continue} />
          </TouchableOpacity>

          <Text style={styles.privacyTextFirst}>
            Entered wrong number ? <Text style={styles.privacyText}>Change</Text>
          </Text>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default GetVerified;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    height: 50,
  },
  backBtnWrapper: {
    width: 42, 
  },
  backButton: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  logo: {
    width: 42,
    height: 49,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexGrow: 1, 
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: fonts.Bold,
    fontSize: 32, 
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
  },
  otpText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpTextNumber: {
    color: '#1A9FEE',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340, 
    alignSelf: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 65,
    height: 65,
    backgroundColor: '#F4F5F6', 
    textAlign: 'center',
    fontSize: 24,
    color: '#000000',
    paddingVertical: 0,
    borderRadius: 2,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
  timerText: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#676B89',
  },
  resendText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#1A9FEE',
  },
  bottomSection: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 2,
    borderColor: '#38B6FF',
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 20,
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
  continue: {
    width: 22,
    height: 18,
    resizeMode: 'contain',
  },
  privacyTextFirst: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    textAlign: 'center',
  },
  privacyText: {
    color: '#1A9FEE',
    fontFamily: fonts.SemiBold,
  },
});