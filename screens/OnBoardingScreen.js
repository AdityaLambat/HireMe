import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../components/colors';
import Button from '../components/Buttons';

const OnBoardingScreen = ({ navigation }) => {

  return (
    <LinearGradient
      style={{
        flex: 1
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
          style={{
            height: "70%",
            width: "auto", 
            marginLeft: "-15%"          
          }} 
          source={require('../assets/WelcomeOB.png')}></Image>
        </View>

        {/* content  */}

        <View style={{
          paddingHorizontal: 22,
          position: "absolute",
          top: "40%",
          width: "100%"
        }}>
          <Text style={{
            fontSize: 50,
            fontWeight: 800,
            color: COLORS.white,
            marginLeft: "3%"
          }}>Let's Get</Text>
          <Text style={{
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.white,
            marginLeft: "3%"
          }}>Started</Text>

          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 16,
              color: COLORS.white,
              marginVertical: 4,
              marginLeft: "3%"
            }}>Find Your Dream Job, Today!</Text>
            <Text style={{
              fontSize: 16,
              color: COLORS.white,
              marginLeft: "3%"
            }}>Your Future Starts Here.</Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 22,
              width: "90%",
              marginLeft: 10
            }}
          />

          <View style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center"
          }}>
            <Text style={{
              fontSize: 16,
              color: COLORS.white
            }}>Already have an account ?</Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{
                fontSize: 16,
                color: COLORS.white,
                fontWeight: "bold",
                marginLeft: 4
              }}>Login</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default OnBoardingScreen