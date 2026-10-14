import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import Battery from '../../assets/marketplace/battery.png';
import Charger from '../../assets/marketplace/charger.png';
import Horn from '../../assets/marketplace/horn.png';
import Close from '../../assets/filterModel/detailModelClose.png';
import {fonts} from './../../config/fonts';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const ItemDetailModal = ({visible, onClose}) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(Battery);

  const images = [
    {image: Charger},
    {image: Horn},
    {image: Charger},
    {image: Charger},
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={Close} style={styles.closeButtonImage} />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <View style={styles.imageBackground}>
            <Image source={selectedImage} style={styles.image} />
          </View>

          <View style={styles.switchContainer}>
            {images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(img.image)}
                style={styles.switchBox}>
                <Image source={img.image} style={styles.switchImage} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.detailsText}>
            Item details and description here
          </Text>

          {/* Color Section */}
          <View style={styles.colorContainer}>
            <View style={styles.colorCircle} />
            <Text style={styles.colorName}>Yellow</Text>
          </View>

          {/* Brand Section */}
          <View style={styles.brandSection}>
            <Text style={styles.brandName}>EaseMyCharge</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          {/* Details Box */}
          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailTextLeft}>Brand</Text>
              <Text style={styles.detailTextRight}>EaseMyCharge</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTextLeft}>Item Package</Text>
              <Text style={styles.detailTextRight}>Quantity 02</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTextLeft}>Voltage</Text>
              <Text style={styles.detailTextRight}>Voltage 12</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTextLeft}>Manufacturer </Text>
              <Text style={styles.detailTextRight}>EaseMyCharge </Text>
            </View>

            {/* Border */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.priceLabel}>Selling Price</Text>
              <Text style={styles.priceValue}>₹ 1,200</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.buttonTextCart}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => navigation.navigate('CartScreen')}>
              <Text style={styles.buttonTextBuy}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemDetailModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: '50%',
    padding: 8,
    zIndex: 1,
  },
  closeButtonImage: {
    width: 20,
    height: 20,
  },
  modalContent: {
    width: width,
    height: height * 0.88,
    backgroundColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  imageBackground: {
    width: '96%',
    height: 210,
    backgroundColor: '#EBEEF2',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  switchBox: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  switchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsText: {
    paddingHorizontal: 25,
    paddingTop: 10,
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fonts.Medium,
    color: '#000',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'yellow',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  colorName: {
    fontSize: 16,
    color: '#333',
  },
  brandSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    height: 48,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#2CA1E4',
  },
  viewAll: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  detailsBox: {
    backgroundColor: '#F5F8FA',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    width: '90%',
    height: 230,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  detailTextLeft: {
    fontSize: 15,
    color: '#555',
    fontFamily: fonts.Regular,
  },
  detailTextRight: {
    fontSize: 15,
    color: '#333',
    fontFamily: fonts.Medium,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.Regular,
  },
  priceValue: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.SemiBold,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 14,
    width: 121,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: '#38B6FF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 14,
    width: 121,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextCart: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextBuy: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
