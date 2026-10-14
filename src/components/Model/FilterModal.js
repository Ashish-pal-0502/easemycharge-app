import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';

import {fonts} from './../../config/fonts';
import filter from '../../assets/filterModel/filter.png';
import close from '../../assets/filterModel/close.png';
import down from '../../assets/filterModel/down.png';
import up from '../../assets/filterModel/up.png';

import charger from '../../assets/filterModel/charger.png';
import charging from '../../assets/filterModel/charging.png';
import availability from '../../assets/filterModel/availability.png';
import chargerLocation from '../../assets/filterModel/chargerLocation.png';
import chargeScore from '../../assets/filterModel/chargeScore.png';
import chargingCapacity from '../../assets/filterModel/chargingCapacity.png';
import chargingStation from '../../assets/filterModel/chargingStation.png';
import connector from '../../assets/filterModel/connector.png';
import paymentOption from '../../assets/filterModel/paymentOption.png';
import plug from '../../assets/filterModel/plug.png';
import realTimeTraffic from '../../assets/filterModel/realTimeTraffic.png';
import stationDistance from '../../assets/filterModel/stationDistance.png';
import stationOperator from '../../assets/filterModel/stationOperator.png';

const FilterModal = ({visible, onClose}) => {
  const [expanded, setExpanded] = useState(null);

  const filterData = [
    {
      title: 'Charger Type',
      items: [
        'Type1(J1772)',
        'Tesla Supercharger',
        'CCS(Combined Charging System)',
        'CHAdeMO',
      ],
      icon: charger,
    },
    {
      title: 'Charging Speed',
      items: ['Fast Charging', 'SlowCharging', ' Ultra-Fast Charging'],
      icon: charging,
    },
    {
      title: 'Connector Type',
      items: ['ACCharger', 'DCCharger'],
      icon: connector,
    },
    {
      title: 'Plug Type',
      items: ['Type1', 'Type2', 'CCS', 'CHAdeMO '],
      icon: plug,
    },
    {
      title: 'Availability',
      items: ['Available Now', 'Booking Required'],
      icon: availability,
    },
    {
      title: 'Payment Option',
      items: ['Free', 'Paid'],
      icon: paymentOption,
    },
    {
      title: 'Charger Location Type',
      items: ['Public', 'Private', 'Community '],
      icon: chargerLocation,
    },
    {
      title: 'Charging Station Amenities',
      items: [
        'Restroom',
        'Wi-Fi',
        'Cafeteria',
        ' Parking Availability',
        'Nearby Shops/Restaurants',
      ],
      icon: chargingStation,
    },
    {
      title: 'Charging Capacity (kW)',
      items: ['Below22kW', '22kWto50kW', 'Above50kW'],
      icon: chargingCapacity,
    },
    {
      title: 'Station Distance from User',
      items: ['Nearby (within 5 km)', '5-10 km', '10-20 km', 'Above20km'],
      icon: stationDistance,
    },
    {
      title: 'Station Operator',
      items: ['Government', 'Private', 'Network'],
      icon: stationOperator,
    },
    {
      title: 'Real-Time Traffic/Route',
      items: ['Slow', 'Fast', 'Super Fast', 'Ultra Fast'],
      icon: realTimeTraffic,
    },
    {
      title: 'Charge-Score',
      items: ['Slow', 'Fast', 'Super Fast', 'Ultra Fast'],
      icon: chargeScore,
    },
  ];

  const toggleExpand = index => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={filter} style={styles.icon} />
            <Text style={styles.headerText}>FILTER</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={close} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Filter List */}
          {filterData.map((filter, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.filterItem}
                onPress={() => toggleExpand(index)}>
                {/* Icon for each filter title */}
                <Image source={filter.icon} style={styles.titleIcon} />
                <Text style={styles.filterText}>{filter.title}</Text>
                <Image
                  source={expanded === index ? up : down}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>

              {/* Dropdown Items */}
              {expanded === index && (
                <View style={styles.expandedContainer}>
                  <FlatList
                    data={filter.items}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({item}) => (
                      <View style={styles.subItem}>
                        <Text
                          style={styles.subItemText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  titleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  chevronIcon: {
    marginRight: 4,
    resizeMode: 'contain',
    width: 7,
    height: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    flex: 1,
    marginLeft: 8,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  filterText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    flex: 1,
  },
  expandedContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subItem: {
    paddingVertical: 8,
    paddingLeft: 26,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  subItemText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: '#000',
  },
});
