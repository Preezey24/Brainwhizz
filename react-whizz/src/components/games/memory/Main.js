import React, {useState, useEffect} from 'react'; 
import { Style } from 'react-style-tag';
import './Memory.css'; 

const Main = ({mainClick, colors}) => {
    const [rounds, setRounds] = useState(0);
    //establish text string to be input into style tag with dynamic update to steps 
    function keyFrameUpdate(colorArr) {
        let keyFrame = `@keyframes main {`; 
        let step = 0;
        let transition = 100/colors.length;
        colorArr.forEach((color) => {
            if (step === 0) {
                keyFrame+=`{ ${step}% { background: white; }`
            }
            keyFrame+=` ${step+=transition}% { background: ${color}; }`
        })
        keyFrame+=` }`
        return keyFrame;
    };

    useEffect(() => {
        setRounds(rounds+1)
    }, [colors])

    const keyFrame = keyFrameUpdate(colors);

    return (
        <>
            <button onClick={mainClick}>Click me</button>          
            <div className={"main"} >
                {rounds}
                <Style> 
                {`${keyFrame}`}
                </Style>
            </div>
        </>
    )
}

export default Main; 