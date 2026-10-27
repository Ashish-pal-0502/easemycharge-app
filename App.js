
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import useAuth from './src/auth/useAuth';
import { AuthProvider } from './src/auth/context'; 

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user } = useAuth();
  // console.log("Current user in context:", user);
  
  return (
    <NavigationContainer>
      {user ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}