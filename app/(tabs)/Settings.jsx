import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from "react-native";
import { AuthStore, appSignOut } from "../../store.js";
import React, { useState } from 'react'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader.jsx";
import { Picker } from '@react-native-picker/picker';

const Settings = () => {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  // const emailRef = useRef("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState();
  const [batch, setBatch] = useState();
  const [interactionComplete, setInteractionComplete] = useState(true);

  return (
    <View style={{ marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {interactionComplete ? (
          <View style={styles.registerContainer}>
            <Text style={styles.label}>Enter Email:</Text>
            <TextInput
              type="email"
              placeholder="Email"
              name="email"
              autoCorrect={false}
              value={email}
              elevation={1}
              editable={true}
              style={styles.container}
              onChangeText={(e) => {
                setEmail(e);
              }}
            ></TextInput>
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              autoCorrect={false}
              value={password}
              elevation={1}
              editable={true}
              style={styles.container}
              secureTextEntry={true}
              onChangeText={(e) => {
                setPassword(e);
              }}
            ></TextInput>
            <Text style={styles.label}>Enter First Name:</Text>
            <TextInput
              type="text"
              placeholder="First Name"
              name="first_name"
              autoCorrect={false}
              value={firstName}
              elevation={1}
              editable={true}
              style={styles.container}
              onChangeText={(e) => {
                setFirstName(e);
              }}
            ></TextInput>
            <Text style={styles.label}>Enter First Name:</Text>
            <TextInput
              type="text"
              placeholder="Last Name"
              name="last_name"
              autoCorrect={false}
              value={lastName}
              elevation={1}
              editable={true}
              style={styles.container}
              onChangeText={(e) => {
                setLastName(e);
              }}
            ></TextInput>
            <Text style={styles.label}>Select Course:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue, itemIndex) =>
                  setCourse(itemValue)
                }>
                <Picker.Item label="MCA" value="mca" />
                <Picker.Item label="B.Tech" value="btech" />
                <Picker.Item label="MBA Tech" value="mbatech" />
              </Picker>
            </View>
            <Text style={styles.label}>Select Batch:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={batch}
                onValueChange={(itemValue, itemIndex) =>
                  setBatch(itemValue)
                }>
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />

              </Picker>
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 0,
    flex: 1
  },
  registerContainer: {
    padding: 15
  },
  page: {
    padding: 35,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 75,
  },
  container: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 14,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    color: "#F45764",
  },
  link: {
    color: "#F45764",
  },
  submit: {
    borderRadius: 5,
    backgroundColor: "#F45764",
    color: "white",
    // height: 50,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
    textAlign: "center",
    color: "#fff",
    letterSpacing: 0.8,
  },
  altBtn: {
    borderRadius: 5,
    color: "white",
    height: 52,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    borderColor: "#F45764",
    borderWidth: 1,
  },
  altText: {
    color: "#F45764",
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
    textAlign: "center",
    letterSpacing: 0.8,
  },
  label: {
    marginBottom: 5,
    color: "grey",
    marginLeft: 5,
    fontSize: 12
  },
  or: {
    marginTop: 10,
    marginBottom: 5,
    color: "grey",
    alignSelf: "center",
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingHorizontal: 24
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  submit: {
    borderRadius: 20,
    backgroundColor: "#F45764",
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headBtnText: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'white'
  },
});


export default Settings