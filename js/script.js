/*
    -Gameboard (grid): nested array with column and rows,
    setMarker (write the player maker to selected cell)

    -Player: name, marker

    -Game: switch player
*/

const gameboard = (function (){
    const boardGrid = [[null, null, null],[null, null, null],[null, null, null]];

    function setMarker(row, column, marker) {
        boardGrid[row][column] = marker;
    }

    function showBoard(){
        for (row of boardGrid){
            console.log(row);
        }
    }

    return {setMarker, showBoard}
})();