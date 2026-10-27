import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Back from '../../assets/welcome/backbutton.png';
import { fonts } from './../../config/fonts';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PRIVACY_DATA = [
  {
    id: '1',
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as when you create an account, book a charging session, or contact support. This may include your name, email, phone number, and vehicle details.',
  },
  {
    id: '2',
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products and events.',
  },
  {
    id: '3',
    title: 'Location Data',
    content: 'To find nearby chargers, we require access to your device\'s location. You can disable location services in your device settings, but this may limit your ability to use certain features of the app.',
  },
  {
    id: '4',
    title: 'Data Security',
    content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no internet or email transmission is ever fully secure.',
  },
  {
    id: '5',
    title: 'Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us at privacy@easemycharge.com.',
  },
];

const PrivacyPolicyScreen = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState('1');

  const toggleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={Back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <Text style={styles.lastUpdated}>Last updated: October 2026</Text>
        <Text style={styles.introText}>
          Your privacy is important to us. Here is a simplified explanation of how EaseMyCharge handles your data.
        </Text>

        {PRIVACY_DATA.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <View key={item.id} style={styles.accordionCard}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => toggleAccordion(item.id)}
                activeOpacity={0.7}>
                <Text style={styles.accordionTitle}>{item.title}</Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#38B6FF"
                />
              </TouchableOpacity>
              
              {isExpanded && (
                <View style={styles.accordionBody}>
                  <Text style={styles.accordionText}>{item.content}</Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

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
  lastUpdated: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  introText: {
    fontFamily: fonts.Medium,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
  },
  accordionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  accordionTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: '#14323A',
    flex: 1,
  },
  accordionBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  accordionText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});