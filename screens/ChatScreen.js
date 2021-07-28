import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Actions } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { Image, Platform } from "react-native";

import db from "../firebase";
import firebase from "@firebase/app";
import * as ImagePicker from "expo-image-picker";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [imageURI, setImageURI] = useState([]);
  
  const { chatid } = route.params;
  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(chatid)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        let newMessages = snapshot.data().messages.map(singleMessage => {
            singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
            return singleMessage;
        })
        setMessages(newMessages);
      });
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);
  const onSend = useCallback(
    async (messages = []) => {
      if (messages.length < 1) return;

      if (imageURI !== null) {
        let downloadURL = await uploadImage();
        if (downloadURL) {
          messages[0].image = downloadURL;
        }
      }

      db.collection("Chats")
        .doc(chatname)
        .update({
          // arrayUnion appends the message to the existing array
          messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
        });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [imageURI]
  );

  const uploadImage = async () => {
    const filepath = imageURI;
    setImageURI(null);
    const filename = filepath.substring(filepath.lastIndexOf("/") + 1);
    const response = await fetch(filepath);
    const blob = await response.blob();

    const uploadTask = firebase
      .storage()
      .ref(user.uid + "/" + filename)
      .put(blob);
    // set progress state
    uploadTask.on("state_changed", (snapshot) => {
      // setTransferred(
      //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      // );
    });
    let downloadURL = null;

    try {
      await uploadTask;
      downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
    } catch (e) {
      console.error(e);
    }

    return downloadURL;
  };
  
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
        avatar: firebase.auth().currentUser.photoURL,
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}

