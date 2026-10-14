import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ManufacturerCard = ({imageSource}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.cardImage} />
    </View>
  );
};

export default ManufacturerCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#38B6FF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  cardImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});
