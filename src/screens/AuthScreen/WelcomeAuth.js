import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../assets/logo/Logo.png';
import Flag from '../../assets/welcome/IndFlag.png';
import Continue from '../../assets/welcome/continue.png';
import Google from '../../assets/welcome/google.png';
import {fonts} from '../../config/fonts';
import colors from '../../config/colors';
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
      navigation.navigate('GetVerified'); // Navigate if phone number is valid
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.welcomeText}>
          Welcome to {'\n'}
          <Text style={styles.EaseMyCharge}>EaseMyCharge</Text>
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={100}>
        <View style={styles.phoneContainer}>
          <Text style={styles.phone}>Enter your phone number</Text>
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

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={handleContinue}>
          <Text style={styles.contButton}>CONTINUE</Text>
          <Image source={Continue} style={styles.continue} />
        </TouchableOpacity>

        <Text style={styles.orContinue}>or continue with</Text>

        <View style={styles.socialContainer}>
          <View style={styles.iconWrapper}>
            <Image source={Google} style={styles.socialIcon} />
          </View>
        </View>

        <Text style={styles.privacyText}>
          Privacy Policy & Terms and Conditions
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default WelcomeAuth;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 81,
    width: 42,
    height: 49,
    resizeMode: 'contain',
  },
  EaseMyCharge: {
    color: '#38B6FF',
  },
  welcomeText: {
    fontFamily: fonts.Bold,
    color: '#050505',
    fontSize: 36,
    textAlign: 'center',
  },
  phoneContainer: {
    marginTop: 20,
    marginLeft: 20,
    width: '80%',
    alignItems: 'flex-start',
  },
  phone: {
    color: '#14323A',
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 14,
    marginTop: 10,
    backgroundColor: '#F2F2F2',
  },
  inputLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#14323A',
    marginLeft: 20,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  continueContainer: {
    marginTop: 260,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
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
  orContinue: {
    marginTop: 20,
    fontWeight: 700,
    fontSize: 16,
    color: '#817777',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    gap: 20,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 8,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  privacyText: {
    fontFamily: fonts.SemiBold,
    marginTop: 20,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
