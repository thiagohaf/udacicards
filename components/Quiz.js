import React, {PureComponent} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native'
import {connect} from 'react-redux'
import {setLocalNotification, clearLocalNotification} from '../utils/notifications'
import {white, green, red, indigo} from '../utils/colors'
import Deck from './Deck'
import QACard from './QACard'

class Quiz extends PureComponent {

  state = {
    currentQuestionIndex: 0,
    correctAnswersCount: 0
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  correctBtnPressed() {
    this.setState((state) => {
      return {
        currentQuestionIndex: state['currentQuestionIndex'] + 1,
        correctAnswersCount: state['correctAnswersCount'] + 1
      }
    })
  }

  inCorrectBtnPressed() {
    this.setState((state) => {
      return {
        ...state,
        currentQuestionIndex: state['currentQuestionIndex'] + 1
      }
    })
  }

  restartQuiz() {
    this.setState({currentQuestionIndex: 0, correctAnswersCount: 0})
  }

  render() {
    const {currentQuestionIndex, correctAnswersCount} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if (currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLbl}>Your Score</Text>
            <Text style={styles.score}>{(correctAnswersCount / questions.length) * 100}
              %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, styles.goBackToDeckBtn]} onPress={() => goBack()}>
              <Text style={[styles.btnText, styles.goBackToDeckBtnText]}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.restartQuizBtn]} onPress={() => this.restartQuiz()}>
              <Text style={[styles.btnText, styles.restartQuizBtnText]}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[currentQuestionIndex]
    const {opacityFront, opacityBack, transformFrontY, transformBackY} = this.state
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    }
    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>{currentQuestionIndex + 1}/{questions.length}</Text>
        <View style={styles.qacard}><QACard card={card}/></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btn, styles.greenBtn]} onPress={() => this.correctBtnPressed()}>
            <Text style={[styles.btnText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.redBtn]} onPress={() => this.inCorrectBtnPressed()}>
            <Text style={[styles.btnText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
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
  pagination: {
    flex: 1,
    alignItems: 'flex-start'
  },
  qacard: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
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
  greenBtn: {
    backgroundColor: green
  },
  redBtn: {
    backgroundColor: red
  },
  goBackToDeckBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: indigo
  },
  goBackToDeckBtnText: {
    color: indigo
  },
  restartQuizBtn: {
    backgroundColor: indigo
  },
  restartQuizBtnText: {
    color: white
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLbl: {
    fontSize: 36,
    color: indigo
  },
  score: {
    fontSize: 48,
    color: green
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
    goBack: () => navigation.goBack()
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
