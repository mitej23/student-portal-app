import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router';
import { EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          display: route.name === 'ChatRoom' ? 'none' : 'flex',
        },
        headerShown: false
      })}
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
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: route.name === 'ChatRoom' ? 'none' : 'flex',
          },
        })}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <EvilIcons name="search" size={24} color={color} />
            );
          },
        }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: route.name === 'ChatRoom' ? 'none' : 'flex',
          },
        })}
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
        name="Messages"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons name={focused ? "chatbubble-ellipses-sharp" : "chatbubble-ellipses-outline"} size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="ChatRoom"
        options={{
          tabBarButton: () => null
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
