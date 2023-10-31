import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthStore } from '../../store';
import { useEffect } from 'react';

const Chat = ({ data }) => {
  const { id, userId, message, firstName } = data.item
  const user = AuthStore?.currentState?.user

  const isMyMessage = userId === user.userId;

  return (
    <View
      style={[
        styles.container,
        isMyMessage ? styles.myChatContainer : styles.receivedChatContainer,
      ]}
    >
      {!isMyMessage && <Text style={styles.username}>{firstName}:</Text>}
      <Text style={isMyMessage ? styles.myChatMessage : styles.receivedChatMessage}>{message}</Text>
    </View>
  )
}

const ChatRoom = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { groupId, groupName, createdBy } = useLocalSearchParams();

  const [chatsData, setChatsData] = useState([])

  const [chatText, setChatText] = useState('')
  const [chatTextNoOfLines, setChatTextNoOfLines] = useState(4)

  const user = AuthStore?.currentState?.user

  const handleBack = () => {
    router?.push("/(tabs)/Groups");
  }

  const handleSendMessage = () => {
    console.log("sending message")
    if (chatText === "") return
    const timestamp = Timestamp.now().seconds

    try {
      const groupRef = doc(db, 'groups', groupId);
      const messagesRef = collection(groupRef, 'messages');

      addDoc(messagesRef, {
        message: chatText,
        timestamp,
        ...user
      }).then(() => {
        setChatText('')
        console.log("message sent successfully!!")
      });
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    // Reference to the chat messages subcollection within the group document
    const groupRef = doc(db, 'groups', groupId);
    const messagesRef = collection(groupRef, 'messages');

    // Create a query to retrieve messages and order them by timestamp (newest first)
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Listen to the query and update the messages state
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatMessages = [];
      querySnapshot.forEach((doc) => {
        chatMessages.push(doc.data());
      });
      chatMessages.reverse()
      setChatsData(chatMessages);
    });

    return () => {
      setChatsData([])
      // Unsubscribe from the query when the component unmounts
      unsubscribe();
    };
  }, [groupId]); // Re-run the effect when groupId changes

  return (
    <View style={{ flex: 1, marginTop: insets.top, paddingTop: 12, paddingBottom: 6, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <AntDesign onPress={handleBack} name="left" size={22} color="black" />
        <View>
          <Text style={styles.headerText}>{groupName}</Text>
          <Text style={styles.subHeader}>Created By: {createdBy}</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.chatsContainer}
      >
        <FlatList
          data={chatsData}
          keyExtractor={chat => chat.id}
          renderItem={(chat) => <Chat data={chat} />}
          contentContainerStyle={{ paddingTop: 12 }}
          showsVerticalScrollIndicator={false}
          inverted={true}
        />
      </ScrollView>
      <View style={styles.messageContainer}>
        <TextInput
          type="text"
          name="email"
          autoCorrect={false}
          placeholder='Enter Message...'
          value={chatText}
          elevation={1}
          editable={true}
          style={styles.inputMessage}
          multiline
          onChangeText={(e) => {
            setChatText(e);
          }}
          // numberOfLines={chatTextNoOfLines}
          // onContentSizeChange={(e) => {
          //   numOfLinesCompany = (e.nativeEvent.contentSize.height / 18);
          //   setChatTextNoOfLines(numOfLinesCompany)
          // }}
          maxLength={300}
        ></TextInput>
        <Pressable style={styles.sendContainer} onPress={handleSendMessage}>
          <Ionicons name="ios-send-sharp" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default ChatRoom

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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12
  },
  subHeader: {
    fontSize: 12,
    marginLeft: 12,
    color: 'gray'
  },
  chatsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'column-reverse',
  },
  container: {
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: 'top',
    width: '85%',
    marginBottom: 12
  },
  chatContainer: {
    padding: 8,
    maxWidth: '70%',
    borderRadius: 8,
    marginBottom: 8,
  },
  myChatContainer: {
    alignSelf: 'flex-end',
    backgroundColor: "#F45764",
    borderTopRightRadius: 0,
    width: 'auto'
  },
  receivedChatContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
    width: 'auto'
  },
  username: {
    fontSize: 14,
    color: '#F45764',
    fontWeight: 'bold',
    width: 'auto'
  },
  myChatMessage: {
    fontSize: 16,
    color: '#fff',
    width: 'auto'
  },
  receivedChatMessage: {
    fontSize: 16,
    color: '#000',
    width: 'auto'
  },
  messageContainer: {
    display: 'absolute',
    bottom: 0,
    // backgroundColor: 'red',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  inputMessage: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 4,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 24,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: 'top',
    width: '85%',
    marginBottom: 4
  },
  sendContainer: {
    backgroundColor: '#F45764',
    borderRadius: 100,
    padding: 6,
    paddingLeft: 10,
    height: 42,
    width: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  }
})