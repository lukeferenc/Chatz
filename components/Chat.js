import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import {Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyAUlUPBOAFA6e3no-IpsExvlEp0z6a2PB8",
  authDomain: "chatz-9e906.firebaseapp.com",
  projectId: "chatz-9e906",
  storageBucket: "chatz-9e906.appspot.com",
  messagingSenderId: "360628659555",
  appId: "1:360628659555:web:705db080f815404af85f56"
};




export default class Chat extends React.Component {
  
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  };


  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  this.referenceChatMessages = firebase.firestore().collection("messages");

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'Stumbled in',
          createdAt: new Date(),
          system: true,
         },
      ]
    })
  }

  onCollectionUpdate = (querySnapshot) => { 
    const messages = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user
        });
    });
    this.setState({
        messages: messages
    });
  };

  componentWillUnmount() {
      this.authUnsubscribe();
      this.unsubscribe();
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {

    const { bgcolor } = this.props.route.params;
    
    return (

      <View style={{
        flex: 1,
            backgroundColor: bgcolor,
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.giftedchat}>
              <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                  _id: 1,
              }}
              />                
          </View>

                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  },

  giftedchat: {
    flex: 1,
    width: "80%",
    paddingBottom: 15,
    justifyContent: "center",
    borderRadius: 5,
  }
});

