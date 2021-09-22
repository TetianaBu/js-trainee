import "../scss/style.scss";
import "../scss/resetButton.scss";
import "../scss/media.scss";

import { aiPlay } from "./aiPlay";
import { chooseRoundWinner } from "./chooseRoundWinner";


const messageForPlayer = document.getElementById("game-status");

const rock = document.getElementById("rock");
const papper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", () => reset(true));

rock.addEventListener("click", () => playRound(rock.id));
papper.addEventListener("click", () => playRound(paper.id));
scissors.addEventListener("click", () => playRound(scissors.id));

let gameScore = reset();

function reset(showPlayAgain) {
  if (showPlayAgain) {
    messageForPlayer.innerText = "Play Again!";
  }
  return {
    playerScores: 0,
    aiScores: 0,
    round: 1,
  }
}

function gameEnd({ playerScores, aiScores }) {
  return playerScores === 3 || aiScores === 3;
}

function showTheWinner({playerScores}) {
  if (playerScores === 3) {
    messageForPlayer.innerText =
      "Player is the Winner! Congratulations! Play Again?";
  } else {
    messageForPlayer.innerText =
      "Computer is the Winner! You Lose! Play Again?";
  }
}

function countScore(winner, gameScore) {
  if (winner === "player") {
    gameScore.playerScores++;
  } else if (winner === "ai") {
    gameScore.aiScores++;
  }
  gameScore.round++;
}

function playRound(playerSelection) {
  let computer = aiPlay();
  let { text, winner } = chooseRoundWinner(playerSelection, computer, gameScore.round);
  countScore(winner, gameScore);
  messageForPlayer.innerText = text;
  if (gameEnd(gameScore)) {
    showTheWinner(gameScore);
    gameScore = reset();
  }
}

