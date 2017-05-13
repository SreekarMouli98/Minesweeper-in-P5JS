var cols, rows, cell_size = 60;
var total_mines = 20;
var grid;
var score = 0;
var gameOver = false;

function setup() {
	
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		createCanvas(windowWidth, windowHeight);
	} else {
		createCanvas(601, 601);
	}
	cols = floor(width / cell_size);
	rows = floor(height / cell_size);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new cell(i, j);
		}
	}
	for (i = 0; i < total_mines; i++) {
		var x = floor(random(cols));
		var y = floor(random(rows));
		if (grid[x][y].mine) {
			i--;
		} else {
			grid[x][y].mine = true;
		}
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].setNeighbourCount();
		}
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();
				if (grid[i][j].mine) {
					gameOver = true;
				}
				return;
			}
		}
	}
}

function checkScore() {
	var revealedCells = 0;
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].revealed) {
				revealedCells++;
			}
		}
	}
	return revealedCells;
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function draw() {
	background(0);
	if (!gameOver) {
		score = checkScore();
	} else {
		createElement("h1", "SCORE: " + score);
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}
