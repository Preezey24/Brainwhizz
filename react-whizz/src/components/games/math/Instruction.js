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
            <p className={"instructions_math-heading"}>
                    Welcome to the Math room. Get ready to improve your math times tables     
                </p>
                <ol>
                    <li className={"instructions_math-points"}>
                        The clock starts ticking immediately. You have 60 seconds to answer 
                        as many math questions as possible. Each right answer is 1 point    
                    </li> 
                    <li className={"instructions_math-points"}>
                        Once you have answered all the questions on the chalk board, press the 
                        green Go button to get the next set of questions. Answer all of those and
                        repeat 
                    </li>
                    <li className={"instructions_math-points"}>
                        Once time is up, you can play again 
                    </li>
                </ol>
                <button className={"instructions_math-button"} onClick={close}>Close</button>
            </div>
        </>
    );
}

export default Instruction; 