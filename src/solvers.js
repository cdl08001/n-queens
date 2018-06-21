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
  // Create variable to hold solution count:
  var solutionCount = 0;
  // Create toggle counter variable to track toggle invocations
  var toggleCounter = 0;
  // Create a new board of 'n' dimensions
  var board = new Board({'n': n});
  // Isolate rows within new board
  var rows = board.rows();
  // Create recursive function to identify solution count
  var rookSolutions = function(rowIndex) {
    // If the toggle count equals the number of rows, consider a solution found and break out of function call
    if (toggleCounter === n) {
      solutionCount++;
      return;
    }
    // Otherwise, as long as the passed in row is less than the board length, loop over row elements
    if (rowIndex < rows.length) {
      for (var i = 0; i < rows.length; i++) {
        // Toggle current element, increase toggle counter
        board.togglePiece(rowIndex, i);
        toggleCounter++;
        // If the current element has a conflict, toggle element 'off' and decrease toggle counter
        if (board.hasColConflictAt(i)) {
          board.togglePiece(rowIndex, i);
          toggleCounter--;
        } else {
          // If the current element does NOT have a conflict, recursively call rookSolutions, passing in the 
          // next row.
          rookSolutions(rowIndex + 1);
        }
      }
      // 
      rookSolutions(rowIndex + 1);
    }

  }
  rookSolutions(0);

  // for (var x = 0; x < rows.length; x++) {
  //   rookSolutions(x);
  // }
    
  // We will need to call our recursive function n times
  // When counter equals our row length (n), we can return solutionCount.

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
