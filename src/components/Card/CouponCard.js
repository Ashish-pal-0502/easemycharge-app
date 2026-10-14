import React from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import DiscountIcon from '../../assets/filterModel/discount.png';
import {fonts} from './../../config/fonts';

const CouponCard = () => {
  return (
    <View style={styles.container}>
      <Image source={DiscountIcon} style={styles.discountImage} />
      <TextInput
        style={styles.input}
        placeholder="Enter coupon code"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 182, 255, 0.17)',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,

    width: '93%',
  },
  discountImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 40, // Increase font size
    color: '#000', // Color of the input text
    fontFamily: fonts.SemiBold,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});
