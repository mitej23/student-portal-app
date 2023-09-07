import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { AuthStore, initStore } from "../store";
import React, { useState } from "react";
import { Text, View } from "react-native";

// export default function Index() {

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Link href="/page1">Page 1</Link>
//       <Link href="/page2">Page 2</Link>
//       <Link href="/signup">SIgn up</Link>
//       <Link href="/login">Login</Link>
//     </View>
//   );
// }


const Index = () => {

  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  React.useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything
      //  segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      router.replace("/login");
    } else if (isLoggedIn) {
      // go to tabs root.
      router.replace("/(tabs)/page1");
    }
  }, [segments, navigationState?.key, initialized]);

  return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;
};
export default Index;