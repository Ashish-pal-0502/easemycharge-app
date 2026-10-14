import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RightArrow from '../../assets/appIntro/rightarrow.png';
import {fonts} from './../../config/fonts';
import ItemDetailModal from './../Model/ItemDetailModel';

const screenWidth = Dimensions.get('window').width;

const MarketplaceCard = ({title, image, description, price}) => {
  const [itemDetailModel, setItemDetailModelVisible] = useState(false);

  const close = () => {
    setItemDetailModelVisible(false);
  };
  return (
    <View style={styles.card}>
      <View style={styles.borderBox}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.horizontalLine} />

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Starting @</Text>
            <Text style={styles.priceValue}>₹{price}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => setItemDetailModelVisible(true)}>
            <Text style={styles.viewButtonText}>View</Text>
            <Image source={RightArrow} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ItemDetailModal visible={itemDetailModel} onClose={close} />
    </View>
  );
};

export default MarketplaceCard;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.45,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderBox: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#EBEEF2',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginVertical: 2,
  },
  description: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.SemiBold,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38B6FF',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    height: 30,
    width: 65,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
