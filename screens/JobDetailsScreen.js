// Screen1.js
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from "axios";
import { IPURL } from "../api/ip";


const JobDetails = ({ route }) => {

  const { jid } = route.params;
  console.log(jid)
  const [jobDetails, setJobDetails] = useState("");
  useEffect(() => {
    const fetchJobDetails = async () => {
      axios.get(`http://${IPURL}:8090/jobdetails/${jid}`)
        .then((response) => {
          setJobDetails(response.data)
        }).catch((error) => {

          console.log("Jobs Details Error NEW", error)
        })
    }

    fetchJobDetails();
  }, [])

  const goLink = () => {
    const url = `${jobDetails.cweb}`;
    Linking.openURL(url);
  };

  return (

    <SafeAreaView>
      <ScrollView>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "white"
        }}>


          <View style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'rgb(136, 136, 136)',
            width: "92%",
            marginTop: "15%",
          }}>
            {/* Job Title */}
            <Text style={{
              marginLeft: "5%",
              paddingTop: "5%",
              fontSize: 20,
              fontWeight: "bold",
            }}>{jobDetails.jtitle}</Text>

            {/* Company Name */}
            <View style={{
              marginTop: "2%",
              marginLeft: "5%",
              flexDirection: "row",
            }}>
              <View style={{
                width: 45,
                height: 45,
                borderColor: "black",
                borderWidth: 1,
                padding: 10,
                borderRadius: 50,
              }}>
                <Image style={{
                  width: 25,
                  height: 25,
                }} source={require('../assets/Job.png')}></Image>
              </View>
              <View style={{
                borderRightWidth: 2,
                borderColor: "black",
                height: 40,
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5
              }}></View>

              <TouchableOpacity
                onPress={goLink}
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={{
                  marginTop: 3,
                  paddingTop: "1%",
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#2557A7",
                  textDecorationLine: "underline",
                }}>{jobDetails.cname}</Text>
                <Feather style={{
                  marginTop: 8,
                }} name="external-link" size={24} color="#2557A7" />
              </TouchableOpacity>

            </View>

            {/* Location */}
            <View style={{
              flexDirection: "row",
              marginLeft: "5%",
              marginTop: "2%"
            }}>
              <Ionicons style={{ marginRight: 5 }} name="location-sharp" size={20} color="black" />
              <Text style={{ fontWeight: "bold" }}>{jobDetails.jdistrict}, {jobDetails.jstate}</Text>
            </View>

            {/* Hr Line */}
            <View style={{
              alignItems: "center"
            }}>
              <View style={{
                borderWidth: 1,
                borderColor: "#E4E2E0",
                marginTop: "2%",
                marginBottom: "2%",
                width: "92%",
              }}></View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView >


  );
};

const styles = StyleSheet.create({
  skill: {
    backgroundColor: "#F5F0D6",
    justifyContent: "center",
    padding: 7,
    marginRight: "5%",
    borderRadius: 5,
    marginBottom: "4%"
  }
})
export default JobDetails;
