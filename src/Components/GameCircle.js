import React from 'react';
import '../game.css';

const onClick = (id) => {
    alert('Click ' + id);
}

const GameCircle = (props) => {
    return (
        <div className={`gameCircle ${props.className}`}
            onClick={() => props.onCircleClicked(props.id)}>
            {props.children}
        </div>
    )
}

export default GameCircle