import React from 'react'; 
import { Style } from 'react-style-tag';
import './Memory.css'; 

const Main = ({colors}) => {
    //establish text string to be input into style tag with dynamic update to steps 
    function keyFrameUpdate(colorArr) {
        let keyFrame = `@keyframes main {`; 
        let step = 0;
        let transition = 100/colors.length;
        colorArr.forEach((color) => {
            if (step === 0) {
                keyFrame+=`{ ${step}% { background: black; }`
            }
            keyFrame+=` ${step+=transition}% { background: ${color}; }`
        })
        keyFrame+=` }`
        return keyFrame;
    };

    const keyFrameColors = keyFrameUpdate(colors);
    
    return (
        <>        
            <div className={"main"}>
                <Style> 
                {`${keyFrameColors}`}
                </Style>
            </div>
        </>
    )
}

export default Main; 