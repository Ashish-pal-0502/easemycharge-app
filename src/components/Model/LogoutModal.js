import React from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { fonts } from '../../config/fonts';

const LogoutModal = ({ visible, onClose, onConfirm }) => {
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

              <Text style={styles.emoji}>🥺</Text>

              <Text style={styles.title}>Oh no, you're leaving!</Text>
              <Text style={styles.subtitle}>
                Are you sure you want to log out? We'll miss you! Come back soon for your next charge.
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.stayButton} 
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.stayButtonText}>No, Stay</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.logoutButton} 
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.logoutButtonText}>Yes, Logout</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  stayButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#F0F4F8', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#38B6FF',
  },
  logoutButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#FF5A5F', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});