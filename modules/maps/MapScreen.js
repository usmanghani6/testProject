import React, {Component} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    header: null
  };


  render() {
    return (<View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>)
  }
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
