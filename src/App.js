import React, { Component } from 'react'
import Shuffle from "shuffle-array"
import NavBar from './Navbar'
import Box from './Box'
import './App.css';

const NUM_BOXES = 8;

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  constructor(props) {
    super(props)
    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
    ]
    cards = Shuffle(cards)
    this.state = {
      cards,
      noClick: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleNewGame = this.handleNewGame.bind(this)
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }))
    cards = Shuffle(cards)
    this.setState({cards})
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if( idsToChange.includes(card.id) ) {
          return {
            ...card,
            cardState: newCardState
          }
        }
        return card
      })
    }

    const foundCard = this.state.cards.find(card => card.id === id)

    if(this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return
    }

    let noClick = false

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING)

    const showingCards = cards.filter(card => card.cardState === CardState.SHOWING)

    const ids = showingCards.map(card => card.id)

    if(showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING)
    } else if (showingCards.length === 2 ) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING)

      noClick = true

      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.5 seconds
          this.setState({cards: hidingCards, noClick: false})
        }, 500)
      })
      return
    }

    this.setState({cards, noClick})
  }

  render() {
    const cards = this.state.cards.map(card => (
      <Box
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ))
    return (
      <div className="App">
        <NavBar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

App.defaultProps = {
  colors: ['blue', 'green', 'yellow', 'red']
}

export default App;
