import React from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import CustomActions from './components/CustomActions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}/>
          <Stack.Screen
            name="Chat"
            component={Chat}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

