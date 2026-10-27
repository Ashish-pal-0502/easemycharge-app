

import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import cache from '../utility/cache';
import AuthContext from './context';
import authStorage from './storage';
import apiClient from './../api/client';

const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/users/me');

     
      if (res.ok) {
        // Merge the full database profile with the roles from the token
        const fullUser = { ...res.data.data };
        setUser(fullUser);
        await cache.store('userDetails', fullUser);
        return fullUser;
      }
    } catch (error) {
      console.log('Failed to fetch profile', error);
    }
    return null;
  };

  const logIn = async (accessToken, refreshToken) => {
    const decodedToken = jwtDecode(accessToken);
    
    // 1. Save tokens immediately so the API call works
    await authStorage.storeTokens(accessToken, refreshToken);
    
    // 2. Set a temporary user object from the token
    setUser(decodedToken); 
    
    // 3. Fetch the full profile (name, email, etc.) and update context
    await fetchProfile();
  };

  const logOut = async () => {
    setUser(null);
    await authStorage.removeTokens();
    await AsyncStorage.removeItem('fcmToken');
    await cache.clear('userDetails');
  };

  return { user, logIn, logOut, fetchProfile, loading };
};

export default useAuth;