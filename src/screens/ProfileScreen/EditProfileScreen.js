import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserAvatar from '../../assets/logo/Logo.png'; 
import { fonts } from './../../config/fonts';
import colors from './../../config/colors';
import apiClient from './../../api/client';
import useAuth from './../../auth/useAuth';

const EditProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  
  // Initialize state with existing user data
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Invalid Name', 'Name cannot be empty');
      return;
    }

    setLoading(true);

		
    try {
      const res = await apiClient.patch('/users/me', {
        name: name.trim(),
        email: email.trim(),
      });

		
      if (!res.ok) {
        // Show backend validation error (e.g., invalid email format)
        Alert.alert('Update Failed', res.data?.message || 'Something went wrong');
        return;
      }

      // Optional: You can update the context here if you want the name 
      // to update instantly without a re-login, but since your JWT holds the 
      // name, it will update on next login or token refresh.
      
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      
    } catch (error) {
      Alert.alert('Network Error', 'Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} /> 
        </View>

        <View style={styles.content}>
          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <Image source={UserAvatar} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[styles.inputContainer, { backgroundColor: '#F0F0F0' }]}>
              <TextInput
                style={[styles.input, { color: '#888' }]}
                value={user?.phone || 'Not linked'}
                editable={false} // Phone number usually cannot be edited here
              />
            </View>
            <Text style={styles.hintText}>Phone number cannot be changed.</Text>
          </View>

        </View>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.saveButton, loading && { opacity: 0.7 }]} 
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: colors.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    top: 70,
    right: '35%',
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  changePhotoText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: colors.primary,
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.black,
  },
  hintText: {
    fontFamily: fonts.Light,
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    marginLeft: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  saveButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 100, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: colors.white,
    letterSpacing: 1,
  },
});