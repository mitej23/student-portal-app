import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Tabs
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Groups"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "ios-settings-sharp" : "ios-settings-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>

  );
}
