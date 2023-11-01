import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from 'react';
import { db } from '../../firebase';
import { useEffect } from 'react';

const UserListItem = ({ data }) => {
  const router = useRouter()
  const { firstName, lastName, course, batch } = data.item

  const handleNavigateUserProfile = () => {
    router.push({ pathname: '/PersonalChat', params: { ...data.item } })
  }

  return (
    <TouchableOpacity onPress={handleNavigateUserProfile}>
      <View style={styles.userItemContainer}>
        <FontAwesome name="user-circle" size={42} color="black" />
        <View style={styles.userTextContainer}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.course}>( {course} - {batch} )</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const Messages = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [usersList, setUsersList] = useState([])

  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef);

  const getChats = async () => {

    try {
      const userSnapshot = await getDocs(userQuery);

      const results = [];
      userSnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      setUsersList(results)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("messages page")
    getChats()

    return () => { }
  }, [])

  console.log("hehehe")

  return (
    <View style={{ flex: 1, marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }
    }>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <View style={styles.usersContainer}>
        {
          usersList.length > 0 ? (
            <FlatList
              data={usersList}
              renderItem={(u) => <UserListItem data={u} />}
              keyExtractor={user => user.userId}
              contentContainerStyle={styles.groupsContainer}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No Chats Found</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}

export default Messages

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
  usersContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: 300,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'darkgray'
  },
  userItemContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  userTextContainer: {
    marginLeft: 14,
  },
})