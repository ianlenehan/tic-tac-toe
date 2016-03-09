var Board = {
  s0: ['a1', 'b1', 'c1'], // row 1
  s1: ['a2', 'b2', 'c2'], // row 2
  s2: ['a3', 'b3', 'c3'], // row 3
  s3: ['a1', 'a2', 'a3'], // col 1
  s4: ['b1', 'b2', 'b3'], // col 2
  s5: ['c1', 'c2', 'c3'], // col 3
  s6: ['a1', 'b2', 'c3'], // diag 1, top L to bottom R
  s7: ['c1', 'b2', 'a3'] // diag 2, top R to bottom L
};

// based on the above calculations, this function should make the game flexible in terms of how bug the board is
var boardSize = 3;
var totalScoreX = 0;
var totalScoreO = 0;
var expectedMoves = boardSize * boardSize;
var totalMoves = 0;
var winningBoard = '';
var player = 'X'; // start with X as default

// this fn was built to allow for a fluid board size.
// not currently used except in checkPlayer fn
// so should stay in for now
var numberOfArrays = function(boardSize) {
  var diff = boardSize - 3;
  var arrays = (diff * 2) + 8;
  return arrays;
};

var arrays = numberOfArrays(boardSize);

$(document).ready(function() {
  // fn to change the start player from X to O and back
  $('#X').on('click', function() {
    player = 'X';
    var $setCursorX = $('body').css('cursor', 'url(media/xcursor.png), auto');
  });

  $('#O').on('click', function() {
    player = 'O';
    var $setCursorO = $('body').css('cursor', 'url(media/Ocursor.png), auto');
  });

  // what happens when you click on a board square / spot
  $('.spot').on('click', function() {
    // checks to make sure the spot isn't already taken by X or O
    if ($(this).text() === 'X' || $(this).text() === 'O') {
      swal({
        title: "Error!",
        text: "This spot is taken, thank you very much.",
        imageUrl: "media/XO.png"
      });
      return false;
    }
    // changes the text in the selected square to white and to either X or O
    $(this).text(player).css({
      'color': 'white'
    });
    // gets the board position based on the <li> id and then runs the makeMove function with the player and the position
    var position = $(this).attr('id');
    makeMove(player, position)
      // changes to the other player once all moves have been made
      // also changes the cursor to the other player
    if (player === 'X') {
      player = 'O'
      $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/Ocursor.png), auto');
    } else if (player === 'O') {
      player = 'X';
      $('body').css('cursor', 'url(/Users/IRL/Projects/myProjects/media/xcursor.png), auto');
    }
  });

  // theme buttons
  $('#theme-chalk').on('click', function() {
    $('body').css('background-image', 'url(media/blackboard.jpg)');
  });

  $('#theme-sydney').on('click', function() {
    $('body').css('background-image', 'url(media/Sydney.jpg)');
  });

  $('#theme-dublin').on('click', function() {
    $('body').css('background-image', 'url(media/Dublin.jpg)');
  });

  $('#theme-africa').on('click', function() {
    $('body').css('background-image', 'url(media/Africa.jpg)');
  });
});

// this fn is called by the checkPlayer fn
// it checks each array on the board to see if all 3 ids are = X or O
var arrayEquals = function(arr, player) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === player) {
      count++
    }
  }
  if (count === 3) {
    return true;
  }
  return false;
};

// after each move has been made, check if that player has won yet
// go through all rows, columns and diagonals to see if there are a match to the win combo
// this fn is called by makeMove fn
var checkPlayer = function(player) {
  totalMoves++
  if (totalMoves >= expectedMoves) {
    swal({
      title: "We have a draw!",
      text: "Try again!",
      imageUrl: "media/XO.png"
    });
    clearBoard();
  }
  // arrays in this case is number of arrays -> 8 for a 3 x 3 game
  // we're looping through the arrayEquals fn with each array to find if there is a winner
  for (var i = 0; i < arrays; i++) {
    var match = arrayEquals(Board['s' + i.toString()], player);
    // if we have a winner, check who it is and update relevant scores/board pieces etc
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
        imageUrl: "media/XO.png"
      });
      // run clearBoard fn to reset the board
      clearBoard();
      return player;
    }
  }
  return false;
};

// this fun is called by checkPlayer fn
// it resets the arrays and also the text/css on front end and totalMoves (which is used to determine a draw)
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
  $('li').text(1).css({
    color: 'rgba(231, 43, 197, 0)'
  });
  totalMoves = 0;
};

// from makeMove fn pass in player, position and the array to place player's piece on the board
var spotFinder = function(player, position, arr) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === position) {
      arr[i] = player
      return;
    }
  }
  return;
};

// this is called by .spot on click fn
// position is determined by the id of the <li> that is clicked on
var makeMove = function(player, position) {
  for (var i = 0; i < arrays; i++) {
    var arr = Board['s' + i.toString()]
    spotFinder(player, position, arr);
  }
  checkPlayer(player);
};
