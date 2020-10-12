import React from 'react';
import { Helmet } from 'react-helmet'
import './App.css';
import Field from "./components/field"
import TopMenu from "./components/topMenu"
import MessageDialog from "./components/messageDialog"
import StartDialog from "./components/startDialog"
import { cloneDeep } from 'lodash'

let siteTitle = "Memory Game";
class Card {

  isFlipped = false;
  isPaired = false;
  imgUrl = "";

  /**
   * @param {string} img 
   */
  constructor(img) {
    this.imgUrl = img;
  }

}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.deck = [
      'bear.png',
      'beaver.png',
      'cat.png',
      'chick.png',
      'chicken.png',
      'cow.png',
      'dog.png',
      'donkey.png',
      'duck.png',
      'elephant.png',
      'lion.png',
      'monkey.png',
      'penguin.png',
      'pig.png',
      'walrus.png',
      'zebra.png'
    ];
    this.state = {
      y: this.props.size ? this.props.size : 16,
      gameMode: 0,
      selectedCardIndex: null,
      startTurnCount: (this.props.size ? this.props.size * 2 : 24),
      turnCount: (this.props.size ? this.props.size * 2 : 24),
      pairNumber: 0,
      message: "start",
      cards: [],
      gameStarted: false,
      gameFinished: false,
      canSneak: true
    }
    this.pairCount = this.state.y / 2;
  }

  componentDidUpdate() {
    if (!this.state.gameFinished && this.state.pairNumber === this.pairCount) {
      this.setState({ ...cloneDeep(this.state), message: "win", gameFinished: true });
    }
    if (!this.state.gameFinished && this.state.gameMode === 0 && this.state.turnCount === 0) {
      this.setState({ ...cloneDeep(this.state), message: "loss", gameFinished: true });
    }
    if (!this.state.gameStarted && this.state.message !== "start") {
      document.onkeydown = this.sneakPeak.bind(this);
      this.startGame();
    }
  }

  startGame() {
    let stateCopy = cloneDeep(this.state);
    this.pairCount = this.state.y / 2;
    stateCopy.gameFinished = false;
    if (stateCopy.gameMode === 0) {
      stateCopy.turnCount = stateCopy.startTurnCount;
    }
    else if (stateCopy.gameMode === 1) {
      stateCopy.turnCount = 0;
    }
    stateCopy.selectedCardIndex = null;
    stateCopy.cards = new Array(this.state.y);
    stateCopy.pairNumber = 0;
    for (let i = 0; i < this.pairCount; i++) {
      let cardImg = this.deck[this.getRandomInt(0, this.deck.length - 1)];
      let randomInt = this.getFreeCardIndexes(stateCopy.cards)[this.getRandomInt(0, this.getFreeCardIndexes(stateCopy.cards).length - 1)];
      stateCopy.cards[randomInt] = { isFlipped: true, isPaired: false, imgUrl: cardImg };
      randomInt = this.getFreeCardIndexes(stateCopy.cards)[this.getRandomInt(0, this.getFreeCardIndexes(stateCopy.cards).length - 1)];
      stateCopy.cards[randomInt] = { isFlipped: true, isPaired: false, imgUrl: cardImg };
    }
    stateCopy.message = "ready";
    stateCopy.gameStarted = true;
    
    setTimeout(() => {
      let stateCopy = cloneDeep(this.state);
      for (let i = 0; i < stateCopy.cards.length; i++) {
        stateCopy.cards[i].isFlipped = false;
      }
      this.setState({ ...cloneDeep(stateCopy), message: "" })
    }, 1000);
    this.setState({ ...cloneDeep(stateCopy) });

  }

  onCardClick(index) {
    this.flipUp(index);
    setTimeout(() => {
      this.cardClick(index);
    }, 500);
  }

  sneak(index) {
    let stateCopy = cloneDeep(this.state);
    let cards = stateCopy.cards;
    cards[index].isFlipped = true;
    stateCopy.canSneak = false;
    this.setState(stateCopy);
  }

  flipUp(index) {
    let stateCopy = cloneDeep(this.state);
    let cards = stateCopy.cards;
    cards[index].isFlipped = true;
    if (stateCopy.gameMode === 0 && stateCopy.selectedCardIndex !== index && !stateCopy.cards[index].isPaired) {
      stateCopy.turnCount -= 1;
    }
    else if (stateCopy.gameMode === 1 && stateCopy.selectedCardIndex !== index && !stateCopy.cards[index].isPaired) {
      stateCopy.turnCount += 1;
    }
    this.setState(stateCopy);
  }

  cardClick(index) {
    let stateCopy = cloneDeep(this.state);
    let cards = stateCopy.cards;
    cards[index].isFlipped = true;

    if (stateCopy.selectedCardIndex === index) {
      return;
    }
    if (stateCopy.message !== "") {
      return;
    }
    if (cards[index].isPaired) {
      return;
    }
    if (stateCopy.selectedCardIndex === null) {
      stateCopy.selectedCardIndex = index;
    } else {
      if (cards[stateCopy.selectedCardIndex].imgUrl === cards[index].imgUrl) {
        cards[stateCopy.selectedCardIndex].isPaired = true;
        cards[index].isPaired = true;
        stateCopy.selectedCardIndex = null;
        stateCopy.pairNumber += 1;
      }
      else {
        cards[stateCopy.selectedCardIndex].isFlipped = false;
        cards[index].isFlipped = false;
        stateCopy.selectedCardIndex = null;
      }

    }
    this.setState(stateCopy);
  }

  getFreeCardIndexes(cards) {
    let freeCardIndexes = [];

    for (let i = 0; i < cards.length; i++) {
      if (cards[i] === undefined) freeCardIndexes.push(i);
    }
    return freeCardIndexes;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sneakPeak(event) {
    if (event.keyCode !== 83) return;
    let stateCopy = cloneDeep(this.state);
    let freeCardIndexes = [];

    for (let i = 0; i < stateCopy.cards.length; i++) {
      if (stateCopy.cards[i].isFlipped === false) freeCardIndexes.push(i);
    }
    if (freeCardIndexes.length === 0) return;
    let randomCardIndex = freeCardIndexes[this.getRandomInt(0, freeCardIndexes.length - 1)];
    this.sneak(randomCardIndex);
    setTimeout(() => {
      stateCopy.canSneak = true;
      stateCopy.cards[randomCardIndex].isFlipped = false;
      this.setState({ ...cloneDeep(stateCopy) });
    }, 500);
  }

  settingsChange() {
    let stateCopy = cloneDeep(this.state);
    stateCopy.message = "start";
    stateCopy.gameStarted = false;
    this.setState({...cloneDeep(stateCopy)});
  }

  onStartMenuSubmit(gameMode, cardsNumber) {
    let stateCopy = cloneDeep(this.state);
    stateCopy.gameMode = gameMode ? parseInt(gameMode) : 0;
    stateCopy.y = cardsNumber ? parseInt(cardsNumber) : 16;
    stateCopy.startTurnCount = parseInt(gameMode) === 0 ? stateCopy.y * 2 : 0;
    stateCopy.turnCount = parseInt(gameMode) === 0 ? stateCopy.y * 2 : 0;
    stateCopy.message = "";

    this.setState({ ...cloneDeep(stateCopy) });
  }

  render() {
    return (
      <div id="app">
        <Helmet>
          <title>{siteTitle}</title>
        </Helmet>
        <div className="mg-container">
          <TopMenu count={this.state.turnCount} restart={this.startGame.bind(this)} settings={this.settingsChange.bind(this)} />
          <Field cardClick={this.onCardClick.bind(this)} cards={this.state.cards} />
          <MessageDialog restart={this.startGame.bind(this)} message={this.state.message} />
          <StartDialog message={this.state.message} submit={this.onStartMenuSubmit.bind(this)} />
          <div className="mg-copyright">
            Coded by <a href="https://github.com/NikitaAseev" target="_blank">Aseev Nikita</a>, Illustartions by <a href="http://www.freepik.com" target="_blank">Freepik</a>
          </div>
        </div>

        <script src="main.js"></script>
      </div>
    )
  }
}

export default MemoryGame;
