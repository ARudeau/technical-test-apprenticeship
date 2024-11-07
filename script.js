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

  const checkLine = (line) => line.every(value => value === line[0] && value !== '');

  playerSymbols.forEach(symbol => {
    // Vérifier les lignes
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j <= gridSize - winLength; j++) {
        const row = [];
        for (let k = 0; k < winLength; k++) {
          row.push(boxes[i * gridSize + j + k].innerText);
        }
        if (checkLine(row)) {
          showWinner(symbol);
          return;
        }
      }
    }

    // Vérifier les colonnes
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j <= gridSize - winLength; j++) {
        const col = [];
        for (let k = 0; k < winLength; k++) {
          col.push(boxes[(j + k) * gridSize + i].innerText);
        }
        if (checkLine(col)) {
          showWinner(symbol);
          return;
        }
      }
    }

    // Vérifier les diagonales principales
    for (let i = 0; i <= gridSize - winLength; i++) {
      for (let j = 0; j <= gridSize - winLength; j++) {
        const mainDiagonal = [];
        for (let k = 0; k < winLength; k++) {
          mainDiagonal.push(boxes[(i + k) * gridSize + (j + k)].innerText);
        }
        if (checkLine(mainDiagonal)) {
          showWinner(symbol);
          return;
        }
      }
    }

    // Vérifier les diagonales secondaires
    for (let i = 0; i <= gridSize - winLength; i++) {
      for (let j = winLength - 1; j < gridSize; j++) {
        const secondaryDiagonal = [];
        for (let k = 0; k < winLength; k++) {
          secondaryDiagonal.push(boxes[(i + k) * gridSize + (j - k)].innerText);
        }
        if (checkLine(secondaryDiagonal)) {
          showWinner(symbol);
          return;
        }
      }
    }
  });

  draw(count); // Si aucun gagnant, vérifier s'il y a un match nul
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
