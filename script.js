const nameInput = document.querySelector(".game");
const coverInput = document.querySelector(".src");
const playtimeInput = document.querySelector(".playtime");
const genreInput = document.querySelector(".genre");
const platform = document.querySelector(".platform");
const checkStatus = document.querySelector(".status");
const checkPlatform = document.querySelector(".platform");
const addButton = document.querySelector(".add");
const inputContainer = document.querySelector(".input-container");
const contentDiv = document.querySelector(".content");
const closeButton = document.querySelector(".close");
const testDiv = document.querySelector(".test");

let gameArr = [], gameUid = [], gameCardArr = [], inputMenuOpened = 0;

function Game(name, playtime, genre, played, platform, cover) {
    this.name = name;
    this.playtime = playtime;
    this.genre = genre;
    this.played = played;
    this.platform = platform;
    this.cover = cover;
}

Game.prototype.getUid = function() {
    this.uid = crypto.randomUUID();
    gameUid.push(this.uid);
}

Game.prototype.createElement = function() {
    let gameCard = document.createElement("div");
    let gameCardCover = document.createElement("img");
    if (gameCardCover =! "") {
        gameCardCover.src =`${this.cover}`;
    }

}

//var text = e.options[e.selectedIndex].text;

const Button = document.querySelector(".add-button");
Button.addEventListener("click", () => {
    let game = new Game(nameInput.value, 
        playtimeInput.value, 
        genreInput.value, 
        checkStatus.options[checkStatus.selectedIndex].text, 
        checkPlatform.options[checkPlatform.selectedIndex].text, 
        coverInput.value);
    game.getUid();
    game.createElement();
    gameArr.push(game);
});

addButton.addEventListener("click", () => {
    inputContainer.classList.add("opened");
});

closeButton.addEventListener("click", () => {
    inputContainer.classList.remove("opened");
});