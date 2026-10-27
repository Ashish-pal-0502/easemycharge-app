

import React, { useState, useEffect } from 'react';
import cache from '../utility/cache';
import authStorage from './storage'; 
import apiClient from './../api/client';

const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  userSetter.setUser = setUser;

  useEffect(() => {
    const loadUser = async () => {
      try {
        // 1. Check if we have a token
        const token = await authStorage.getAccessToken();
        
        if (token) {
          // 2. Token exists, fetch fresh data from API
          const res = await apiClient.get('/users/me');

          if (res.ok) {
            setUser(res.data.data);
            await cache.store('userDetails', res.data.data);
          } else {
            // Token is invalid/expired and refresh failed
            setUser(null);
          }
        } else {
          // No token, just check cache (though unlikely if no token)
          const cachedUser = await cache.get('userDetails');
          if (cachedUser) setUser(cachedUser);
        }
      } catch (error) {
        console.log('Failed to load user', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userSetter = { setUser: () => {} };

export default AuthContext;