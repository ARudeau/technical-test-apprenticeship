var boxes = document.querySelectorAll(".game-box");

var start_Btn = document.getElementById("start-btn");
var game_message = document.getElementById("game-message");
var restart_Btn = document.getElementById("restart-btn");
var index = true;
var count = 0;

var winningPosible = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let animation = () => {
    game_message.style.transition = "all .5s ease-in-out";
    game_message.style.transform = "scale(1)";
}

let showWinner = (isWinner) => {
    boxes.forEach(e => e.disabled = true)
    game_message.innerHTML = `<p><span>👑</span>Winner is '${isWinner}'</p>`;
    animation();
}

let checkWinner = () => {
    winningPosible.forEach((posibility) => {
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
    if (count === 9) {
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
