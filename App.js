import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AppStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}


