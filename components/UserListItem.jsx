import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserListItem = ({ data }) => {
  const { firstName, lastName, course, batch } = data.item
  return (
    <View style={styles.postHead}>
      <FontAwesome name="user-circle" size={32} color="black" />
      <View style={styles.postHeadText}>
        <Text style={styles.name}>{firstName} {lastName}</Text>
        <Text style={styles.course}>( {course} - {batch} )</Text>
      </View>
    </View>
  )
}

export default UserListItem

const styles = StyleSheet.create({
  postHead: {
    flexDirection: 'row',
    marginBottom: 4
  },
  postHeadText: {
    marginLeft: 10,
  },
  name: {
    width: 'auto',
    fontSize: 14,
    fontWeight: 'bold'
  },
  course: {
    color: '#00000099',
    fontSize: 10,
  },
})