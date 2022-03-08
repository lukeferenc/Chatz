import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
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
          uid: 0,
          _id: 0,
          user: {
              _id: '',
              name: '',
          },
          isConnected: false,
      };
      if (!firebase.apps.length) {

          firebase.initializeApp({
              apiKey: "AIzaSyD3eu6uEe_p5pHeuVzQFPdWUJIb1BqXG1c",
              authDomain: "chat-app-d155e.firebaseapp.com",
              projectId: "chat-app-d155e",
              storageBucket: "chat-app-d155e.appspot.com",
              messagingSenderId: "197256413370",
              appId: "1:197256413370:web:81d18e3393107d68b6c283"
          });
      }
      this.referenceChatMessages = firebase.firestore().collection('messages');
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
                _id: data.user._id,
                name: data.user.name,
            },
        });
    });
    this.setState({
        messages,
    });
  };

  addMessages() { 
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
        _id: message._id,
        text: message.text || "",
        createdAt: message.createdAt,
        user: this.state.user
    });
    }

  async saveMessages() {
      try {
          await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
          console.log(error.message);
      }
  }

  async deleteMessages() {
      try {
          await AsyncStorage.removeItem('messages');
          this.setState({
              messages: []
          })
      } catch (error) {
          console.log(error.message);
      }
  }
    
  async getMessages(){
    let messages = '';
    try {
        
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
            messages: JSON.parse(messages)
        });
    } catch (error) {
        console.log(error.message);
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
        this.addMessages();
        this.saveMessages();
    })
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
        return(
            <InputToolbar
            {...props}
            />
        );
    }
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

  componentDidMount() {
    NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
            this.setState({ isConnected: true });
            console.log('online');
            this.authUnsubscribe = firebase.auth()
                .onAuthStateChanged(async (user) => {
                    if (!user) {
                        await firebase.auth().signInAnonymously();
                    }

                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: this.props.route.params.name,
                        },
                    });
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(this.onCollectionUpdate);
                });
        } else {
            console.log('offline');
            this.setState({
                isConnected: false
            });
            this.getMessages();
        }
    });
  }

  componentWillUnmount() {
  this.authUnsubscribe();
  this.unsubscribe();
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
              renderInputToolbar={this.renderInputToolbar}
              user={this.state.user}
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

