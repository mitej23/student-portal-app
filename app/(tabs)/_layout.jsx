import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Tabs>
      <Tabs.Screen name="page1" />
      <Tabs.Screen name="page2" />
    </Tabs>

  );
}
