const board = document.getElementById("sudoku-board");

// Create 81 input cells with classes for subgrid borders
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("max", "9");
  input.classList.add("user-input");
  board.appendChild(input);
}

function getBoard() {
  const inputs = board.querySelectorAll("input");
  const grid = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const idx = i * 9 + j;
      const value = inputs[idx].value;
      row.push(value === "" ? 0 : parseInt(value));
      inputs[idx].classList.remove("solved"); // Reset color if re-solving
    }
    grid.push(row);
  }
  return grid;
}

function setBoard(grid, original) {
  const inputs = board.querySelectorAll("input");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const idx = i * 9 + j;
      inputs[idx].value = grid[i][j];
      if (original[i][j] === 0) {
        inputs[idx].classList.add("solved");
      }
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
    const boxCol = 3 * Math.floor(col / 3) + (x % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const original = getBoard();
  const copy = JSON.parse(JSON.stringify(original));
  if (solve(copy)) {
    setBoard(copy, original);
    alert("Sudoku Solved!");
  } else {
    alert("Invalid Sudoku!");
  }
}

function clearBoard() {
  const inputs = board.querySelectorAll("input");
  inputs.forEach(input => {
    input.value = "";
    input.classList.remove("solved");
  });
}
