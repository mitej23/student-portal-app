import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Post = ({ data }) => {
  const { name, course, batch, content, image, date, id } = data.item
  console.log(image)
  return (
    <View style={styles.postContainer} key={id}>
      <View style={styles.postHead}>
        <FontAwesome name="user-circle" size={32} color="black" />
        <View style={styles.postHeadText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.course}>( {course} - {batch} )</Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
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
  image: {
    width: 'auto',
    minHeight: 150,
    maxHeight: 250,
    resizeMode: 'contain',
    backgroundColor: '#f1f1f1',
    marginVertical: 8,
    // borderRadius: 5
  },
  content: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    marginVertical: 4
  }
})