
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import Loader from "../../components/Loader.jsx";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interactionComplete, setInteractionComplete] = useState(true);


  return (
    <View style={styles.page}>
      {interactionComplete ? (
        <>
          <Text style={styles.header}>Log In</Text>
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

          <TouchableOpacity style={styles.submit} onPress={async () => {
            const resp = await appSignIn(email, password);
            if (resp?.user) {
              router?.replace("/(tabs)/Home");
            } else {
              console.log(resp.error)
              Alert.alert("Login Error", resp.error?.message)
            }
          }}>
            <Text style={styles.submitText}>Sign In</Text>
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
                s.isLoggedIn = true;
              });
              router?.push("/signup");
            }}
          >
            <Text style={styles.altText}>Register</Text>
          </TouchableOpacity>
        </>
      ) : <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 150,
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