import React from 'react'; 
import './Memory.css'; 

const Main = ({colors}) => {
    //establish text string to be input into style tag with dynamic update to steps 
    function keyFrameUpdate(colorArr) {
        let keyFrame = []; 
        let step = 0;
        let transition = 100/colors.length/100;
        colorArr.forEach((color) => {
            if (step === 0) {
                keyFrame.push({ step: '{ background: black }'});
            }
            step += transition; 
            keyFrame.push({ step: `{ background: ${color} }`});
        })
        return keyFrame;
    };

    const main = document.getElementById("main__light");
    main.animate(keyFrameUpdate(colors))
    
    return (
        <>        
            <div className={"main"}>
                {colors && main}
            </div>
        </>
    )
}

export default Main; 