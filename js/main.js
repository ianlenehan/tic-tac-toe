// 3 x 3 = 3 rows, 3 cols, 2 diagonals = 8
// 4 x 4 = 4 rows, 4 cols, 2 diagonals = 10
// 5 x 5 = 5, 5, 2 = 12

// based on the above calculations, this function should make the game flexible in terms of how bug the board is
var boardSize = 3;
var numberOfArrays = function(boardSize) {
  var diff = boardSize - 3;
  var arrays = (diff * 2) + 8;
  return arrays;
}

var arrays = numberOfArrays(boardSize);

var piecesPlayerA = ['A', 'A', 'A', 'A', 'A'];
var piecesPlayerB = ['B', 'B', 'B', 'B', 'B'];
var Board = {
  s0: ['a1', 'b1', 'c1'], // row 1
  s1: ['a2', 'b2', 'b3'], // row 2
  s2: ['a3', 'b3', 'c3'], // row 3
  s3: ['a1', 'a2', 'a3'], // col 1
  s4: ['b1', 'b2', 'b3'], // col 2
  s5: ['c1', 'c2', 'c3'], // col 3
  s6: ['a1', 'b2', 'c3'], // diag 1, top L to bottom R
  s7: ['c1', 'b2', 'a3'] // diag 2, top R to bottom L
    // s3: [this.s0.slice(0, 1), this.s1.slice(0, 1), this.s2.slice(0, 1)]
    // s3: [var this.s0[0], var this.s1[0], var this.s2[0]], // col 1
    // 4: [this.[0][0], this.[1][0], this.[2][0]], //col 2
    // 5: [this.[0][0], this.[1][0], this.[2][0]], //col 3
    // 6: [this.[0][0], this.[1][1], this.[2][3]], //diagonal 1
    // 7: [this.[0][2], this.[1][1], this.[2][0]], //diagonal 2
}

// need a fn to count number of times the player appears in each array
// this allows me to keep the board size fluid
// if I change the board size, the arrays will be longer
// // or am I just trying to determine what a winning array looks like?
// var arrayCount = function(array, player) {
//   var count = 0;
//   for (var i = 0; i < boardSize; i++) {
//     if (array[i] === player) {
//       count++
//     }
//   }
//   console.log(count);
//   return count;
// }


// because we can't compare arrays in JS, create a function that will do this via loops
// this function is called by the checkPlayer function
var arrayEquals = function(board, moves) {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < moves.length; j++) {
      if (board[i] === moves[j]) {
        count += 1;
      }
    }
  }
  if (count === 9) {
    console.log(board);
    return true;
  }
  console.log(count);
  return false;
}

// after each move has been made, check if that player has won yet
// go through all rows, columns and diagonals to see if there are a match to the win combo
var checkPlayer = function(player) {
  var winCombo = [player, player, player]
  for (var i = 0; i < arrays; i++) {
    var match = arrayEquals(Board['s' + i.toString()], winCombo);
    if (match) {
      console.log(player + " wins!");
      return true;
    }
  }
  console.log("Not this time");
  return false;
};


// from makeMove fn pass in player, position and the board to place player's piece on the board
var spotFinder = function(player, position, board) {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
      if (board[i] === position) {
        board[i] = player
        console.log(board);
        return;
      }
  } console.log(board); return;
}
// create a function to allow moves
var makeMove = function (player, position) {
  for (var i = 0; i < arrays; i++) {
    var board = Board['s' + i.toString()]
    spotFinder(player, position, board)
  }
}
