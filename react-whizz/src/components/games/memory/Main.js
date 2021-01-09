import React, {useState, useEffect} from 'react'; 
import { Style } from 'react-style-tag';
import './Memory.css'; 

const Main = ({mainClick, colors}) => {
    // const [step, setStep] = useState(0);
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

    //establish count of steps following same order as colors 
    // function stepCount(colorArr) { 
    //     let transition = 10000/colors.length; 
    //     setInterval(() => {
    //         if (step <= colors.length) {
    //             setStep(step + 1); 
    //         }
    //     }, transition)
    // }

    // useEffect(() => {
    //     if (step) {
    //         const interval = 3000/colors.length;
    //         const rounds = setInterval(() => {
    //             console.log('hello')
    //             setStep(step+1);
    //         }, interval);
    //         setStep(0); 
    //         return () => clearInterval(rounds);
    //     } 
    // }, [colors])
    // function greet() {
    //     setStep(step + 1); 
    // }
    // console.log('hey')
    
    let step = 0; 
    useEffect(() => {
        const interval = 3000/colors.length; 
        console.log(interval); 
        const intervals = colors && setInterval(() => {
            step++; 
            console.log('hello')
        }, interval);
        return () => clearInterval(intervals); 
    }, [colors])

    const startGame = () => {
        mainClick(); 
        // setStep(1); 
        // clearInterval(yes); 
    }

    const keyFrameColors = keyFrameUpdate(colors);
    
    return (
        <>
            <button onClick={startGame}>Click me</button>          
            <div className={"main"}>
                {step}
                <Style> 
                {`${keyFrameColors}`}
                </Style>
            </div>
        </>
    )
}

export default Main; 