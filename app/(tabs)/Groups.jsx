import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from 'react'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Group = ({ data }) => {
  const { id, groupName, groupMembers } = data.item
  return (
    <View style={styles.groupIdvContainer}>
      <Text style={styles.groupName}>{groupName}</Text>
      <Text style={styles.groupMembers}>Members: {groupMembers}</Text>
    </View>
  )
}

const Groups = () => {
  const insets = useSafeAreaInsets();


  const [groups, setGroups] = useState([
    {
      id: '1',
      groupName: 'Placement',
      groupMembers: 24,
    },
    {
      id: '2',
      groupName: 'Tech Community',
      groupMembers: 26,
    },
    {
      id: '3',
      groupName: 'Finance',
      groupMembers: 29,
    },
    {
      id: '4',
      groupName: 'GDC',
      groupMembers: 24,
    }
  ])


  return (
    <View style={{ marginTop: insets.top, paddingTop: 12, flexDirection: 'column', flexDirection: "column", backgroundColor: "white" }}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Groups</Text>
        <Link href="/AddPost" asChild>
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.headBtnText}>Add Group</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={groups}
        renderItem={(group) => <Group data={group} />}
        keyExtractor={group => group.id}
        contentContainerStyle={styles.groupsContainer}
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
  groupgroupMembers: {
    fontSize: 10,
  }
});

export default Groups