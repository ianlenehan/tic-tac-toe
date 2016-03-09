// 3 x 3 = 3 rows, 3 cols, 2 diagonals = 8
// 4 x 4 = 4 rows, 4 cols, 2 diagonals = 10
// 5 x 5 = 5, 5, 2 = 12

// based on the above calculations, this function should make the game flexible in terms of how bug the board is
var boardSize = 3;
var totalScoreX = 0;
var totalScoreO = 0;
var expectedMoves = boardSize * boardSize;
var totalMoves = 0;
var mode = 'twoPlayer';

var numberOfArrays = function(boardSize) {
  var diff = boardSize - 3;
  var arrays = (diff * 2) + 8;
  return arrays;
}

var arrays = numberOfArrays(boardSize);
var Board = {
  s0: ['a1', 'b1', 'c1'], // row 1
  s1: ['a2', 'b2', 'c2'], // row 2
  s2: ['a3', 'b3', 'c3'], // row 3
  s3: ['a1', 'a2', 'a3'], // col 1
  s4: ['b1', 'b2', 'b3'], // col 2
  s5: ['c1', 'c2', 'c3'], // col 3
  s6: ['a1', 'b2', 'c3'], // diag 1, top L to bottom R
  s7: ['c1', 'b2', 'a3'] // diag 2, top R to bottom L
}

$(document).ready(function () {
// fn to change the start player from X to O and back
$('#X').on('click', function () {
        player = 'X';
        var $setCursorX = $('body').css( 'cursor', 'url(/Users/IRL/Projects/myProjects/media/xcursor.png), auto' );
});

$('#O').on('click', function () {
        player = 'O';
        var $setCursorO = $('body').css( 'cursor', 'url(/Users/IRL/Projects/myProjects/media/Ocursor.png), auto' );
});

$('.spot').on('click', function () {
      $(this).text(player).css({'color': 'white'});
      var position = $(this).attr('id');
      // console.log(player);
      makeMove(player, position)
      if (player === 'X') {
        player = 'O'
        $('body').css( 'cursor', 'url(/Users/IRL/Projects/myProjects/media/Ocursor.png), auto' );
      } else if (player === 'O') {
        player = 'X';
        $('body').css( 'cursor', 'url(/Users/IRL/Projects/myProjects/media/xcursor.png), auto' );
      }
  });

$('#tp').on('click', function () {
  $('#tp').css({color: 'rgba(255,255,255,0.8)', border: 'solid rgba(255,255,255,0.8) 1px'});
  $('#sp').css({color: 'rgba(255,255,255,0.5)', border: 'solid rgba(255,255,255,0.5) 1px'});
  mode = 'twoPlayer';
});

$('#sp').on('click', function () {
  $('#sp').css({color: 'rgba(255,255,255,0.8)', border: 'solid rgba(255,255,255,0.8) 1px'});
  $('#tp').css({color: 'rgba(255,255,255,0.5)', border: 'solid rgba(255,255,255,0.5) 1px'});
  mode = 'singlePlayer';
});

});

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
  // console.log(count);
  return false;
}

var clearBoard = function () {
  Board = {
    s0: ['a1', 'b1', 'c1'], // row 1
    s1: ['a2', 'b2', 'c2'], // row 2
    s2: ['a3', 'b3', 'c3'], // row 3
    s3: ['a1', 'a2', 'a3'], // col 1
    s4: ['b1', 'b2', 'b3'], // col 2
    s5: ['c1', 'c2', 'c3'], // col 3
    s6: ['a1', 'b2', 'c3'], // diag 1, top L to bottom R
    s7: ['c1', 'b2', 'a3'] // diag 2, top R to bottom L
  }; // this resets the arrays
  $('li').text(1).css({color: 'rgba(231, 43, 197, 0)'});
};

// after each move has been made, check if that player has won yet
// go through all rows, columns and diagonals to see if there are a match to the win combo
var checkPlayer = function(player) {
  totalMoves++
  if (totalMoves >= expectedMoves) {
    swal({ title: "We have a draw!", text: "Try again!", imageUrl: "/Users/IRL/Projects/myProjects/media/XO.png" });
  }
  var winCombo = [player, player, player]
  for (var i = 0; i < arrays; i++) {
    var match = arrayEquals(Board['s' + i.toString()], winCombo);
    if (match) {
      if (player === 'X') {
      totalScoreX += 1;
      $('#xscore').text("(" + totalScoreX + ")")
    } else {
      totalScoreO += 1;
      $('#yscore').text("(" + totalScoreO + ")")
    }
      swal({ title: "We have a winner!", text: player + " has won this round.", imageUrl: "/Users/IRL/Projects/myProjects/media/XO.png" });
      clearBoard();
      console.log(totalScoreX, totalScoreO, player);
      return player;
    }
  }
  // console.log("Not this time");
  return false;
};


// from makeMove fn pass in player, position and the board to place player's piece on the board
var spotFinder = function(player, position, board) {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
      if (board[i] === position) {
        board[i] = player
        return;
      }
  } return;
}

var player = 'X';

// create a function to allow moves
var makeMove = function (player, position) {
  for (var i = 0; i < arrays; i++) {
    var board = Board['s' + i.toString()]
    spotFinder(player, position, board)
  }
  checkPlayer(player);
};

var newBoardIndex = 0;
var makeNewPieces = function () {
    for (var i = 0; i < array.length; i++) {
      array[i]
    }
}

var enlargeBoard = function () {
    boardSize++
    var arrayIndex = numberOfArrays(boardSize);
    console.log(arrayIndex);
    // to increase size, add a new row, 1 new col & 1 piece to each string
    var newColArray = Board['s' + (arrayIndex - 2).toString()] = [];
    var newRowArray = Board['s' + (arrayIndex - 1).toString()] = [];
    // console.log("new array " + newColArray);
    // console.log("new Array 2 " + newRowArray);
    for (var i = 0; i < arrayIndex; i++) {
      var newPiece = 'p' + newBoardIndex.toString();
      var boardArray = 's' + i.toString();
      Board[boardArray].push(newPiece);
      newBoardIndex++;
    };
    if (newColArray.length < Board.s0.length) {
      var arrayDiff = Board.s0.length - newColArray.length;
      for (var i = 0; i < arrayDiff; i++) {
        newPiece = 'p' + newBoardIndex.toString();
        newColArray.push(newPiece);
        newBoardIndex++;
      }
    }
    if (newRowArray.length < Board.s0.length) {
      var arrayDiff = Board.s0.length - newRowArray.length;
      for (var i = 0; i < arrayDiff; i++) {
        newPiece = 'p' + newBoardIndex.toString();
        newRowArray.push(newPiece);
        newBoardIndex++;
      }
    }
};
