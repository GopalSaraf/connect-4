import { IS_GAME_PLAYING } from '../constants';

const Footer = ({ onNewGameClicked, onSuggestMove, gameState }) => {

    return (
        <div className="panel footer">
            {gameState === IS_GAME_PLAYING && <button onClick={onSuggestMove}>Suggest</button>}
            {gameState !== IS_GAME_PLAYING && <button onClick={onNewGameClicked}>New Game</button>}
        </div>
    );
};

export default Footer;