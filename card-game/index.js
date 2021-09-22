const SUITS = ['spades', 'diamonds', 'clubs', 'hearts'];
const RANK_NAMES = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
];
const FACE_CARD_START_INDEX = 10;

class Deck {
  constructor() {
    this.cards = [];
    for (let rank = 0; rank < RANK_NAMES.length; rank++) {
      for (const suit of SUITS) {
        let card = new Card(suit, rank);
        this.cards.push(card);
      }
    }
  }

  get count() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * this.cards.length);
      let location2 = Math.floor(Math.random() * this.cards.length);
      let tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }

  draw(n = 1) {
    return this.cards.splice(0, n);
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get isFaceCard() {
    return this.rank > FACE_CARD_START_INDEX || this.rank === 0;
  }
  toString() {
    return `${RANK_NAMES[this.rank]} of ${this.suit}`;
  }
  static compare(cardOne, cardTwo) {
    if (cardOne.rank === cardTwo.rank) {
      return 0;
    }
    return cardOne.rank > cardTwo.rank ? 1 : -1;
  }
}

class Player {
  constructor(name, deck = new Deck()) {
    this.name = name;
    deck.shuffle();
    this._deck = deck;
    this._wins = 0;
  }

  get wins() {
    return this._wins;
  }

  get deck() {
    return this._deck;
  }

  static play(playerOne, playerTwo) {
    while (playerOne.deck.count) {
      const [playerOneCard] = playerOne.deck.draw();
      const [playerTwoCard] = playerTwo.deck.draw();
      const cardCompare = Card.compare(playerOneCard, playerTwoCard);
      switch (cardCompare) {
        case 1:
          playerOne._wins += 1;
          break;
        case -1:
          playerTwo._wins += 1;
          break;
        default:
      }
    }
    if (playerOne.wins === playerTwo.wins) {
      console.log(
        `Game between ${playerOne.name} and ${playerTwo.name} ended in a draw`
      );
    } else {
      if (playerOne.wins > playerTwo.wins) {
        console.log(
          `${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`
        );
      } else {
        console.log(
          `${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`
        );
      }
    }
  }
}
