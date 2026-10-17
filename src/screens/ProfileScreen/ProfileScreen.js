

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../../assets/logo/Logo.png';
import UserAvatar from '../../assets/logo/Logo.png'; 

import { fonts } from './../../config/fonts';
import colors from './../../config/colors';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={UserAvatar} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>ASHISH P</Text>
          <Text style={styles.vehicleText}>MHAWK • 1234 EV Z23</Text>
        </View>

        <View style={styles.menuGroup}>
          <ProfileMenuItem
            icon={<Ionicons name="location-outline" size={22} color={colors.black} />}
            label="Charging Sessions"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={<Ionicons name="car-outline" size={22} color={colors.black} />}
            label="Change EV"
            onPress={() => {}}
            isLast
          />
        </View>

        <View style={[styles.menuGroup, {marginTop: 30}]}>
          <ProfileMenuItem
            icon={<Ionicons name="people-outline" size={22} color={colors.black} />}
            label="Invite Your Friends"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={<Ionicons name="shield-checkmark-outline" size={22} color={colors.black} />}
            label="Privacy Policy"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={<MaterialCommunityIcons name="headset" size={22} color={colors.black} />}
            label="Help And Support"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={<MaterialCommunityIcons name="logout" size={22} color={colors.black} />}
            label="Logout"
            onPress={() => {}}
            isLast
          />
        </View>

        <View style={styles.footer}>
          <Image source={Logo} style={styles.footerLogo} />
          <Text style={styles.versionText}>App Version 2.0.2</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileMenuItem = ({icon, label, onPress, isLast}) => (
  <TouchableOpacity
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  nameText: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  vehicleText: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#888888',
    marginTop: 6,
    textTransform: 'uppercase',
  },
  menuGroup: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  menuIconContainer: {
    width: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.black,
    marginLeft: 10,
  },
  chevron: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.Light,
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 50,
  },
  footerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#B0B0B0', 
    marginBottom: 8,
  },
  versionText: {
    fontFamily: fonts.Medium,
    fontSize: 13,
    color: '#A0A0A0',
  },
});