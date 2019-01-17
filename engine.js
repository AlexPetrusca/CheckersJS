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

let maxDepth = 10;
let thinking = false;
let skipTurn = false;
let tt = {"table": new Map(), "EXACT": 1, "LOWERBOUND": 2, "UPPERBOUND": 3};
let zobristTable = []; // W = 1, WK = 2, B = 3, BK = 4
let zobristHash = 0;
initZobrist();
let num_cutoffs = 0;

// function makeRandomMove() {
//     let moves = getAllMoves();
//     if(moves.length !== 0) {
//         const moveIdx = Math.floor(moves.length * Math.random());
//         performMove(moves[moveIdx]);
//     }
// }

function getBestMove(evaluatedMoves) {
    return evaluatedMoves.reduce((prev, curr) => {
        if (curr.score > prev.score) {
            return curr;
        } else {
            return prev;
        }
    });
}

function makeBestMove() {
    thinking = true;
    resetZobristHash();
    let initialMoves = getAllMoves();
    if (initialMoves.length !== 0) {
        if (initialMoves.length === 1) {
            performMove(initialMoves[0]);
            console.log("score: " + evaluate().toFixed(1));
        } else {
            let bestMove;
            for (let curDepth = 1; curDepth <= maxDepth; curDepth++) {
                num_cutoffs = 0;
                negamax(initialMoves, curDepth, -Infinity, Infinity);
                bestMove = getBestMove(initialMoves);
                // debug log - depth
                console.log(`depth: ${curDepth} - (${bestMove.fromX}, ${bestMove.fromY}) to (${bestMove.toX}, ${bestMove.toY})`);
            }
            performMove(bestMove);
            //debug log - score +  cut-offs
            console.log("cutoffs: " + num_cutoffs);
            console.log("score: " + bestMove.score.toFixed(1));
        }
    }
    thinking = false;
}

function orderMoves(moves) {
    return moves;
}

function generateMoves(initialMoves) {
    return (initialMoves !== null) ? initialMoves : getAllMoves();
}

// Negamax with Alpha-Beta Pruning and Transposition Table Lookup
function negamax(initialMoves, depth, alpha, beta) {
    if(!skipTurn) {
        let alphaOrig = alpha;

        let ttEntry = getTransposition();
        if (ttEntry !== undefined && ttEntry.depth >= depth) {
            if (ttEntry.flag === tt.EXACT) {
                return ttEntry.value;
            } else if (ttEntry.flag === tt.LOWERBOUND) {
                alpha = Math.max(alpha, ttEntry.value);
            } else if (ttEntry.flag === tt.UPPERBOUND) {
                beta = Math.min(beta, ttEntry.value);
            }

            if (alpha >= beta) {
                num_cutoffs++;
                return ttEntry.value;
            }
        }

        if (depth === 0 || whiteWin || blackWin) {
            return quiesce(-beta, -alpha);
        }
        let moves = generateMoves(initialMoves);
        moves = orderMoves(moves);
        for (const move of moves) {
            make(move);
            let bestScore = -negamax(null, depth - 1, -beta, -alpha);
            if (bestScore >= alpha) {
                alpha = bestScore;
                if (initialMoves != null) {
                    move.score = bestScore;
                }
            }
            unmake(move);
            if (alpha >= beta) {
                num_cutoffs++;
                break;
            }
        }

        let ttDepth = (ttEntry === undefined) ? -1 : ttEntry.depth;
        if (ttDepth === -1
            // || depth >= ttDepth
        ) {
            let ttNew = {value: alpha, flag: tt.EXACT, depth: depth};
            if (ttNew.value <= alphaOrig) {
                ttNew.flag = tt.UPPERBOUND;
            } else if (ttNew.value >= beta) {
                ttNew.flag = tt.LOWERBOUND
            }
            putTransposition(ttNew);
        }

        return alpha;
    } else {
        skipTurn = false;
        return -negamax(null, depth, -beta, -alpha);
    }
}

// Quiescence Search
function quiesce(alpha, beta) {
    let score = evaluate();
    if (score >= beta) return score;

    let captures = getAllCaptures();
    for (const capture of captures) {
        make(capture);
        score = -quiesce(-beta, -alpha);
        unmake(capture);
        if (score >= alpha) {
            alpha = score;
            if (score >= beta) break;
        }
    }

    return score;
}

function make(move) {
    updateZobrist(move.fromX, move.fromY); // remove old position from hash
    // move the piece's location
    let piece = getPiece(move.fromX, move.fromY);
    piece.x = move.toX;
    piece.y = move.toY;
    let value = board[8 - move.fromY][move.fromX + 1];
    board[8 - move.fromY][move.fromX + 1] = 0;
    board[8 - move.toY][move.toX + 1] = value;

    // kill jumped piece
    if (move.killNum !== -1) {
        let kill = getPieceByNum(move.killNum);
        updateZobrist(kill.x, kill.y); // remove killed piece from hash
        kill.captured = true;
        board[8 - kill.y][kill.x + 1] = 0;
        lastJumpX = move.toX;
        lastJumpY = move.toY;
    }

    // conditionally promote piece
    if (piece.color === "W" && piece.y === 7) {
        piece.king = true;
    } else if (piece.color === "B" && piece.y === 0) {
        piece.king = true;
    }
    updateZobrist(move.toX, move.toY); // add new position to hash

    // check victory
    let temp = mustJump;
    mustJump = false;
    if (isWinWhite()) {
        whiteWin = true;
    } else if (isWinBlack()) {
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

    changeSidesZobrist();
}

function unmake(move) {
    updateZobrist(move.toX, move.toY); // remove old position from hash
    // move the piece's location back
    let piece = getPiece(move.toX, move.toY);
    piece.x = move.fromX;
    piece.y = move.fromY;
    let value = board[8 - move.toY][move.toX + 1];
    board[8 - move.toY][move.toX + 1] = 0;
    board[8 - move.fromY][move.fromX + 1] = value;

    // revive jumped piece
    if (move.killNum !== -1) {
        let kill = getPieceByNum(move.killNum);
        kill.captured = false;
        board[8 - kill.y][kill.x + 1] = move.killNum;
        updateZobrist(kill.x, kill.y); // add new piece to hash
    }

    // un-promote piece
    piece.king = move.wasKing;
    updateZobrist(move.fromX, move.fromY); // add new position to hash

    // rollback game state
    whiteWin = false;
    blackWin = false;
    setState(move.state);

    changeSidesZobrist();
}

function evaluate() {
    let color = (whiteToMove) ? 1 : -1;
    if (whiteWin) return color * 999;
    if (blackWin) return color * -999;

    let whiteScore = 0;
    for (const piece of whitePieces) {
        if (!piece.captured) {
            whiteScore += 1;
            whiteScore += positionValuesWhite[7 - piece.y][piece.x] / 20;
            if (piece.king) whiteScore += 1;
        }
    }

    let blackScore = 0;
    for (const piece of blackPieces) {
        if (!piece.captured) {
            blackScore += 1;
            blackScore += positionValuesBlack[7 - piece.y][piece.x] / 20;
            if (piece.king) blackScore += 1;
        }
    }

    whiteScore += getMoveCountWhite() / 100;
    blackScore += getMoveCountBlack() / 100;

    return color * (whiteScore - blackScore);
}

// Transposition Table Helper Functions
function getTransposition() {
    return tt.table.get(zobristHash);
}

function putTransposition(ttEntry) {
    return tt.table.set(zobristHash, ttEntry);
}

// Zobrist Hashing Helper Functions
function initZobrist() {
    zobristTable.changeSidesHash = getRandom32Bit();
    for (let x = 0; x < 8; x++) {
        zobristTable.push([]);
        for (let y = 0; y < 8; y++) {
            zobristTable[x].push([]);
            zobristTable[x][y].push(getRandom32Bit());
            zobristTable[x][y].push(getRandom32Bit());
            zobristTable[x][y].push(getRandom32Bit());
            zobristTable[x][y].push(getRandom32Bit());
        }
    }
    resetZobristHash()
}

function resetZobristHash() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            updateZobrist(x, y);
        }
    }
}

function getRandom32Bit() {
    let num32 = Math.floor(2 * (Math.random() - 0.5) * 0x7FFFFFFF);
    return num32 | 0;
}

function updateZobrist(x, y) {
    if (hasPiece(x, y)) {
        let kingOffset = isKing(x, y) ? 1 : 0;
        let zobristIdx = (isWhite(x, y) ? 0 : 2) + kingOffset;
        zobristHash = zobristHash ^ zobristTable[x][y][zobristIdx];
    }
}

function changeSidesZobrist() {
    zobristHash = zobristHash ^ zobristTable.changeSidesHash;
}