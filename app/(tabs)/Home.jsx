import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from "react-native";
import { AuthStore, appSignOut } from "../../store.js";
import React, { useState } from 'react'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Post from "../../components/Post.jsx";

const Home = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [posts, setPosts] = useState([
    {
      id: '1',
      name: "Mitej Madan",
      course: "MCA",
      batch: '2025',
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: 'https://picsum.photos/200/300',
      upload: '13-10-2023'
    },
    {
      id: '2',
      name: "Mitej Madan",
      course: "MCA",
      batch: '2025',
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: 'https://picsum.photos/200/300',
      upload: '13-10-2023'
    },
    {
      id: '3',
      name: "Mitej Madan",
      course: "MCA",
      batch: '2025',
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: 'https://picsum.photos/200/300',
      upload: '13-10-2023'
    },
    {
      id: '4',
      name: "Mitej Madan",
      course: "MCA",
      batch: '2025',
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: 'https://picsum.photos/200/300',
      upload: '13-10-2023'
    },
    {
      id: '5',
      name: "Mitej Madan",
      course: "MCA",
      batch: '2025',
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: 'https://picsum.photos/200/300',
      upload: '13-10-2023'
    }
  ])

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
        keyExtractor={post => post.id}
        contentContainerStyle={styles.postContainer}
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
    paddingBottom: 30
  }
});

export default Home