import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import {Platform } from 'react-native';

import Decks from './components/Decks'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

import DeckInfo from './components/DeckInfo'
import Quiz from './components/Quiz'

import { Entypo } from '@expo/vector-icons'
import {indigo, white } from './utils/colors'

const Tabs = TabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      fontSize:30
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      fontSize:30
    }
  }
},{
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? indigo : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : indigo,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
   }
  }
})


export const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  },
  DeckInfo:{
    screen: DeckInfo,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: indigo
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: indigo
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: indigo
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})
