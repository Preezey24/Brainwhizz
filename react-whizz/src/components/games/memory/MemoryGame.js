import React, { useState, useEffect } from 'react'; 
import {useHistory} from 'react-router-dom';
import Clock from './Clock'; 
import Modal from './Modal'; 
import Light from './Light'; 
import Main from './Main'; 
import { randColor } from '../../component_utils/memory';
import './Memory.css'; 

//establish score outside of functional component so that it persists after the components re-renders
let score = 0;  

const MemoryGame = () => {
    //memory light color array, that contains the correct answers
    const [colors, setColors] = useState([]); 
    const [num, setNum] = useState(0); 

    //countdown clock
    const [time, setTime] = useState('02:00'); 
    const [timeUp, setTimeUp] = useState(false);
    const [counter, setCounter] = useState(10);
    //modal states 
    const [isOpen, setIsOpen] = useState(false); 
    const history = useHistory(); 

    //main light color transitions 
    //test button click 
    const mainClick = () => {
        setColors([...colors, randColor()]); 
        setNum(num+1); 
    }

    //color transitiion on light click for the user
    const lightClick = (e) => {
        const light = document.getElementById(e.target.id); 
        light.animate([{backgroundColor: `${light.id}`}, {backgroundColor: 'white'}, 
                        {backgroundColor: `${light.id}`}], 1500)
    }

    //when button is clicked on modal to play again 
    const playAgain = () => {
        //reset everything for new game
        setTime('02:00');
        setTimeUp(false); 
        setIsOpen(false); 
        setCounter(10)
    }

    // when button is clicked on modal to quit game 
    const exitGame = () => { 
        history.push('/')
    }

    return (
        <>
            <Main mainClick={mainClick}/>
            <div className={"container__lights"}>
                <Light lightClick={lightClick} id={'red'} style={{backgroundColor: 'red'}}/>
                <Light lightClick={lightClick} id={'blue'} style={{backgroundColor: 'blue'}}/>
                <Light lightClick={lightClick} id={'green'} style={{backgroundColor: 'green'}}/>
                <Light lightClick={lightClick} id={'yellow'} style={{backgroundColor: 'yellow'}}/>
                <Light lightClick={lightClick} id={'purple'} style={{backgroundColor: 'purple'}}/>
            </div>
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter}/>
            <div>
                <Modal open={isOpen} score={score} playAgain={playAgain} exitGame={exitGame}/>
            </div>
        </>
    )
}

export default MemoryGame; 