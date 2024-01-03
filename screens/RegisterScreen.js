import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../components/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Buttons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { IPURL } from '../api/ip';
import styles from '../components/Styles';

const RegisterScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  // Form Validation
  const isEmailValid = (email) => {
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFName = (fname) => {
    // First Name Validation
    const nameRegex = /^[A-Za-z]+$/
    return nameRegex.test(fname)
  }

  const isLName = (lname) => {
    // Last Name Validation
    const nameRegex = /^[A-Za-z]+$/
    return nameRegex.test(lname)
  }

  const isMobileValid = (mobile) => {
    // Mobile Number Validation
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const isPasswordValid = (password) => {
    // Password Validation
    if (password.length >= 8 && password.length <= 15) {
      return true
    }

    if (!/\d/.test(password)) {
      return false
    }

    if (!/[A-Z]/.test(password)) {
      return false
    }
    if (!/[a-z]/.test(password)) {
      return false
    }
    if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
      return false
    }
  }

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


  const handleRegistration = () => {
    const newErrors = [];

    if (!fname) {
      newErrors.push('FR')
    }
    if (!isFName(fname)) {
      newErrors.push('PFR')
    }
    if (!lname) {
      newErrors.push('LR')
    }
    if (!isLName(lname)) {
      newErrors.push('PLR')
    }

    if (!email) {
      newErrors.push('ER')
    }
    if (!isEmailValid(email)) {
      newErrors.push('PER')
    }

    if (!mobile) {
      newErrors.push('MR')
    }
    if (!isMobileValid(mobile)) {
      newErrors.push('PMR')
    }

    if (!password) {
      newErrors.push('PR')
    }

    if (!isPasswordValid(password)) {
      newErrors.push('PPR')
    }
    setErrors(newErrors)
    if (!(errors.length > 0)) {
      setEmail("")
      setPassword("")
      setMobile("")
      setFName("")
      setLName("")

      setLoading(true)
      // Make an API request to your server for user registration
      axios
        .post(`http://${IPURL}:8090/register`, {
          fname,
          lname,
          email,
          mobile,
          password,
        })
        .then((response) => {
          // Handle a successful registration
          if (response.status == 200) {
            setLoading(false)
            Alert.alert("Email Verification Sent")
            navigation.navigate('Login')
          }
        })
        .catch((error) => {
          // Handle registration error
          console.error('Registration failed:', error);

        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black
            }}>
              Create Account
            </Text>

            <Text style={{
              fontSize: 16,
              color: COLORS.black
            }}>Connect with your opportunities!</Text>
          </View>

          {/* First Name */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>First Name</Text>

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

              <Ionicons name="person-circle-outline" size={24} color="black" style={{
                marginLeft: "-2%"
              }} />

              <Text
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                style={{
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                  marginLeft: "-2%"
                }}
              />

              {/* First Name Input */}
              <TextInput
                value={fname}
                onChangeText={(text) => setFName(text)}
                placeholder='Enter Your First Name'
                placeholderTextColor={COLORS.black}
                keyboardType='email-address'
                style={{
                  width: "85%"
                }}
              />
            </View>
          </View>
          {errors.includes('FR') && (
            <Text style={styles.error1}>Required</Text>
          )}
          {errors.includes('PFR') && (
            <Text style={styles.error2}>Please Enter Only Text</Text>
          )}

          {/* Last Name */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>Last Name</Text>

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

              <Ionicons name="person-circle-outline" size={24} color="black" style={{
                marginLeft: "-2%"
              }} />

              <Text
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                style={{
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                  marginLeft: "-2%"
                }}
              />

              {/* Last Name Input */}
              <TextInput
                value={lname}
                onChangeText={(text) => setLName(text)}
                placeholder='Enter Your Last Name'
                placeholderTextColor={COLORS.black}
                keyboardType='email-address'
                style={{
                  width: "85%"
                }}
              />
            </View>
          </View>
          {errors.includes('LR') && (
            <Text style={styles.error1}>Required</Text>
          )}
          {errors.includes('PLR') && (
            <Text style={styles.error2}>Please Enter Only Text </Text>
          )}


          {/* Email */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
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

              <MaterialCommunityIcons name="email" size={24} color="black"
                style={{
                  marginLeft: "-2%"
                }} />
              <Text
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                style={{
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                  marginLeft: "-2%"
                }}
              />

              {/* Email Input */}
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter Your Email Address'
                placeholderTextColor={COLORS.black}
                keyboardType='email-address'
                style={{
                  width: "85%"
                }}
              />
            </View>
          </View>
          {errors.includes('ER') && (
            <Text style={styles.error1}>Required</Text>
          )}
          {errors.includes('PER') && (
            <Text style={styles.error2}>Please Enter Valid Email</Text>
          )}


          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>Mobile Number</Text>

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
              <Text style={{
                borderLeftColor: COLORS.grey,
                height: "100%",
                fontWeight: 'bold',
                marginTop: "7%",
                marginLeft: "-2%"
              }}>+91</Text>
              <Text style={{
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
                fontWeight: 'bold',
                marginLeft: "-2%"
              }} />

              {/* Mobile Input */}
              <TextInput
                value={mobile}
                onChangeText={(text) => setMobile(text)}
                placeholder='Enter your phone number'
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                style={{
                  width: "85%"
                }}
              />
            </View>
          </View>

          {errors.includes('MR') && (
            <Text style={styles.error1}>Required</Text>
          )}
          {errors.includes('PMR') && (
            <Text style={styles.error2}>Please Enter Only 10 Digits</Text>
          )}



          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
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

              <Entypo name="lock" size={24} color="black" style={{
                marginLeft: "-2%"
              }} />
              <TextInput
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                style={{
                  fontSize: 15,
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                  marginLeft: "-7%"
                }}
              />

              {/* Password Input */}
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter Your Password'
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
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
          {errors.includes('PR') && (
            <Text style={styles.error1}>Required</Text>
          )}
          {errors.includes('PPR') && (
            <Text style={styles.error3}>Password must have:{"\n"}
              <Text>UpperCase & LowerCase Letters{"\n"}</Text>
              <Text>A Special Character{"\n"}</Text>
              <Text>A Number{"\n"}</Text>
              <Text>Minimum 8 and Maximum 15 Length</Text>
            </Text>
          )}
          {/* Registration Button */}

          <Button
            onPress={handleRegistration}
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          {isLoading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color={"#27695F"} />
            </View>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
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
            <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6
              }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
