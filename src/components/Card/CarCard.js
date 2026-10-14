import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {fonts} from './../../config/fonts';

const CarCard = ({carImage, carName}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={carImage} style={styles.carImage} />
      <Text style={styles.carName}>{carName}</Text>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.33)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 160,
    margin: 10,
  },
  carImage: {
    width: 110,
    height: 100,
    resizeMode: 'contain',
  },
  carName: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.SemiBold,
    marginTop: 2,
    textAlign: 'center',
  },
});
