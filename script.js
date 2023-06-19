var numbers = [];
var emptyCellIndex;
var moveCount = 0;
var maxMoves = 200;

window.onload = function() {
    startGame();
};

function startGame() {
    numbers = generateRandomNumbers();
    emptyCellIndex = 15;
    moveCount = 0;
    updateBoard();
}

function generateRandomNumbers() {
    var numbers = [];
    for (var i = 1; i <= 15; i++) {
        numbers.push(i);
    }
    numbers.sort(function(a, b){return 0.5 - Math.random()});
    return numbers;
}

function updateBoard() {
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
        if (numbers[i]) {
            cells[i].innerHTML = numbers[i];
            cells[i].style.backgroundColor = "white";
        } else {
            cells[i].innerHTML = "";
            cells[i].style.backgroundColor = "#d3d3d3";
        }
    }
    document.getElementById("move-count").innerHTML = moveCount;
}

function moveTile(index) {
    if (moveCount >= maxMoves) {
        return; // Ignore moves after reaching the move limit
    }

    if (isAdjacent(index, emptyCellIndex)) {
        // Swap the tile with the empty cell
        var temp = numbers[index];
        numbers[index] = numbers[emptyCellIndex];
        numbers[emptyCellIndex] = temp;
        emptyCellIndex = index;
        moveCount++;
        updateBoard();

        if (isWinningState()) {
            setTimeout(function() {
                alert("Congratulations! You won the game.");
            }, 100);
        }
    }
}

function isAdjacent(index1, index2) {
    var row1 = Math.floor(index1 / 4);
    var col1 = index1 % 4;
    var row2 = Math.floor(index2 / 4);
    var col2 = index2 % 4;

    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

function isWinningState() {
    for (var i = 0; i < 15; i++) {
        if (numbers[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

function restartGame() {
    startGame();
}
