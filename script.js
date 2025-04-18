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
const settingsButton = document.querySelector(".settings-button");
const settingsMenu = document.querySelector(".settings");

let gameArr = [],
  gameArrSerialization = [],
  gameArrDeserialization = [],
  profileInfoSerialization = {},
  profileInfoDeserialization = {},
  gameCardArr = [],
  placeholderCounter = 0,
  inputMenuOpened = 0;

let userInfo = {};

let placeholderPara = document.createElement("p");
placeholderPara.textContent = "Looks like there's nothing here to see...";
placeholderPara.classList.add("placeholder");

function storeParameters() {
  gameArrSerialization = JSON.stringify(gameArr);
  localStorage.setItem("gameArr", gameArrSerialization);
}

gameArrDeserialization = JSON.parse(localStorage.getItem("gameArr"));

function storeProfileParameters() {
  profileInfoSerialization = JSON.stringify(userInfo);
  localStorage.setItem("userInfo", profileInfoSerialization);
}

profileInfoDeserialization = JSON.parse(localStorage.getItem("userInfo"));

window.addEventListener("load", (event) => {
  for (let i = 0; i < gameArrDeserialization.length; i++) {
    createCard(
      gameArrDeserialization[i].uid,
      gameArrDeserialization[i].cover,
      gameArrDeserialization[i].name,
      gameArrDeserialization[i].playtime,
      gameArrDeserialization[i].genre,
      gameArrDeserialization[i].platform,
      gameArrDeserialization[i].played,
      gameArrDeserialization[i].favorite,
      gameArrDeserialization[i].visible
    );
    gameArr.push(gameArrDeserialization[i]);
 }
  if (contentDiv.hasChildNodes() == false) {
    document.body.appendChild(placeholderPara);
    placeholderCounter = 1;
  }
  username.textContent = profileInfoDeserialization.username;
  profileImage.src = profileInfoDeserialization.picture;
  profileImagePreview.src = profileInfoDeserialization.picture;
  contentDiv.style.gridTemplateColumns = `repeat(${profileInfoDeserialization.gridsize}, 1fr)`;});

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

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
  searchFunction();
});

Game.prototype.createElement = function () {
  let uid = this.uid;
  createCard(
    this.uid,
    this.cover,
    this.name,
    this.playtime,
    this.genre,
    this.platform,
    this.played,
    this.favorite,
    this.visible
  );
};

//uid, cover, name, playtime, genre, platform, played, favorite, visible

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

function showCard(uid) {
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].uid == uid && gameArr[i].visible == false) {
      gameArr[i].visible = true;
    } else if (gameArr[i].uid == uid && gameArr[i].visible == true) {
      gameArr[i].visible = false;
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
  if (placeholderCounter == 1) {
    document.body.removeChild(placeholderPara);
    placeholderCounter = 0;
  }
  storeParameters();
});

addButton.addEventListener("click", () => {
  inputContainer.classList.add("opened");
  settingsMenu.classList.remove("opened");
  hiddenList.classList.remove("opened");
  contentDiv.classList.add("blur-effect");
  header.classList.add("blur-effect");
});

closeButton.addEventListener("click", () => {
  inputContainer.classList.remove("opened");
  contentDiv.classList.remove("blur-effect");
  header.classList.remove("blur-effect");
});

hiddenButton.addEventListener("click", () => {
  hiddenList.classList.add("opened");
  settingsMenu.classList.remove("opened");
  inputContainer.classList.remove("opened");
  contentDiv.classList.add("blur-effect");
  header.classList.add("blur-effect");
});

const closeHidden = document.querySelector(".close-hidden");
closeHidden.addEventListener("click", () => {
  hiddenList.classList.remove("opened");
  contentDiv.classList.remove("blur-effect");
  header.classList.remove("blur-effect");
});

settingsButton.addEventListener("click", () => {
  settingsMenu.classList.add("opened");
  hiddenList.classList.remove("opened");
  inputContainer.classList.remove("opened");
  contentDiv.classList.add("blur-effect");
  header.classList.add("blur-effect");
});

const closeSettings = document.querySelector(".close-settings");
closeSettings.addEventListener("click", () => {
  settingsMenu.classList.remove("opened");
  contentDiv.classList.remove("blur-effect");
  header.classList.remove("blur-effect");
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    inputContainer.classList.remove("opened");
    settingsMenu.classList.remove("opened");
    hiddenList.classList.remove("opened");
    contentDiv.classList.remove("blur-effect");
    header.classList.remove("blur-effect");
  }
});

const saveSettingsButton = document.querySelector(".save-settings");
const usernameValue = document.querySelector(".username-value");
const profilePictureUrl = document.querySelector(".profile-picture-url");
const gridSize = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector(".grid-size-output");
const username = document.querySelector(".username");
const profileImagePreview = document.querySelector(".profile-image-preview");
const profileImage = document.querySelector(".profile-image");

gridSize.addEventListener("input", (event) => {
  gridSizeOutput.textContent = event.target.value;
});

saveSettingsButton.addEventListener("click", () => {
  userInfo.picture = profilePictureUrl.value;
  userInfo.username = usernameValue.value;
  userInfo.gridsize = gridSize.value;
  username.textContent = usernameValue.value;
  profileImage.src = profilePictureUrl.value;
  profileImagePreview.src = profilePictureUrl.value;
  contentDiv.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`;
  storeProfileParameters();
});

function searchFunction() {
  let searchbarValue = document.querySelector(".searchbar").value;
  contentDiv.textContent = "";
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].name.includes(searchbarValue) == true) {
      if (gameArr[i].visible == false) {
        return;
      }
      if (gameArr[i].visible == true) {
        createCard(
          gameArr[i].uid,
          gameArr[i].cover,
          gameArr[i].name,
          gameArr[i].playtime,
          gameArr[i].genre,
          gameArr[i].platform,
          gameArr[i].played,
          gameArr[i].favorite,
          gameArr[i].visible
        );
      }
    }
  }
}

function createCard(
  uid,
  cover,
  name,
  playtime,
  genre,
  platform,
  played,
  favorite,
  visible
) {
  let gameCard = document.createElement("div");
  gameCard.classList.add("game-card");
  contentDiv.appendChild(gameCard);
  let gameCardCover = document.createElement("img");
  gameCardCover.classList.add("card-cover");
  gameCardCover.src = `${cover}`;
  gameCard.appendChild(gameCardCover);
  let gameTitle = document.createElement("h2");
  gameTitle.classList.add("game-title");
  gameTitle.textContent = `${name}`;
  gameCard.appendChild(gameTitle);
  let cardTextWrapper0 = document.createElement("div");
  cardTextWrapper0.classList.add("card-text-wrapper");
  let playtimeCard = document.createElement("p");
  playtimeCard.classList.add("playtime-card");
  playtimeCard.textContent = `Playtime: ${playtime}h `;
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
  genreCard.textContent = `Genre: ${genre} `;
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
  platformCard.textContent = `Platform: ${platform} `;
  cardTextWrapper2.appendChild(platformCard);
  let platformCardIcon = document.createElement("img");
  platformCardIcon.classList.add("card-icons");
  if (platform == "PC") {
    platformCardIcon.src = "./Assets/steam-fill.svg";
  } else if (platform == "Playstation") {
    platformCardIcon.src = "./Assets/playstation-fill.svg";
  } else if (platform == "Xbox") {
    platformCardIcon.src = "./Assets/xbox-fill.svg";
  } else if (platform == "Nintendo Switch") {
    platformCardIcon.src = "./Assets/switch-fill.svg";
  }
  cardTextWrapper2.appendChild(platformCardIcon);
  gameCard.appendChild(cardTextWrapper2);
  let cardTextWrapper3 = document.createElement("div");
  cardTextWrapper3.classList.add("card-text-wrapper");
  let playedStatus = document.createElement("p");
  playedStatus.classList.add("played-status");
  playedStatus.textContent = `Status: ${played} `;
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
    favorite == false ? (favorite = true) : (favorite = false);
    if (favorite == true) {
      favoriteButton.src = "./Assets/star-fill.svg";
    } else if (favorite == false) {
      favoriteButton.src = "./Assets/star-line.svg";
    }
  });
  let hideButton = document.createElement("img");
  hideButton.classList.add("card-svg");
  hideButton.src = "./Assets/eye-line.svg";
  buttonsContainer.appendChild(hideButton);
  if(visible == false) {
    hideCard(uid);
    gameCard.classList.add("no-visibility");
    let hiddenGameCard = document.createElement("div");
    hiddenGameCard.classList.add("hidden-game-card");
    hiddenList.appendChild(hiddenGameCard);
    let hiddenTitle = document.createElement("h3");
    hiddenTitle.classList.add("hidden-name");
    hiddenTitle.textContent = `${name}`;
    hiddenGameCard.appendChild(hiddenTitle);
    let hiddenPlaytime = document.createElement("p");
    hiddenPlaytime.classList.add("hidden-playtime");
    hiddenPlaytime.textContent = `${playtime}h`;
    hiddenGameCard.appendChild(hiddenPlaytime);
    let hiddenGenre = document.createElement("p");
    hiddenGenre.classList.add("hidden-genre");
    hiddenGenre.textContent = `${genre}`;
    hiddenGameCard.appendChild(hiddenGenre);
    let hiddenPlatform = document.createElement("p");
    hiddenPlatform.classList.add("hidden-platform");
    hiddenPlatform.textContent = `${platform}`;
    hiddenGameCard.appendChild(hiddenPlatform);
    let hiddenStatus = document.createElement("p");
    hiddenStatus.classList.add("hidden-status");
    hiddenStatus.textContent = `${played}`;
    hiddenGameCard.appendChild(hiddenStatus);
    let restoreButton = document.createElement("button");
    restoreButton.classList.add("restore");
    restoreButton.textContent = "Restore";
    hiddenGameCard.appendChild(restoreButton);
    storeParameters();
    restoreButton.addEventListener("click", () => {
      showCard(uid);
      searchFunction();
      hiddenList.removeChild(hiddenGameCard);
      gameCard.classList.remove("no-visibility");
      storeParameters();
  })
  }
  hideButton.addEventListener("click", () => {
    hideCard(uid);
    gameCard.classList.add("no-visibility");
    let hiddenGameCard = document.createElement("div");
    hiddenGameCard.classList.add("hidden-game-card");
    hiddenList.appendChild(hiddenGameCard);
    let hiddenTitle = document.createElement("h3");
    hiddenTitle.classList.add("hidden-name");
    hiddenTitle.textContent = `${name}`;
    hiddenGameCard.appendChild(hiddenTitle);
    let hiddenPlaytime = document.createElement("p");
    hiddenPlaytime.classList.add("hidden-playtime");
    hiddenPlaytime.textContent = `${playtime}h`;
    hiddenGameCard.appendChild(hiddenPlaytime);
    let hiddenGenre = document.createElement("p");
    hiddenGenre.classList.add("hidden-genre");
    hiddenGenre.textContent = `${genre}`;
    hiddenGameCard.appendChild(hiddenGenre);
    let hiddenPlatform = document.createElement("p");
    hiddenPlatform.classList.add("hidden-platform");
    hiddenPlatform.textContent = `${platform}`;
    hiddenGameCard.appendChild(hiddenPlatform);
    let hiddenStatus = document.createElement("p");
    hiddenStatus.classList.add("hidden-status");
    hiddenStatus.textContent = `${played}`;
    hiddenGameCard.appendChild(hiddenStatus);
    let restoreButton = document.createElement("button");
    restoreButton.classList.add("restore");
    restoreButton.textContent = "Restore";
    hiddenGameCard.appendChild(restoreButton);
    storeParameters();
    restoreButton.addEventListener("click", () => {
      showCard(uid);
      searchFunction();
      hiddenList.removeChild(hiddenGameCard);
      gameCard.classList.remove("no-visibility");
      storeParameters();
    });
  });
  let deleteButton = document.createElement("img");
  deleteButton.classList.add("card-svg");
  deleteButton.src = "./Assets/delete-bin-line.svg";
  buttonsContainer.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    contentDiv.removeChild(gameCard);
    removeObject(uid);
    if (contentDiv.hasChildNodes() == false && placeholderCounter == 0) {
      document.body.appendChild(placeholderPara);
      placeholderCounter = 1;
    } else if (placeholderCounter == 1) {
      document.body.removeChild(placeholderPara);
      placeholderCounter = 0;
    }
    storeParameters();
  });
}
