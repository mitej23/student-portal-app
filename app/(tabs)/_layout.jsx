import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Slot />
  );
}
