import React from 'react';
import './Modal.css';

const Modal = ({open, playAgain, score, exitGame, gameScore}) => {
    if (!open) return null;    
    
    return (
        <>
            <div className={"overlay"} />
            <div className={"modal"}>
                <button onClick={playAgain} className={"button__again"}>Play Again</button>
                <button onClick={exitGame} className={"button__home"}>Home</button>
                <p className={"text__game"}>Score: {gameScore.current}</p>
                <p className={"text__session"}>{score.current}</p>
            </div>
        </>
    )
}

export default Modal; 