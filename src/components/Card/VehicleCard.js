import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from './../../config/fonts';

const VehicleCard = ({imageSource, label, onPress}) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={styles.cardContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      {label ? <Text style={styles.cardLabel}>{label}</Text> : null}
    </Wrapper>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: '#38B6FF',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    padding: 8,
  },
  cardImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  cardLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.SemiBold,
    marginTop: 6,
    textAlign: 'center',
  },
});