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
    if (images[i] !== "") {
      var img = document.createElement("img");
      img.src = images[i];
      tile.appendChild(img);
    }
    tile.setAttribute("onclick", "moveTile(" + i + ")");
    puzzleBoard.appendChild(tile);
  }
}

function moveTile(index) {
  if (isValidMove(index)) {
    var emptyIndex = images.indexOf("");
    swapTiles(index, emptyIndex);
    renderBoard();

    if (isSolved()) {
      alert("Selamat! Anda menyelesaikan puzzle.");
    }
  }
}

function isValidMove(index) {
  var emptyIndex = images.indexOf("");
  var rowDiff = Math.abs(Math.floor(emptyIndex / 3) - Math.floor(index / 3));
  var colDiff = Math.abs((emptyIndex % 3) - (index % 3));
  return (rowDiff + colDiff === 1);
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
