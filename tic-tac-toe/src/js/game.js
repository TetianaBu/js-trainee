import { winningMessage } from './winners';

let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];

let currentPlayer;

const playerOne = {
  score: 0,
  symbol: '',
  name: null,
  nameElement: document.getElementById('player-1-name'),
  statusElement: document.getElementById('player-1-status')
};
const playerTwo = {
  score: 0,
  symbol: '',
  name: null,
  nameElement: document.getElementById('player-2-name'),
  statusElement: document.getElementById('player-2-status')
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getPlayersNames(messageHidden, scorsHidden) {
  playerOne.name = window.prompt('Type name of first player');
  playerTwo.name = window.prompt('Type name of second player');
  playerOne.nameElement.innerHTML = playerOne.name;
  playerTwo.nameElement.innerHTML = playerTwo.name;
  messageHidden.style.display = 'none';
  scorsHidden.style.display = 'flex';
  scorsHidden.classList.add('scors-wrapper');
}

function randomChoosePlayer() {
  playerOne.symbol = 'O';
  playerTwo.symbol = 'O';
  currentPlayer = Math.random() < 0.5 ? playerOne : playerTwo;
  currentPlayer.symbol = 'X';
  currentPlayer.nameElement.style.color = 'yellow';
  return window.alert(`It's ${currentPlayer.name}'s turn`);
}

function otherPlayer() {
  return currentPlayer === playerOne ? playerTwo : playerOne;
}

function playerChange() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  currentPlayer.nameElement.style.color = 'yellow';
  otherPlayer().nameElement.style.color = 'black';
}

function markPlayedCell(clickedCell, clickedCellIndex, cellElements) {
  gameState[clickedCellIndex] = currentPlayer.symbol;
  clickedCell.innerHTML = currentPlayer.symbol;
  cellElements[clickedCellIndex].style.color =
    currentPlayer.symbol == 'X' ? '#00a170' : '#0f4c81';
}

function somoneWonRound() {
  for (let i = 0; i <= 7; i++) {
    const [p1, p2, p3] = winningConditions[i];
    let a = gameState[p1];
    let b = gameState[p2];
    let c = gameState[p3];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      return true;
    }
  }
  return false;
}

function resultValidation(scorsAfterGame, messageDraw) {
  let roundWon = somoneWonRound();

  if (roundWon) {
    gameActive = false;
    scorsAfterGame.style.display = 'flex';
    scorsAfterGame.classList.add('centered-message');
    scorsAfterGame.innerHTML = winningMessage(currentPlayer.name);
    countScore(currentPlayer);
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    gameActive = false;
    messageDraw.style.display = 'flex';
    messageDraw.classList.add('centered-message');
    return;
  }
  scorsAfterGame.style.display = 'none';
  messageDraw.style.display = 'none';
  playerChange();
}

export function handleCellClick(
  clickedCellEvent,
  scorsAfterGame,
  messageDraw,
  cellElements
) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  markPlayedCell(clickedCell, clickedCellIndex, cellElements);
  resultValidation(scorsAfterGame, messageDraw);
}

export function restartGame(
  messageDraw,
  scorsAfterGame,
  messageHidden,
  scorsHidden
) {
  messageDraw.style.display = 'none';
  scorsAfterGame.style.display = 'none';
  playerTwo.statusElement.innerHTML = `You can win`;
  playerOne.statusElement.innerHTML = `You can win`;
  playerTwo.score = playerOne.score = 0;

  getPlayersNames(messageHidden, scorsHidden);
  startRound();
}

export function newRound(messageDraw, messageHidden, scorsHidden) {
  messageDraw.style.display = 'none';
  if (!playerTwo.name && !playerTwo.name) {
    getPlayersNames(messageHidden, scorsHidden);
  }
  startRound();
}

function startRound() {
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  randomChoosePlayer();
}

function countScore(winner) {
  winner.score++;
  const games = winner.score === 1 ? 'game' : 'games';
  winner.statusElement.innerHTML = `You won ${winner.score} ${games}`;
}
