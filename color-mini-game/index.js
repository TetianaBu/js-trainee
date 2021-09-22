function colorChangerGame() {
  const specialCell = document.querySelector('#speciall-cell');
  const regularCell = document.querySelectorAll('td:not(#speciall-cell)');
  const headerCell = document.querySelectorAll('th');

  function clickOnSpecialCell() {
    for (let td of document.querySelectorAll('#table th, #table td')) {
      td.style.background = 'yellow';
    }
  }

  function clickOnRegularCell(event) {
    const cell = event.target;
    cell.style.background = 'yellow';
  }

  function clickOnHeaderCell(event) {
    const rowCells = [...event.target.parentElement.children];
    let colorAlreadyChanged = rowCells.some((td) => td.style.background !== '');
    if (colorAlreadyChanged) {
      event.target.style.background = 'blue';
    } else {
      for (const cell of rowCells) {
        cell.style.background = 'blue';
      }
    }
  }

  specialCell.addEventListener('click', clickOnSpecialCell);
  regularCell.forEach(function (cell) {
    cell.addEventListener('click', clickOnRegularCell);
  });
  headerCell.forEach(function (t) {
    t.addEventListener('click', clickOnHeaderCell);
  });
}
colorChangerGame();