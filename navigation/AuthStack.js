import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Applies from '../screens/AppliesScreen';
import Job from '../screens/JobScreen';
import Main from '../screens/MainScreen';
import JobDetails from '../screens/JobDetailsScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='Job' component={Job} />
      <Stack.Screen name='Applies' component={Applies} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='JobDetails' component={JobDetails} />
    </Stack.Navigator>
  );
};

export default AuthStack;