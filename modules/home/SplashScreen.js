import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet,AsyncStorage,NativeModules} from 'react-native';
import {StackNavigator,NavigationActions} from 'react-navigation';
import TimerMixin from 'react-timer-mixin';



export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount () {
     TimerMixin.setTimeout( () => {
         this.checkUserStatus();
     },1000);
 }

 async checkUserStatus(){
   const value = await AsyncStorage.getItem('isLoggedIn');
  if (value !== null && value === "true"){
    this._navigateTo('Home');
    console.log(value);
  }else{
    this._navigateTo('Login');
  }
  //this.closeScreenWithAnimation();
 }
  _navigateTo = (routeName: string) => {
   const resetAction = NavigationActions.reset({
     index: 0,
     key: 'mainNavigations',
     actions: [NavigationActions.navigate({routeName: routeName })]
   });
   this.props.navigation.dispatch(resetAction);
 }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splashImage} source={require('TestProject/images/splash.png')}/>
        <Text style={styles.textTitle}>Ratings</Text>
      </View>
    );
  }

}

styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center'
  },
  splashImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    width:null,
    height:null,
    backgroundColor:'rgba(0,0,0,0)'
  },
  textTitle: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#C0392B',
    margin: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '20%',
  }

});
