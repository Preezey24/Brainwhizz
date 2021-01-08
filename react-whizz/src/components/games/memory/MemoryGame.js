import React, { useState } from 'react'; 
import {useHistory} from 'react-router-dom';
import Clock from './Clock'; 
import Modal from './Modal'; 
import './Memory.css'; 

//establish score outside of functional component so that it persists after the components re-renders
let score = 0;  

const MemoryGame = () => {
    //countdown clock
    const [time, setTime] = useState('02:00'); 
    const [timeUp, setTimeUp] = useState(false);
    const [counter, setCounter] = useState(10);
    //modal states 
    const [isOpen, setIsOpen] = useState(false); 
    const history = useHistory(); 

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
            <div className={"container__lights"}>
                <span className={"light"} style={{backgroundColor: 'red'}}/>
                <span className={"light"} style={{backgroundColor: 'blue'}}/>
                <span className={"light"} style={{backgroundColor: 'green'}}/>
                <span className={"light"} style={{backgroundColor: 'yellow'}}/>
                <span className={"light"} style={{backgroundColor: 'purple'}}/>
            </div>
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter}/>
            <div>
                <Modal open={isOpen} score={score} playAgain={playAgain} exitGame={exitGame}/>
            </div>
        </>
    )
}

export default MemoryGame; 