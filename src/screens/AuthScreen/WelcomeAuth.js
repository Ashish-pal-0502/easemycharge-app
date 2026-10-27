

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth, {
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import Logo from '../../assets/logo/Logo.png';
import Flag from '../../assets/welcome/IndFlag.png';
import Google from '../../assets/welcome/google.png';
import Continue from '../../assets/welcome/continue.png'; 
import { fonts } from '../../config/fonts';
import apiClient from './../../api/client';
import useAuth from './../../auth/useAuth';

const WelcomeAuth = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { logIn } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Config.GOOGLE_WEB_CLIENT_ID ||
        '230938242454-k44itfe5434sv4trvlnvgiv4arnp16gi.apps.googleusercontent.com',
    });
  }, []);

  const handlePhoneNumberChange = text => {
    const digits = text.replace(/[^0-9]/g, '');
    setPhoneNumber(digits);
  };

  const handleContinue = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setLoading(true);

    const e164Phone = `+91${phoneNumber}`;

    try {
      const res = await apiClient.post('/auth/otp/request', {
        phone: e164Phone,
      });

      if (!res.ok) {
        setError(
          res.data?.message || 'Could not send OTP. Please try again.',
        );
        return;
      }

      navigation.navigate('GetVerified', { phone: e164Phone });
    } catch (e) {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError('');

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      await GoogleSignin.signOut();

      const signInResult = await GoogleSignin.signIn();

      const googleIdToken =
        signInResult.data?.idToken || signInResult.idToken || null;

      if (!googleIdToken) throw new Error('No ID token found');

      const googleCredential = auth.GoogleAuthProvider.credential(googleIdToken);
      const userCredential = await signInWithCredential(
        getAuth(),
        googleCredential,
      );
      const firebaseIdToken = await userCredential.user.getIdToken();

      const res = await apiClient.post('/auth/firebase', {
        idToken: firebaseIdToken,
      });

      if (!res.ok) {
        setError(res.data?.message || 'Google login failed');
        return;
      }

      const { accessToken, refreshToken } = res.data.data;
      await logIn(accessToken, refreshToken);
    } catch (err) {
      console.error('Google login failed:', err);
      if (err?.code === 'SIGN_IN_CANCELLED' || err?.code === '12501') {
        return;
      }
      setError('Google login failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const disabled = loading || phoneNumber.length !== 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* Top Section: Logo & Welcome */}
        <View style={styles.topSection}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.welcomeText}>
            Welcome to{'\n'}
            <Text style={styles.brandName}>EaseMyCharge</Text>
          </Text>
        </View>

        {/* Middle Section: Inputs */}
        <View style={styles.middleSection}>
          <Text style={styles.phoneLabel}>Enter your phone number</Text>
          
          <View style={[styles.inputContainer, error ? styles.inputError : null]}>
            <Image source={Flag} style={styles.inputLogo} />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="98765 43210"
              placeholderTextColor="#A0A5B5"
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              editable={!loading && !googleLoading}
            />
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* --- YOUR CUSTOM CONTINUE BUTTON --- */}
          <TouchableOpacity
            style={[
              styles.continueContainer, 
              disabled && styles.continueContainerDisabled // Apply disabled style
            ]}
            onPress={handleContinue}
            disabled={disabled}
            activeOpacity={0.7}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={[styles.contButton, disabled && styles.textDisabled]}>
                  CONTINUE
                </Text>
                <Image 
                  source={Continue} 
                  style={[styles.continueIcon, disabled && { opacity: 0.4 }]} 
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Bottom Section: Social Login & Footer */}
        <View style={styles.bottomSection}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={googleLoading}
            activeOpacity={0.8}>
            {googleLoading ? (
              <ActivityIndicator color="#38B6FF" />
            ) : (
              <>
                <Image source={Google} style={styles.googleIcon} />
                <Text style={styles.googleText}>Google</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.privacyText}>
            By continuing, you agree to our{'\n'}
            <Text style={styles.linkText}>Privacy Policy & Terms of Service</Text>
          </Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WelcomeAuth;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between', 
    paddingTop: 40,
    paddingBottom: 20,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: fonts.Medium,
    fontSize: 24,
    color: '#666',
    textAlign: 'center',
    lineHeight: 46, 
  },
  brandName: {
    fontFamily: fonts.Bold,
    fontSize: 36,
    color: '#000000',
  },
  middleSection: {
    marginTop: 40,
    width: '100%',
  },
  phoneLabel: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderWidth: 1.5,
    borderColor: '#E5EAF0',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#FF5A5F',
  },
  inputLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  countryCode: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#000',
    marginRight: 12,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5EAF0',
  },
  phoneInput: {
    flex: 1,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: '#000',
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: fonts.Medium,
    color: '#FF5A5F',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 4,
  },
  
  // --- YOUR CUSTOM CONTINUE BUTTON STYLES ---
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#38B6FF',
    borderRadius: 100, // Fully rounded pills as per your design
    marginTop: 24,
    backgroundColor: '#FFFFFF',
  },
  continueContainerDisabled: {
    borderColor: '#D3EAF7', // Light grey/blue when disabled
    backgroundColor: '#FAFAFA',
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#000',
    marginRight: 8,
  },
  textDisabled: {
    color: '#A0A5B5', // Faded text when disabled
  },
  continueIcon: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
  },

  bottomSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5EAF0',
  },
  dividerText: {
    fontFamily: fonts.Medium,
    color: '#A0A5B5',
    fontSize: 14,
    marginHorizontal: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5EAF0',
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
  },
  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  googleText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#333',
  },
  privacyText: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#A0A5B5',
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: '#38B6FF',
    fontFamily: fonts.Bold,
  },
});