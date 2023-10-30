import { Modal, View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import React from 'react'
import { useState } from 'react';
import { AuthStore } from '../store';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddGroup = ({ isVisible, children, onClose, loadGroups }) => {
  const [groupName, setGroupName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateGroup = async () => {
    if (!groupName) {
      Alert.alert("Required Field!!", "Group Name cannot be empty.")
      return
    }

    const user = AuthStore?.currentState?.user
    setLoading(true)

    try {
      const timestamp = Timestamp.now().seconds

      const newGroupRef = doc(collection(db, 'groups'));
      await setDoc(newGroupRef, {
        groupName,
        createdBy: user.firstName + " " + user.lastName,
        createdAt: timestamp,
        updatedAt: timestamp
      }).then(async () => {
        await loadGroups()
        ToastAndroid.show('Group Created Successfully', ToastAndroid.SHORT)
        setGroupName('')
        onClose()
      })

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }


  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Group</Text>
          <Pressable onPress={onClose}>
            <Text>Close</Text>
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Group Name:</Text>
          <TextInput
            type="text"
            placeholder="Group Name"
            name="group_name"
            autoCorrect={false}
            value={groupName}
            elevation={1}
            editable={true}
            style={styles.container}
            onChangeText={(e) => {
              setGroupName(e);
            }}
          ></TextInput>
          <TouchableOpacity
            onPress={handleCreateGroup}
            style={styles.submit}
          >
            {
              loading ?
                <ActivityIndicator style={styles.submitText} size="small" color="#fff" /> :
                <Text style={styles.submitText}>Create Group</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AddGroup

const styles = StyleSheet.create({
  modalContent: {
    height: '30%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: 'auto',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    height: 'auto',
    paddingHorizontal: 20
  },
  label: {
    marginBottom: 8,
    color: "grey",
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
    margin: 15,
    textAlign: "center",
    color: "#fff",
    letterSpacing: 0.8,
  },
})