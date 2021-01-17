import React, { useState, useEffect, useRef } from 'react'; 
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Clock from './Clock'; 
import Modal from './Modal'; 
import Light from './Light'; 
import Main from './Main'; 
import { randColor } from '../../component_utils/memory';
import './Memory.css'; 
import { setUser } from '../../../store/reducers/session';
import {FcElectronics} from 'react-icons/fc';
import {IoLogoXbox} from 'react-icons/io5'; 

//so data persists passed certain re-rendering
let answerArr = []; 

const MemoryGame = () => {
    //useRef for the score components so that they do not update on re-render
    const gameScore = useRef(0);
    const score = useRef(0);

    const history = useHistory();
    const dispatch = useDispatch();  
    //validate user is authenticated
    const user = useSelector(state => state.session.user);
    //memory light color array, that contains the correct answers
    const [colors, setColors] = useState([]);  
    //countdown clock
    const [time, setTime] = useState('02:00'); 
    const [counter, setCounter] = useState(3);
    //modal states 
    const [isOpen, setIsOpen] = useState(false);  

    //test button click 
    const mainClick = () => {
        let nextColor = randColor(); 
        while (nextColor === colors[colors.length-1]) {
            nextColor = randColor(); 
        }
        setColors([...colors, nextColor]); 
        score.current += 1; 
        gameScore.current += 1; 
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
        if (colors.length === 0) {
            const container = document.getElementById('lights'); 
            container.setAttribute('style', 'display: block;'); 
            const button = document.getElementById('go'); 
            button.setAttribute('style', 'display: block;'); 
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
                //update score database, check if high score
                const updateScore = async () => {
                    try {
                        const response = await fetch('/score/memory/high', {
                            method: 'PUT', 
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify({
                                email: user.email, 
                                gameScore: gameScore.current,
                            }),
                        });
                        if (response.ok) {
                            const data = await response.json(); 
                            console.log(data);
                        }
                    } catch (err) {
                        console.log(err); 
                    }
                }
                updateScore(); 
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
        gameScore.current = 0; 
        setColors([]); 
    }

    // when button is clicked on modal to quit game 
    const exitGame = () => { 
        const updateScore = async () => {
            try {
                const response = await fetch('/score/memory', {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        email: user.email, 
                        score: score.current, 
                    }),
                });
                if (response.ok) {
                    const data = await response.json(); 
                    dispatch(setUser(data)); 
                }
            } catch (err) {
                console.log(err); 
            }
        }
        updateScore(); 
        gameScore = 0;
        score = 0;
        history.push('/');
    }
    
    return (
        <div className={"page__memory"}>
            <Main mainClick={mainClick} colors={colors}/>
            <div className={"container__lights"} id={'lights'}>
                <FcElectronics className={"container__electronics"}/>
                <IoLogoXbox className={"container__xbox"}/>
                <div className={"container__xbox-dot"} />
                <Light lightClick={lightClick} id={'red'} style={{backgroundColor: 'red',
                position: 'absolute', top: '210px', left: '230px'}}/>
                <Light lightClick={lightClick} id={'blue'} style={{backgroundColor: 'blue',
                position: 'absolute', top: '210px', left: '-140px'}}/>
                <Light lightClick={lightClick} id={'green'} style={{backgroundColor: 'green', 
                position: 'absolute', top: '120px', left: '-40px', width: "80px", height: "80px"}}/>
                <Light lightClick={lightClick} id={'yellow'} style={{backgroundColor: 'yellow',
                position: 'absolute', top: '120px', left: '140px', width: "80px", height: "80px"}}/>
                <Light lightClick={lightClick} id={'purple'} style={{backgroundColor: 'purple',
                position: 'absolute', top: '210px', left: '40px'}}/>
            </div>
            <button onClick={mainClick} id={'go'} className={"button__go"}>Go</button>  
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter}/>
            <div>
                <Modal open={isOpen} score={score} playAgain={playAgain} exitGame={exitGame}/>
            </div>
        </div>
    )
}

export default MemoryGame; 