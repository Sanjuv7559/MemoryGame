const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

const startButton = document.getElementById("startButton");
const statusText = document.getElementById("status");
const buttons = document.querySelectorAll(".color-button");

startButton.addEventListener("click", startGame);
buttons.forEach(button => button.addEventListener("click", handlePlayerClick));

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextRound();
}

function nextRound() {
    isPlayerTurn = false;
    playerSequence = [];
    level++;
    statusText.textContent = `Level ${level}`;
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            isPlayerTurn = true;
        }
    }, 1000);
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("flash", "active");
    setTimeout(() => button.classList.remove("flash", "active"), 500);
}

function handlePlayerClick(event) {
    if (!isPlayerTurn) return;
    const clickedColor = event.target.id;
    playerSequence.push(clickedColor);
    event.target.classList.add("active");
    setTimeout(() => event.target.classList.remove("active"), 300);
    checkPlayerInput();
}

function checkPlayerInput() {
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
        statusText.textContent = `Oops! You Reached Level ${level}. Press Start to try again.`;
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}