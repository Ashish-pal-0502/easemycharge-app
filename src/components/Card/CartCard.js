import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {fonts} from './../../config/fonts';

const CartCard = ({image, title, description, price}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Quantity controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decreaseQuantity}
          style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          onPress={increaseQuantity}
          style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Price section */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`₹ ${price}`}</Text>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  imageContainer: {
    width: 66,
    height: 69,
    backgroundColor: '#EBEEF2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontFamily: fonts.Medium,
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#777',
    fontFamily: fonts.Regular,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    backgroundColor: '#38B6FF',
    borderRadius: 7,
    width: 76,
    height: 34,
    marginBottom: 20,
  },
  quantityButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    color: '#fff',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.SemiBold,
    paddingTop: 4,
  },
  priceContainer: {
    position: 'absolute',
    right: 16,
    bottom: 17,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.Medium,
  },
});
