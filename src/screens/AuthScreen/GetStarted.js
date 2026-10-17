

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Logo from '../../assets/logo/Logo.png';
import Continue from '../../assets/welcome/continue.png';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GetStarted = ({navigation, setFlag}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);

    setFirstName('');
    setLastName('');
    setEmail('');

    // if (setFlag) setFlag(true);
          navigation.replace('WelcomeAuth');

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          
          <Image source={Logo} style={styles.logo} />
          
          <View style={styles.backBtnWrapper} />
        </View>

        <Text style={styles.headerText}>Let's get started</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your First Name"
              placeholderTextColor="#A0A0A0"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Last Name"
              placeholderTextColor="#A0A0A0"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="xyz@abc.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={handleContinue}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continueIcon} />
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default GetStarted;

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 30,
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
  headerText: {
    fontFamily: fonts.Bold,
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#1A9FEE',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: fonts.Medium,
    color: '#000',
    paddingVertical: 0, 
  },
  bottomSection: {
    marginTop: 'auto', 
    width: '100%',
    paddingTop: 40,
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
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#000',
    marginRight: 8,
  },
  continueIcon: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
  },
});