const nameInput = document.querySelector(".game");
const playtimeInput = document.querySelector(".playtime");
const genreInput = document.querySelector(".genre");
const platform = document.querySelector(".platform");
const checkStatus = document.querySelector(".played");
const addButton = document.querySelector(".add");
const inputContainer = document.querySelector(".input-container");
const closeButton = document.querySelector(".close");
const testDiv = document.querySelector(".test");

let gameArr = [], gameUid = [], bookElement, inputMenuOpened = 0;

function Game(name, playtime, genre, played) {
    this.name = name;
    this.playtime = playtime;
    this.genre = genre;
    this.played = played;
}

Game.prototype.getUid = function() {
    this.uid = crypto.randomUUID();
    gameUid.push(this.uid);
}

Game.prototype.createElement = function() {
    bookElement = document.createElement("p");
    bookElement.textContent = `${this.name}, ${this.playtime}, ${this.genre}, ${platform.options[platform.selectedIndex].text}`;
    testDiv.appendChild(bookElement);
}

const Button = document.querySelector(".add-button");
Button.addEventListener("click", () => {
    let game = new Game(nameInput.value, playtimeInput.value, genreInput.value);
    game.getUid();
    game.createElement();
    gameArr.push(game);
});

addButton.addEventListener("click", () => {
    inputContainer.classList.add("opened");
})

closeButton.addEventListener("click", () => {
    inputContainer.classList.remove("opened");
})