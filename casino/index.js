const INITIAL_RANDOM_NUMBER_MAX = 8;
const RANDOM_NUMBER_STEP = 4;

const INITIAL_MAX_PRIZE = 100;
const ATTEMPTS_NUMBER = 3;
const MAX_PRIZE_STEP = 2;
const PRIZE_ATTEMPT_STEP = 2;

function userGues(randomNumberMax, attemptsLeft, currentPrize, userTotalPrize) {
  return Number.parseInt(
    prompt(`
    Choose a roulette pocket number from 0 to ${randomNumberMax}
    Attempts left: ${attemptsLeft}
    Total prize: ${userTotalPrize}$
    Possible prize on current attempt: ${currentPrize}$
    `)
  );
}

function round(randomNumberMax, maxPrize, userTotalPrize) {
  let attempt = 0;
  const currentRandomNumber = Math.round(Math.random() * randomNumberMax);
  let currentPrize = maxPrize;

  while (attempt < ATTEMPTS_NUMBER) {
    const guess = userGues(randomNumberMax, ATTEMPTS_NUMBER - attempt, currentPrize, userTotalPrize);
    if (guess === currentRandomNumber) {
      return currentPrize;
    }
    attempt++;
    currentPrize = currentPrize / PRIZE_ATTEMPT_STEP;
  }
  return 0;
}

function playGame() {
  if (!window.confirm('Do you want to play a game?')) {
    window.alert('You did not become a billionaire, but can.');
    return;
  }

  let randomNumberMax = INITIAL_RANDOM_NUMBER_MAX;
  let userTotalPrize = 0;
  let maxPrize = INITIAL_MAX_PRIZE;
  let userRoundPrize = 0;
  do {
    userRoundPrize = round(randomNumberMax, maxPrize, userTotalPrize);
    if (userRoundPrize > 0) {
      userTotalPrize += userRoundPrize;
      randomNumberMax += RANDOM_NUMBER_STEP;
      maxPrize *= MAX_PRIZE_STEP;
    } else {
      randomNumberMax = INITIAL_RANDOM_NUMBER_MAX;
      maxPrize = INITIAL_MAX_PRIZE;
    }
  } while (
    window.confirm(
      userRoundPrize > 0
        ? `Congratulation, you won! Your prize is: ${userTotalPrize}$. Do you want to continue?`
        : `Thank you for your participation. Your prize is: ${userTotalPrize}$. Do you want to try again?`
    )
  );
}
