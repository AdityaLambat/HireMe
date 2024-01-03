import React from "react";
import { useState, useEffect } from "react";
import { Text, View, FlatList, ScrollView, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome, AntDesign, Feather, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import COLORS from "../components/colors";
import Button from '../components/Buttons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IPURL } from "../api/ip";

const Home = ({ navigation }) => {
  

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login')
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  const [userData, setUserData] = useState(null);
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");

      axios.get(`http://${IPURL}:8090/user/${token}`)
        .then((response) => {
          setUserData(response.data)
        })
        .catch((error) => {
          console.log("User Error", error);
        });
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      axios.get(`http://${IPURL}:8090/jobs`)
        .then((response) => {
          setJobsData(response.data)
        }).catch((error) => {
          console.log("Jobs Error NEW", error)
        })
    }

    fetchJobs();
  }, [])
  return (

    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        {/* Section Start */}
        <View style={{ marginLeft: "5%" }}>
          {userData &&
            <Text style={style.userName}>Hello {userData.fname} <FontAwesome name="hand-peace-o" size={30} color="rgb(218, 188, 136)" /></Text>
          }
          <Text style={style.welcomeMessage}>Find your perfect job</Text>
        </View>
        {/* Section End */}

        <View style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
          <View style={{
            width: "75%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 15,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
            marginLeft: 20,
            marginTop: "10%"
          }}>
            <TextInput
              placeholder="What are you looking for?"
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
            />
          </View>
          <TouchableOpacity>
            <Feather style={{
              marginTop: "60%",
              marginLeft: 15,
              backgroundColor: "orange",
              padding: 12,
              borderRadius: 15
            }}
              name="search" size={26} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{
          marginTop: 20,
          width: "75%",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          justifyContent: "space-between"
        }}>
          <Button onPress={clearToken} style={style.btnctg} title="Full Time" />
          <Button style={style.btnctg} title="Intership" />
        </View>


        <View style={{
          width: "90%",
          backgroundColor: "white",
          marginTop: "10%",
          marginLeft: 20,
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: "bold"
          }}>Popular</Text>
          <TouchableOpacity style={{
            backgroundColor: "rgba(203, 203, 203, 0.694)",
            width: "24%",
            padding: 7,
            borderRadius: 20,
          }}>
            <Text style={{
              textAlign: "center",
              color: "white",
              fontSize: 16
            }}>Show All</Text>
          </TouchableOpacity>
        </View>

        {/* Job Cards */}
        <View>
          {jobsData.map(job => (
            <TouchableOpacity
            activeOpacity={0.9}
            >
              <View style={{
                marginLeft: 20,
                marginTop: 25,
                width: "90%",
                backgroundColor: "#27695F",
                borderRadius: 15
              }}
                key={jobsData.jid}>

                {/* Job Card Header */}
                <View style={{
                  flexDirection: "row"
                }}>
                  {/* Logo */}
                  <View style={{
                    width: 45,
                    height: 45,
                    marginLeft: 30,
                    marginTop: 20,
                    backgroundColor: "#F5F0d6",
                    padding: 10,
                    borderRadius: 50,
                  }}>
                    <Image style={{
                      width: 25,
                      height: 25,
                    }} source={require('../assets/linkedin.png')}></Image>
                  </View>
                  <View style={{
                    borderRightWidth: 2,
                    borderColor: "white",
                    height: 45,
                    marginTop: 20,
                    marginLeft: 5,
                    marginRight: 5
                  }}></View>

                  <Text style={{
                    marginTop: 30,
                    color: "#F5F0d6",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}>{job.cname}</Text>

                </View>
                <Text style={{
                  marginLeft: 30,
                  fontSize: 20,
                  color: "#F5F0d6",
                  marginTop: 10,
                }}>{job.jtitle}</Text>
                <View style={{
                  marginLeft: 27,
                  marginTop: 5,
                  flexDirection: "row"
                }}>
                  <Ionicons style={{ marginRight: 5 }} name="location-sharp" size={20} color="#F5F0d6" />
                  <Text style={{ color: "#F5F0d6", }}>{job.jdistrict}</Text>
                  <Text style={{ color: "#F5F0d6", }}>, {job.jstate}</Text>
                </View>
                <Text style={{ color: "#F5F0d6", fontWeight: "bold", marginLeft: 27, marginTop: "2%" }}>Deadline {job.jdead}</Text>
                <View style={{
                  flexDirection: "row"
                }}>
                  <View style={{
                    marginLeft: 27,
                    marginTop: 7,
                    flexDirection: "row",
                    backgroundColor: "#F5F0d6",
                    width: "30%",
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    marginBottom: "4%"
                  }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>{job.jtype}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({

  container: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 1,
    flex: 1
  },

  section: {
    backgroundColor: "white",
    marginLeft: 20
  },

  navIcon: {
    marginTop: 50,
    width: 40,
    borderRadius: 5,
    paddingLeft: 7,
  },

  userName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '300'
  },

  welcomeMessage: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 4,
  },

  btnctg: {
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: "black",
    width: "45%",
  }
}
)

export default Home