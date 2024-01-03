// Screen1.js
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IPURL } from "../api/ip";


const Job = ({ navigation }) => {
  const maxSKills = 6
  const [jobsData, setJobsData] = useState([]);

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

  const postJobID = async (jid) => {
    navigation.navigate('JobDetails', { jid })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          {jobsData.map(job => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => postJobID(job.jid)}
              key={jobsData.jid}
            >
              <View style={{
                marginLeft: 20,
                marginTop: 25,
                width: "90%",
                backgroundColor: "#27695F",
                borderRadius: 15
              }}
              >

                {/* Job Card Header */}
                <Text style={{
                  marginLeft: 30,
                  fontSize: 20,
                  color: "#F5F0d6",
                  marginTop: 10,
                }}>{job.jtitle}</Text>
                <View style={{
                  flexDirection: "row"
                }}>
                  {/* Logo */}
                  {/* <View style={{
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
                  </View> */}
                  {/* <View style={{
                    borderColor: "white",
                    height: 45,
                    marginTop: 20,
                    marginLeft: 27,
                    marginRight: 5
                  }}></View> */}

                  <Text style={{
                    color: "#F5F0d6",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 27
                  }}>{job.cname}</Text>

                </View>
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
                    padding: 8,
                    borderRadius: 5,
                    justifyContent: "center",
                    marginBottom: "4%"
                  }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>{job.jtype}</Text>
                  </View>
                </View>
                <Text style={{ color: "#F5F0d6", fontWeight: "bold", marginLeft: 27, marginBottom: "2%" }}>Skills Required :</Text>
                <View>
                  <View style={{
                    flexDirection: "row",
                    marginLeft: 27
                  }}>
                    <Text style={styles.skill}>{job.jskills[0]}</Text>
                    <Text style={styles.skill}>{job.jskills[1]}</Text>
                    <Text style={styles.skill}>{job.jskills[2]}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
          )}
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
export default Job;
