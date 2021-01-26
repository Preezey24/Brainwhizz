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
                <p>
                    Instructions: 
                        1. 
                </p>
                <button className={"instructions_memory-button"} onClick={close}>Close</button>
            </div>
        </>
    );
}

export default Instruction; 