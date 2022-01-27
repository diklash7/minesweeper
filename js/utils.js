'use strict';


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell !== MINE) {
                currCell = EMPTY;
            }
            var className = `cell cell-${i}-${j}`;

            if (currCell.isMine === MINE) {
              strHTML +=MINE_IMG;
            } if (currCell.isMarked === FLAG) {
              strHTML +=FLAG_IMG;
            }



            strHTML += `<td class="${className}" onclick="cellClicked(${i},${j},this)"oncontextmenu="cellMarked(this, ${i}, ${j})">${currCell}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}


// function getRandomInt(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min 
//   }



  // function renderCell(location, value) {
  //   var cellSelector = '.' + getClassName(location);
  //   var elCell = document.querySelector(cellSelector);
  //   elCell.innerHTML = value;
  // }
  



  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }