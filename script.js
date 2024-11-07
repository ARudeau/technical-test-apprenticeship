var boxes = document.querySelectorAll(".game-box");
var start_Btn = document.getElementById("start-btn");
var game_message = document.getElementById("game-message");
var restart_Btn = document.getElementById("restart-btn");
var index = true;
var count = 0;

//  5x5
var winningPossible = [
  // Lines
  [0, 1, 2], [1, 2, 3], [2, 3, 4],
  [5, 6, 7], [6, 7, 8], [7, 8, 9],
  [10, 11, 12], [11, 12, 13], [12, 13, 14],
  [15, 16, 17], [16, 17, 18], [17, 18, 19],
  [20, 21, 22], [21, 22, 23], [22, 23, 24],
  // Cols
  [0, 5, 10], [5, 10, 15], [10, 15, 20],
  [1, 6, 11], [6, 11, 16], [11, 16, 21],
  [2, 7, 12], [7, 12, 17], [12, 17, 22],
  [3, 8, 13], [8, 13, 18], [13, 18, 23],
  [4, 9, 14], [9, 14, 19], [14, 19, 24],
    //  Descending diagonals
  [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 9, 15], [4, 10, 16],
    // Rising diagonals
  [20, 16, 12], [21, 17, 13], [22, 18, 14], [23, 19, 15], [24, 20, 16]
];

let animation = () => {
    game_message.style.transition = "all .5s ease-in-out";
    game_message.style.transform = "scale(1)";
}

let showWinner = (isWinner) => {
    boxes.forEach(e => e.disabled = true);
    let message;
    if (isWinner === "x") {
        message = "🎉 Player X wins ! 🎉";
    } else {
        message = "👏 Player Y wins ! 👏";
    }
    game_message.innerHTML = `<p>${message}</p>`;
    animation();
}

let checkWinner = () => {
    winningPossible.forEach((posibility) => {
        var valueOne = boxes[posibility[0]].innerText;
        var valueTwo = boxes[posibility[1]].innerText;
        var valueThree = boxes[posibility[2]].innerText;
        if (valueOne != "" && valueTwo != "" && valueThree != "") {
            if (valueOne === "x" && valueThree === "x" && valueTwo === "x" || valueOne === "o" && valueThree === "o" && valueTwo === "o") {
                showWinner(valueOne)
            }
        }
    })
}

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
