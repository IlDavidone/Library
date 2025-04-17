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
const hiddenButton = document.querySelector(".hidden");
const hiddenList = document.querySelector(".hidden-list");
const header = document.querySelector(".header");

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
  this.visible = true;
  this.favorite = false;
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
  platformCard.textContent = `Platform: ${this.platform} `;
  cardTextWrapper2.appendChild(platformCard);
  let platformCardIcon = document.createElement("img");
  platformCardIcon.classList.add("card-icons");
  if (this.platform == "PC") {
    platformCardIcon.src = "./Assets/steam-fill.svg";
  } else if (this.platform == "Playstation") {
    platformCardIcon.src = "./Assets/playstation-fill.svg";
  } else if (this.platform == "Xbox") {
    platformCardIcon.src = "./Assets/xbox-fill.svg";
  } else if (this.platform == "Nintendo Switch") {
    platformCardIcon.src = "./Assets/switch-fill.svg";
  }
  cardTextWrapper2.appendChild(platformCardIcon);
  gameCard.appendChild(cardTextWrapper2);
  let cardTextWrapper3 = document.createElement("div");
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
  favoriteButton.addEventListener("click", () => {
    this.favorite == false ? this.favorite = true : this.favorite = false;
    if (this.favorite == true) {
      favoriteButton.src = "./Assets/star-fill.svg";
    }
    else if (this.favorite == false) {
      favoriteButton.src = "./Assets/star-line.svg";
    }
  })
  let hideButton = document.createElement("img");
  hideButton.classList.add("card-svg");
  hideButton.src = "./Assets/eye-line.svg";
  buttonsContainer.appendChild(hideButton);
  hideButton.addEventListener("click", () => {
    hideCard(uid);
    gameCard.classList.toggle("no-visibility");
    if (this.visible == false) {
      let hiddenGameCard = document.createElement("div");
      hiddenGameCard.classList.add("hidden-game-card");
      hiddenList.appendChild(hiddenGameCard);
      let hiddenTitle = document.createElement("h3");
      hiddenTitle.classList.add("hidden-name");
      hiddenTitle.textContent = `${this.name}`;
      hiddenGameCard.appendChild(hiddenTitle);
      let hiddenPlaytime = document.createElement("p");
      hiddenPlaytime.classList.add("hidden-playtime");
      hiddenPlaytime.textContent = `${this.playtime}h`;
      hiddenGameCard.appendChild(hiddenPlaytime);
      let hiddenGenre = document.createElement("p");
      hiddenGenre.classList.add("hidden-genre");
      hiddenGenre.textContent = `${this.genre}`;
      hiddenGameCard.appendChild(hiddenGenre);
      let hiddenPlatform = document.createElement("p");
      hiddenPlatform.classList.add("hidden-platform");
      hiddenPlatform.textContent = `${this.platform}`;
      hiddenGameCard.appendChild(hiddenPlatform);
      let hiddenStatus = document.createElement("p");
      hiddenStatus.classList.add("hidden-status");
      hiddenStatus.textContent = `${this.played}`;
      hiddenGameCard.appendChild(hiddenStatus);
      let restoreButton = document.createElement("button");
      restoreButton.classList.add("restore");
      restoreButton.textContent = "Restore";
      hiddenGameCard.appendChild(restoreButton);
      restoreButton.addEventListener("click", () => {
        this.visible = true;
        hiddenList.removeChild(hiddenGameCard);
        gameCard.classList.toggle("no-visibility");
      });
    }
  });
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
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].uid == uid) {
      gameArr.splice(i, 1);
    }
  }
}

function hideCard(uid) {
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].uid == uid && gameArr[i].visible == true) {
      gameArr[i].visible = false;
    } else if (gameArr[i].uid == uid && gameArr[i].visible == false) {
      gameArr[i].visible = true;
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
  contentDiv.classList.add("blur-effect");
  header.classList.add("blur-effect");
});

closeButton.addEventListener("click", () => {
  inputContainer.classList.remove("opened");
  contentDiv.classList.remove("blur-effect");
  header.classList.remove("blur-effect");
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    inputContainer.classList.remove("opened");
    contentDiv.classList.remove("blur-effect");
    header.classList.remove("blur-effect");
  }
});

hiddenButton.addEventListener("click", () => {
  hiddenList.classList.add("opened");
});

const closeHidden = document.querySelector(".close-hidden");
closeHidden.addEventListener("click", () => {
  hiddenList.classList.remove("opened");
});
