/* Game of Checkers */

// board representation: bit board with piece tables
let board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1,  0, 13,  0, 14,  0, 15,  0, 16, -1], // 7 row
    [-1, 17,  0, 18,  0, 19,  0, 20,  0, -1], // 6 row
    [-1,  0, 21,  0, 22,  0, 23,  0, 24, -1], // 5 row
    [-1,  0,  0,  0,  0,  0,  0,  0,  0, -1], // 4 row
    [-1,  0,  0,  0,  0,  0,  0,  0,  0, -1], // 3 row
    [-1,  1,  0,  2,  0,  3,  0,  4,  0, -1], // 2 row
    [-1,  0,  5,  0,  6,  0,  7,  0,  8, -1], // 1 row
    [-1,  9,  0, 10,  0, 11,  0, 12,  0, -1], // 0 row
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

let whitePieces = [
    { x: 0, y: 2, color: "W", captured: false, king: false }, // piece 1
    { x: 2, y: 2, color: "W", captured: false, king: false }, // piece 2
    { x: 4, y: 2, color: "W", captured: false, king: false }, // piece 3
    { x: 6, y: 2, color: "W", captured: false, king: false }, // piece 4
    { x: 1, y: 1, color: "W", captured: false, king: false }, // piece 5
    { x: 3, y: 1, color: "W", captured: false, king: false }, // piece 6
    { x: 5, y: 1, color: "W", captured: false, king: false }, // piece 7
    { x: 7, y: 1, color: "W", captured: false, king: false }, // piece 8
    { x: 0, y: 0, color: "W", captured: false, king: false }, // piece 9
    { x: 2, y: 0, color: "W", captured: false, king: false }, // piece 10
    { x: 4, y: 0, color: "W", captured: false, king: false }, // piece 11
    { x: 6, y: 0, color: "W", captured: false, king: false }  // piece 12
];

let blackPieces = [
    { x: 1, y: 7, color: "B", captured: false, king: false }, // piece 13
    { x: 3, y: 7, color: "B", captured: false, king: false }, // piece 14
    { x: 5, y: 7, color: "B", captured: false, king: false }, // piece 15
    { x: 7, y: 7, color: "B", captured: false, king: false }, // piece 16
    { x: 0, y: 6, color: "B", captured: false, king: false }, // piece 17
    { x: 2, y: 6, color: "B", captured: false, king: false }, // piece 18
    { x: 4, y: 6, color: "B", captured: false, king: false }, // piece 19
    { x: 6, y: 6, color: "B", captured: false, king: false }, // piece 20
    { x: 1, y: 5, color: "B", captured: false, king: false }, // piece 21
    { x: 3, y: 5, color: "B", captured: false, king: false }, // piece 22
    { x: 5, y: 5, color: "B", captured: false, king: false }, // piece 23
    { x: 7, y: 5, color: "B", captured: false, king: false }  // piece 24
];

// let board = [
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1,  0, 13,  0, 14,  0, 15,  0, 16, -1], // 7 row
//     [-1, 17,  0,  0,  0,  0,  0,  0,  0, -1], // 6 row
//     [-1,  0,  0,  0,  0,  0,  0,  0,  1, -1], // 5 row
//     [-1,  2,  0,  0,  0,  0,  0, 18,  0, -1], // 4 row
//     [-1,  0, 19,  0,  0,  0,  0,  0,  0, -1], // 3 row
//     [-1, 20,  0,  3,  0,  4,  0,  5,  0, -1], // 2 row
//     [-1,  0,  0,  0,  0,  0,  0,  0,  0, -1], // 1 row
//     [-1,  6,  0,  7,  0,  0,  0,  8,  0, -1], // 0 row
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
// ];
//
// let whitePieces = [
//     { x: 7, y: 5, color: "W", captured: false, king: false }, // piece 1
//     { x: 0, y: 4, color: "W", captured: false, king: false }, // piece 2
//     { x: 2, y: 2, color: "W", captured: false, king: false }, // piece 3
//     { x: 4, y: 2, color: "W", captured: false, king: false }, // piece 4
//     { x: 6, y: 2, color: "W", captured: false, king: false }, // piece 5
//     { x: 0, y: 0, color: "W", captured: false, king: false }, // piece 6
//     { x: 2, y: 0, color: "W", captured: false, king: false }, // piece 7
//     { x: 6, y: 0, color: "W", captured: false, king: false }, // piece 8
//     { x: 0, y: 0, color: "W", captured: true, king: false }, // piece 9
//     { x: 2, y: 0, color: "W", captured: true, king: false }, // piece 10
//     { x: 4, y: 0, color: "W", captured: true, king: false }, // piece 11
//     { x: 6, y: 0, color: "W", captured: true, king: false }  // piece 12
// ];
//
// let blackPieces = [
//     { x: 1, y: 7, color: "B", captured: false, king: false }, // piece 13
//     { x: 3, y: 7, color: "B", captured: false, king: false }, // piece 14
//     { x: 5, y: 7, color: "B", captured: false, king: false }, // piece 15
//     { x: 7, y: 7, color: "B", captured: false, king: false }, // piece 16
//     { x: 0, y: 6, color: "B", captured: false, king: false }, // piece 17
//     { x: 6, y: 4, color: "B", captured: false, king: false }, // piece 18
//     { x: 1, y: 3, color: "B", captured: false, king: false }, // piece 19
//     { x: 0, y: 2, color: "B", captured: false, king: false }, // piece 20
//     { x: 1, y: 5, color: "B", captured: true, king: false }, // piece 21
//     { x: 3, y: 5, color: "B", captured: true, king: false }, // piece 22
//     { x: 5, y: 5, color: "B", captured: true, king: false }, // piece 23
//     { x: 7, y: 5, color: "B", captured: true, king: false }  // piece 24
// ];


let stackMoves = [];

// program variables
const WIDTH = 600;
const SQUARE_WIDTH = WIDTH/8;
let performingMove = false; // whether a move animation is taking place
let selectX = -1; // x position of last selected square
let selectY = -1; // y position of last selected square

// game state variables
let whiteToMove = true; // whos turn it is
let mustJump = false; // whether there is a jump to be made or not
let lastJumpX = -1; // x-position of the last piece to jump
let lastJumpY = -1; // y-position of the last piece to jump

// game over variables
let whiteWin = false;
let blackWin = false;

// players
let whitePlayer = { ai: false };
let blackPlayer = { ai: true };

function setup() {
    createCanvas(WIDTH, WIDTH);
    frameRate(60);
    textSize(64);
    textAlign(CENTER, CENTER);
    // request first move for AI
    requestMove();
    // draw first frame
    redraw();
}

function draw() {
    if(!thinking) {
        drawBoard();
        drawHighlights();
        drawMoves();

        drawWhitePieces();
        drawBlackPieces();

        drawVictoryMessage();
    }
}

function drawVictoryMessage() {
    if (whiteWin) {
        fill(255);
        stroke(0);
        strokeWeight(5);
        text("White Wins!", WIDTH / 2, WIDTH / 2);
        strokeWeight(1);
    } else if (blackWin) {
        fill(0);
        stroke(255);
        strokeWeight(5);
        text("Black Wins!", WIDTH / 2, WIDTH / 2);
        strokeWeight(1);
    }
}

// LISTENERS
function mouseClicked() {
    if(!performingMove) {
        requestMove();
    }
}

// DRAW FUNCTIONS
function drawWhitePieces() {
    for (const piece of whitePieces) {
        stroke(0);
        fill(255);
        drawPiece(piece);
    }
}

function drawBlackPieces() {
    for (const piece of blackPieces) {
        stroke(124);
        fill(0);
        drawPiece(piece);
    }
}

function drawPiece(piece) {
    if (!piece.captured) {
        const x = piece.x * SQUARE_WIDTH;
        const y = (7 - piece.y) * SQUARE_WIDTH;
        ellipse(x + SQUARE_WIDTH / 2, y + SQUARE_WIDTH / 2, SQUARE_WIDTH - 12, SQUARE_WIDTH - 12);
        if(piece.king) {
            noFill();
            stroke(247, 191, 51);
            rect(x + SQUARE_WIDTH / 2 - 10, y + SQUARE_WIDTH / 2 - 10, 20, 20);
        }
    }
}

function drawHighlights() {
    if(!performingMove) {
        if (hasPiece(selectX, selectY) && whiteToMove === isWhite(selectX, selectY)) {
            fill(247, 191, 51);
            rect(selectX * SQUARE_WIDTH, (7 - selectY) * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
        }

        noFill();
        stroke(0, 255, 0);
        if(whiteToMove && !whitePlayer.ai) {
            for (const piece of whitePieces) {
                if (!piece.captured && isMoveableWhite(piece.x, piece.y)) {
                    rect(piece.x * SQUARE_WIDTH + 4, (7 - piece.y) * SQUARE_WIDTH + 4, SQUARE_WIDTH - 8, SQUARE_WIDTH - 8);
                }
            }
        } else if (!whiteToMove && !blackPlayer.ai) {
            for (const piece of blackPieces) {
                if (!piece.captured && isMoveableBlack(piece.x, piece.y)) {
                    rect(piece.x * SQUARE_WIDTH + 4, (7 - piece.y) * SQUARE_WIDTH + 4, SQUARE_WIDTH - 8, SQUARE_WIDTH - 8);
                }
            }
        }
    }
}

function drawMoves() {
    noStroke();
    if (hasPiece(selectX, selectY) && whiteToMove === isWhite(selectX, selectY)) {
        let moves = getMoves(selectX, selectY);
        fill(247, 191, 51, 200);
        for (const move of moves) {
            ellipse(move.toX * SQUARE_WIDTH + SQUARE_WIDTH/2, (7 - move.toY) * SQUARE_WIDTH + SQUARE_WIDTH/2, SQUARE_WIDTH/5, SQUARE_WIDTH/5);
        }
    }
}

function drawBoard() {
    stroke(255);
    let whiteFirst = true;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            (whiteFirst)? fill(207, 167, 110): fill(102, 62, 15);
            whiteFirst = !whiteFirst;
            rect(i * SQUARE_WIDTH, j * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
        }
        whiteFirst = !whiteFirst;
    }
}

// MOVE GENERATION
function getAllMoves() {
    if (whiteToMove) {
        return getAllMovesWhite();
    } else {
        return getAllMovesBlack();
    }
}

function getAllMovesWhite() {
    let moves = [];
    if(lastJumpX !== -1) {
        let piece = getPiece(lastJumpX, lastJumpY);
        addMovesInDirection(moves, piece, 1, 1, "B");
        addMovesInDirection(moves, piece, -1, 1, "B");
        if (getPiece(piece.x, piece.y).king) {
            addMovesInDirection(moves, piece, 1, -1, "B");
            addMovesInDirection(moves, piece, -1, -1, "B");
        }
    } else {
        for (const piece of whitePieces) {
            if (!piece.captured) {
                addMovesInDirection(moves, piece, 1, 1, "B");
                addMovesInDirection(moves, piece, -1, 1, "B");
                if (getPiece(piece.x, piece.y).king) {
                    addMovesInDirection(moves, piece, 1, -1, "B");
                    addMovesInDirection(moves, piece, -1, -1, "B");
                }
            }
        }
    }
    return moves;
}

function getAllMovesBlack() {
    let moves = [];
    if(lastJumpX !== -1) {
        let piece = getPiece(lastJumpX, lastJumpY);
        addMovesInDirection(moves, piece, 1, -1, "W");
        addMovesInDirection(moves, piece, -1, -1, "W");
        if (getPiece(piece.x, piece.y).king) {
            addMovesInDirection(moves, piece, 1, 1, "W");
            addMovesInDirection(moves, piece, -1, 1, "W");
        }
    } else {
        for (const piece of blackPieces) {
            if (!piece.captured) {
                addMovesInDirection(moves, piece, 1, -1, "W");
                addMovesInDirection(moves, piece, -1, -1, "W");
                if (getPiece(piece.x, piece.y).king) {
                    addMovesInDirection(moves, piece, 1, 1, "W");
                    addMovesInDirection(moves, piece, -1, 1, "W");
                }
            }
        }
    }
    return moves;
}

function getMoves(x, y) {
    if (isWhite(x, y)) {
        return getMovesWhite(x, y);
    } else if (isBlack(x, y)) {
        return getMovesBlack(x, y);
    }
}

function getMovesWhite(x, y) {
    let moves = [];
    let piece = getPiece(x, y);
    addMovesInDirection(moves, piece, 1, 1, "B");
    addMovesInDirection(moves, piece, -1, 1, "B");
    if (piece.king) {
        addMovesInDirection(moves, piece, 1, -1, "B");
        addMovesInDirection(moves, piece, -1, -1, "B");
    }
    return moves;
}

function getMovesBlack(x, y) {
    let moves = [];
    let piece = getPiece(x, y);
    addMovesInDirection(moves, piece, 1, -1, "W");
    addMovesInDirection(moves, piece, -1, -1, "W");
    if (piece.king) {
        addMovesInDirection(moves, piece, 1, 1, "W");
        addMovesInDirection(moves, piece, -1, 1, "W");
    }
    return moves;
}

function addMovesInDirection(moves, piece, dirX, dirY, col) {
    const x = piece.x;
    const y = piece.y;
    if (hasPiece(x + dirX, y + dirY)) { // if has piece
        const toJump = getPiece(x + dirX, y + dirY);
        if (toJump.color === col && isBlank(x + 2 * dirX, y + 2 * dirY)) { // if can jump piece
            moves.push({ fromX: x, fromY: y, toX: x + 2 * dirX, toY: y + 2 * dirY, wasKing: piece.king, state: getState(), killNum: getNum(x + dirX, y + dirY) });
        }
    } else if (isBlank(x + dirX, y + dirY) && !mustJump) { // if is blank
        moves.push({ fromX: x, fromY: y, toX: x + dirX, toY: y + dirY, wasKing: piece.king, state: getState() });
    }
}

function getMoveablePieces() {
    if (whiteToMove) {
        return getMoveablePiecesWhite();
    } else {
        return getMoveablePiecesBlack();
    }
}

function getMoveablePiecesWhite() {
    let movables = [];
    for (const piece of whitePieces) {
        if (isMoveableWhite(piece.x, piece.y)) {
            movables.push(piece);
        }
    }
    return movables;
}

function getMoveablePiecesBlack() {
    let movables = [];
    for (const piece of blackPieces) {
        if (isMoveableBlack(piece.x, piece.y)) {
            movables.push(piece);
        }
    }
    return movables;
}

function isMoveable(x, y) {
    if (isWhite(x, y)) {
        return isMoveableWhite(x, y);
    } else if (isBlack(x, y)) {
        return isMoveableBlack(x, y);
    }
}

function isMoveableWhite(x, y) {
    if (isMoveableInDirection(x, y, 1, 1, "B")) return true;
    if (isMoveableInDirection(x, y, -1, 1, "B")) return true;
    if (getPiece(x, y).king) {
        if (isMoveableInDirection(x, y, 1, -1, "B")) return true;
        if (isMoveableInDirection(x, y, -1, -1, "B")) return true;
    }
    return false;
}

function isMoveableBlack(x, y) {
    if (isMoveableInDirection(x, y, 1, -1, "W")) return true;
    if (isMoveableInDirection(x, y, -1, -1, "W")) return true;
    if (getPiece(x, y).king) {
        if (isMoveableInDirection(x, y, 1, 1, "W")) return true;
        if (isMoveableInDirection(x, y, -1, 1, "W")) return true;
    }
    return false;
}

function isMoveableInDirection(x, y, dirX, dirY, col) {
    if (hasPiece(x + dirX, y + dirY)) { // if has piece
        const piece = getPiece(x + dirX, y + dirY);
        if (piece.color === col && isBlank(x + 2 * dirX, y + 2 * dirY)) { // if can jump piece
            return true;
        }
    } else if (isBlank(x + dirX, y + dirY) && !mustJump) { // if is blank
        return true;
    }
    return false;
}

function mustJumpWhite() {
    if (lastJumpX !== -1) {
        let piece = getPiece(lastJumpX, lastJumpY);
        if (mustJumpInDirection(piece.x, piece.y, 1, 1, "B")) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, 1, "B")) return true;
        if (getPiece(piece.x, piece.y).king) {
            if (mustJumpInDirection(piece.x, piece.y, 1, -1, "B")) return true;
            if (mustJumpInDirection(piece.x, piece.y, -1, -1, "B")) return true;
        }
    } else {
        for (const piece of whitePieces) {
            if (!piece.captured) {
                if (mustJumpInDirection(piece.x, piece.y, 1, 1, "B")) return true;
                if (mustJumpInDirection(piece.x, piece.y, -1, 1, "B")) return true;
                if (getPiece(piece.x, piece.y).king) {
                    if (mustJumpInDirection(piece.x, piece.y, 1, -1, "B")) return true;
                    if (mustJumpInDirection(piece.x, piece.y, -1, -1, "B")) return true;
                }
            }
        }
    }
    return false;
}

function mustJumpBlack() {
    if (lastJumpX !== -1) {
        let piece = getPiece(lastJumpX, lastJumpY);
        if (mustJumpInDirection(piece.x, piece.y, 1, -1, "W")) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, -1, "W")) return true;
        if (getPiece(piece.x, piece.y).king) {
            if (mustJumpInDirection(piece.x, piece.y, 1, 1, "W")) return true;
            if (mustJumpInDirection(piece.x, piece.y, -1, 1, "W")) return true;
        }
    } else {
        for (const piece of blackPieces) {
            if (!piece.captured) {
                if (mustJumpInDirection(piece.x, piece.y, 1, -1, "W")) return true;
                if (mustJumpInDirection(piece.x, piece.y, -1, -1, "W")) return true;
                if (getPiece(piece.x, piece.y).king) {
                    if (mustJumpInDirection(piece.x, piece.y, 1, 1, "W")) return true;
                    if (mustJumpInDirection(piece.x, piece.y, -1, 1, "W")) return true;
                }
            }
        }
    }
    return false;
}

function mustJumpInDirection(x, y, dirX, dirY, col) {
    if (hasPiece(x + dirX, y + dirY)) { // if has piece
        const piece = getPiece(x + dirX, y + dirY);
        if (piece.color === col && isBlank(x + 2 * dirX, y + 2 * dirY)) { // if can jump piece
            return true;
        }
    }
    return false;
}

// GAME INTERACTION FUNCTIONS
function requestMove() {
    if(whiteToMove && !whitePlayer.ai || !whiteToMove && !blackPlayer.ai) {
        let moves = undefined;
        if (whiteToMove && isWhite(selectX, selectY)) {
            moves = getMovesWhite(selectX, selectY);
        } else if (!whiteToMove && isBlack(selectX, selectY)) {
            moves = getMovesBlack(selectX, selectY);
        }

        selectX = Math.floor(mouseX / SQUARE_WIDTH);
        selectY = 7 - Math.floor(mouseY / SQUARE_WIDTH);

        if (typeof moves !== 'undefined') {
            for (const move of moves) {
                if (selectX === move.toX && selectY === move.toY) {
                    performMove(move);
                }
            }
        }
    } else {
        makeBestMove();
    }
}

function performMove(move) {
    performingMove = true;
    let piece = getPiece(move.fromX, move.fromY);
    let start = Date.now();
    const duration = 500;
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= duration) {
            clearInterval(timer);
            movePiece(piece, move);
            checkVictory();
            switchTurns();
            return;
        }
        piece.x = lerp(move.fromX, move.toX, timePassed / duration);
        piece.y = lerp(move.fromY, move.toY, timePassed / duration);
    }, 0);
}

function movePiece(piece, move) {
    // move the piece's location
    piece.x = move.toX;
    piece.y = move.toY;
    let value = board[8 - move.fromY][move.fromX + 1];
    board[8 - move.fromY][move.fromX + 1] = 0;
    board[8 - move.toY][move.toX + 1] = value;

    // kill jumped piece
    if (typeof move.killNum !== 'undefined') {
        let kill = getPieceByNum(move.killNum);
        kill.captured = true;
        board[8 - kill.y][kill.x + 1] = 0;
        lastJumpX = move.toX;
        lastJumpY = move.toY;
    }

    // conditionally promote piece
    if(piece.color === "W" && piece.y === 7) {
        piece.king = true;
    } else if (piece.color === "B" && piece.y === 0) {
        piece.king = true;
    }

    stackMoves.push(move);
}

function performUnmove(move) {
    performingMove = true;
    let piece = getPiece(move.toX, move.toY);
    let start = Date.now();
    const duration = 100;
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= duration) {
            clearInterval(timer);
            unmovePiece(piece, move);
            performingMove = false;
            playbackGame();
            return;
        }
        piece.x = lerp(move.toX, move.fromX, timePassed / duration);
        piece.y = lerp(move.toY, move.fromY, timePassed / duration);
    }, 0);
}

function unmovePiece(piece, move) {
    // move the piece's location back
    piece.x = move.fromX;
    piece.y = move.fromY;
    let value = board[8 - move.toY][move.toX + 1];
    board[8 - move.toY][move.toX + 1] = 0;
    board[8 - move.fromY][move.fromX + 1] = value;

    // revive jumped piece
    if (typeof move.killNum !== 'undefined') {
        let kill = getPieceByNum(move.killNum);
        kill.captured = false;
        board[8 - kill.y][kill.x + 1] = move.killNum;
    }

    // un-promote piece
    piece.king = move.wasKing;

    // rollback game state
    whiteWin = false;
    blackWin = false;
    setState(move.state);
}

function switchTurns() {
    selectX = -1;
    selectY = -1;
    performingMove = false;
    if (!isMoveable(lastJumpX, lastJumpY)) { // if there isn't a jump chain, then switch turns
        whiteToMove = !whiteToMove;
        lastJumpX = -1;
        lastJumpY = -1;
        mustJump = (whiteToMove) ? mustJumpWhite() : mustJumpBlack();
    }
    setTimeout(function () {
        requestMove();
    }, 100); // after current player has moved, request move on behalf of the AI
}

function playbackGame() {
    selectX = -1;
    selectY = -1;
    if(stackMoves.length > 0) {
        performUnmove(stackMoves.pop());
    }
}

function checkVictory() {
    let temp = mustJump;
    mustJump = false; // must be set to avoid strange results
    if (isWinWhite()) {
        console.log('White');
        whiteWin = true;
        setTimeout(function () {
            playbackGame();
        }, 1000);
    } else if(isWinBlack()) {
        console.log('Black');
        blackWin = true;
        setTimeout(function () {
            playbackGame();
        }, 1000);
    }
    mustJump = temp;
}

function isWinWhite() {
    for (const piece of blackPieces) { // white can only win when black has no pieces or no moves on his turn
        if(!piece.captured && (isMoveableBlack(piece.x, piece.y) || !whiteToMove)) {
            return false;
        }
    }
    return true;
}

function isWinBlack() {
    for (const piece of whitePieces) { // black can only win when white has no pieces or no moves on his turn
        if(!piece.captured && (isMoveableWhite(piece.x, piece.y)) || whiteToMove) {
            return false;
        }
    }
    return true;
}

// UTILITY FUNCTIONS
function getPiece(x, y) {
    const num = board[8 - y][x + 1];
    if (num >= 1 && num <= 12) {
        return whitePieces[num - 1];
    } else if (num >= 13 && num <= 24) {
        return blackPieces[num - 12 - 1];
    }
}

function getPieceByNum(num) {
    if (num >= 1 && num <= 12) {
        return whitePieces[num - 1];
    } else if (num >= 13 && num <= 24) {
        return blackPieces[num - 12 - 1];
    }
}

function hasPiece(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 1 && num <= 24;
}

function isOutOfBounds(x, y) {
    const num = board[8 - y][x + 1];
    return num === -1;
}

function isBlank(x, y) {
    const num = board[8 - y][x + 1];
    return num === 0;
}

function isWhite(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 1 && num <= 12;
}

function isBlack(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 13 && num <= 24;
}

function getNum(x, y) {
    return board[8 - y][x + 1];
}

function colorOf(x, y) {
    if (isWhite(x, y)) {
        return "W";
    } else if (isBlack(x, y)){
        return "B";
    }
}

function getState() {
    return { whiteToMove: whiteToMove, mustJump: mustJump, lastJumpX: lastJumpX, lastJumpY: lastJumpY };
}

function setState(state) {
    whiteToMove = state.whiteToMove;
    mustJump = state.mustJump;
    lastJumpX = state.lastJumpX;
    lastJumpY = state.lastJumpY;
}