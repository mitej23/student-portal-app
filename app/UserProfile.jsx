import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Post from '../components/Post';
import { useState } from 'react';
import { db } from '../firebase';
import { useEffect } from 'react';

const UserProfile = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const data = useLocalSearchParams();

  const { firstName, lastName, course, batch, userId } = data


  const [posts, setPosts] = useState([])
  const q = query(collection(db, 'posts'), where('userId', '==', userId), orderBy('createdAt', 'desc'))

  const getPosts = async () => {
    const postSnapshot = await getDocs(q)
    const postTemp = []
    postSnapshot.docs.map((p) => {
      const data = {
        ...p.data(),
        postId: p.id
      }
      postTemp.push(data)
    })
    setPosts(postTemp)
    return postTemp
  }

  useEffect(() => {
    getPosts()

    return () => { }
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleNavigateToChat = () => {
    router.push({
      pathname: '/PersonalChat',
      params: {...data}
    })
  }

  return (
    <ScrollView style={{ height: 'auto', flex: 1, marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <AntDesign onPress={handleBack} name="left" size={22} color="black" />
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.userItemContainer}>
          <FontAwesome name="user-circle" size={68} color="black" />
          <View style={styles.userTextContainer}>
            <Text style={styles.name}>{firstName} {lastName}</Text>
            <Text style={styles.course}>Course: {course}</Text>
            <Text style={styles.course}>Batch: {batch}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNavigateToChat} style={styles.messageBtn}>
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
        <View style={styles.postHeaderContainer}>
          <Text style={styles.postHeader}>Posts</Text>
        </View>
        <FlatList
          data={posts}
          renderItem={(post) => <Post data={post} />}
          keyExtractor={post => post.postId}
          contentContainerStyle={styles.postContainer}
        />
      </View>
    </ScrollView>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8
  },
  userItemContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    // paddingHorizontal: 30,
    paddingVertical: 15,
  },
  userTextContainer: {
    marginLeft: 18,
  },
  name: {
    width: 'auto',
    fontSize: 18,
    fontWeight: 'bold'
  },
  course: {
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 1
  },
  messageBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F45764',
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 12
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postHeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    marginTop: 24,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
  },
  postHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    paddingBottom: 30,
    height: 'auto',
    // backgroundColor: '#dadada'
  }
})