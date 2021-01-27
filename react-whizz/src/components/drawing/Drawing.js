import React, {useRef, useEffect, useState} from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import {useHistory} from 'react-router-dom'; 
import './Drawing.css';
import { setUser } from '../../store/reducers/session';
import board from '../../images/draw_board.png'; 
import { IoInformationCircleSharp } from "react-icons/io5";
import { IconContext } from 'react-icons/lib';
import Instruction from './Instruction'; 

const Drawing = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch(); 
    const history = useHistory(); 
    const canvasRef = useRef(null); 
    //this is set to persist data through re-renders 
    const contextRef = useRef(null); 
    //remember that the button is pressed 
    const [isDrawing, setIsDrawing] = useState(false);
    //clearing the canvas image 
    const [inUse, setInUse] = useState(false); 
    //saving the canvas image 
    const [image, setImage] = useState({})
    //modal for information
    const [isOpen, setIsOpen] = useState(false); 

    //access canvas API when component mounts
    useEffect(() => {
        const canvas = canvasRef.current;
        //support higher resolution computers 
        canvas.width = 500;
        canvas.height = 500;
        //define 2D api for canvas to draw on
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2; 
        contextRef.current = context; 
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath(); 
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true); 
        draw(nativeEvent);
        setInUse(true); 
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

    const changeColor = (e) => {
        const color = e.target.id; 
        contextRef.current.strokeStyle = color; 
    }

    const changeLine = (e) => {
        const weight = e.target.value; 
        
        switch (weight) {
            case 'light': 
                contextRef.current.lineWidth = 2; 
                break
            case 'medium': 
                contextRef.current.lineWidth = 5;
                break
            case 'heavy': 
                contextRef.current.lineWidth = 10; 
        }
    }

    const reset = () => {
        if (!inUse) return; 
        contextRef.current.putImageData(image, 0, 0); 
    }

    const save = () => {
        setImage(contextRef.current.getImageData(0, 0, 
            contextRef.current.canvas.width, contextRef.current.canvas.height));
    }

    const info = () => {
        setIsOpen(true);  
    }

    const final = async () => {
        const imageURL = canvasRef.current.toDataURL(); 
        try {
            const response =  await fetch('/drawing', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    email: user.email, 
                    imageURL,
                })
            })
            if (response.ok) {
                const data = await response.json(); 
                dispatch(setUser(data));
                history.push('/home');
            }
        } catch (err) {
            console.log(err); 
        }
    };

    return (
        <div className={"page__draw"}>
            <div>
                <img src={board} className={"container__canvas-board"}/>
                <div className={"container__canvas"}>
                    <canvas
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        ref={canvasRef}
                    />
                </div>
                <div className={"container__paint"}>
                    <select id={"line-weight"} className={"dropdown"} onChange={changeLine}>
                        <option value={'light'}>Light</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'heavy'}>Heavy</option>
                    </select>
                    <button id={'red'} className={"paint__red"} onClick={changeColor}/>
                    <button id={'green'} className={"paint__green"} onClick={changeColor}/>
                    <button id={'blue'} className={"paint__blue"} onClick={changeColor}/>
                    <button id={'black'} className={"paint__black"} onClick={changeColor}/>
                    <button onClick={reset} className={"paint__reset"}>Clear</button>
                    <button onClick={save} className={"paint__save"}>Save</button>
                </div>
                    <div onClick={info}>
                        <IconContext.Provider value={{className: 'paint__info'}}>
                            <IoInformationCircleSharp />
                        </IconContext.Provider>
                    </div>
                    <div>
                        <Instruction isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </div>                
                    <button onClick={final} className={"paint__submit"}>
                        <span>Submit</span>
                    </button>
            </div>
        </div>
    )
}


export default Drawing; 