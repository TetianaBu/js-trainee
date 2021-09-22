const MINIMAL_AMOUNT = 1000;
const MINIMAL_TERM = 1;
const MAX_PERCENTAGE = 100;
const DIGITS = 2;
const HUNDRED = 100;

function calcProfit(startAmount, term, percentage) {
  let amount = startAmount;
  for (let year = 0; year < term; year++) {
    amount = amount * (1 + percentage / HUNDRED);
  }
  return [amount, amount - startAmount];
}

function calcProfitMain() {
  const startAmount = Number.parseFloat(
    window.prompt('Type your initial amount')
  );
  const term = Number.parseInt(window.prompt('Type number of years'), 10);
  const percentage = Number.parseFloat(
    window.prompt('Type percentage of a year')
  );
  const correctInput =
    !Number.isNaN(startAmount) && startAmount >= MINIMAL_AMOUNT &&
    Number.isInteger(term) && term >= MINIMAL_TERM &&
    !Number.isNaN(percentage) && percentage <= MAX_PERCENTAGE;
  if (!correctInput) {
    return window.alert('Invalid input data');
  }

  const [amount, profit] = calcProfit(startAmount, term, percentage);

  window.alert(`
Initial amount: ${startAmount} 
Number of years: ${term}
Percentage of year: ${percentage}

Total profit: ${profit.toFixed(DIGITS)}
Total amount: ${amount.toFixed(DIGITS)}
`);
}