import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AddGroup from "../../components/AddGroup";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const Group = ({ data }) => {
  const { id, groupName, createdBy } = data.item
  return (
    <View style={styles.groupIdvContainer}>
      <Text style={styles.groupName}>{groupName}</Text>
      <Text style={styles.createdBy}>Created By: {createdBy}</Text>
    </View>
  )
}

const Groups = () => {
  const insets = useSafeAreaInsets();

  const [groups, setGroups] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const q = query(collection(db, 'groups'), orderBy('groupName'))
  const getGroups = async () => {
    const groupSnapshot = await getDocs(q)
    const groupTemp = []
    groupSnapshot.docs.map((p) => {
      groupTemp.push(p.data())
    })
    setGroups(groupTemp)
    return groupTemp
  }

  const loadGroups = async () => {
    await getGroups()
  }

  const onAddGroup = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(async () => {
    return await getGroups()
  }, [])

  console.log(groups)

  return (
    <View style={{
      opacity: isModalVisible ? 0.1 : 1,
      marginTop: insets.top,
      paddingTop: 12,
      flexDirection: 'column',
      flexDirection: "column",
      backgroundColor: 'white'
    }}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Groups</Text>
        <TouchableOpacity onPress={onAddGroup} style={styles.submit}>
          <Text style={styles.headBtnText}>Add Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={groups}
        renderItem={(group) => <Group data={group} />}
        keyExtractor={group => group.id}
        contentContainerStyle={styles.groupsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadGroups} />
        }
      />
      <AddGroup loadGroups={loadGroups} isVisible={isModalVisible} onClose={onModalClose}></AddGroup>
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
  },
  groupsContainer: {
    backgroundColor: "#f1f1f1"
  },
  groupIdvContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#a1a1a1',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4.
  },
  groupcreatedBy: {
    fontSize: 10,
  }
});

export default Groups