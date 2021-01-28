import React, { useState, useEffect, useRef } from 'react'; 
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Clock from './Clock'; 
import Modal from './Modal'; 
import Light from './Light';  
import { randColor } from '../../component_utils/memory';
import './Memory.css'; 
import { setUser } from '../../../store/reducers/session';
import {IconContext} from "react-icons"; 
import {FcElectronics} from 'react-icons/fc';
import {IoLogoXbox} from 'react-icons/io5'; 
import {VscDashboard} from 'react-icons/vsc'; 
import turret from '../../../images/turret.png';
import {AiFillFire} from 'react-icons/ai'; 
import { IoInformationCircleSharp } from "react-icons/io5";
import Instruction from './Instruction'; 

//so data persists passed certain re-rendering
let answerArr = []; 

const MemoryGame = () => {
    //useRef for the score components so that they do not update on re-render
    const gameScore = useRef(-1);
    const score = useRef(-1);

    const history = useHistory();
    const dispatch = useDispatch();  
    //validate user is authenticated
    const user = useSelector(state => state.session.user);
    //memory light color array, that contains the correct answers
    const [colors, setColors] = useState([]);  
    //set keyframes 
    const [keyFrame, setKeyFrame] = useState([]); 
    //countdown clock
    const [time, setTime] = useState('00:03'); 
    const [counter, setCounter] = useState(3);
    //modal states 
    const [isOpen, setIsOpen] = useState(false);
    //high score 
    const [high, setHigh] = useState({});
    //instruction modal 
    const [infoModal, setInfoModal] = useState(false); 

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
        //keyframe animations for color dynamic transitions 
        setKeyFrame([...keyFrame, {backgroundColor: `${nextColor}`}]);

        const container = document.getElementById('lights'); 
        container.setAttribute('style', 'display: none;'); 
        const button = document.getElementById('go'); 
        button.setAttribute('style', 'display: none;'); 
    }
    
    useEffect(() => {
        const main = document.getElementById("main_light");
        main.animate(keyFrame, 3000); 
    }, [colors])

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
                        {backgroundColor: `${light.id}`}], 600); 
        answerArr.push(light.id);
        //activate laser one
        const laserOne = document.getElementById("laserOne");
        const flameOne = document.getElementById("flameOne");  
        laserOne.setAttribute("stroke", light.id); 
        let lengthOne = 0; 
        let lineDashArrayOne;
        const laserAdvanceOne = setInterval(() => {
            lineDashArrayOne = `${lengthOne += 28} 140`;
            laserOne.setAttribute("stroke-dasharray", lineDashArrayOne);
        }, 100);
        setTimeout(() => {
            clearInterval(laserAdvanceOne);
            laserOne.setAttribute("stroke-dasharray", "0 140");
            flameOne.style.display = "block"; 
        }, 600);
        setTimeout(() => {
            flameOne.style.display = "none"; 
        }, 800)

        //activate laser two
        const laserTwo = document.getElementById("laserTwo");
        const flameTwo = document.getElementById("flameTwo");
        laserTwo.setAttribute("stroke", light.id); 
        let lengthTwo = 0; 
        let lineDashArrayTwo;
        const laserAdvanceTwo = setInterval(() => {
            lineDashArrayTwo = `${lengthTwo += 28} 140`;
            laserTwo.setAttribute("stroke-dasharray", lineDashArrayTwo);
        }, 100);
        setTimeout(() => {
            clearInterval(laserAdvanceTwo);
            laserTwo.setAttribute("stroke-dasharray", "0 140"); 
            flameTwo.style.display = "block";
        }, 600);
        setTimeout(() => {
            flameTwo.style.display = "none"; 
        }, 800)
        
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
                            if (response.status === 204) return; 
                            const data = await response.json(); 
                            setHigh(data); 
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

    const info = () => {
        setInfoModal(true);  
    }

    //when button is clicked on modal to play again 
    const playAgain = () => {
        //reset everything for new game
        setTime('00:03');
        setIsOpen(false); 
        setCounter(3)
        gameScore.current = 0; 
        setColors([]); 
        setKeyFrame([]); 
        setHigh({}); 
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
        gameScore.current = 0;
        score.current = 0;
        history.push('/home');
    }
    
    return (
        <div className={"page__memory"}>
            <div className={"main"} id={"main_light"}/>
            <div className={"container__lights"} id={'lights'}>
                <img src={turret} className={"container__turret"} alt=""/>
                <div className={"container__laser-one-div"}>
                    <svg className={"container__laser-one-svg"} xmlns="http://www.w3.org/2000/svg">
                        <line id={"laserOne"} className={"container__laser-beam"} x1="0" y1="140" x2="0" y2="0" 
                        strokeDasharray="0 140"/>
                    </svg>
                </div>
                <div className={"container__laser-two-div"}>
                    <svg className={"container__laser-two-svg"} xmlns="http://www.w3.org/2000/svg">
                        <line id={"laserTwo"} className={"container__laser-beam"} x1="0" y1="140" x2="0" y2="0" 
                        strokeDasharray="0 140"/>
                    </svg>
                </div>
                <FcElectronics className={"container__electronics"}/>
                <IoLogoXbox className={"container__xbox"}/>
                <div className={"container__xbox-dot"}></div>
                <VscDashboard className={"container__dashboard"}/>
                <div id={"flameOne"} className={"container__flame-divOne"}>
                    <IconContext.Provider value={{color:"orange", size: "40px"}}>
                        <AiFillFire/>
                    </IconContext.Provider>
                </div>
                <div id={"flameTwo"} className={"container__flame-divTwo"}>
                    <IconContext.Provider value={{color:"orange", size: "40px"}}>
                        <AiFillFire/>
                    </IconContext.Provider>
                </div>
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
                <div onClick={info}>
                        <IconContext.Provider value={{className: 'memory__info'}}>
                            <IoInformationCircleSharp />
                        </IconContext.Provider>
                </div>
            </div>
            <div>
                    <Instruction isOpen={infoModal} setIsOpen={setInfoModal}/>
            </div>
            <button onClick={mainClick} id={'go'} className={"button__go"}>
                <span style={{position:"absolute", top: "-10px", left: "25px"}}>Go</span>
            </button>  
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter}/>
            <div>
                <Modal open={isOpen} gameScore={gameScore} score={score} playAgain={playAgain} 
                high={high} exitGame={exitGame}/>
            </div>
        </div>
    )
}

export default MemoryGame; 