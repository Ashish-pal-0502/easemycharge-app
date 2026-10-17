import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Back from '../../assets/welcome/backbutton.png';
import UserImage from '../../assets/user/user.png';
import Icon1 from '../../assets/user/charging.png';
import Icon2 from '../../assets/user/change.png';
import InviteFriendsIcon from '../../assets/user/inviteYourFriends.png';
import PrivacyPolicyIcon from '../../assets/user/privacy.png';
import HelpSupportIcon from '../../assets/user/help.png';
import LogoutIcon from '../../assets/user/logout.png';
import DropdownIcon from '../../assets/filterModel/down.png';
import AppLogo from '../../assets/logo/Logo.png';
import {fonts} from './../../config/fonts';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Back} style={styles.backButton} />
          </TouchableOpacity>
        </View>

        <Image source={UserImage} style={styles.profileImage} />

        <Text style={styles.userName}>NISHANT SHARMA</Text>

        <Text style={styles.additionalInfo}>TATA NEXON · 1234 EV Z23</Text>

        {/* List of items with icons and dropdowns */}
        <View style={styles.itemList}>
          <View style={styles.listItem}>
            <Image source={Icon1} style={styles.itemIcon} />
            <Text style={styles.itemText}>Charging Sessions</Text>
            <Image source={DropdownIcon} style={styles.dropdownIcon} />
          </View>

          <View style={styles.listItem}>
            <Image source={Icon2} style={styles.itemIcon} />
            <Text style={styles.itemText}>Change EV</Text>
            <Image source={DropdownIcon} style={styles.dropdownIcon} />
          </View>
        </View>

        {/* Links section */}
        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.linkItem}>
            <Image source={InviteFriendsIcon} style={styles.linkIcon} />
            <Text style={styles.linkText}>Invite Your Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Image source={PrivacyPolicyIcon} style={styles.linkIcon} />
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Image source={HelpSupportIcon} style={styles.linkIcon} />
            <Text style={styles.linkText}>Help and Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Image source={LogoutIcon} style={styles.linkIcon} />
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={styles.appInfoContainer}>
          <Image source={AppLogo} style={styles.appLogo} />
          <Text style={styles.appName}>EaseMyCharge</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 20,
    height: 25,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  userName: {
    fontFamily: fonts.Bold,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  additionalInfo: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.55)',
    textAlign: 'center',
    marginTop: 0,
  },
  itemList: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  dropdownIcon: {
    width: 7,
    height: 12,
    resizeMode: 'contain',
    padding: 4,
  },
  linkContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  linkIcon: {
    width: 25,
    height: 20,
    marginRight: 15,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: '#333',
  },
  appInfoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  appLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: '#333',
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.55)',
  },
});
