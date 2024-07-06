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

    function checkEmptySpace() {
        for (row of boardGrid){
            if(row.includes(null)) return true;
        }
        return false;
    }

    function checkRowEqual() {
        //is there any row with equal chars, excluding null?
        for (row of boardGrid){
            if (row[0] === row[1] && row[0] === row[2] && row[0] !== null){
                return true;
            }
        }
        return false;
    }

    function checkColumnEqual() {
        for (let i = 0; i < boardGrid.length; i++) {
            if (boardGrid[0][i] === boardGrid[1][i] &&
                boardGrid[0][i] === boardGrid[2][i] &&
                boardGrid[0][i] !== null){
                    return true;
                }
        }
        return false;
    }

    function checkDiagonalEqual() {
        if ((boardGrid[0][0] === boardGrid[1][1] && 
            boardGrid[2][2] === boardGrid[1][1] ||
            boardGrid[0][2] === boardGrid[1][1] &&
            boardGrid[2][0] === boardGrid[1][1]) &&
            boardGrid[1][1] !== null){
            return true;
        } else {
            return false;
        }
    }

    return {
        setMarker, showBoard, getBoard, resetBoard, checkEmptySpace, checkRowEqual,
        checkColumnEqual, checkDiagonalEqual
        };
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
    const players = [makePlayer("Player 1","X"), makePlayer("Player 2","O")];
    let hasWinner = false;

    let playerIndexTurn = 0;
    function play(event){
        if(event.target.tagName !== "LI") return;

        display.setData();
        if(board.checkEmptySpace() && !hasWinner){
            const row = parseInt(event.target.dataset.row);
            const column = parseInt(event.target.dataset.column);

            if (board.setMarker(row, column, players[playerIndexTurn].getMarker())){
                playerIndexTurn = playerIndexTurn === 0 ? 1 : 0;
            }

            display.render(board.getBoard());
        }

        hasWinner = checkWin();
        if (hasWinner){
            //Who played the last turn won and deserves to start new round first
            const indexOfWinner = playerIndexTurn === 0 ? 1 : 0;
            showWinner(players[indexOfWinner]);
            playerIndexTurn = indexOfWinner;
            board.resetBoard();  
            hasWinner = false;
        } else if (!board.checkEmptySpace()) {
            showWinner();
            board.resetBoard();
        }
    }

    function checkWin(){
        if(board.checkRowEqual()) {
            return true;
        }
        
        if (board.checkColumnEqual()){
            return true;
        };
        
        if(board.checkDiagonalEqual()){
            return true;
        }
        return false;
    }

    function showWinner(winner){
        if(checkWin()){
            display.setWinnerText(`${winner.getPlayerName()} won!`);
        } else {
            display.setWinnerText("It's a tie!");
        }
        
    }

    function resetGame() {
        board.resetBoard();
        display.render(board.getBoard());
    }

    return {play, resetGame};
})(gameboard);

const display = (function(){
    const cells = document.querySelectorAll("ul > li");
    const board = document.querySelector("ul");
    const winnerDisplay = document.querySelector("#winner-display");
    const resetBtn = document.querySelector("#reset");

    board.addEventListener("click", ticTacToe.play);
    resetBtn.addEventListener("click", ticTacToe.resetGame);

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

    function setWinnerText(text){
        winnerDisplay.textContent = text;
    }

    return {render, setData, setWinnerText};
})();