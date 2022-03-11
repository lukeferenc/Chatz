import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import firebase from 'firebase';
import "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';




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
            _id: "",
            name: "",
        },
        isConnected: false 
    };


    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");

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

            this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                console.log(user)
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
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate)

                this.refMsgsUser = firebase
                .firestore()
                .collection("messages")
                .where("uid", "==", this.state.uid);
                });
                this.saveMessages();

            } else {
                this.setState({ isConnected: false });
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
    }), () => {
      this.addMessages();
    })
    
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
        return(
            <InputToolbar
            {...props}
            />
        );
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
                    renderInputToolbar={this.renderInputToolbar}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                    _id: this.state.user._id,
                    name: this.state.name,
                    avatar: this.state.user.avatar
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
