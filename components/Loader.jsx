import { ActivityIndicator,Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -100,
      }}
    >
      <ActivityIndicator size="large" color="#e23744" />
    </View>
  )
}

export default Loader
