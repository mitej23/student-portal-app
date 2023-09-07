import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { AuthStore, appSignOut } from "../../store.js";
import React from 'react'
import { useRouter } from "expo-router";

const Page1 = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={async () => {
          const resp = await appSignOut();
          if (resp?.user === null) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error)
            Alert.alert("Logout Error", resp.error?.message)
          }
        }}
      >
        Log out
      </Text>
    </View>
  )
}

export default Page1