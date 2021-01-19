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
                <span className={"text__game"}>Score: {gameScore.current}</span>
                <span className={"text__session"}>Session Score: {score.current}</span>
            </div>
        </>
    )
}

export default Modal; 