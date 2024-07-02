/*
    -Gameboard (grid): nested array with column and rows,
    setMarker (write the player maker to selected cell), check if there is an empty

    -Player: maker, getMarker

    -Game: create Players, play while game is not over or there is space left
*/

const gameboard = (function (){
    const boardGrid = [[null, null, null],[null, null, null],[null, null, null]];

    function setMarker(row, column, marker) {
        //control and inform if trying to overwrite cell
        if (boardGrid[row][column] !== null) return false;
        return boardGrid[row][column] = marker;
    }

    function showBoard(){
        for(row of boardGrid){
            console.log(row);
        }
    }

    function getBoard(){
        return boardGrid;
    }

    function resetBoard(){
        for (let i = 0; i < boardGrid.length; i++) {
            boardGrid[i] = [null, null, null];
        }
    }

    return {setMarker, showBoard, getBoard, resetBoard};
})();

function makePlayer(name, char) {
    const playerName = name;
    const marker = char;

    function getPlayerName(){
        return playerName;
    }

    function getMarker(){
        return marker;
    }

    return {getMarker, getPlayerName};
}

const ticTacToe = (function(board){
    const players = [makePlayer("Player 1","X"), makePlayer("Player 2","O")]

    let playerIndexTurn = 0;
    function play(){
        while(checkEmptySpace() && !checkWhoWin()){
            const row = parseInt(prompt("Input row"));
            const column = parseInt(prompt("Input column"));

            if (board.setMarker(row, column, players[playerIndexTurn].getMarker())){
                playerIndexTurn = playerIndexTurn === 0 ? 1 : 0;
            }

            board.showBoard();
        }
        board.resetBoard();
        //Who played the last turn won and deserves to start new round first
        showWinner(players[playerIndexTurn = playerIndexTurn === 0 ? 1 : 0]);
    }

    function checkWhoWin(){
        const boardGrid = board.getBoard();
        //win by closing row
        for(row of boardGrid){
            //ckeck if it's null, otherwise game ends in the start
            if(checkRowEqual(row) && !(row.includes(null))){
                return true;
            }
        }
        //win by closing column
        for(let column = 0; column < boardGrid.length; column++){
            if(checkColumnEqual(boardGrid, column) && boardGrid[0][column] !== null){
                    return true;
            }
        }
        //win by closing diagonal
        if(checkDiagonalEqual(boardGrid) && !!boardGrid[1][1]){
            return true;//is the same value in both diagonals
        }
        return false;
    }

    function checkRowEqual(row){
        return row[0] === row[1] && row[0] === row[2];
    }

    function checkColumnEqual(boardGrid, column) {
        return (boardGrid[0][column] === boardGrid[1][column] &&
                boardGrid[0][column] === boardGrid[2][column]);
    }

    function checkDiagonalEqual(boardGrid){
        return(boardGrid[0][0] === boardGrid[1][1] && 
                boardGrid[2][2] === boardGrid[1][1] ||
                boardGrid[0][2] === boardGrid[1][1] &&
                boardGrid[2][0] === boardGrid[1][1]);
    }

    function checkEmptySpace() {
        for (row of board.getBoard()){
            if(row.includes(null)) return true;
        }
        return false;
    }

    function showWinner(winner){
        console.log(`${winner.getPlayerName()} won!`);
    }

    return {play};
})(gameboard);