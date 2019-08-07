/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import MainNavigator from './src/public/navigators/MainNavigator'
import { Provider } from 'react-redux';
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};


export default App;
