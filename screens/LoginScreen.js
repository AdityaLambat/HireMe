import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../components/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Buttons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { IPURL } from '../api/ip';
import styles from '../components/Styles';

const LoginScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name,  
    // email, or password changes 
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate email field 
    if (!email) {
      errors.email = 'Email is required';
    }

    // Validate password field 
    if (!password) {
      errors.password = 'Password is required';
    }

    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          setTimeout(() => {
            navigation.replace("Main");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    axios.post(`http://${IPURL}:8090/login`, { email, password })
      .then((response) => {
        // const token = response.data.token;
        AsyncStorage.setItem("authToken", email)
        navigation.navigate('Main');
      })
      .catch((error) => {
        Alert.alert("Login Failed")
        console.error('Login failed:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Hi Welcome Back ! 👋
          </Text>

          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Hello again you have been missed!</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 500,
            marginVertical: 8
          }}>Email address</Text>

          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <MaterialCommunityIcons name="email" size={24} color="black" />
            <TextInput
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
                marginLeft: -12
              }}
            />
            <TextInput
              placeholder='Enter Your Email Address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              onChangeText={setEmail}
              style={{
                width: "85%"
              }}
            />
          </View>
        </View>

        {errors.email && (
          <Text style={styles.error2}>{errors.email}</Text>
        )}


        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 500,
            marginVertical: 8
          }}>Password</Text>

          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>

            <Entypo name="lock" size={24} color="black" />

            <TextInput
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{
                fontSize: 15,
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
                marginLeft: -12
              }}
            />
            <TextInput
              placeholder='Enter Your Password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              onChangeText={setPassword}
              style={{
                width: "85%"
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12
              }}
            >
              {
                isPasswordShown == false ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )
              }

            </TouchableOpacity>
          </View>
        </View>

        {errors.password && (
          <Text style={styles.error2}>{errors.password}</Text>
        )}

        <TouchableOpacity
          disabled={!isFormValid}
          style={{ opacity: isFormValid ? 1 : 0.5 }}
        >
          <Button
            title="Login"
            onPress={handleLogin}
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../assets/linkedin.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text>Linkedin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
          <Pressable
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default LoginScreen
