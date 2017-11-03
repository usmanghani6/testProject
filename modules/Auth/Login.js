import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ProgressBar from "TestProject/component/ProgressBar.js";
import NetwrokManager from "TestProject/modules/network/NetworkManager.js";

function ShowIfLoading(props) {
  if (props.loading) {
    return (
      <ProgressBar />
    );
  }
  return null;
}

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email:"",
      password:"",
    }
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  async _requestNetworkCall() {
    networkManager = new NetwrokManager();
    networkManager.setMethod("POST");
    networkManager.addParams("email", this.state.email);
    networkManager.addParams("password", this.state.password);
    networkManager.addParams("type","1");
    const response = await networkManager.getResponse("login");
    return response;
  }


  _Authenticate(email : string, pass : string) {
    if (email == "" || pass == "") {
      alert("Fill all fields");
      return;
    }
    this.setState({isLoading: true});
    this._requestNetworkCall().then( response =>{
      console.log(" res "+response);
      this.setState({isLoading: false});

      if(response == "invalid response" ){
          alert("Something Went Wrong Please try Again later");
      }else if(response == false){
        alert("Check Your Internet Connection!");
      }

      res = JSON.parse(response);
      if("success" in res){
        success = res.success
        if (success == true) {
          this.saveUserAndNavigate(res);
        } else {
          alert("Please provide valid Username and Password");
        }
      }
    });
  }


async saveUserAndNavigate(res){
  try {
        await AsyncStorage.setItem('isLoggedIn',"true");
        this.props.navigation.navigate('Home', {user: this.state.email})
  } catch (error) {
        alert(error+" \nSomething went wrong please try again!");
  }
}

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Welcome To Ratings</Text>
        <TextInput style={styles.inputs} underlineColorAndroid='transparent' placeholder={"Enter Email"} returnKeyType={"next"} keyboardType={'email-address'} onSubmitEditing={() => this.refs.inputEmail.focus()} onChangeText={(text) => this.state.email=text}/>
        <TextInput style={styles.inputs} ref='inputEmail' placeholder={"Enter Password"} underlineColorAndroid='transparent' onChangeText={(text) => this.state.password=text}/>

        <View style={{
          width: '100%',
          marginTop: 20,
          alignItems: 'center'
        }}>


          <TouchableHighlight style={styles.buttonparent} underlayColor="#F5FCFF" onPress={() => this._Authenticate(this.state.email,this.state.password)}>
            <Text style={styles.button}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonparent} underlayColor="#F5FCFF" onPress={() => this.props.navigation.navigate('Signup', {})}>
            <Text style={styles.button}>Signup</Text>
          </TouchableHighlight>
        </View>
        <ShowIfLoading loading={this.state.isLoading}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  textTitle: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#C0392B',
    margin: 30
  },
  inputs: {
    width: '80%',
    color: '#CB4335',
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#C0392B',
    backgroundColor: '#CB4335'
  },
  buttonparent: {
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    textAlign: 'center',
    padding: 15,
    color: '#ffffff',
    backgroundColor: '#CB4335',
    borderRadius: 5,
    borderWidth: 0.2
  }
});
