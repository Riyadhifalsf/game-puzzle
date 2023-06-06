var images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  ""
];

function startGame() {
  images = shuffle(images);
  renderBoard();
}

function renderBoard() {
  var puzzleBoard = document.getElementById("puzzleBoard");
  puzzleBoard.innerHTML = "";

  for (var i = 0; i < images.length; i++) {
      var tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.index = i;
      tile.style.backgroundImage = "url(" + images[i] + ")";
      tile.addEventListener("click", clickTile);
      puzzleBoard.appendChild(tile);

      if (images[i] === "") {
          tile.classList.add("empty");
          tile.classList.remove("tile");
          tile.removeEventListener("click", clickTile);
      }
  }
}

function clickTile(e) {
  var tileIndex = parseInt(e.target.dataset.index);
  var emptyTileIndex = getEmptyTileIndex();

  if (isAdjacent(tileIndex, emptyTileIndex)) {
      swapTiles(tileIndex, emptyTileIndex);
      renderBoard();

      if (isSolved()) {
          alert("Selamat! Anda menyelesaikan puzzle.");
      }
  }
}

function getEmptyTileIndex() {
  var tiles = document.querySelectorAll(".tile");
  for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].classList.contains("empty")) {
          return i;
      }
  }
  return -1;
}

function isAdjacent(tileIndex, emptyTileIndex) {
  var rowSize = Math.sqrt(images.length);
  var row = Math.floor(tileIndex / rowSize);
  var col = tileIndex % rowSize;

  var emptyRow = Math.floor(emptyTileIndex / rowSize);
  var emptyCol = emptyTileIndex % rowSize;

  return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  );
}

function swapTiles(index1, index2) {
  var temp = images[index1];
  images[index1] = images[index2];
  images[index2] = temp;
}

function isSolved() {
  for (var i = 0; i < images.length - 1; i++) {
      if (images[i] !== "image" + (i + 1) + ".jpg") {
          return false;
      }
  }
  return true;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}
