// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import bear from './assets/bear.jpeg';
// import db from "./firebase";
// import firebase from "firebase/app";


// export default function App() {
//   const [messages, setMessages] = useState([]);
//   useEffect(() => {
//     let unsubscribeFromNewSnapshots = db
//       .collection("Chats")
//       .doc("myfirstchat")
//       .onSnapshot((snapshot) => {
//         console.log("New Snapshot!");
//         setMessages(snapshot.data().messages);
//       });
  
//     return function cleanupBeforeUnmounting() {
//       unsubscribeFromNewSnapshots();
//     };
//   }, []);

// const onSend = useCallback((messages = []) => {
//   db.collection("Chats")
//     .doc("myfirstchat")
//     .update({
//       // arrayUnion appends the message to the existing array
//       messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
//     });
//   setMessages((previousMessages) =>
//     GiftedChat.append(previousMessages, messages)
//   );
// }, []);
//   return (
//     <GiftedChat
//       placeholder = "talk to me"
//       showUserAvatar= {true}
//       renderUsernameOnMessage= {true}
//       alwaysShowSend= {true}
//       inverted={true}
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: "1",
//         name: 'Newsh.',
        
//       }
//     }

//     />
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions= {{
        headerStyle: {
          backgroundColor: 'yellow',
        },
        headerTitleStyle: {
          color: 'balck',
          fontWeight: 'bold',
        },
      }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: "bold",
  },
});

export default App;

