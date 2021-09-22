import '../scss/style.scss';
import '../scss/messages.scss';
import { handleCellClick, newRound, restartGame } from './game';

const messageHidden = document.querySelector('.message-before-game');
const scorsHidden = document.querySelector('.scors-hidden');
const messageDraw = document.querySelector('.draw');
const scorsAfterGame = document.querySelector('.message-after-game');
const cellElements = document.querySelectorAll('.cell');

document
  .querySelector('#reset-btn')
  .addEventListener('click', () => restartGame(messageDraw, scorsAfterGame, messageHidden, scorsHidden));
document
  .querySelector('#new-round-btn')
  .addEventListener('click', () => newRound(messageDraw, messageHidden, scorsHidden));
document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', (event) => handleCellClick(event, scorsAfterGame, messageDraw, cellElements)));
