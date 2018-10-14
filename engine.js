/* Checkers Engine */
// Given a board at a specific instance in time and a color, returns the best move for that color

const positionValuesWhite = [
    [0, 5, 0, 5, 0, 5, 0, 5],
    [4, 0, 2, 0, 2, 0, 3, 0],
    [0, 3, 0, 1, 0, 2, 0, 4],
    [4, 0, 2, 0, 1, 0, 3, 0],
    [0, 3, 0, 1, 0, 2, 0, 4],
    [4, 0, 2, 0, 2, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 4],
    [4, 0, 6, 0, 6, 0, 6, 0]
];
const positionValuesBlack = [
    [0, 6, 0, 6, 0, 6, 0, 4],
    [4, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 2, 0, 2, 0, 4],
    [4, 0, 2, 0, 1, 0, 3, 0],
    [0, 3, 0, 1, 0, 2, 0, 4],
    [4, 0, 2, 0, 1, 0, 3, 0],
    [0, 3, 0, 2, 0, 2, 0, 4],
    [5, 0, 5, 0, 5, 0, 5, 0]
];

let thinking = false;
let maxDepth = 11;
let skipTurn = false;

// function makeRandomMove() {
//     let moves = getAllMoves();
//     if(moves.length !== 0) {
//         const moveIdx = Math.floor(moves.length * Math.random());
//         performMove(moves[moveIdx]);
//     }
// }

function makeBestMove() {
    thinking = true;
    // makeRandomMove();
    let initialMoves = getAllMoves();
    if(initialMoves.length !== 0) {
        if(initialMoves.length === 1) {
            performMove(initialMoves[0]);
        } else {
            let color = (whiteToMove)? 1: -1;
            negamax(initialMoves, (color === 1)? maxDepth: maxDepth + 1, -1000, 1000, color);
            initialMoves.sort(function (a, b) {
                return b.score - a.score;
            });
            performMove(initialMoves[0]);
            console.log(initialMoves[0].score);
        }
    }
    thinking = false;
}

function negamax(initialMoves, depth, alpha, beta, color) {
    if(!skipTurn) {
        if (depth === 0 || whiteWin || blackWin) {
            return color * evaluate();
        }
        let moves = (initialMoves !== null) ? initialMoves : getAllMoves();
        for (const move of moves) {
            make(move);
            let bestScore =  -negamax(null, depth - 1, -beta, -alpha, -color);
            if (bestScore >= alpha) {
                alpha = bestScore;
                if (initialMoves != null) {
                    move.score = bestScore;
                }
            }
            unmake(move);
            if (alpha >= beta) break;
        }
        return alpha;
    } else {
        skipTurn = false;
        return -negamax(null, depth, -beta, -alpha, -color);
    }
}

function make(move) {
    // move the piece's location
    let piece = getPiece(move.fromX, move.fromY);
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

    //check victory
    let temp = mustJump;
    mustJump = false;
    if (isWinWhite()) {
        whiteWin = true;
    } else if(isWinBlack()) {
        blackWin = true;
    }
    mustJump = temp;

    // check if jump chain
    if(!isMoveable(lastJumpX, lastJumpY)) {
        whiteToMove = !whiteToMove;
        lastJumpX = -1;
        lastJumpY = -1;
        mustJump = (whiteToMove) ? mustJumpWhite() : mustJumpBlack();
    } else if (lastJumpX !== -1){
        skipTurn = true;
    }
}

function unmake(move) {
    // move the piece's location back
    let piece = getPiece(move.toX, move.toY);
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

function evaluate() {
    if (whiteWin) return 999;
    if (blackWin) return -999;

    let whiteScore = 0;
    for(const piece of whitePieces) {
        if(!piece.captured) {
            whiteScore += 10;
            whiteScore += positionValuesWhite[7 - piece.y][piece.x];
            if (piece.king) whiteScore += 5;
        }
    }

    let blackScore = 0;
    for(const piece of blackPieces) {
        if(!piece.captured) {
            blackScore += 10;
            blackScore += positionValuesBlack[7 - piece.y][piece.x];
            if (piece.king) blackScore += 5;
        }
    }

    return whiteScore - blackScore;
}
