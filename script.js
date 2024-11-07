let boxes = document.querySelectorAll(".game-box");
let start_Btn = document.getElementById("start-btn");
let game_message = document.getElementById("game-message");
let restart_Btn = document.getElementById("restart-btn");
let index = true;
let count = 0;


let animation = () => {
    game_message.style.transition = "all .5s ease-in-out";
    game_message.style.transform = "scale(1)";
}

let showWinner = (isWinner) => {
  boxes.forEach(e => e.disabled = true)
  game_message.innerHTML = `<p><span>👑</span>Winner is '${isWinner}'</p>`;
    animation();
}

const checkWinner = () => {
  const playerSymbols = ['x', 'o'];
  const gridSize = 5;
  const winLength = 3;

  // Create a 2D array to store the grid values
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = boxes[i * gridSize + j].innerText;
    }
  }

  const checkDirection = (symbol, startX, startY, deltaX, deltaY) => {
    for (let i = 0; i < winLength; i++) {
      const x = startX + i * deltaX;
      const y = startY + i * deltaY;
      if (x >= gridSize || y >= gridSize || x < 0 || y < 0 || grid[x][y] !== symbol) {
        return false;
      }
    }
    return true;
  };

  for (const symbol of playerSymbols) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === symbol) {
          if (
            checkDirection(symbol, i, j, 1, 0) || // Check row
            checkDirection(symbol, i, j, 0, 1) || // Check column
            checkDirection(symbol, i, j, 1, 1) || // Check main diagonal
            checkDirection(symbol, i, j, 1, -1)   // Check secondary diagonal
          ) {
            showWinner(symbol);
            return;
          }
        }
      }
    }
  }
};


let draw = (count) => {
    if (count === 25) {
        game_message.innerText = "Game was Draw🫢";
        animation();
    }
    else {
        checkWinner();
    }
}

boxes.forEach((box) => {
    box.disabled = true;
    box.addEventListener("click", () => {
        if (index) {
            box.innerHTML = `x`;
            index = false;
            box.style.backgroundColor = "rgb(164, 164, 164)";
        }
        else {
            box.innerHTML = `o`;
            index = true;
            box.style.backgroundColor = "rgb(164, 164, 164)";
        }
        box.disabled = true;
        count++;
        draw(count);
    });
});

let clearFunction = () => {
    boxes.forEach((e) => {
        e.disabled = false;
        e.innerHTML = ``;
    });
}

start_Btn.addEventListener("click", () => {
    start_Btn.style.display = "none";
    restart_Btn.style.display = "grid";
    clearFunction();
});

restart_Btn.addEventListener("click", () => {
    boxes.forEach(color_e => {
        color_e.style.backgroundColor = "rgb(197, 200, 200)";
    })
    count = 0;
    game_message.innerText = '';
    game_message.style.transition = "";
    game_message.style.transform = "scale(0)";
    clearFunction();
});
