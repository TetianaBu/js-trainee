export function chooseRoundWinner(playerSelection, aiSelection, round) {
  if (playerSelection === aiSelection) {
    return { text: `Round ${round}, "Draw!"`, winner: "draw" };
  } else if (playerSelection == "rock" && aiSelection == "scissors") {
    return {
      text: `Round ${round}, Rock vs. Scissors, You’ve WON!`,
      winner: "player",
    };
  } else if (playerSelection == "paper" && aiSelection == "rock") {
    return {
      text: `Round ${round}, Paper vs. Rock, You’ve WON!`,
      winner: "player",
    };
  } else if (playerSelection == "scissors" && aiSelection == "papper") {
    return {
      text: `Round ${round}, Scissors vs. Paper, You’ve WON!`,
      winner: "player",
    };
  } else if (playerSelection == "paper" && aiSelection == "scissors") {
    return {
      text: `Round ${round}, Paper vs. Scissors, You’ve LOST!`,
      winner: "ai",
    };
  } else if (playerSelection == "scissors" && aiSelection == "rock") {
    return {
      text: `Round ${round}, Scissors vs. Rock, You’ve LOST!`,
      winner: "ai",
    };
  } else if (playerSelection == "rock" && aiSelection == "paper") {
    return {
      text: `Round ${round}, Rock vs. Paper, You’ve LOST!`,
      winner: "ai",
    };
  }
}