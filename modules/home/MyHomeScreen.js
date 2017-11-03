import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Button,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Platform,
  PermissionsAndroid
} from 'react-native';
import {StackNavigator, NavigationActions, DrawerNavigator} from 'react-navigation';
import SplashScreen from "TestProject/modules/home/SplashScreen.js";
import CameraScreen from "TestProject/modules/MultiMediaRoll/CameraScreen.js";
import GalleryScreen from "TestProject/modules/MultiMediaRoll/Gallery.js";
import LoginScreen from "TestProject/modules/Auth/Login.js";
import SignupScreen from "TestProject/modules/Auth/Signup.js";
import MapScreen from "TestProject/modules/maps/MapScreen.js";
import DrawerContainer from 'TestProject/component/DrawerContainer.js';
let ImgUrl = 'TestProject/images/splash.png';

class MyHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const {navigate} = this.props.navigation;
    this.state = {
      refresh: false,
      FlatListItems: [
        {
          id: 1,
          key: 'One'
        }, {
          id: 2,
          key: 'Two'
        }, {
          id: 3,
          key: 'Three'
        }, {
          id: 4,
          key: 'Four'
        }, {
          id: 5,
          key: 'Five'
        }, {
          id: 6,
          key: 'Six'
        }, {
          id: 7,
          key: 'Seven'
        }, {
          id: 8,
          key: 'Eight'
        }, {
          id: 9,
          key: 'Nine'
        }, {
          id: 10,
          key: 'Ten'
        }, {
          id: 11,
          key: 'Eleven'
        }, {
          id: 12,
          key: 'Twelve'
        }
      ]
    }
  }

  async requestCameraPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.'
        })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          this.GetItem(null);
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      this.GetItem(null);
    }
  }

  toggleDrawer() {
    this.props.navigation.navigate('DrawerToggle');
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerStyle: {
      backgroundColor: 'white'
    },
    title: 'HOME',
    gesturesEnabled: false,
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  });

  parseImage(path) {
    ImgUrl = path;
    this.setState({refresh: true});
  }
  render() {
    return (<View style={styles.MainContainer}>
      <Text>{this.props.navigation.state.data}</Text>
      <FlatList data={this.state.FlatListItems} ItemSeparatorComponent={this.FlatListItemSeparator} renderItem={({item}) => <Text style={styles.item} onPress={() => this.requestCameraPermission()}>
          {item.key}
        </Text>}/>

      <Image style={{
          width: 200,
          height: 200
        }} ref='userImage' source={{
          uri: ImgUrl
        }}/>

      <View style={{
          flexDirection: 'row',
          height: '5%'
        }}>
        <Text onPress={() => this.logOut()}>LogOut</Text>
        <Text onPress={() => this.props.navigation.navigate('Map')}  style={{ marginLeft: 20}}>Open MapView</Text>
        <Text onPress={() => this.props.navigation.navigate('Gallery', {parseImage: this.parseImage.bind(this)})} style={{
            marginLeft: 20
          }}>Open Gallery</Text>
      </View>
    </View>);
  }

  async logOut(res) {
    try {
      await AsyncStorage.setItem('isLoggedIn', "false");
      this._navigateTo('Login');
    } catch (error) {
      alert(error + " \nSomething went wrong please try again!");
    }
  }

  _navigateTo = (routeName : string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    this.props.navigation.dispatch(resetAction);
  }

  GetItem(item) {
      this.props.navigation.navigate('Cam', {parseImage: this.parseImage.bind(this)});
  }

  FlatListItemSeparator = () => {
    return (<View style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#607D8B"
      }}/>);
  }

}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

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
  Map: {
    screen: MapScreen
  },
  Signup: {
    screen: SignupScreen
  },
  SplashScreen: {
    screen: SplashScreen
  }
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'screen'
});

const easyRNRoute = DrawerNavigator({
  Stack: {
    screen: mainNavigations
  }
}, {
  contentComponent: (props) => <DrawerContainer {...props}/>,
  headerMode: 'float'
});
export default easyRNRoute;
