import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'expo-router';

const filterUsers = (data, searchString) => {
  const filteredUsers = data.filter(({ firstName, lastName }) => {
    console.log(firstName, lastName)
    const firstNameLower = firstName.toLowerCase();
    const lastNameLower = lastName.toLowerCase();

    return firstNameLower.includes(searchString) || lastNameLower.includes(searchString);
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    console.log("here")
    const firstNameA = a.firstName.toLowerCase();
    const firstNameB = b.firstName.toLowerCase();

    return firstNameA.localeCompare(firstNameB);
  });

  return sortedUsers
}

const UserListItem = ({ data }) => {
  const router = useRouter()
  const { firstName, lastName, course, batch } = data.item

  const handleNavigateUserProfile = () => {
    router.push({ pathname: '/UserProfile', params: { ...data.item } })
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

const Search = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('')
  const [usersList, setUsersList] = useState([])

  const handleSearch = async () => {
    if (searchText === '') {
      return
    }
    try {
      // Create a query to search for users by first name, last name, or both
      const usersRef = collection(db, 'users');
      const searchQueryLower = searchText.toLowerCase();

      // console.log(searchQueryLower)

      // Use a combined query for both first name and last name
      const userQuery = query(usersRef);

      const userSnapshot = await getDocs(userQuery);

      const results = [];
      userSnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      let filteredUserResponse = filterUsers(results, searchQueryLower)

      setUsersList(filteredUserResponse);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };


  return (
    <View style={{ flex: 1, marginTop: insets.top, paddingVertical: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TextInput
          type="text"
          placeholder="Search User"
          name="first_name"
          autoCorrect={false}
          value={searchText}
          elevation={1}
          editable={true}
          style={styles.container}
          onChangeText={(e) => {
            setSearchText(e)
          }}
        ></TextInput>
        <TouchableOpacity onPress={handleSearch}>
          <EvilIcons style={{ marginLeft: 6 }} name="search" size={36} color='black' />
        </TouchableOpacity>
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
              <Text style={styles.emptyStateText}>No Users Found</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}

export default Search

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
  container: {
    padding: 8,
    paddingLeft: 16,
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 24,
    backgroundColor: "#fff",
    fontSize: 14,
    width: '90%'
  },
  usersContainer: {

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
  name: {
    width: 'auto',
    fontSize: 16,
    fontWeight: 'bold'
  },
  course: {
    color: '#00000099',
    fontSize: 13,
  },
})