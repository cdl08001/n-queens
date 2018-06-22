/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n}); //fixme
  var rows = solution.rows(); 

  var rookPlacement = function(rowIndex, colIndex){
    //If current row exeeds our solution row length, do nothing
    if(rowIndex < rows.length){
      //check for column conflicts on new rows
      if (!solution.hasColConflictAt(colIndex)) {
        //if no conflict, use toggle to place rook at the index
        solution.togglePiece(rowIndex, colIndex); 
      }
      rookPlacement(rowIndex + 1, colIndex +1);
    } 

  } 
  rookPlacement(0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var toggleCounter = 0;
  var board = new Board({'n': n});
  var rows = board.rows();
  var rookSolutions = function(rowIndex) {
    if (rowIndex < rows.length) {
      for (var i = 0; i < rows.length; i++) {
        board.togglePiece(rowIndex, i);
        toggleCounter++;
        if (board.hasRowConflictAt(rowIndex)) {
          board.togglePiece(rowIndex, i - 1);
          toggleCounter--;
        }
        if (board.hasColConflictAt(i)) {
          board.togglePiece(rowIndex, i);
          toggleCounter--;
        } else {
          if (toggleCounter === n) {
            solutionCount++;
            board.togglePiece(rowIndex, i);
            toggleCounter--;
            return;
          }
          rookSolutions(rowIndex + 1);
        }
      }
    }
    if (rows[rowIndex][n - 1] === 1) {
      board.togglePiece(rowIndex, n - 1);
      toggleCounter--;
    }

  }
  rookSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if( n === 0 ){
    return [];
  } else if( n === 1 ){
    return [[1]];
  }
  var solutionCount = 0;
  var toggleCounter = 0;
  var board = new Board({'n': n});
  var rows = board.rows();

  var queenSolutions = function(rowIndex) {
    if( solutionCount === 1) {
      return;
    }
    if (rowIndex < rows.length) {
      for (var i = 0; i < rows.length; i++) {
        if( solutionCount === 1 ){
          break;
        }
        board.togglePiece(rowIndex, i);
        toggleCounter++;
        if (board.hasRowConflictAt(rowIndex)) {
          board.togglePiece(rowIndex, i - 1);
          toggleCounter--;
        }
        if (board.hasAnyQueenConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
          toggleCounter--;
        } else {
          if (toggleCounter === n) {
            solutionCount++;
            toggleCounter--;
            return;
          }
          queenSolutions(rowIndex + 1);
        }
      }
    }
    if (solutionCount < 1) {
      if (rows[rowIndex][n - 1] === 1) {
        board.togglePiece(rowIndex, n - 1);
        toggleCounter--;
      }
    }

  }
  queenSolutions(0);

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  var solutionCount = 0;
  var toggleCounter = 0;
  var board = new Board({'n': n});
  var rows = board.rows();
  var queenSolutions = function(rowIndex) {
    if (rowIndex < rows.length) {
      for (var i = 0; i < rows.length; i++) {
        board.togglePiece(rowIndex, i);
        toggleCounter++;
        if (board.hasRowConflictAt(rowIndex)) {
          board.togglePiece(rowIndex, i - 1);
          toggleCounter--;
        }
        if (board.hasAnyQueenConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
          toggleCounter--;
        } else {
          if (toggleCounter === n) {
            solutionCount++;
            board.togglePiece(rowIndex, i);
            toggleCounter--;
            return;
          }
          queenSolutions(rowIndex + 1);
        }
      }
    }
    if (rows[rowIndex][n - 1] === 1) {
      board.togglePiece(rowIndex, n - 1);
      toggleCounter--;
    }

  }
  queenSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
