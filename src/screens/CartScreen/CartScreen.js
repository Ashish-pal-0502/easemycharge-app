import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import Back from '../../assets/welcome/backbutton.png';
import {fonts} from './../../config/fonts';
import CartCard from './../../components/Card/CartCard';
import Battery from '../../assets/marketplace/battery.png';
import Charger from '../../assets/marketplace/charger.png';
import CouponCard from './../../components/Card/CouponCard';


const CartScreen = ({navigation}) => {
  const price = 1200;
  const cartData = [
    {
      id: 1,
      image: Battery,
      title: 'EV Spares Hub Battery LED Bulb Except Hero Electronic Vehicle',
      description: 'EaseMyCharge',
      price: 5000,
    },
    {
      id: 2,
      image: Charger,
      title: 'Vehicle EV Charger Hub Charger Except Hero Electronic Vehicle',
      description: 'EaseMyCharge',
      price: 6000,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Your Cart</Text>
      </View>

      <View style={styles.borderLineContainer}>
        <View style={styles.borderLine} />
      </View>

      <Text style={styles.TextHeading}>Added Products</Text>

      {cartData.map(item => (
        <CartCard
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          price={item.price}
        />
      ))}

      <CouponCard />

      <View style={styles.detailsBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailTextLeft}>Sub Total</Text>
          <Text style={styles.detailTextRight}>{`₹ ${price}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTextLeft}>Handling Charge</Text>
          <Text style={styles.detailTextRight}>{`₹ ${price}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTextLeft}>Taxes & Fees</Text>
          <Text style={styles.detailTextRight}>{`₹ ${price}`}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.priceLabel}> Total</Text>
          <Text style={styles.priceValue}>₹ 1,200</Text>
        </View>
      </View>

      <View style={styles.borderLineContainer2}>
        <View style={styles.borderLine2} />
      </View>

      {/* Delivery Date Check Section */}
      <View style={styles.deliveryCheckBox}>
        <Text style={styles.deliveryText}>Check estimated delivery date</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.pincodeInput}
            placeholder="Enter pincode"
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => navigation.navigate('PhoneVerify1')}>
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dateSection}>
        <Text style={styles.date}>27 Nov 2024 To 4 Dec 2024</Text>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: 'start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'start',
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  backButton: {
    width: 24,
    height: 20,
    marginRight: 12,
  },
  headingText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  borderLineContainer: {
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  borderLine: {
    height: 0.5,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
  borderLineContainer2: {
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  borderLine2: {
    height: 0.5,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },

  TextHeading: {
    color: '#000',
    fontFamily: fonts.Medium,
    marginLeft: 20,
    marginTop: 12,
  },
  detailsBox: {
    backgroundColor: '#F5F8FA',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '93%',
    height: 200,
    justifyContent: 'center',
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
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.SemiBold,
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

  // Delivery Date Check Section
  deliveryCheckBox: {
    width: '93%',
    marginTop: 10,
  },
  deliveryText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    marginBottom: 10,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pincodeInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F2F7AB',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    height: 44,
  },
  checkButton: {
    backgroundColor: '#38B6FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.Medium,
  },

  dateSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38B6FF17',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '85%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    height: 48,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2CA1E4',
  },
});
