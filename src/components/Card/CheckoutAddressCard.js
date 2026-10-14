// CheckoutAddress.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import EditIcon from '../../assets/user/edit.png';
import {fonts} from './../../config/fonts';

const CheckoutAddressCard = ({cityName, pincode, address}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.cityText}>
          {cityName}, {pincode}
        </Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Image source={EditIcon} style={styles.editIcon} />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    width: 185,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  cardContent: {
    padding: 15,
  },
  cityText: {
    fontFamily: fonts.Medium,

    fontSize: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    fontFamily: fonts.Regular,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(235, 235, 235, 1)',
    paddingVertical: 10,
  },
  editIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  editText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.Regular,
  },
});

export default CheckoutAddressCard;
