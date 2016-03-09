// this version has some code in it to work on AI and also identifying the winning array

// based on the above calculations, this function should make the game flexible in terms of how bug the board is
var boardSize = 3;
var totalScoreX = 0;
var totalScoreO = 0;
var expectedMoves = boardSize * boardSize;
var totalMoves = 0;
var mode = 'singlePlayer';

var numberOfArrays = function(boardSize) {
  var diff = boardSize - 3;
  var arrays = (diff * 2) + 8;
  return arrays;
}

var arrays = numberOfArrays(boardSize);

// var piecesPlayerA = ['A', 'A', 'A', 'A', 'A'];
// var piecesPlayerB = ['B', 'B', 'B', 'B', 'B'];
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

$(document).ready(function() {
  // fn to change the start player from X to O and back
  $('#X').on('click', function() {
    player = 'X';
    var $setCursorX = $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/xcursor.png), auto');
  });

  $('#O').on('click', function() {
    player = 'O';
    var $setCursorO = $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/Ocursor.png), auto');
  });

  $('.spot').on('click', function() {
    if ($(this).text() === 'X' || $(this).text() === 'O') {
      swal({
        title: "Error!",
        text: "This spot is taken, thank you very much.",
        imageUrl: "media/XO.png"
      });
      return false;
    }
    $(this).text(player).css({
      'color': 'white'
    });
    var position = $(this).attr('id');
    makeMove(player, position)
    if (player === 'X') {
      player = 'O'
      $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/Ocursor.png), auto');
    } else if (player === 'O') {
      player = 'X';
      $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/xcursor.png), auto');
    }
  });

  $('#tp').on('click', function() {
    $('#tp').css({
      color: 'rgba(255,255,255,0.8)',
      border: 'solid rgba(255,255,255,0.8) 1px'
    });
    $('#sp').css({
      color: 'rgba(255,255,255,0.5)',
      border: 'solid rgba(255,255,255,0.5) 1px'
    });
    mode = 'twoPlayer';
  });

  $('#sp').on('click', function() {
    $('#sp').css({
      color: 'rgba(255,255,255,0.8)',
      border: 'solid rgba(255,255,255,0.8) 1px'
    });
    $('#tp').css({
      color: 'rgba(255,255,255,0.5)',
      border: 'solid rgba(255,255,255,0.5) 1px'
    });
    mode = 'singlePlayer';
  });

// theme buttons

$('#theme-chalk').on('click', function () {
  $('body').css('background-image','url(media/blackboard.jpg)');
});

$('#theme-sydney').on('click', function () {
  $('body').css('background-image','url(media/sydney.jpg)');
});

$('#theme-dublin').on('click', function () {
  $('body').css('background-image','url(media/dublin.jpg)');
});

$('#theme-africa').on('click', function () {
  $('body').css('background-image','url(media/africa.jpg)');
});
});

// because we can't compare arrays in JS, create a function that will do this via loops
// this function is called by the checkPlayer function
var winningBoard = ''

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



var clearBoard = function() {
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
  highlightWinningSpots();
  setTimeout($('li').text(1).css({
    color: 'rgba(231, 43, 197, 0)'
  }), 3000);
  totalMoves = 0;
};

// after each move has been made, check if that player has won yet
// go through all rows, columns and diagonals to see if there are a match to the win combo

var winningArray = '';
var checkPlayer = function(player) {
  totalMoves++
  if (totalMoves >= expectedMoves) {
    swal({
      title: "We have a draw!",
      text: "Try again!",
      imageUrl: "/Users/IRL/Projects/myProjects/media/XO.png"
    });
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
      swal({
        title: "We have a winner!",
        text: player + " has won this round.",
        imageUrl: "/Users/IRL/Projects/myProjects/media/XO.png"
      });

      for (var key in Board) {
        if (arrayEquals(Board[key], ['X', 'X', 'X'])) {
          winningArray = key;
          console.log(key);
        }
      }
      clearBoard();

      // console.log(totalScoreX, totalScoreO, player);
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
  }
  return;
}

var player = 'X';
var playerMove;
var playerMoveCounter = 0;
// create a function to allow moves
var makeMove = function(player, position) {
  playerMove = position;
  playerMoveCounter++;
  for (var i = 0; i < arrays; i++) {
    var board = Board['s' + i.toString()]
    spotFinder(player, position, board)
  }
  checkPlayer(player);



  // if (mode === 'singlePlayer') {
  //   var nextMove = makeComputerMove();
  //   console.log("computer move ", nextMove);
  //   makeMoveComputer('O', nextMove);
  // }
};

var highlightWinningSpots = function () {
  var spotOne = Board[winningArray][0]
  var spotTwo = " '#" + (Board[winningArray][1] + "'")
  var spotThree = " '#" + (Board[winningArray][2] + "'")
  // console.log(spotOne);
  $(" #" + spotOne).css('text-decoration', 'underline')
}

// var makeMoveComputer = function(player, position) {
//   playerMove = position;
//   playerMoveCounter++;
//   for (var i = 0; i < arrays; i++) {
//     var board = Board['s' + i.toString()]
//     spotFinder(player, position, board)
//   }
//   checkPlayer(player);
// };

// single player function
// var computerMove = '';
// var makeComputerMove = function() {
//
//   if (Board.sq === 'b2') {
//     computerMove = 'b2';
//     if (playerMoveCounter === 1 && playerMove === 'a1') {
//       computerMove = 'c3';
//         if (playerMoveCounter === 1 && playerMove === 'a3') {
//           computerMove = 'c1';
//           if (playerMoveCounter === 1 && playerMove === 'c1') {
//             computerMove = 'a3';
//             if (playerMoveCounter) === 1 && playerMove === 'a3') {
//               computerMove = 'c1';
//             }
//           }
//         }
//
//     }
//   }

  // if (Board.s1 === 'b2') {
  //   computerMove = 'b2';
  // } else if (playerMoveCounter === 1 && playerMove === 'a1') {
  //   computerMove = 'c3';
  // } else if (playerMoveCounter === 1 && playerMove === 'a3') {
  //   computerMove = 'c1';
  // } else if (playerMoveCounter === 1 && playerMove === 'c1') {
  //   computerMove = 'a3';
  // } else if (playerMoveCounter === 1 && playerMove === 'a3') {
  //   computerMove = 'c1';
  // }
//   var spotID = '#' + computerMove
//   $(spotID).text('O').css({ color: 'white'});
//   return computerMove;
// }
