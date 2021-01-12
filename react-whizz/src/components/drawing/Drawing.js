import React, {useRef, useEffect, useState} from 'react'; 

const Drawing = () => {
    const canvasRef = useRef(null); 
    //this is set to persist data through re-renders 
    const contextRef = useRef(null); 
    //remember that the button is pressed 
    const [isDrawing, setIsDrawing] = useState(false);

    //access canvas API when component mounts
    useEffect(() => {
        const canvas = canvasRef.current;
        //support higher resolution computers 
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`; 
        //define 2D api for canvas to draw on
        const context = canvas.getContext();
        context.scale(2, 2);
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
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

export default Drawing; 