import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { AuthStore } from '../store';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Post = ({ data }) => {
  const { firstName, lastName, course, batch, content, postImage, date, postId, likedBy = [], likesCount = 0, comments: postComments = [] } = data.item

  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(postComments)

  const user = AuthStore?.currentState?.user

  // console.log(data.item)

  useEffect(() => {
    // Check if the current user's ID is in the likedBy array
    setLiked(likedBy.includes(user.userId));
  }, [user.userId, likedBy]);

  const handleLike = async () => {
    console.log("handle like: ")
    try {
      if (!liked) {
        setLiked(true);

        const postRef = doc(db, 'posts', postId);

        // Update the post document to increment likes count and add the user ID to likedBy array
        await updateDoc(postRef, {
          likesCount: likedBy.length + 1,
          likedBy: arrayUnion(user.userId), // Use the actual user ID
        });

      } else {
        setLiked(false);

        // Handle unliking (remove the user ID from likedBy) if the user has already liked the post
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          likesCount: likedBy.length - 1,
          likedBy: arrayRemove(user.userId), // Use the actual user ID
        });

      }

    } catch (error) {
      console.log(error)
      setLiked(!liked)
    }
  };

  const handleComments = () => {
    setIsCommentsVisible(!isCommentsVisible)
  }

  const handleSendComment = async () => {
    if (commentText.trim() === '') {
      return; // Don't add empty comments
    }

    try {
      // Create a new comment object
      const newComment = {
        id: comments.length + 1, // You can generate a unique ID as needed
        message: commentText,
        ...user
      };

      // Update the comments array in the state
      setComments([...comments, newComment]);

      // Clear the comment input field
      setCommentText('');

      // Update the comments in the database (you need to add a comments field to your post document)
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment), // Add the new comment to the comments array
      });


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.postContainer} key={postId}>
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
      <View style={styles.postInfoContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="like2" size={14} color="darkgray" />
          <Text style={styles.postInfoText}>{likesCount} Likes</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="comments-o" size={16} color="darkgray" />
          <Text style={styles.postInfoText}>{comments.length} comments</Text>
        </View>
      </View>
      <View style={styles.postActionsContainer}>
        <TouchableOpacity style={styles.postAction} onPress={handleLike}>
          {
            liked ? (
              <AntDesign name="like1" size={20} color="#0a66c2" />
            ) : (
              <AntDesign name="like2" size={20} color={"black"} />
            )
          }
          <Text style={!liked ? styles.postActionLikeBefore : styles.postActionLikeAfter}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction} onPress={handleComments}>
          <FontAwesome name="comments-o" size={22} color="black" />
          <Text style={styles.postActionText}>Comment</Text>
        </TouchableOpacity>
      </View>
      {
        isCommentsVisible && (
          <>
            <View style={styles.messageContainer}>
              <TextInput
                type="text"
                name="email"
                autoCorrect={false}
                placeholder='Add a comment...'
                value={commentText}
                elevation={1}
                editable={true}
                style={styles.inputMessage}
                multiline
                onChangeText={(e) => {
                  setCommentText(e);
                }}
                maxLength={300}
              ></TextInput>
              <TouchableOpacity style={styles.sendContainer} onPress={handleSendComment}>
                <Ionicons name="ios-send-sharp" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {
              comments && (
                <View style={styles.commentsContainer}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: 'darkgray', marginBottom: 12 }}>Most Recent Comments</Text>
                  {
                    comments.map(({ message, firstName, lastName }) => {
                      return (
                        <View style={{ marginBottom: 6 }}>
                          <View style={styles.postHead}>
                            <FontAwesome name="user-circle" size={30} color="black" />
                            <View style={styles.commentDataContainer}>
                              <View style={styles.commentHeadText}>
                                <Text style={styles.name}>{firstName} {lastName}</Text>
                                <Text style={styles.course}>( {course} - {batch} )</Text>
                              </View>
                              <Text style={styles.commentText}>{message}</Text>
                            </View>
                          </View>
                        </View>

                      )
                    })
                  }
                </View>
              )
            }

          </>
        )
      }


    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginBottom: 6,
    // backgroundColor: 'red'
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
    marginVertical: 4,
    fontSize: 14
  },
  postInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6
  },
  postInfoText: {
    fontSize: 12,
    color: 'darkgray',
    marginLeft: 4
  },
  postActionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 12
  },
  postAction: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postActionLikeBefore: {
    marginLeft: 6,
  },
  postActionLikeAfter: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#0a66c2'
  },
  postActionText: {
    marginLeft: 6
  },
  messageContainer: {
    display: 'absolute',
    bottom: 0,
    // backgroundColor: 'red',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  inputMessage: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 2,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 24,
    backgroundColor: "#fff",
    fontSize: 14,
    textAlignVertical: 'top',
    width: '85%',
    marginBottom: 3
  },
  sendContainer: {
    backgroundColor: '#F45764',
    borderRadius: 100,
    padding: 6,
    paddingLeft: 10,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  commentsContainer: {
    width: '100%',
    // backgroundColor: 'red',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 8
  },
  commentDataContainer: {
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 16
  },
  commentText: {
    marginTop: 8
  }
})