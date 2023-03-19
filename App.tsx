import React, {useState} from 'react';
import {Chats} from './Chats';
import {SignUp} from './SignUp';
import {SignIn} from './SignIn';
import {Chat} from './Chat';
import {Home} from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  function checkUser() {
    const user = AsyncStorage.getItem('user');
    return user;
  }

  const ui = (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={checkUser != null ? 'Sign In' : 'Sign In'}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />   
        <Stack.Screen name="Home" component={Home} />  
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return ui;

}


export default App;
