import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RightArrow from '../../assets/welcome/rightArrow.png';
import { fonts } from './../../config/fonts';

const ChargerActionScreen = ({ navigation }) => {
  const handlePress = action => {
    console.log(`${action} clicked`);

    switch (action) {
      case 'Add Charger':
        navigation.navigate('AddCharger');
        break;
      case 'View Charger':
        navigation.navigate('ViewCharger');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
   
      <Text style={styles.headingText}>Charger</Text>
      <Text style={styles.subHeading}>
        Choose an action{' '}
        <Image source={RightArrow} style={styles.rightArrow} />
      </Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => handlePress('Add Charger')}>
          <Text style={styles.actionText}>Add Charger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => handlePress('View Charger')}>
          <Text style={styles.actionText}>View Charger</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChargerActionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  logo: {
    width: 42,
    height: 49,
    resizeMode: 'contain',
    position: 'absolute',
    left: '54%',
    transform: [{ translateX: -21 }],
  },
  headingText: {
    fontFamily: fonts.SemiBold,
    fontSize: 36,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    color: '#000000',
  },
  subHeading: {
    fontFamily: fonts.Medium,
    fontSize: 20,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    color: '#38B6FF',
  },
  rightArrow: {
    width: 20,
    height: 11,
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  actionBox: {
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38B6FF',
    borderRadius: 14,
    marginBottom: 30,
  },
  actionText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});