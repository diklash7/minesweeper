
'use strict';
const MINE = '💣';
const EMPTY = ' ';
// const FLAG = '🚩';


const MINE_IMG = '💣'
// const FLAG_IMG = '🚩';

// Model:
var gBoard;
var gBoardSize = 4;



var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = [{
    level: 'Beginner',
    size: 4,
    mines: 2
},
{
    level: 'Medium',
    size: 8,
    mines: 12
},
{
    level: 'Expert',
    size: 12,
    mines: 30
}

];

function changeLevel(size) {
    gBoardSize = size
    init()
}


function init() {
    gGame.isOn = true;
    gBoard = buildBoard();
    addMines();
    console.log('gBoard', gBoard);
    renderBoard(gBoard);
    checkGameOver();

}


// function restat(elBtn){
//     if 
// } 


function buildBoard() {
    // var size = 4;
    var board = [];
    for (var i = 0; i < gBoardSize; i++) {
        board.push([]);
        for (var j = 0; j < gBoardSize; j++) {
            var cell = {
                minesAroundCount: setMinesNegsCount(cell),
                isShown: true,
                isMine: false,
                isMarked: false
            };

            board[i][j] = cell;
        }
    }
    board[0][2].isMine = true;
    board[1][1] = MINE;
    console.table(board);
    return board;
}


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
            // var className = ({ i: i, j: j });
            if (currCell.isMine) {
                strHTML += MINE_IMG;
            // } if (currCell.isMarked) {
            //     strHTML += FLAG_IMG;
            }



            strHTML += `<td class="${className}" onclick="cellClicked(${i},${j},this)"oncontextmenu="cellMarked(this, ${i}, ${j})">${currCell}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}



function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = board[i][j]
            // console.log(currCell);
            if (currCell.isMine) count++
        }
    }
    if (count === 0) { return ' ' }
    else { return count }
    // console.log(count);
    // return count

}




function cellClicked(i, j, elCell) {

    if (!gBoard[i][j].isShown) return;

    gBoard[i][j].isShown = true;
    elCell.innerText = setMinesNegsCount(gBoard, i, j);
    elCell.style.backgroundColor='pink';
    gGame.shownCount++;
    if (gBoard[i][j].isMine) {
        console.log('boom!')
        // document.querySelector('.smile')='😌'
    } else if (gBoard[i][j] === ' ') {
        console.log('need recorsia')
    } else {
        console.log('number');
    }

    console.log('gGame.shownCount', gGame.shownCount);
    // elCell.classList.toggle('show')
    // startStopWatch();

}

function cellMarked(elCell, i, j) {
    if (!gBoard[i][j].isShown) return;
    window.event.preventDefault()
    console.log('right', i, j);

    gBoard[i][j].isMarked = true;
    elCell.classList.toggle('marked')
    gGame.markedCount++;
    console.log('markedCount', gGame.markedCount);
    console.table(gBoard);
}



// function addRandomMine() {
//     var pos = getEmptyPos();
//     if (!pos) return;
//     gBoard[pos.i][pos.j] = MINE;
//     console.log(gBoard[pos.i][pos.j])
//     renderCell(pos, MINE_IMG);
// }


// function getEmptyPos() {
// 	var res = [];
// 	for (var i = 0; i < gBoard.length; i++) {
// 		for (var j = 0; j < gBoard[0].length; j++) {
// 			if (!gBoard[i][j].gameElement && gBoard[i][j].type === FLOOR) res.push({ i: i, j: j });
// 		}
// 	}
// 	if (res.length) return res[getRandomInt(0, res.length - 1)];
// 	return null;
// }



function getEmptyPos() {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            // res.push({ i: i, j: j });
            if (gBoard[i][j].isMine === false) res.push({ i: i, j: j });
        }
    }
    console.log(res);
    if (res.length) return res[getRandomIntInclusive(0, res.length - 1)];
    return null;
}

function addMines() {
    var i = 0
    while (i <3) {


        var pos = getEmptyPos();
        if (!pos) return;
        // for (var i = 0; i < 4; i++) {
            // gBoard[pos.i][pos.j] = MINE;
            gBoard[pos.i][pos.j].isMine === true;
            // renderCell(pos, MINE_IMG);
            // gBallCounter++;
            
            
        // }
        i++;


    }
}

function renderCell(pos, value) {

    var elCell = document.querySelector(`.cell cell-${pos.i}-${pos.j}`);
    elCell.innerHTML = value;
}
//   var className = `cell cell-${i}-${j}`;
//   `.i:${location.i}, j:${location.j}`
//   `cell cell-${i}-${j}`

// `cell cell-${i}-${j}`
// function renderCell(location, value) {

//     var elCell = document.querySelector(`.cell cell-${pos.i}-${pos.j}`);
//     elCell.innerHTML = value;
//   }


// function renderCell(location, value) {
// 	var cellSelector = '.' + getClassName(location);
// 	var elCell = document.querySelector(cellSelector);
// 	elCell.innerHTML = value;
// }

function checkGameOver() {
    gGame.isOn = false;
    if (gLevel.mines + gGame.shownCount === (gLevel.SIZE ** 2) - 2) {
        console.log('you win!')
        // } else if ()
        // if (gGame.shownCount)
    }



    // function expandShown(board, elCell, i, j) { };


    // timer
    // function startStopWatch() {
    //     gWatchInterval = setInterval(updateWatch, 1)
    //     gStartTime = Date.now()
    // }

    // function updateWatch() {
    //     var now = Date.now()
    //     var time = ((now - gStartTime) / 1000).toFixed(3)
    //     var elTime = document.querySelector('.time')
    //     elTime.innerText = time
    // }

    // function endStopWatch() {
    //     clearInterval(gWatchInterval)
    //     gWatchInterval = null
}
// 