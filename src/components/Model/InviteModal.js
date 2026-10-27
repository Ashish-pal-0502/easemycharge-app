import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // Make sure to install this
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../config/fonts';

const INVITE_CODE = 'ASHISH50'; // In a real app, this would be user.referralCode

const InviteModal = ({ visible, onClose }) => {
  
  const handleCopy = () => {
    Clipboard.setString(INVITE_CODE);
    Alert.alert('Copied!', 'Referral code copied to clipboard.');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hey! Join me on EaseMyCharge to find EV chargers easily. Use my code ${INVITE_CODE} to get ₹50 off your first charging session! Download the app now.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not open share dialog.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              
              <View style={styles.dragHandle} />

              <Text style={styles.emoji}>🎉</Text>

              <Text style={styles.title}>Invite Friends, Earn Rewards!</Text>
              <Text style={styles.subtitle}>
                Share your code with friends. When they complete their first charging session, you both get ₹50 off!
              </Text>

              {/* Referral Code Box */}
              <View style={styles.codeContainer}>
                <View>
                  <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                  <Text style={styles.codeText}>{INVITE_CODE}</Text>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                  <Ionicons name="copy-outline" size={20} color="#38B6FF" />
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <TouchableOpacity 
                style={styles.shareButton} 
                onPress={handleShare}
                activeOpacity={0.8}
              >
                <Ionicons name="share-social" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.shareButtonText}>Share Invite Link</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Maybe Later</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InviteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  codeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
    borderWidth: 1.5,
    borderColor: '#E5EAF0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  codeLabel: {
    fontFamily: fonts.Bold,
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 4,
  },
  codeText: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: '#38B6FF',
    letterSpacing: 2,
  },
  copyButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#38B6FF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shareButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#FFF',
  },
  closeButton: {
    paddingVertical: 12,
  },
  closeButtonText: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: '#888',
  },
});