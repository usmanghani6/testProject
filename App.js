/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry,Text, Animated, Easing,Platform, StyleSheet, View } from 'react-native'
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import MyHomeScreen from "./modules/home/MyHomeScreen.js";
import SplashScreen from "./modules/home/SplashScreen.js";
import CameraScreen from "./modules/MultiMediaRoll/CameraScreen.js";
import GalleryScreen from "./modules/MultiMediaRoll/Gallery.js";
import LoginScreen from "./modules/Auth/Login.js";
import SignupScreen from "./modules/Auth/Signup.js";
import DrawerContainer from 'TestProject/component/DrawerContainer.js';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/




const mainNavigations = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: MyHomeScreen
  },
  Cam: {
    screen: CameraScreen
  },
  Gallery: {
    screen: GalleryScreen
  },
  Signup: {
    screen: SignupScreen
  },
  SplashScreen: {
    screen: SplashScreen,
  },
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'screen'
});


const easyRNRoute = DrawerNavigator({
   Stack: {
     screen: mainNavigations
   }
   }, {
     contentComponent: (props) => <DrawerContainer {...props} />,
     headerMode: 'float',
     navigationOptions: ({navigation}) => ({
       headerStyle: {backgroundColor: 'white'},
       title: 'hello world',
       gesturesEnabled: false,
       headerLeft: <Text onPress={() => {
        //  navigation.navigate('DrawerToggle');
        if (navigation.state.index === 0) {
           navigation.navigate('DrawerOpen')
         } else {
           navigation.navigate('DrawerClose')
         }
       }}>Menu</Text>
     })
});

export default MyHomeScreen;


/*

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});


const PrimaryNav = StackNavigator({
  mainNavigations: { screen: mainNavigations },
  drawerStack: { screen: easyRNRoute }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'mainNavigations'
});
]


//drawer navigation pannel
const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
},{
  drawerWidth: 400 * 0.8,
} ,{
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'white'},
    title: '',
    gesturesEnabled: false,
    headerLeft: <Text onPress={() => {
       //navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }}>Menu</Text>
  })
});

const DrawerStack = DrawerNavigator({
  Home: { screen: MyHomeScreen },
  Gallery: { screen: GalleryScreen },
  Cam: { screen: CameraScreen },
});


*/
