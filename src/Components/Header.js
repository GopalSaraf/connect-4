import React from 'react';
import { IS_GAME_PLAYING, IS_GAME_WIN, IS_GAME_DRAW } from '../constants'

const Header = ({ currentPlayer, gameWinner, gameState }) => {
    const renderHeader = () => {
        switch (gameState) {
            case IS_GAME_PLAYING:
                return <div>Player {currentPlayer} Turn</div>
            case IS_GAME_WIN:
                return <div>Player {gameWinner} wins</div>
            case IS_GAME_DRAW:
                return <div>Game is a draw!</div>
        }
    }
    return (
        <div className="panel header">
            <div className="header-text">{renderHeader()}</div>
        </div>
    );
};

export default Header;
