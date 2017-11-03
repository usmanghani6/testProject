import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class ProgressBar extends Component {

  render() {
    return (
      <View style={styles.indicator}>
        <View style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          padding: 20
        }}>
          <Text>Please Wait Processing</Text>
          <ActivityIndicator/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
});
export default ProgressBar;
