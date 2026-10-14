import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const TwoWheelerManuCard = ({imageSource}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.cardImage} />
    </View>
  );
};

export default TwoWheelerManuCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 160,
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
