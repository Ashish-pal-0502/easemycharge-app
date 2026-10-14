import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import {useNavigation} from '@react-navigation/native';

const CheckoutHeader = () => {
  const navigation = useNavigation();
  const price = 5000;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headingText}>Order Price @</Text>
          <Text style={styles.priceText}>{`₹ ${price}`}</Text>
        </View>
      </View>

      <View style={styles.borderLine} />
    </View>
  );
};

export default CheckoutHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
  },
  backButton: {
    width: 24,
    height: 20,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 12,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  priceText: {
    fontSize: 13,
    fontFamily: fonts.Bold,
    color: 'rgba(0, 0, 0, 1)',
  },
  borderLine: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});
