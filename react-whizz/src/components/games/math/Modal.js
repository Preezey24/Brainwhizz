import React from 'react';

const MODAL_STYLES = {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    backgroundColor: 'red', 
    padding: '50px', 
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 1000, 
}

const Modal = ({open, score, playAgain, gameScore, exitGame}) => {
    if (!open) return null;    
    
    return (
        <>
            <div style={OVERLAY_STYLE} />
            <div style={MODAL_STYLES}>
                <button onClick={playAgain}>Play Again</button>
                <button onClick={exitGame}>Home Page</button>
                <p>{gameScore.current}</p>
                <p>{score.current}</p>
            </div>
        </>
    )
}

export default Modal; 