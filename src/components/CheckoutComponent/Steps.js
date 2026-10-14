import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from './../../config/fonts';

const Steps = ({activeStep}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={[styles.circle, activeStep === 1 && styles.activeCircle]}>
          <Text
            style={[
              styles.stepText,
              activeStep === 1 && styles.activeStepText,
            ]}>
            1
          </Text>
        </View>
        <Text style={styles.label}>Mobile</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.stepContainer}>
        <View style={[styles.circle, activeStep === 2 && styles.activeCircle]}>
          <Text
            style={[
              styles.stepText,
              activeStep === 2 && styles.activeStepText,
            ]}>
            2
          </Text>
        </View>
        <Text style={styles.label}>Address</Text>
      </View>

      <View style={styles.line} />

      {/* Step 3 */}
      <View style={styles.stepContainer}>
        <View style={[styles.circle, activeStep === 3 && styles.activeCircle]}>
          <Text
            style={[
              styles.stepText,
              activeStep === 3 && styles.activeStepText,
            ]}>
            3
          </Text>
        </View>
        <Text style={styles.label}>Payment</Text>
      </View>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#38B6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    borderColor: '#38B6FF',
    backgroundColor: '#38B6FF',
  },
  stepText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.SemiBold,
  },
  activeStepText: {
    color: '#fff',
    fontFamily: fonts.SemiBold,
  },
  line: {
    height: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    flex: 1,
    marginBottom: 22,
    marginHorizontal: 5,
  },

  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#000',
    fontFamily: fonts.Medium,
  },
});
