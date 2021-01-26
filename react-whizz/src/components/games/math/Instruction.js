import React from 'react'; 
import './Modal.css'; 
import './MathGame';

const Instruction = ({isOpen, setIsOpen}) => {
    if (!isOpen) return null; 

    const close = () => {
        setIsOpen(false); 
    }
    
    return (
        <>
            <div className={"math_overlay"} />
            <div className={"math_modal"}>
                <p>
                    Welcome to the Drawing room. Go ahead and release your creative side.     
                </p>
                <p>
                    Instructions: 
                        1. 
                </p>
                <button className={"instructions_math-button"} onClick={close}>Close</button>
            </div>
        </>
    );
}

export default Instruction; 