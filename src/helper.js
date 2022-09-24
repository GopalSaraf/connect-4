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

export const suggest = (gameBoard, currentPlayer) => {
    const availablePositions = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === NO_PLAYER) availablePositions.push(i);
    }

    const nextPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    for (let i = 0; i < availablePositions.length; i++) {
        if (isWinner(gameBoard, nextPlayer, availablePositions[i]))
            return availablePositions[i];
    }

    const randomId = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomId];
};
