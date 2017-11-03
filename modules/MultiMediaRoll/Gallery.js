import React, {Component} from 'react';
import {
  AppRegistry,
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ProgressBar from 'TestProject/component/ProgressBar.js';
import ViewPhotos from './ViewPhotos.js';

export default class Gallery extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      showPhotoGallery: false,
      photoArray: []
    }

  }

  componentDidMount() {
    this.getPhotosFromGallery();
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({first: 1000000}).then(res => {
      let photoArray = res.edges;
      this.setState({showPhotoGallery: true, photoArray: photoArray})
    })
  }

  navigateBack(uri) {
      this.props.navigation.state.params.parseImage(uri);
      this.props.navigation.goBack();
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (<ViewPhotos photoArray={this.state.photoArray} navigateBack={this.navigateBack.bind(this)}/>)
    } else {
      return (
        <View style={{
          flex: 1
        }}>
          <ProgressBar/>
        </View>
      );
    }

  }

}
