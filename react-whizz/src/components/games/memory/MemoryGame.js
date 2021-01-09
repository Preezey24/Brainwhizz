import React, { useState, useEffect } from 'react'; 
import {useHistory} from 'react-router-dom';
import Clock from './Clock'; 
import Modal from './Modal'; 
import Light from './Light'; 
import Main from './Main'; 
import { randColor } from '../../component_utils/memory';
import './Memory.css'; 

//so data persists passed certain re-rendering
let answerArr = []; 

const MemoryGame = () => {
    //memory light color array, that contains the correct answers
    const [colors, setColors] = useState([]); 
    const [score, setScore] = useState(0);  

    //countdown clock
    const [time, setTime] = useState('02:00'); 
    const [counter, setCounter] = useState(3);
    //modal states 
    const [isOpen, setIsOpen] = useState(false); 
    const history = useHistory(); 

    //test button click 
    const mainClick = () => {
        let nextColor = randColor(); 
        while (nextColor === colors[colors.length-1]) {
            nextColor = randColor(); 
        }
        setColors([...colors, nextColor]); 
        setScore((score+1)); 
        setCounter(3); 
        answerArr = []; 
        const container = document.getElementById('lights'); 
        container.setAttribute('style', 'display: none;'); 
        const button = document.getElementById('go'); 
        button.setAttribute('style', 'display: none;'); 
    }

    //have the lights appear for the user to select after color transitions complete
    useEffect(() => {
        if (time === '00:00') {
            const container = document.getElementById('lights'); 
            container.setAttribute('style', 'display: block;'); 
        }
    }, [time])

    //color transitiion on light click for the user
    //make comparison between correct answer and user answer 
    const lightClick = (e) => {
        const light = document.getElementById(e.target.id); 
        light.animate([{backgroundColor: `${light.id}`}, {backgroundColor: 'white'}, 
                        {backgroundColor: `${light.id}`}], 1500); 
        answerArr.push(light.id);  
        //check answer
        answerArr.forEach((answer, i) => {
            if (answer !== colors[i]) {
                setScore(score*10); 
                setIsOpen(true); 
            }
        });
        //make button appear for next round
        if (answerArr.length === colors.length) {
            const button = document.getElementById('go'); 
            button.setAttribute('style', 'display: block;'); 
        }
    };

    //when button is clicked on modal to play again 
    const playAgain = () => {
        //reset everything for new game
        setTime('02:00');
        setIsOpen(false); 
        setCounter(3)
        setScore(0); 
        setColors([]); 
    }

    // when button is clicked on modal to quit game 
    const exitGame = () => { 
        history.push('/')
    }
    
    return (
        <>
            <Main mainClick={mainClick} colors={colors}/>
            <div className={"container__lights"} id={'lights'}>
                <Light lightClick={lightClick} id={'red'} style={{backgroundColor: 'red'}}/>
                <Light lightClick={lightClick} id={'blue'} style={{backgroundColor: 'blue'}}/>
                <Light lightClick={lightClick} id={'green'} style={{backgroundColor: 'green'}}/>
                <Light lightClick={lightClick} id={'yellow'} style={{backgroundColor: 'yellow'}}/>
                <Light lightClick={lightClick} id={'purple'} style={{backgroundColor: 'purple'}}/>
            </div>
            <button onClick={mainClick} id={'go'} className={"button__go"}>Go</button>  
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter}/>
            <div>
                <Modal open={isOpen} score={score} playAgain={playAgain} exitGame={exitGame}/>
            </div>
        </>
    )
}

export default MemoryGame; 