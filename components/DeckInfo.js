import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {white, indigo} from '../utils/colors'
import Deck from './Deck'

class DeckInfo extends Component {
  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params
    return {title: deckTitle}
  }

  render() {
    const {deck, navigateToAddCard, navigateToStartQuiz} = this.props

    return (
      <View style={styles.container}>
        <Deck id={deck.title} title={deck.title} questions={deck.questions} bigFonts={true}/>
        <TouchableOpacity style={[styles.btn, styles.addCardBtn]} onPress={() => navigateToAddCard(deck.title)}>
          <Text style={[styles.btnText, styles.addCardBtnText]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.startQuizBtn]} onPress={() => navigateToStartQuiz(deck.title)}>
          <Text style={[styles.btnText, styles.startQuizBtnText]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: indigo
  },
  addCardBtnText: {
    color: indigo
  },
  startQuizBtn: {
    backgroundColor: indigo
  },
  startQuizBtnText: {
    color: white
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {},
    decks
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: (deckTitle) => navigation.navigate('AddCard', {deckTitle: deckTitle}),
    navigateToStartQuiz: (deckTitle) => navigation.navigate('Quiz', {deckTitle: deckTitle})
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo)
