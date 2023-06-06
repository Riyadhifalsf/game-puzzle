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
    puzzleBoard.appendChild(tile);

    if (images[i] === "") {
      tile.classList.add("empty");
      tile.draggable = false;
    } else {
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);
    }
  }
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
  e.target.classList.add("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.target.classList.add("over");
}

function dragLeave(e) {
  e.target.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  var dragIndex = e.dataTransfer.getData("text/plain");
  var dropIndex = e.target.dataset.index;
  swapTiles(dragIndex, dropIndex);
}

function dragEnd(e) {
  e.target.classList.remove("over");
  e.target.classList.remove("dragging");
}

function swapTiles(index1, index2) {
  var puzzleBoard = document.getElementById("puzzleBoard");
  var tiles = puzzleBoard.querySelectorAll(".tile");

  var tempBg = tiles[index1].style.backgroundImage;
  tiles[index1].style.backgroundImage = tiles[index2].style.backgroundImage;
  tiles[index2].style.backgroundImage = tempBg;
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
