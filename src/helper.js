import { NO_PLAYER, PLAYER_1, PLAYER_2 } from "./constants";

export const isWinner = (gameBoard, currentPlayer, id) => {
    let board = [...gameBoard];
    board[id] = currentPlayer;

    const winningPositions = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
        const [c1, c2, c3, c4] = winningPositions[i];

        if (
            board[c1] !== 0 &&
            board[c1] === board[c2] &&
            board[c1] === board[c3] &&
            board[c1] === board[c4]
        ) {
            return true;
        }
    }
    return false;
};

export const isDraw = (gameBoard, currentPlayer, id) => {
    let board = [...gameBoard];
    board[id] = currentPlayer;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === NO_PLAYER) return false;
    }
    return true;
};

const getAvailablePositions = (gameBoard) => {
    const availablePositions = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === NO_PLAYER) availablePositions.push(i);
    }
    return availablePositions;
}

const randomMove = (gameBoard) => {
    const availablePositions = getAvailablePositions(gameBoard);
    const randomId = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomId];
}

const oneStepAhead = (currentPlayer, gameBoard) => {
    const availablePositions = getAvailablePositions(gameBoard);
    const nextPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    for (let i = 0; i < availablePositions.length; i++) {
        if (isWinner(gameBoard, nextPlayer, availablePositions[i]))
            return availablePositions[i];
    }
    return -1;
}

const twoStepsAhead = (currentPlayer, gameBoard) => {
    const availablePositions = getAvailablePositions(gameBoard);
    for (let i = 0; i < availablePositions.length; i++) {
        let board = [...gameBoard];
        board[availablePositions[i]] = currentPlayer;
        for (let j = 0; j < availablePositions.length; j++) {
            if (i === j) continue;
            if (isWinner(board, currentPlayer, availablePositions[j]))
                return availablePositions[j];
        }
    }
    return -1;
}

const threeStepsAhead = (currentPlayer, gameBoard) => {
    const availablePositions = getAvailablePositions(gameBoard);
    const nextPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    for (let i = 0; i < availablePositions.length; i++) {
        let nextBoard = [...gameBoard];
        nextBoard[availablePositions[i]] = currentPlayer;
        for (let j = 0; j < availablePositions.length; j++) {
            if (j === i) continue;
            let nextNextBoard = [...nextBoard];
            nextNextBoard[availablePositions[j]] = nextPlayer;
            for (let k = 0; k < availablePositions.length; k++) {
                if (k === j) continue;
                if (isWinner(nextNextBoard, nextPlayer, availablePositions[k]))
                    return availablePositions[k];
            }
        }
    }
    return -1;
}

export const suggest = (gameBoard, currentPlayer) => {
    const oneStepAheadMove = oneStepAhead(currentPlayer, gameBoard);
    if (oneStepAheadMove !== -1) return oneStepAheadMove;

    const twoStepAheadMove = twoStepsAhead(currentPlayer, gameBoard);
    if (twoStepAheadMove !== -1) return twoStepAheadMove;

    const threeStepAheadMove = threeStepsAhead(currentPlayer, gameBoard);
    if (threeStepAheadMove !== -1) return threeStepAheadMove;

    return randomMove(gameBoard);
};
