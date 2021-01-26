import React from 'react'; 
import './Modal.css'; 
import './MemoryGame'; 

const Instruction = ({isOpen, setIsOpen}) => {
    if (!isOpen) return null; 

    const close = () => {
        setIsOpen(false); 
    }
    
    return (
        <>
            <div className={"memory_overlay"} />
            <div className={"memory_modal"}>
                <p className={"instructions_memory-heading"}>
                    Welcome to the Memory room. Test and strengthen your memory.     
                </p>
                <ol>
                    <li className={"instructions_memory-points"}>
                        Press Go at the bottom of the screen to start the game. Once the game 
                        begins, the black circle will begin to change color. Remember the color(s)    
                    </li> 
                    <li className={"instructions_memory-points"}>
                        Once the color transition sequence has completed, you need to press 
                        the colored buttons in the correct order to advance to the next level. 
                        As you advance, the color changes become quicker and the number to 
                        remember increases
                    </li>
                    <li className={"instructions_memory-points"}>
                        If you make a mistake, you can play again 
                    </li>
                </ol>
                <button className={"instructions_memory-button"} onClick={close}>Close</button>
            </div>
        </>
    );
}

export default Instruction; 