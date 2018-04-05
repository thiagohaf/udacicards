import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'

import { clearDB } from './utils/api'
import { setLocalNotification } from './utils/notifications'

import {MainNavigator} from './routes'

import {indigo, white, black} from './utils/colors'

function FlashCardsStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardsStatusBar backgroundColor={indigo} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}