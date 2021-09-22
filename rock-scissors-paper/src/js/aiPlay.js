export function aiPlay() {
  let arr = [1, 2, 3];
  let randomize = arr[Math.floor(Math.random() * arr.length)];
  let value;
  switch (randomize) {
    case 1:
      value = "rock";
      break;
    case 2:
      value = "paper";
      break;
    default:
      value = "scissors";
  }
  return value;
}