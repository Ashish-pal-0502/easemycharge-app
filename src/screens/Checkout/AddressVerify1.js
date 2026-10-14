import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Formik} from 'formik';
import * as Yup from 'yup';
import CheckoutHeader from './../../components/CheckoutComponent/CheckoutHeader';
import Steps from './../../components/CheckoutComponent/Steps';
import {fonts} from './../../config/fonts';
import Continue from '../../assets/welcome/continue.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Validation schema using Yup for pincode and phone number only
const validationSchema = Yup.object().shape({
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^[9876]\d{9}$/,
      'Phone number must be a 10-digit Indian number starting with 9, 8, 7, or 6',
    ),
});

const AddressVerify1 = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckoutHeader />
      <Steps activeStep={2} />
      <Text style={styles.heading}>Add New Address</Text>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        extraHeight={100}>
        <Formik
          initialValues={{
            pincode: '',
            buildingName: '',
            city: '',
            state: '',
            floor: '',
            name: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
            navigation.navigate('AddressVerify2');
            // Handle form submission
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/* Pincode Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter pincode*"
                placeholderTextColor="#888"
                onChangeText={handleChange('pincode')}
                onBlur={handleBlur('pincode')}
                value={values.pincode}
                keyboardType="numeric"
                maxLength={6}
              />
              {touched.pincode && errors.pincode && (
                <Text style={styles.errorText}>{errors.pincode}</Text>
              )}

              {/* Building Name Input */}
              <TextInput
                style={styles.input}
                placeholder="Flat/House/Building Name*"
                placeholderTextColor="#888"
                onChangeText={handleChange('buildingName')}
                onBlur={handleBlur('buildingName')}
                value={values.buildingName}
              />

              {/* City and State */}
              <View style={styles.rowContainer}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="City*"
                  placeholderTextColor="#888"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="State*"
                  placeholderTextColor="#888"
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                />
              </View>

              {/* Floor Input */}
              <TextInput
                style={styles.input}
                placeholder="Floor*"
                placeholderTextColor="#888"
                onChangeText={handleChange('floor')}
                onBlur={handleBlur('floor')}
                value={values.floor}
              />

              {/* Divider */}
              <View style={styles.divider} />

              {/* Name Input */}
              <TextInput
                style={styles.input}
                placeholder="Your Name*"
                placeholderTextColor="#888"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />

              {/* Phone Number Input */}
              <TextInput
                style={styles.input}
                placeholder="Your Phone Number*"
                placeholderTextColor="#888"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                keyboardType="numeric"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              {/* Submit Button */}
              <View style={styles.continueButtonAlign}>
                <TouchableOpacity
                  style={styles.continueContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.contButton}>CONTINUE</Text>
                  <Image source={Continue} style={styles.continue} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddressVerify1;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.SemiBold,
    color: '#000',
    marginVertical: 20,
    marginLeft: 15,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    height: 51,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    marginBottom: 25,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
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
    marginTop: 10,
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
