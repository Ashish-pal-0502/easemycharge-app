

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../assets/logo/Logo.png';
import UserAvatar from '../../assets/logo/Logo.png'; 
import { fonts } from './../../config/fonts';
import colors from './../../config/colors';
import useAuth from './../../auth/useAuth';
import LogoutModal from './../../components/Model/LogoutModal';
import InviteModal from './../../components/Model/InviteModal';

const ProfileScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
   const [isInviteModalVisible, setInviteModalVisible] = useState(false); 

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    await logOut();
  };

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
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => navigation.navigate('EditProfileScreen')}>
              <Ionicons name="pencil" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>{user?.name || 'User'}</Text>
          <Text style={styles.vehicleText}>MHAWK • 1234 EV Z23</Text>
        </View>

        <Text style={styles.sectionLabel}>Activity</Text>
        <View style={styles.menuGroup}>
          <ProfileMenuItem
            icon={<MaterialCommunityIcons name="calendar-check" size={22} color="#38B6FF" />}
            label="My Bookings"
            onPress={() => navigation.navigate('MyBookingScreen')}
          />
          <ProfileMenuItem
            icon={<Ionicons name="flash-outline" size={22} color="#38B6FF" />}
            label="Charging Sessions"
            onPress={() => {}} 
          />
          <ProfileMenuItem
            icon={<Ionicons name="car-outline" size={22} color="#38B6FF" />}
            label="Change EV"
            onPress={() => {}}
            isLast
          />
        </View>

        <Text style={styles.sectionLabel}>More</Text>
        <View style={styles.menuGroup}>
          <ProfileMenuItem
            icon={<Ionicons name="people-outline" size={22} color="#555" />}
            label="Invite Your Friends"
            onPress={() => setInviteModalVisible(true)} 
          />
          <ProfileMenuItem
            icon={<Ionicons name="shield-checkmark-outline" size={22} color="#555" />}
            label="Privacy Policy"
            onPress={() => navigation.navigate('PrivacyPolicyScreen')} 
          />
          <ProfileMenuItem
            icon={<MaterialCommunityIcons name="headset" size={22} color="#555" />}
            label="Help And Support"
           onPress={() => navigation.navigate('HelpSupportScreen')}
            isLast
          />
        </View>

        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.menuGroup}>
          <ProfileMenuItem
            icon={<MaterialCommunityIcons name="logout" size={22} color="#D93025" />}
            label="Logout"
            onPress={handleLogoutPress}
            isLast
            textColor="#D93025"
          />
        </View>

        <View style={styles.footer}>
          <Image source={Logo} style={styles.footerLogo} />
          <Text style={styles.versionText}>App Version 2.0.2</Text>
        </View>

      </ScrollView>

      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={confirmLogout}
      />

       <InviteModal
        visible={isInviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const ProfileMenuItem = ({ icon, label, onPress, isLast, textColor = colors.black }) => (
  <TouchableOpacity
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={[styles.menuLabel, { color: textColor }]}>{label}</Text>
    <Text style={[styles.chevron, { color: textColor }]}>›</Text>
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
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
    marginBottom: 32,
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
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: '#E5EAF0',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#38B6FF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  nameText: {
    fontFamily: fonts.Bold,
    fontSize: 24,
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
  sectionLabel: {
    fontFamily: fonts.Bold,
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 16,
    marginTop: 10,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginLeft: 10,
  },
  chevron: {
    fontSize: 24,
    fontFamily: fonts.Light,
    marginBottom: 4,
    opacity: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
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