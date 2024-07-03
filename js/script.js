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
    function play(event){
        if(event.target.tagName !== "LI") return;

        display.setData();
        if(checkEmptySpace() && !checkWin()){
            const row = parseInt(event.target.dataset.row);
            const column = parseInt(event.target.dataset.column);

            if (board.setMarker(row, column, players[playerIndexTurn].getMarker())){
                playerIndexTurn = playerIndexTurn === 0 ? 1 : 0;
            }

            display.render(board.getBoard());

            if (checkWin()){
                //Who played the last turn won and deserves to start new round first
                showWinner(players[playerIndexTurn = playerIndexTurn === 0 ? 1 : 0]); 
            }
        } else {
            board.resetBoard();  
        }
    }

    function checkWin(){
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
        //the center cell is the same for both diagonals
        if(checkDiagonalEqual(boardGrid) && !!boardGrid[1][1]){
            return true;
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
        if(checkWin()){
            console.log(`${winner.getPlayerName()} won!`);
        } else {
            console.log("It's a tie!");
        }
        
    }

    return {play};
})(gameboard);

const display = (function(){
    const cells = document.querySelectorAll("ul > li");
    const board = document.querySelector("ul");

    board.addEventListener("click", ticTacToe.play);

    function render(boardContent){
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = boardContent.flat()[i];
        }
    }

    function setData(){
        for (let i = 0; i < cells.length; i++){
            cells[i].dataset.row = `${Math.floor(i / 3)}`;
            cells[i].dataset.column = `${i % 3}`;
        }
    }

    return {render, setData};
})();