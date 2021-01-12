import React, {useRef, useEffect, useState} from 'react'; 
import './Drawing.css';

const Drawing = () => {

    //establish initial functionality and setup of canvas
    const canvasRef = useRef(null); 
    //this is set to persist data through re-renders 
    const contextRef = useRef(null); 
    //remember that the button is pressed 
    const [isDrawing, setIsDrawing] = useState(false);

    //access canvas API when component mounts
    useEffect(() => {
        const canvas = canvasRef.current;
        //support higher resolution computers 
        canvas.width = 500;
        canvas.height = 500;
        //define 2D api for canvas to draw on
        const context = canvas.getContext("2d");
        // context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5; 
        contextRef.current = context; 
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath(); 
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true); 
        draw(nativeEvent);
    }
    const finishDrawing = () => {
        contextRef.current.closePath(); 
        setIsDrawing(false);
    }
    const draw = ({nativeEvent}) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY); 
        contextRef.current.stroke(); 
    }

    return (
        <>
            <canvas
                style={{border: "black solid"}}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
            <button id={'red'}>Red</button>
            <button id={'green'}>Green</button>
            <button id={'blue'}>Blue</button>
        </>
    )
}


export default Drawing; 