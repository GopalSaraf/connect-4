import '../game.css';

const GameCircle = (props) => {
    return (
        <div className={`gameCircle ${props.className}`}
            onClick={() => props.onCircleClicked(props.id)}>
            {props.children}
        </div>
    )
}

export default GameCircle