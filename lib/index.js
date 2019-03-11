'use strict'

var validSudoku = [
	[2, 3, 8, 5, 4, 7, 9, 6, 1],
	[6, 7, 4, 9, 3, 1, 8, 2, 5],
	[5, 1, 9, 8, 6, 2, 3, 4, 7],
	[9, 2, 6, 7, 5, 3, 4, 1, 8],
	[7, 4, 1, 2, 9, 8, 6, 5, 3],
	[8, 5, 3, 6, 1, 4, 2, 7, 9],
	[3, 9, 7, 1, 2, 6, 5, 8, 4],
	[4, 8, 2, 3, 7, 5, 1, 9, 6],
	[1, 6, 5, 4, 8, 9, 7, 3, 2]
];

var invalidSudoku = [
	[2, 3, 8, 5, 4, 7, 9, 6, 1],
	[6, 7, 4, 9, 3, 1, 8, 2, 5],
	[5, 1, 9, 8, 6, 2, 3, 4, 7],
	[9, 2, 6, 7, 5, 3, 4, 1, 8],
	[7, 4, 1, 2, 9, 8, 6, 5, 3],
	[8, 5, 3, 6, 1, 4, 2, 7, 9],
	[3, 9, 7, 1, 2, 6, 5, 8, 4],
	[4, 8, 2, 3, 7, 5, 1, 9, 6],
	[1, 2, 5, 4, 8, 9, 7, 3, 6]
];

function sizeValid(sudoku) {
	return sudoku.length === 9;
}

function validationRows(row) {
	var unique = new Set(row);

	return row.length === 9 && unique.size === 9 && row.every(function(item) {
		return item >= 1 && item <= 9 && Math.floor(item) === item;
	});
}

// function columnTransformer(sudoku) {
// 	var newSudoku = [];
//
// 	for (var i = 0; i < sudoku.length; i++) {
// 		var column = [];
//
// 		for (var j = 0; j < sudoku[i].length; j++) {
// 			column.push(sudoku[j][i]);
// 		}
//
// 		newSudoku.push(column);
// 	}
//
// 	return newSudoku;
// }


function columnTransformator(sudoku) {
	var newSudoku = [];

	sudoku.forEach(function(row, i) {
		var column = [];
		row.forEach(function(item, j) {
			column.push(sudoku[j][i]);
		});

		newSudoku.push(column);
	});

	return newSudoku;
}

// function squareTransformer(sudoku) {
// 	var cols = [];
// 	var grid = [];
//
// 	for (var i = 0; i < sudoku.length; i++) {
// 		cols.push([]);
// 		grid.push([]);
// 	}
//
// 	for (var row = 0; row < sudoku.length; row++) {
// 		for (var col = 0; col < sudoku[row].length; col++) {
// 			cols[col][row] = sudoku[row][col];
//
// 			var gridRow = Math.floor(row / 3);
// 			var gridCol = Math.floor(col / 3);
// 			var gridIndex = gridRow * 3 + gridCol;
//
// 			grid[gridIndex].push(sudoku[row][col]);
// 		}
// 	}
//
// 	return grid;
// }

function squareTransformator(sudoku) {
	var cols = [];
	var grid = [];

	sudoku.forEach(function(row, i) {
		cols.push([]);
		grid.push([]);
	});

	sudoku.forEach(function(row, i) {
		row.forEach(function(col, j) {
			cols[j][i] = sudoku[i][j];

			var gridRow = Math.floor(i / 3);
			var gridCol = Math.floor(j / 3);
			var gridIndex = gridRow * 3 + gridCol;

			grid[gridIndex].push(sudoku[i][j]);
		});
	});

	return grid;
}





function main(sudoku, type) {
	var isSizeValid = sizeValid(sudoku);
	var isRowValid = sudoku.every(validationRows);
	var isColumnValid = columnTransformator(sudoku).every(validationRows);
	var isSquareValid = squareTransformator(sudoku).every(validationRows);

	return isSizeValid && isColumnValid && isRowValid && isSquareValid;
}

console.log(main(invalidSudoku));
