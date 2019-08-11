import React, { Component } from 'react';

import { Button, Alert, AsyncStorage } from 'react-native'
import { Card, CardItem, View, Text } from 'native-base'
import { thisTypeAnnotation } from '@babel/types';


class Profile extends Component {


  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('berhasil dilogout')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  removeIduser = async () => {
    try {
      await AsyncStorage.removeItem('id_user');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  removeRoleid = async () => {
    try {
      await AsyncStorage.removeItem('role_id');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  removeCardnumber = async () => {
    try {
      await AsyncStorage.removeItem('card_number');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  removefullname = async () => {
    try {
      await AsyncStorage.removeItem('fullname');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  componentWillMount() {
    this.removeCardnumber()
    this.removeIduser()
    this.removeRoleid()
    this.removefullname()
    this.removeToken()
    this.props.navigation.navigate('Home')

  }
  render() {
    return (
      <View>

      </View>
    )
  }

}

export default Profile;