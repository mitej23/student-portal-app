import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Post = ({ data }) => {
  const { firstName, lastName, course, batch, content, postImage, date, id } = data.item

  console.log(postImage)

  return (
    <View style={styles.postContainer} key={id}>
      <View style={styles.postHead}>
        <FontAwesome name="user-circle" size={32} color="black" />
        <View style={styles.postHeadText}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.course}>( {course} - {batch} )</Text>
        </View>
      </View>
      {
        postImage && <Image
          style={styles.image}
          source={{
            uri: postImage,
          }}
        />
      }

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
    width: "100%",
    resizeMode: "cover",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    marginVertical: 6
  },
  content: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    marginVertical: 4
  }
})