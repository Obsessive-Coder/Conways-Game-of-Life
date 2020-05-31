$(document).ready(() => {
  let gameBoard = generateBoardCells(50);
  printGameBoard(gameBoard);

  setInterval(() => {
    gameBoard = gameOfLife(gameBoard);
    printGameBoard(gameBoard);
  }, 1000);
});

const generateBoardCells = size => {
  const boardCells = [];

  for (let i = 0; i < size; i++) {
    const rowCells = [];

    for (let j = 0; j < size; j++) {
      rowCells.push(Math.floor(Math.random() * Math.floor(2)));
    }

    boardCells.push(rowCells);
  }

  return boardCells;
};

const gameOfLife = boardCells => {
  const getLiveNeighborsCount = (rowIndex, columnIndex) => {
    const aboveRow = boardCells[rowIndex - 1];
    const belowRow = boardCells[rowIndex + 1];
    const row = boardCells[rowIndex];
    const leftIndex = columnIndex - 1;
    const rightIndex = columnIndex + 1;

    const upValue = aboveRow ? aboveRow[columnIndex] : 0;
    const downValue = belowRow ? belowRow[columnIndex] : 0;
    const leftValue = row[leftIndex] || 0;
    const rightValue = row[rightIndex] || 0;

    const upLeftValue = aboveRow && leftIndex >= 0 ? aboveRow[leftIndex] : 0;
    const upRightValue = aboveRow && rightIndex < boardCells[0].length ? aboveRow[rightIndex] : 0;
    const downLeftValue = belowRow && leftIndex >= 0 ? belowRow[leftIndex] : 0;
    const downRightValue = belowRow && rightIndex < boardCells[0].length ? belowRow[rightIndex] : 0;

    return upValue + downValue + leftValue + rightValue + upLeftValue + upRightValue + downLeftValue + downRightValue;

  };

  const newBoardCells = [];

  for (let i = 0; i < boardCells.length; i++) {
    const rowCells = boardCells[i];
    const newRowCells = [];

    for (let j = 0; j < rowCells.length; j++) {
      const liveNeighborsCount = getLiveNeighborsCount(i, j);
      const cellValue = rowCells[j];
      let newCellValue = cellValue;

      if (cellValue) {
        if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
          newCellValue = 0;
        } else {
          newCellValue = 1;
        }
      } else if (liveNeighborsCount === 3) {
        newCellValue = 1;
      }

      newRowCells.push(newCellValue);
    }

    newBoardCells.push(newRowCells);
  }

  return newBoardCells;
}

const printGameBoard = gameBoardCells => {
  const gameBoardContainer = document.getElementById('game-board');
  gameBoardContainer.innerHTML = '';

  for (let i = 0; i < gameBoardCells.length; i++) {
    const rowCells = gameBoardCells[i];
    const rowContainer = document.createElement('div')
    rowContainer.classList.add('d-flex');

    for (let j = 0; j < rowCells.length; j++) {
      const cellValue = rowCells[j];
      const cellContainer = document.createElement('div');

      cellContainer.classList.add('board-cell');
      if (cellValue) cellContainer.classList.add('live-cell');

      rowContainer.appendChild(cellContainer);
    }

    gameBoardContainer.appendChild(rowContainer);
  }
};