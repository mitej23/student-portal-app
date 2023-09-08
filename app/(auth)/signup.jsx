import { Text, View, TextInput, StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRef, useState } from "react";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import Loader from "../../components/Loader.jsx";
import { Picker } from '@react-native-picker/picker';

export default function Signup() {
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
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {interactionComplete ? (
          <>
            <Text style={styles.header}>Register</Text>
            <Text style={styles.label}>Email:</Text>
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
            <Text style={styles.label}>Password</Text>
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
            <Text style={styles.label}>First Name:</Text>
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
            <Text style={styles.label}>First Name:</Text>
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
            <Text style={styles.label}>Course:</Text>
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
            <Text style={styles.label}>Batch:</Text>
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
            <TouchableOpacity style={styles.submit}
              onPress={async () => {
                const resp = await appSignUp(
                  email,
                  password,
                  firstName + " " + lastName
                );
                if (resp?.user) {
                  router?.replace("/(tabs)/page1");
                } else {
                  console.log(resp.error);
                  Alert.alert("Sign Up Error", resp.error?.message);
                }
              }}
            >
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "lightgrey" }}
              />
              <View>
                <Text
                  style={{ width: 50, textAlign: "center", color: "lightgrey" }}
                >
                  or
                </Text>
              </View>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "lightgrey" }}
              />
            </View>

            <TouchableOpacity
              style={styles.altBtn}
              onPress={() => {
                AuthStore.update((s) => {
                  s.isLoggedIn = false;
                });
                router?.push("/login");
              }}
            >
              <Text style={styles.altText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 0,
  },
  page: {
    padding: 35,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 75,
  },
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
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
  },
  or: {
    marginTop: 10,
    marginBottom: 5,
    color: "grey",
    alignSelf: "center",
  },
});


// <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//   <Stack.Screen
//     options={{ title: "Create Account", headerLeft: () => <></> }}
//   />
//   <View>
//     <Text style={styles.label}>Email</Text>
//     <TextInput
//       placeholder="email"
//       nativeID="email"
//       onChangeText={(text) => {
//         emailRef.current = text;
//       }}
//       style={styles.textInput}
//     />
//   </View>
//   <View>
//     <Text style={styles.label}>First Name</Text>
//     <TextInput
//       placeholder="firstName"
//       nativeID="firstName"
//       onChangeText={(text) => {
//         firstNameRef.current = text;
//       }}
//       style={styles.textInput}
//     />
//   </View>
//   <View>
//     <Text style={styles.label}>Last Name</Text>
//     <TextInput
//       placeholder="lastName"
//       nativeID="lastName"
//       onChangeText={(text) => {
//         lastNameRef.current = text;
//       }}
//       style={styles.textInput}
//     />
//   </View>
//   <View>
//     <Text style={styles.label}>Password</Text>
//     <TextInput
//       placeholder="password"
//       secureTextEntry={true}
//       nativeID="password"
//       onChangeText={(text) => {
//         passwordRef.current = text;
//       }}
//       style={styles.textInput}
//     />
//   </View>

//   <Text
//     style={{ marginBottom: 8 }}
//     onPress={async () => {
//       const resp = await appSignUp(
//         emailRef.current,
//         passwordRef.current,
//         firstNameRef.current + " " + lastNameRef.current
//       );
//       if (resp?.user) {
//         router.replace("/(tabs)/page1");
//       } else {
//         console.log(resp.error);
//         Alert.alert("Sign Up Error", resp.error?.message);
//       }
//     }}
//   >
//     SAVE NEW USER
//   </Text>

//   <Text
//     onPress={() => {
//       AuthStore.update((s) => {
//         s.isLoggedIn = false;
//       });
//       router.back();
//     }}
//   >
//     CANCEL
//   </Text>
// </View>