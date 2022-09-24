import { useState } from 'react';
import GameCircle from './GameCircle';
import Header from './Header';
import Footer from './Footer';
import '../game.css';
import { isWinner, isDraw, suggest } from '../helper'
import {
    CIRCLE_COUNT, NO_PLAYER, PLAYER_1, PLAYER_2,
    IS_GAME_WIN, IS_GAME_PLAYING, IS_GAME_DRAW
} from '../constants';


const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(Array(CIRCLE_COUNT).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(IS_GAME_PLAYING);
    const [gameWinner, setGameWinner] = useState(NO_PLAYER);

    const initGame = () => {
        setGameBoard(Array(CIRCLE_COUNT).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(IS_GAME_PLAYING);
        setGameWinner(NO_PLAYER);
    }

    const suggestMove = () => {
        const id = suggest(gameBoard, currentPlayer);
        circleClicked(id);
    }

    const initCircle = () => {
        const circles = [];
        for (let i = 0; i < CIRCLE_COUNT; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const circleClicked = (id) => {

        if (gameState === IS_GAME_WIN) return;
        if (gameBoard[id] !== NO_PLAYER) return;

        if (isWinner(gameBoard, currentPlayer, id)) {
            setGameState(IS_GAME_WIN);
            setGameWinner(currentPlayer);
        }

        if (isDraw(gameBoard, currentPlayer, id)) {
            setGameState(IS_GAME_DRAW);
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }

    const renderCircle = (id) => {
        let className = "";
        if (gameBoard[id] === 0) className = "gameCircle-NO_PLAYER";
        else if (gameBoard[id] === 1) className = "gameCircle-PLAYER_1";
        else className = "gameCircle-PLAYER_2";

        return <GameCircle key={id} id={id} className={className}
            onCircleClicked={circleClicked} />
    }

    return (
        <>
            <Header currentPlayer={currentPlayer} gameWinner={gameWinner} gameState={gameState} />
            <div className='gameBoard'>
                {initCircle()}
            </div>
            <Footer onNewGameClicked={initGame} onSuggestMove={suggestMove} gameState={gameState} />
        </>
    )
}

export default GameBoard;