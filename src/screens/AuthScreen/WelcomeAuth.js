


import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Logo from '../../assets/logo/Logo.png';
import Flag from '../../assets/welcome/IndFlag.png';
import Continue from '../../assets/welcome/continue.png';
import Google from '../../assets/welcome/google.png';
import {fonts} from '../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const WelcomeAuth = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
  };

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      setError('');
      navigation.navigate('GetVerified');
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <View style={styles.topSection}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.welcomeText}>
            Welcome to{'\n'}
            <Text style={styles.EaseMyCharge}>EaseMyCharge</Text>
          </Text>

          <View style={styles.phoneContainer}>
            <Text style={styles.phoneLabel}>Enter your phone number</Text>
            <View style={styles.inputContainer}>
              <Image source={Flag} style={styles.inputLogo} />
              <Text style={styles.countryCode}>(+91)</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="10 digit mobile number"
                placeholderTextColor="#797981"
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={handleContinue}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continue} />
          </TouchableOpacity>

          <Text style={styles.orContinue}>or continue with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image source={Google} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.privacyText}>
            Privacy Policy & Terms and Conditions
          </Text>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default WelcomeAuth;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1, 
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  topSection: {
    alignItems: 'center',
  },
  logo: {
    width: 42,
    height: 49,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: fonts.Bold,
    color: '#050505',
    fontSize: 34,
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 40,
  },
  EaseMyCharge: {
    color: '#38B6FF',
  },
  phoneContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  phoneLabel: {
    color: '#14323A',
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderRadius: 15,
    backgroundColor: '#F2F2F2', 
    paddingHorizontal: 16, 
  },
  inputLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: '#000',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: '#000',
    paddingVertical: 0, 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fonts.Medium,
    marginTop: 8,
  },
  bottomSection: {
    marginTop: 'auto', 
    alignItems: 'center',
    width: '100%',
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
    marginBottom: 30,
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#000',
    marginRight: 8,
  },
  continue: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
  },
  orContinue: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#797981',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  privacyText: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: '#38B6FF',
    textAlign: 'center',
  },
});