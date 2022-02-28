import React from 'react';
import { ImageBackground, Image, StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BGI from '../assets/BGI.png';
import icon from '../assets/icon.svg' ;


const  colors = {
  color1: "#52e565",
  color2: "#ec7b5b",
  color3: "#e9ec5b",
  color4: "#8b8dea"
};

export default class Start extends React.Component {

  constructor(props) {
      super(props);
      this.state = { 
          name: '',
          bgcolor: ''
      };
  }

  changeBgColor = (newColor) => {
    this.setState({ bgcolor: newColor });
  };


  render() {
    return (
      <View style={styles.container}>

        <ImageBackground source={BGI} resizeMode='cover' style={styles.BGI}>
        <View 
          accessible={false}
          accessibilityLabel="El Chatz app"
          accessibilityHint="Title"
          accessibilityRole="header"
          style={styles.titlebox}>
              <Text style={styles.title}>Chatz</Text>                
        </View>
          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.icon1} />
              <TextInput
                accessible={true}
                accessibilityLabel="Type your name here"
                accessibilityHint="Lets you enter your name"
                accessibilityRole="search"
                style={styles.input}
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}
                placeholder='Your Name'> 
              </TextInput>
            </View>
        
            <View style={styles.colorbox}>
          
            <View style={styles.colortextbox}>
              <Text style= {styles.colortext}>Choose Background Color:</Text>
              </View>

              <View style={styles.color}>
                <TouchableOpacity accessible={true}
                      accessibilityLabel="green background"
                      accessibilityHint="Adds a green background to the chat screen"
                      accessibilityRole="button" 
                      style={styles.color1} onPress={() => this.changeBgColor(colors.color1)}></TouchableOpacity>
              <TouchableOpacity accessible={true}
                      accessibilityLabel="red background"
                      accessibilityHint="Adds a red background to the chat screen"
                      accessibilityRole="button" 
              style={styles.color2}  onPress={() => this.changeBgColor(colors.color2)}></TouchableOpacity>
              <TouchableOpacity accessible={true}
                      accessibilityLabel="yellow background"
                      accessibilityHint="Adds a yellow background to the chat screen"
                      accessibilityRole="button" 
              style={styles.color3} onPress={() => this.changeBgColor(colors.color3)}></TouchableOpacity>
              <TouchableOpacity accessible={true}
                      accessibilityLabel="purple background"
                      accessibilityHint="Adds a purple background to the chat screen"
                      accessibilityRole="button" 
              style={styles.color4} onPress={() => this.changeBgColor(colors.color4)}></TouchableOpacity>
              </View>
            </View>

            <Pressable 
              accessible={true}
              accessibilityLabel="Start Chat"
              accessibilityHint="Navigating to chat page"
              accessibilityRole="button"
              style={styles.button}  
              onPress={() =>
                  this.props.navigation.navigate("Chat", {
                      name: this.state.name,
                      bgcolor: this.state.bgcolor,
                  })}>  
                  <Text style={styles.buttontext}>Letz Chatz</Text>
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

  icon1:{
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

  inputBox: {
    flexDirection: 'row',
    width:"90%",
    borderColor: '#f6f5f4', 
    borderWidth: 2,
    padding: 15
  },
  
  input: {
    fontSize: 20,
    fontWeight: "300",
    color: '#f6f5f4',
    opacity: 1
  },

  button: {
    flexDirection: 'column',
    backgroundColor: "#15aea4", 
    width: "70%"
  },

  buttonheight: { 
    backgroundColor: '#6c6b6a',
    height: 60, 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },

  buttontext: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    padding: 20
  },

  color: { 
    width: 45,
    height: 45,
    borderRadius: 20, 
    marginRight: 10,
    marginLeft: 0,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 0,
    alignItems: "flex-start",
    flexShrink:0,
    
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
    color: '#f6f5f4',
    opacity: 1,
    padding: 5,
  },

  colorpalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  colorTextBox: {
    alignItems: "stretch",
    width: '88%',
     flexDirection: 'row',
     justifyContent: 'space-between',
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