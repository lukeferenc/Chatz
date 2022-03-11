import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQm3NiiTSHFSv1hCH0uIrty6eADzpc3FE",
    authDomain: "chattry-e3b2d.firebaseapp.com",
    projectId: "chattry-e3b2d",
    storageBucket: "chattry-e3b2d.appspot.com",
    messagingSenderId: "633452684804",
    appId: "1:633452684804:web:a2ef3999739ecb21203751",
    measurementId: "G-XHEPD4MNS1"
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

      if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        }

        
      this.referenceChatMessages = firebase.firestore().collection('messages');
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

    componentDidMount() {
        let { name } = this.props.route.params
        this.props.navigation.setOptions({ title: name })
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
                        name: name,
                        avatar: "https://placeimg.com/140/140/any",
                    },
                });

                this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
                this.refMsgsUser = firebase
                .firestore()
                .collection("messages")
                .where("uid", "==", this.state.uid);
                });
                this.saveMessages();
        
            } else {
                this.setState({ isConnected: false });
                console.log('offline');
                this.getMessages();
            }
        });
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
                    avatar: data.user.avatar
                },
            });
        });
        this.setState({
            messages,
        });
    };

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

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
    

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
            this.saveMessages();
        })
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

