import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/logo/Logo.png';
import Continue from '../../assets/welcome/continue.png';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GetStarted = ({navigation, setFlag}) => {
  // const {setFlag} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // navigation.navigate('AppNavigator');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);

    setFirstName('');
    setLastName('');
    setEmail('');

    setFlag(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={styles.headerText}>Let's get started</Text>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          resetScrollToCoords={{x: 0, y: 0}}
          enableOnAndroid={true}
          extraHeight={100}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>First Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Your First Name"
                placeholderTextColor="#797981"
                keyboardType="default"
                textAlign="center"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>Last Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Your Last Name"
                placeholderTextColor="#797981"
                keyboardType="default"
                textAlign="center"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.phoneInput}
                placeholder="xyz@abc.com"
                placeholderTextColor="#797981"
                keyboardType="email-address"
                textAlign="center"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueContainer}
            onPress={handleContinue}>
            <Text style={styles.contButton}>CONTINUE</Text>
            <Image source={Continue} style={styles.continue} />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
    marginTop: 81,
    width: '90%',
    marginLeft: 20,
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
    marginTop: 30,
  },
  nameContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'flex-start',
  },
  name: {
    color: '#1A9FEE',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 10,
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
    textAlign: 'center',
  },
  continueContainer: {
    marginTop: 200,
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
    fontFamily: fonts.SemiBold,

    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  continue: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
