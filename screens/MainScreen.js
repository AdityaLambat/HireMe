import React, { useState, useEffect, useContext } from "react";
import { View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Job from "./JobScreen";
import Applies from "./AppliesScreen";
import Home from "./HomeScreen";
import Profile from "./ProfileScreen";

// Screens
const HomeName = 'Home'
const JobName = 'Job'
const AppliesName = 'Applies'
const ProfileName = 'Profile'


const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
    }}>
      <Image
        style={{
          width: "60%",
          height: "100%",
          marginLeft: "-12%"
        }}
        source={require('../assets/HM1.jpg')} />
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: 'black',
          marginLeft: "41%"
        }}
        source={require('../assets/Icon.jpg')}
      />
    </View>
  );
}

const Main = () => {

  return (
    <Tab.Navigator
      initialRouteName={HomeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === HomeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === JobName) {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (rn === AppliesName) {
            iconName = focused ? 'paper-plane' : 'paper-plane-outline';
          } else if (rn === ProfileName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />
        }
      })}
    >

      <Tab.Screen name={HomeName} component={Home} options={{
        headerTitle: (props) => <LogoTitle {...props} />,
      }} />
      <Tab.Screen name={JobName} component={Job} options={{
        headerTitle: (props) => <LogoTitle {...props} />,
      }} />
      <Tab.Screen name={AppliesName} component={Applies} options={{
        headerTitle: (props) => <LogoTitle {...props} />,
      }} />
      <Tab.Screen name={ProfileName} component={Profile} options={{
        headerTitle: (props) => <LogoTitle {...props} />, 
      }} />
    </Tab.Navigator>
  )
}

export default Main