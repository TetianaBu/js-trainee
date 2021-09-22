function basketballGame() {
  let field = document.querySelector('.images-wrapper');
  let ball = document.querySelector('#ball');
  field.addEventListener('click', showCoords);
  let scoreTeamA = document.querySelector('.score-team-A');
  let scoreTeamB = document.querySelector('.score-team-B');
  let alertMessage = document.querySelector('.alert-message');
  let scoreHandler = document.querySelector('.score-handler');

  const HEIGHT = 330;
  const Y_CENTER = HEIGHT / 2;
  const WIDTH = 600;
  const HOOP_X_OFFSET = 40;
  const HOOP_ZONE_SIZE = 15 / 2;
  const BALL_SIZE = 20;

  const score = { A: 0, B: 0 };
  let timeout;
  scoreHandler.addEventListener('score', (event) => {
    score[event.team] += 1;
    scoreTeamA.innerHTML = score.A;
    scoreTeamB.innerHTML = score.B;
    alertMessage.innerHTML = `Team ${event.team} score!`;
    alertMessage.style.color = event.team === 'A' ? 'blue' : 'red';
    window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      alertMessage.innerHTML = '';
    }, 3000);
  });

  function showCoords(event) {
    const fieldRect = field.getBoundingClientRect();
    const ballY = event.clientY - fieldRect.y;
    const ballX = event.clientX - fieldRect.x;
    ball.style.top = `${ballY - BALL_SIZE}px`;
    ball.style.left = `${ballX - BALL_SIZE}px`;
    if (
      ballY >= Y_CENTER - HOOP_ZONE_SIZE &&
      ballY <= Y_CENTER + HOOP_ZONE_SIZE &&
      ballX >= HOOP_X_OFFSET - HOOP_ZONE_SIZE &&
      ballX <= HOOP_X_OFFSET + HOOP_ZONE_SIZE
    ) {
      const event = new Event('score');
      event.team = 'A';
      scoreHandler.dispatchEvent(event);
    }
    if (
      ballY >= Y_CENTER - HOOP_ZONE_SIZE &&
      ballY <= Y_CENTER + HOOP_ZONE_SIZE &&
      ballX >= WIDTH - HOOP_X_OFFSET - HOOP_ZONE_SIZE &&
      ballX <= WIDTH - HOOP_X_OFFSET + HOOP_ZONE_SIZE
    ) {
      const event = new Event('score');
      event.team = 'B';
      scoreHandler.dispatchEvent(event);
    }
  }
}

basketballGame();