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

let gameArr = [],
  gameCardArr = [],
  inputMenuOpened = 0;

function Game(name, playtime, genre, played, platform, cover) {
  this.name = name;
  this.playtime = playtime;
  this.genre = genre;
  this.played = played;
  this.platform = platform;
  this.cover = cover;
  this.uid = crypto.randomUUID();
}

Game.prototype.createElement = function () {
  let uid = this.uid;
  let gameCard = document.createElement("div");
  gameCard.classList.add("game-card");
  contentDiv.appendChild(gameCard);
  let gameCardCover = document.createElement("img");
  gameCardCover.classList.add("card-cover");
  gameCardCover.src = `${this.cover}`;
  gameCard.appendChild(gameCardCover);
  let gameTitle = document.createElement("h2");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = `${this.name}`;
  gameCard.appendChild(gameTitle);
  let cardTextWrapper0 = document.createElement("div");
  cardTextWrapper0.classList.add("card-text-wrapper");
  let playtimeCard = document.createElement("p");
  playtimeCard.classList.add("playtime-card");
  playtimeCard.textContent = `Playtime: ${this.playtime}h `;
  cardTextWrapper0.appendChild(playtimeCard);
  let playtimeCardIcon = document.createElement("img");
  playtimeCardIcon.classList.add("card-icons");
  playtimeCardIcon.src = "./Assets/time-line.svg";
  cardTextWrapper0.appendChild(playtimeCardIcon);
  gameCard.appendChild(cardTextWrapper0);
  let cardTextWrapper1 = document.createElement("div");
  cardTextWrapper1.classList.add("card-text-wrapper");
  let genreCard = document.createElement("p");
  genreCard.classList.add("genre-card");
  genreCard.textContent = `Genre: ${this.genre} `;
  cardTextWrapper1.appendChild(genreCard);
  let genreCardIcon = document.createElement("img");
  genreCardIcon.classList.add("card-icons");
  genreCardIcon.src = "./Assets/puzzle-line.svg";
  cardTextWrapper1.appendChild(genreCardIcon);
  gameCard.appendChild(cardTextWrapper1);
  let cardTextWrapper2 = document.createElement("div");
  cardTextWrapper2.classList.add("card-text-wrapper");
  let platformCard = document.createElement("p");
  platformCard.classList.add("platform-card");
  platformCard.textContent = `Platform: ${this.platform} `
  cardTextWrapper2.appendChild(platformCard);
  let platformCardIcon = document.createElement("img");
  platformCardIcon.classList.add("card-icons");
  if(this.platform == "PC"){
    platformCardIcon.src = "./Assets/steam-fill.svg";
  }
  else if(this.platform == "Playstation"){
    platformCardIcon.src = "./Assets/playstation-fill.svg";
  }
  else if(this.platform == "Xbox"){
    platformCardIcon.src = "./Assets/xbox-fill.svg";
  }
  else if(this.platform == "Nintendo Switch") {
    platformCardIcon.src = "./Assets/switch-fill.svg";
  }
  cardTextWrapper2.appendChild(platformCardIcon);
  gameCard.appendChild(cardTextWrapper2);
  let cardTextWrapper3  = document.createElement("div");
  cardTextWrapper3.classList.add("card-text-wrapper");
  let playedStatus = document.createElement("p");
  playedStatus.classList.add("played-status");
  playedStatus.textContent = `Status: ${this.played} `;
  cardTextWrapper3.appendChild(playedStatus);
  let playedStatusIcon = document.createElement("img");
  playedStatusIcon.classList.add("card-icons");
  playedStatusIcon.src = "./Assets/time-line.svg";
  cardTextWrapper3.appendChild(playedStatusIcon);
  gameCard.appendChild(cardTextWrapper3);
  let buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  gameCard.appendChild(buttonsContainer);
  let favoriteButton = document.createElement("img");
  favoriteButton.classList.add("card-svg");
  favoriteButton.src = "./Assets/star-line.svg";
  buttonsContainer.appendChild(favoriteButton);
  let hideButton = document.createElement("img");
  hideButton.classList.add("card-svg");
  hideButton.src = "./Assets/eye-line.svg";
  buttonsContainer.appendChild(hideButton);
  let deleteButton = document.createElement("img");
  deleteButton.classList.add("card-svg");
  deleteButton.src = "./Assets/delete-bin-line.svg";
  buttonsContainer.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    contentDiv.removeChild(gameCard);
    removeObject(uid);
  });
};

function removeObject(uid) {
    for(let i = 0; i < gameArr.length; i++) {
        if (gameArr[i].uid == uid) {
            delete gameArr[i];
        }
    }
}

const Button = document.querySelector(".add-button");
Button.addEventListener("click", () => {
  let game = new Game(
    nameInput.value,
    playtimeInput.value,
    genreInput.value,
    checkStatus.options[checkStatus.selectedIndex].text,
    checkPlatform.options[checkPlatform.selectedIndex].text,
    coverInput.value
  );
  gameArr.push(game);
  game.createElement();
});

addButton.addEventListener("click", () => {
  inputContainer.classList.add("opened");
});

closeButton.addEventListener("click", () => {
  inputContainer.classList.remove("opened");
});

