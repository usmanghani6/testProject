import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Picker
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Student from "TestProject/model/Student.js";
import NetwrokManager from "TestProject/modules/network/NetworkManager.js";
import ProgressBar from "TestProject/component/ProgressBar.js";
import {StatusBar} from 'react-native';

function ShowIfLoading(props) {
  if (props.loading) {
    return (<ProgressBar/>);
  }
  return null;
}

function notEmpthy(val : string) : boolean {
  if(val == "") {
    return false;
  }
  return true;
}

export default class Signup extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      email: "",
      pass: "",
      gender: 0,
      phone: "",
      selectedValue: "Select Gender"
    }
  }

  validateNetWorkCall() {
    if (notEmpthy(this.state.name) & notEmpthy(this.state.email) & notEmpthy(this.state.pass) & notEmpthy(this.state.phone)) {} else {
      alert("input Error", "Fill All Fields");
      return;
    }
    this.setState({isLoading: true});
    this._requestNetworkCall().then(response =>{
      console.log(response);
      this.setState({isLoading: false});
      if(response == "invalid response" ){
          alert("Opps","Something Went Wrong Please try Again later");
      }else if(response == false){
        alert("Network Error","Check Your Internet Connection!");
      }

      res = JSON.parse(response);
      if("success" in res){
        success = res.success
        if (success == true) {
          alert("Signup Succeed");
          this.props.navigation.goBack()
        } else {
          alert("Invalid Credentials","Please provide valid Username and Password");
        }
      }
    });

  }

  async _requestNetworkCall() {
    networkManager = new NetwrokManager();
    networkManager.setMethod("POST");
    networkManager.addParams("name", this.state.name);
    networkManager.addParams("password", this.state.pass);
    networkManager.addParams("phone", this.state.phone);
    networkManager.addParams("email", this.state.email);
    networkManager.addParams("gender", this.state.gender);
    const response = await networkManager.getResponse("signup");
    return response;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SignUp</Text>
        <TextInput style={styles.inputs} placeholder={'Name'} underlineColorAndroid='transparent' keyboardType={'email-address'} returnKeyType={'next'} onChangeText={(text) => this.state.name = text} onSubmitEditing={() => this.refs.inputEmail.focus()}/>
        <TextInput style={styles.inputs} placeholder={'Email Address'} ref={'inputEmail'} underlineColorAndroid='transparent' returnKeyType={'next'} onChangeText={(text) => this.state.email = text} onSubmitEditing={() => this.refs.inputNumber.focus()}/>
        <TextInput style={styles.inputs} placeholder={'Phone Number'} ref={'inputNumber'} returnKeyType={'next'} underlineColorAndroid='transparent' onChangeText={(text) => this.state.phone = text} onSubmitEditing={() => this.refs.inputPassword.focus()}/>
        <TextInput style={styles.inputs} placeholder={'Password'} ref={'inputPassword'} secureTextEntry={true} returnKeyType={'done'} underlineColorAndroid='transparent' onChangeText={(text) => this.state.pass = text}/>
        <Picker style={{
          width: '80%'
        }} mode ={"dropdown"} selectedValue={this.state.gender} onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
          <Picker.Item label="Male" value="0"/>
          <Picker.Item label="Female" value="1"/>
        </Picker>
        <Text style={styles.signupButton} onPress={() => this.validateNetWorkCall()}>Submit</Text>
        <ShowIfLoading loading={this.state.isLoading}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems: 'center'
  },
  inputs: {
    textAlign: 'center',
    margin: 5,
    padding: 10,
    color: '#F7F9F9',
    backgroundColor: '#CB4335',
    flexDirection: 'row',
    width: '80%',
    borderRadius: 4,
    borderColor: '#FBFCFC',
    borderWidth: 1
  },
  signupButton: {
    textAlign: 'center',
    marginTop: 30,
    padding: 10,
    color: '#ffffff',
    backgroundColor: '#CB4335',
    flexDirection: 'row',
    width: '80%',
    borderRadius: 4,
    borderColor: "#EC7063",
    borderWidth: 1
  },
  title: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#C0392B',
    margin: 30
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
