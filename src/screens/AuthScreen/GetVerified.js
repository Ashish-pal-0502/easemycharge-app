
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Logo from '../../assets/logo/Logo.png';
import Continue from '../../assets/welcome/continue.png';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OTP_LENGTH = 4;

const GetVerified = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '');

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next box
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.headerText}>Let's get you verified</Text>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={1}
        keyboardShouldPersistTaps="handled">
        {/* OTP Section */}
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
            <Text style={styles.timerText}>Resend OTP</Text>
            <Text style={styles.resendText}>00:21</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.contButton}>CONTINUE</Text>
          <Image source={Continue} style={styles.continue} />
        </TouchableOpacity>

        <Text style={styles.privacyTextFirst}>
          Entered wrong number ? <Text style={styles.privacyText}>Change</Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default GetVerified;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 81,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    position: 'absolute',
    left: '54%',
    transform: [{translateX: -21}],
  },
  headerText: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
  },
  otpContainer: {
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  otpText: {
    fontFamily: fonts.Medium,
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
  },
  otpTextNumber: {
    fontSize: 20,
    fontFamily: fonts.Medium,
    color: '#1A9FEE',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#F2F2F2',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#38B6FF',
    borderRadius: 10,
    color: '#000000',
    paddingVertical: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  timerText: {
    fontSize: 16,
    color: '#888D93',
  },
  resendText: {
    fontSize: 16,
    color: '#1A9FEE',
    fontFamily: fonts.Bold,
  },
  continueContainer: {
    marginTop: 360,
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
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  continue: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  privacyText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: '#1A9FEE',
  },
  privacyTextFirst: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: '#797981',
  },
});