

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/logo/Logo.png';
import Continue from '../../assets/welcome/continue.png';
import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';
import apiClient from './../../api/client';
import useAuth from './../../auth/useAuth';

const OTP_LENGTH = 4;

const GetVerified = ({ navigation, route }) => {
  // Get the phone number passed from WelcomeAuth
  const { phone } = route.params || { phone: 'your number' };
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  
  const inputs = useRef([]);
  const { logIn } = useAuth();

  // Real countdown timer logic
  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

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

  const handleResend = async () => {
    if (!isResendEnabled) return;
    
    setIsResendEnabled(false);
    setTimer(60);
    
    try {
      const res = await apiClient.post('/auth/otp/request', { phone });
      if (!res.ok) throw new Error(res.data?.message);
      Alert.alert('Success', 'A new OTP has been sent.');
    } catch (error) {
      Alert.alert('Error', 'Could not resend OTP. Please try again.');
      setIsResendEnabled(true); // Let them try again immediately if it fails
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    
    if (code.length !== OTP_LENGTH) {
      Alert.alert('Invalid OTP', 'Please enter the full 4-digit code.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/otp/verify', {
        phone: phone,
        code: code,
      });

      if (!res.ok) {
        Alert.alert('Verification Failed', res.data?.message || 'Invalid OTP');
        return;
      }

      // Extract tokens from backend response
      const { accessToken, refreshToken } = res.data.data;
      
      // This will trigger RootNavigator to switch to AppNavigator automatically
      await logIn(accessToken, refreshToken);
      
    } catch (error) {
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.join('').length === OTP_LENGTH;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          <Image source={Logo} style={styles.logo} />
          <View style={styles.backBtnWrapper} />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Verification Code</Text>
          <Text style={styles.subHeaderText}>
            We have sent the code to{'\n'}
            <Text style={styles.phoneText}>{phone}</Text>
          </Text>

          {/* OTP Input Row */}
          <View style={styles.inputRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  value ? styles.otpInputFilled : null, // Blue border when filled
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                editable={!loading}
                selectionColor="#38B6FF"
              />
            ))}
          </View>

          {/* Resend Timer */}
          <View style={styles.resendContainer}>
            {isResendEnabled ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendActiveText}>Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend code in <Text style={styles.timerBold}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Bottom Button Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[
              styles.continueContainer,
              (!isOtpComplete || loading) && styles.continueDisabled, // Grey out if incomplete
            ]}
            onPress={handleVerify}
            disabled={!isOtpComplete || loading}
            activeOpacity={0.8}>
            
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={[styles.contButton, !isOtpComplete && styles.textDisabled]}>
                  VERIFY
                </Text>
                <Image
                  source={Continue}
                  style={[styles.continue, !isOtpComplete && { opacity: 0.4 }]}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.privacyTextFirst}>
              Entered wrong number? <Text style={styles.privacyText}>Change</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: fonts.Bold,
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subHeaderText: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  phoneText: {
    fontFamily: fonts.Bold,
    color: '#1A9FEE',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    marginBottom: 24,
  },
  otpInput: {
    width: 68,
    height: 68,
    backgroundColor: '#F7F9FC',
    borderWidth: 1.5,
    borderColor: '#E5EAF0',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: fonts.Bold,
    color: '#000',
    borderRadius: 16,
    paddingVertical: 0,
  },
  otpInputFilled: {
    borderColor: '#38B6FF',
    backgroundColor: '#E6F4FF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  timerText: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#797981',
  },
  timerBold: {
    fontFamily: fonts.Bold,
    color: '#000',
  },
  resendActiveText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#1A9FEE',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#38B6FF',
    borderRadius: 100,
    marginBottom: 20,
  },
  continueDisabled: {
    borderColor: '#D3EAF7',
    backgroundColor: '#FAFAFA',
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#000',
    marginRight: 8,
  },
  textDisabled: {
    color: '#A0A5B5',
  },
  continue: {
    width: 24,
    height: 20,
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