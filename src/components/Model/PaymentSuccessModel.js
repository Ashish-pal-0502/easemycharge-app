import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../../config/fonts';
import CheckIcon from '../../assets/filterModel/successImage.png';
import CloseIcon from '../../assets/filterModel/closeBlack.png';

const PaymentSuccessModel = ({
  visible,
  onClose,
  subTotal,
  amountPaid,
  onGoHome,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>

          {/* Success icon */}
          <View style={styles.successButton}>
            <Image source={CheckIcon} style={styles.checkIcon} />
          </View>

          {/* Success message */}
          <Text style={styles.successText}>Payment Successful</Text>
          <Text style={styles.descriptionText}>
            Your payment has been processed
          </Text>

          {/* Subtotal and Amount Paid box */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Subtotal</Text>
              <Text style={styles.infoValue}>₹ {subTotal}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>You Paid</Text>
              <Text style={styles.infoValue}>₹ {amountPaid}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.continueContainer} onPress={onGoHome}>
            <Text style={styles.contButton}>GO TO HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  successButton: {
    width: 150,
    height: 150,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
  successText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold, // Customize with your font
    color: 'rgba(0, 0, 0, 1)',
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: fonts.Medium, // Customize with your font
    color: 'rgba(0, 0, 0, 0.41)',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 10,
    backgroundColor: 'rgba(244, 245, 248, 1)',
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: 'rgba(78, 78, 78, 1)',
    fontFamily: fonts.Regular, // Customize with your font
  },
  infoValue: {
    fontSize: 16,
    fontFamily: fonts.Medium, // Customize with your font
    color: 'rgba(0, 0, 0, 0.9)',
  },

  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 3,
    borderColor: '#38B6FF',
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
  },
  contButton: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    marginRight: 5,
  },
});
