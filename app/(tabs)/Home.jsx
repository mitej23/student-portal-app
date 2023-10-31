import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { AuthStore, appSignOut } from "../../store.js";
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Post from "../../components/Post.jsx";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase.js";

const Home = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false)

  const [posts, setPosts] = useState([])

  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))


  const loadPosts = async () => {
    const temp = await getPosts()
    return temp
  }

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

    return () => {

    }
  }, [])

  return (
    <View style={{ marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Posts</Text>
        <Link href="/AddPost" asChild>
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.headBtnText}>Add Post</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={posts}
        renderItem={(post) => <Post data={post} />}
        keyExtractor={post => post.postId}
        contentContainerStyle={styles.postContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPosts} />
        }
      />
    </View>

  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingHorizontal: 24
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  submit: {
    borderRadius: 20,
    backgroundColor: "#F45764",
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headBtnText: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: 'auto'
  },
  postContainer: {
    paddingBottom: 30,
    backgroundColor: '#dadada'
  }
});

export default Home