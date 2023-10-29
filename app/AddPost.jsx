import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useState } from 'react'
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import 'react-native-get-random-values';
import * as uuid from 'uuid';
import { AuthStore } from "../store";
import { db } from "../firebase";

const AddPost = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [postText, setPostText] = useState('')
  const [postTextNoOfLines, setPostTextNoOfLines] = useState(4)
  const [postImage, setPostImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = AuthStore.useState();

  const handleBack = () => {
    router.back()
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.
      requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {

      // If permission is denied, show an alert 
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
             roll permission to upload images.`
      );
    } else {

      // Launch the image library and get 
      // the selected image 
      const result =
        await ImagePicker.launchImageLibraryAsync();

      console.log(result)

      if (!result?.cancelled) {

        // If an image is selected (not cancelled),  
        // update the file state variable 
        setPostImage(result.assets[0].uri);

        // Clear any previous errors 
        setError(null);
      }
    }
  };


  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const uploadPost = async () => {
    if (!postText) {
      Alert.alert("Required Field!!", "Text cannot be empty.")
      return
    }

    const user = AuthStore?.currentState?.user
    setLoading(true)

    try {
      let imageUrl = ''
      if (postImage) imageUrl = await uploadImageAsync(postImage)

      const timestamp = Timestamp.now().seconds
      
      const newPostRef = doc(collection(db, 'posts'));
      await setDoc(newPostRef, {
        content: postText,
        postImage: imageUrl,
        createdAt: timestamp,
        updatedAt: timestamp,
        ...user
      }).then(() => {
        ToastAndroid.show('Post Added Successfully!', ToastAndroid.SHORT);
        setPostImage(null)
        setPostText('')
        router.back()
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <View style={{ marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <AntDesign onPress={handleBack} name="left" size={22} color="black" />
        <Text style={styles.headerText}>Add Post</Text>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}> */}
      <View style={styles.registerContainer}>
        <Text style={styles.label}>Enter Post Text (max 300 characters):</Text>
        <TextInput
          type="text"
          name="email"
          autoCorrect={false}
          value={postText}
          elevation={1}
          editable={true}
          style={styles.container}
          multiline
          onChangeText={(e) => {
            setPostText(e);
          }}
          numberOfLines={postTextNoOfLines}
          onContentSizeChange={(e) => {
            numOfLinesCompany = (e.nativeEvent.contentSize.height / 18) < 5 ? 4 : (e.nativeEvent.contentSize.height / 18);
            setPostTextNoOfLines(numOfLinesCompany)
          }}
          maxLength={300}
        ></TextInput>
        <Text style={styles.label}>Enter Post Image:</Text>
        <TouchableOpacity style={styles.uploadButton}
          onPress={pickImage}>
          <Text style={styles.uploadButtonText}>
            Upload Image
          </Text>
        </TouchableOpacity>
        {/* Conditionally render the image  
            or error message */}
        {postImage ? (
          // Display the selected image 
          <View style={styles.imageContainer}>
            <Image source={{ uri: postImage }}
              style={styles.image} />
          </View>
        ) : (
          // Display an error message if there's  
          // an error or no image selected 
          <Text style={styles.errorText}>{error}</Text>
        )}
        <TouchableOpacity disabled={loading} onPress={uploadPost} style={styles.submit}>
          {
            loading ?
              <ActivityIndicator style={styles.submitText} size="small" color="#fff" /> :
              <Text style={styles.submitText}>Upload Post</Text>
          }
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

export default AddPost

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingHorizontal: 24
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8
  },
  scrollView: {
    marginHorizontal: 0,
    flex: 1,
    marginHorizontal: 0,
  },
  registerContainer: {
    padding: 15
  },
  label: {
    marginBottom: 5,
    color: "grey",
    marginLeft: 5,
    fontSize: 12
  },
  container: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 14,
    marginBottom: 15,
    textAlignVertical: 'top'
  },
  uploadButton: {
    padding: 8,
    borderWidth: 1.5,
    borderColor: '#bababa',
    borderRadius: 5,
    borderStyle: 'dashed',
    marginBottom: 15,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
  },
  uploadButtonText: {
    fontSize: 14,
    textAlign: "center",
    width: 'auto',
    color: '#bababa'
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 5,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
  },
  submit: {
    borderRadius: 5,
    backgroundColor: "#F45764",
    color: "white",
    // height: 50,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "600",
    margin: 12,
    textAlign: "center",
    color: "#fff",
    letterSpacing: 0.8,
  },
});