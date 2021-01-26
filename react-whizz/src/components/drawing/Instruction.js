import React from 'react'; 
import './Drawing.css'; 

const Instruction = ({isOpen, setIsOpen}) => {
    if (!isOpen) return null; 

    const close = () => {
        setIsOpen(false); 
    }
    
    return (
        <>
            <div className={"draw_overlay"} />
            <div className={"draw_modal"}>
                <p className={"instructions_draw-heading"}>
                    Welcome to the Drawing room. Go ahead and unleash your creative side.     
                </p>
                <ol>
                    <li className={"instructions_draw-points"}>
                        There are 4 colours available (black, green, blue and red) and 
                        3 stroke sizes (light, medium and heavy)   
                    </li> 
                    <li className={"instructions_draw-points"}>
                        There is no eraser tool, however by clicking the save button to 
                        save the current state of the drawing, if you then press clear 
                        you will return to the last time you saved 
                    </li>
                    <li className={"instructions_draw-points"}>
                        Click the submit button to save your work and return to the main 
                        page
                    </li>
                </ol>
                <button className={"instructions_button"} onClick={close}>Close</button>
            </div>
        </>
    );
}

export default Instruction; 