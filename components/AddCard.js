import React, {Component} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'

import {connect} from 'react-redux'
import {indigo, white, orange} from '../utils/colors'

import FormButtons from './FormButtons'
import {NavigationActions} from 'react-navigation'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

class AddCard extends Component {

  submit = () => {
    const {question, answer} = this.state
    const {addCard, deck, goBack} = this.props
    if (question && answer) {
      addCard(deck.title, {question, answer}) //update Redux
      addCardToDeck(deck.title, {question, answer}) //update db
      goBack()
    }
  }

  reset = () => {
    this.setState({question: '', answer: ''})
    this.props.goBack()
  }

  render() {
    const {deck} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput style={styles.question} underlineColorAndroid={'transparent'} editable={true} maxLength={100} placeholder="Enter the question here" onChangeText={(question) => this.setState({question})}/>
        <TextInput style={styles.answer} underlineColorAndroid={'transparent'} editable={true} maxLength={200} multiline={true} placeholder="Enter the answer here" onChangeText={(answer) => this.setState({answer})}/>
        <FormButtons onSubmit={this.submit} onCancel={this.reset} submitBtnText={'Add Card'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    color: indigo,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: indigo,
    borderRadius: 4,
    height: 40
  },
  answer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: indigo,
    height: 90
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
