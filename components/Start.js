import React from 'react';
import { ImageBackground, Image, StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import BGI from '../assets/BGI.png';
import icon from '../assets/icon.svg' ;

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>

        <ImageBackground source={BGI} resizeMode='cover' style={styles.BGI}>
          <View style={styles.titleBox}> 
              <Text style={styles.title}>Chatz</Text> 
          </View>
          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.usericon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text})}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>
            <View style={styles.colorbox}>
              <Text style={styles.colortext}>Choose Background Color</Text>
              <View style={styles.colorpalette}>
                  <View style={styles.color1}></View>
                  <View style={styles.color2}></View>
                  <View style={styles.color3}></View>
                  <View style={styles.color4}></View>
            </View>
            </View>
              <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Chat')}>  
                  <Text style={styles.buttontext}>Start Chatting</Text>
              </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  BGI : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon:{
    padding: 10,
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  titlebox:{
    height: "50%",
    width: "70%"
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    padding: 20
  },

  box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white", 
    height: "44%",
    width: "70%"
  },

  inputbox: {
    flexDirection: 'row',
    width:"70%",
    borderColor: '#15aea4', 
    borderWidth: 1,
    padding: 10
  },
  
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: '#15aea4',
    opacity: 0.5
  },

  button: {
    flexDirection: 'column',
    backgroundColor: "#15aea4", 
    width: "70%"
  },

  buttontext: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    padding: 20
  },

  colorbox:{
    flexDirection: 'column',
    padding: 20,
    marginRight: 'auto',
    width: "70%"
  },

  colortext:{
    fontSize: 16,
    fontWeight: "300",
    color: '#15aea4',
    opacity: 1,
    padding: 5,
  },

  colorpalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  color1:{
    flexDirection: 'row',
    backgroundColor: '#52e565',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color2:{
    flexDirection: 'row',
    backgroundColor: '#ec7b5b',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  color3:{
    flexDirection: 'row',
    backgroundColor: '#e9ec5b',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  color4:{
    flexDirection: 'row',
    backgroundColor: '#8b8dea',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});