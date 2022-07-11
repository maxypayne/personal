//In this kata we want to create a minimalist JavaScript class for playing the well-known game 'Tic-tac-toe'.
//
// The game is based on a 3x3 grid where we consider the fields numbered like on a telephone keypad, with the number
// 1 on the top left corner and the number 9 on the bottom right corner.
//
// The two players take turns occupying the fields in the grids with their tiles. The player who can first get a
// vertical, horizontal or diagonal stroke of 3 tiles wins.
//
// Our class TicTacToe shall provide a method move(). The state of the game must be kept internally in the current
// instance of the class. Calling the move() method automatically switches sides. To make a move, pass the number
// of the field as only argument to the method. If this is the first move and the computer shall start, or you want to
// change sides and let the computer make the next move, call the method without arguments. The method shall always
// return an array where the first element is the move the computer makes, i.e. a number between 1 and 9, or 0 if
// there is no possible move. The second element of the returned array shall be one of these comments:
//
//     'Game ended' if the game already ended before the move
//     'You win!' if the passed move was a winning move
//     'Draw!' if the passed or returned move caused a draw
//     'I win!' if the returned move was a winning move
//     'Your move?' if the game is still going on
//     'Illegal move' if the field was already occupied
//
// The strategy of the computer shall be very simple, in order to give the human player a chance to win.
// The only criterion for the computer shall be that it prefers the middle tile, then the corners, then the edges.
// In case of ambiguity it always chooses the tile with the lowest number.
//
// So a game of Tic-tac-toe against the computer will look like this (we let the computer begin):
//
// ttt = new TicTacToe()
//
// ttt.move() // -> [5, 'Your move?']
// ttt.move(1) // -> [3, 'Your move?']
// ttt.move(4) // -> [7, 'I win!']
// ttt.move(9) // -> [0, 'Game ended']
//
// Another game (this time the human starts the game):
//
// ttt = new TicTacToe()
//
// ttt.move(1) // -> [5, 'Your move?']
// ttt.move(2) // -> [3, 'Your move?']
// ttt.move(5) // -> [0, 'Illegal move']
// ttt.move(9) // -> [7, 'I win!']
// ttt.move(4) // -> [0, 'Game ended']
//
// Here is a game that ends in a draw:
//
// ttt = new TicTacToe()
//
// ttt.move(2) // -> [5, 'Your move?']
// ttt.move(1) // -> [3, 'Your move?']
// ttt.move(7) // -> [9, 'Your move?']
// ttt.move(6) // -> [4, 'Your move?']
// ttt.move(8) // -> [0, 'Draw!']
//
// Try to find a way to win against the computer, and cover it in your tests, too.
//
// After finishing this kata, you may want to improve the algorithm to make it play better and with some randomness.
const wining = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
const checkWin = (which) => wining.some(line => line.every(x => arr[x] === which));
const arr = [];
const conputerChoice = (which) => {
  let toReturn = [];
  if (arr[which]) {
    toReturn = [0, 'Illegal move']
  } else if (!arr[5]) {
    arr[5] = 'x';
    toReturn = [5, 'Your move?'];
  } else if(!arr[1]) {
    arr[1] = 'x';
    toReturn = [1, 'Your move?'];
  } else if(!arr[3]) {
    arr[3] = 'x';
    toReturn = [3, 'Your move?'];
  } else if(!arr[7]) {
    arr[7] = 'x';
    toReturn = [7, 'Your move?'];
  } else if(!arr[9]) {
    arr[9] = 'x';
    toReturn = [9, 'Your move?'];
  } else if(!arr[2]) {
    arr[2] = 'x';
    toReturn = [2, 'Your move?'];
  } else if(!arr[4]) {
    arr[4] = 'x';
    toReturn = [4, 'Your move?'];
  } else if(!arr[6]) {
    arr[6] = 'x';
    toReturn = [6, 'Your move?'];
  } else if(!arr[8]) {
    arr[8] = 'x';
    toReturn = [6, 'Your move?'];
  }
  const state = checkWin('x');
  if (state) {
    return [which, 'I win!'];
  } else {
    return toReturn;
  }
  // ttt.move(5) // -> [0, 'Illegal move']
// ttt.move(4) // -> [0, 'Game ended']
// ttt.move(8) // -> [0, 'Draw!']
};
class Tiktaktoe {
  move(n) {
  const state = checkWin('o');
  }
}

const game = new Tiktaktoe();
game.move(4);
