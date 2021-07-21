import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    Alert,
  } from "react-native";
  
  import React, { useState, useEffect } from "react";
  import firebase from "@firebase/app";
  import Colors from "../constants/Colors";

export default function TestScreen() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState(""); 
    const [name, setName] = useState("");

    const onPressCreate = async() =>
    {
        await firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(signup_success, login_failed);
    }
    const signup_success = (userCredential) => {
        console.log("SUCCESS");
        var curr_user = userCredential.user;
        curr_user.updateProfile({
          displayName: name,
        });
      };
    const login_failed = () =>
    {
        alert("MAJOR FAIL");
    }
  return (
    <View>
      <Text>Enter Name:</Text>
      <TextInput onChangeText ={setName} />

      <Text>Enter Email:</Text>
      <TextInput onChangeText = {setEmail} />

      <Text>Enter Password:</Text>
      <TextInput onChangeText = {setPass} />

      <Button 
        onPress = {onPressCreate}
        title = "Sign me Up"
        color= {Colors.snapblue}
        accessabilityLabel = "Sign Me Up"
      />
    </View>
  );
}