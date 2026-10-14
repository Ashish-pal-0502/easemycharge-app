import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import cache from '../utility/cache';
import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {

  const { user, setUser } =
    useContext(AuthContext);

  const logIn = async (accessToken, refreshToken) => {
    const user1 = jwtDecode(accessToken);

    setUser(user1);

    await authStorage.storeTokens(accessToken, refreshToken);
    await cache.store('userDetails', user1);
  };

  const logOut = async () => {
    setUser(null);
    await authStorage.removeTokens();
    await AsyncStorage.removeItem('fcmToken');
    await cache.clear('userDetails');
  };


  return { user, logIn, logOut };
};

export default useAuth;
