import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';

const HelpSupportScreen = ({ navigation }) => {
  
  const handleAction = (type) => {
    switch (type) {
      case 'call':
        Linking.openURL('tel:+919999999999');
        break;
      case 'email':
        Linking.openURL('mailto:support@easemycharge.com');
        break;
      case 'whatsapp':
        Linking.openURL('whatsapp://send?text=Hi EaseMyCharge Support&phone=+919999999999');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature is not available yet.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconBg}>
            <MaterialCommunityIcons name="headset" size={40} color="#38B6FF" />
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>
            We're here to help with any issues regarding your charging sessions or account.
          </Text>
        </View>

        {/* Contact Grid */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.gridContainer}>
          
          <TouchableOpacity style={styles.gridItem} onPress={() => handleAction('call')}>
            <View style={[styles.iconBox, { backgroundColor: '#E6F7ED' }]}>
              <Ionicons name="call" size={24} color="#1E8E3E" />
            </View>
            <Text style={styles.gridText}>Call Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => handleAction('email')}>
            <View style={[styles.iconBox, { backgroundColor: '#E8F0FE' }]}>
              <Ionicons name="mail" size={24} color="#1A73E8" />
            </View>
            <Text style={styles.gridText}>Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => handleAction('whatsapp')}>
            <View style={[styles.iconBox, { backgroundColor: '#E6F4EA' }]}>
              <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
            </View>
            <Text style={styles.gridText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => handleAction('faq')}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="help-circle" size={24} color="#E37400" />
            </View>
            <Text style={styles.gridText}>FAQs</Text>
          </TouchableOpacity>

        </View>

        {/* Contact Info Card */}
        <Text style={styles.sectionTitle}>Support Hours</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Monday - Sunday</Text>
            <Text style={styles.infoValue}>9:00 AM - 9:00 PM</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Email Support</Text>
            <Text style={styles.infoValue}>24/7 Available</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
    marginTop: 10,
  },
  backBtn: { width: 42 },
  backButton: { width: 20, height: 25, resizeMode: 'contain' },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: '#000',
  },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20 },
  
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: '#000',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#14323A',
    marginBottom: 16,
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridText: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#333',
  },
  
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginLeft: 12,
  },
  infoValue: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});