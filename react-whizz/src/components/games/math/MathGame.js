import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import Clock from './Clock'; 
import Modal from './Modal'; 
import mathProblems from '../../component_utils/math_tables';
import { setUser } from '../../../store/reducers/session';
import './MathGame.css'; 

const MathGame = () => {
    //useRef for the score components so that they do not update on re-render
    const gameScore = useRef(0);
    const score = useRef(0); 
     
    const history = useHistory(); 
    const dispatch = useDispatch(); 
    //validate user is authenticated
    const user = useSelector(state => state.session.user);
    //math questions & answers 
    const [questions, setQuestions] = useState(mathProblems())
    const [answers, setAnswers] = useState({});
    //countdown clock
    const [time, setTime] = useState(60); 
    const [timeUp, setTimeUp] = useState(false);
    const [counter, setCounter] = useState(60);
    //modal states 
    const [isOpen, setIsOpen] = useState(false);  

    //calculate the actual answers for comparison with user input 
    let ansArr = []; 
    questions.forEach(question => {
        let answer = eval(question); 
        ansArr.push(answer);  
    });

    //update the input answers array as answers are typed in
    const answerHandler = e => {
        const { id, value } = e.target; 
        setAnswers(answers => ({
            ...answers, 
            [id]: value
        }))  
    };  

    //change submithandler below from red to green once all input fields filled out
    useEffect(() => {
        let valArr = Object.values(answers); 
        if (valArr.length === 10) {
            const go = document.querySelector('.questions__button');
            go.style.backgroundColor = 'lightgreen';
        }
    }, [answers])
    
    //when button is clicked to move onto the next set of math questions 
    const submitHandler = () => {
        //complete validation that all inputs are filled out before advancing
        let valArr = Object.values(answers); 
        let exit; 
        if (valArr.length !== 10) return; 
        valArr.forEach(val => {
            if (!val) {
                exit = true; 
                //this return is exiting from the callback, not the entire function
                return; 
            }
        }); 
        if (exit) {
            return; 
        }

        //check answers of user input versus correct answers  
        ansArr.forEach((correct, i) => {
           if (correct == answers[i]) {
               gameScore.current += 1; 
               score.current += 1;
           } 
        });  
        move(); 

        //clean up input fields, reset answers and give a new set of questions 
        for (let i = 0; i < 10; i++) {
            document.getElementById(i).value = null; 
        }
        setAnswers({}); 
        setQuestions(mathProblems()); 
        //reset button color to red
        const go = document.querySelector('.questions__button');
        go.style.backgroundColor = 'red';      
    }

    //when time runs out and the modal appears, showing your score and asking whether you want to play again
    //useEffect was used to combat constant re-rendering of the page as state changed
    useEffect(() => {
        if (time === 0) {
            //reset state
            setTimeUp(true); 
            setTime(null); 
            setIsOpen(true); 
            //update score database, check if high score
            const updateScore = async () => {
                try {
                    const response = await fetch('/score/math/high', {
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
        }
    }, [time]);

    //when button is clicked on modal to play again 
    const playAgain = () => {
        //reset everything for new game
        setAnswers({}); 
        setQuestions(mathProblems()); 
        setTime(60);
        setTimeUp(false); 
        setIsOpen(false); 
        setCounter(60);
        gameScore.current = 0; 
        //clean up input fields, reset answers and give a new set of questions 
        for (let i = 0; i < 10; i++) {
            document.getElementById(i).value = null; 
        }
    }
    
    // when button is clicked on modal to quit game 
    const exitGame = () => {
        const updateScore = async () => {
            try {
                const response = await fetch('/score/math', {
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
        history.push('/')
    }

    //animate div movement from right to left, as if it were being replaced 
    function move() {
        const container = document.querySelector('.chalkboard__div'); 
        container.style.animation = "move 2s linear"; 
        setTimeout(() => {
            container.style.opacity = 0; 
        }, 667);
        setTimeout(() => {
            container.style.opacity = 1; 
        }, 1334);
        setTimeout(() => {
            container.style.removeProperty('animation'); 
        }, 2000)
    };
    
    return (
        <>
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter} />
            <div className={"chalkboard__div"}>
                <h2 className={"chalkboard__heading"}>Math Questions</h2>
                <div className={"questions__div_one"}>
                    {questions.map((question, i) => {
                        if (i < 5) {
                            return (
                                    <div className={"questions__question"} key={i}>
                                        {`${question} = `}
                                        <input className={"questions__answer"} type='text' value={answers[i]} 
                                        onChange={answerHandler} id={i}/>
                                    </div>
                            )
                        }
                    })}
                </div>
                <div className={"questions__div_two"}>
                    {questions.map((question, i) => {
                        if (i >= 5) {
                            return (
                                    <div className={"questions__question"} key={i}>
                                        {`${question} = `}
                                        <input className={"questions__answer"} type='text' value={answers[i]} 
                                        onChange={answerHandler} id={i}/>
                                    </div>
                            )
                        }
                    })}
                </div>
            </div>
            <button className={"questions__button"} onClick={submitHandler}>GO >>></button>
            {timeUp &&
                <div>
                    <Modal open={isOpen} gameScore={gameScore} score={score} playAgain={playAgain} exitGame={exitGame}/>
                </div> 
            }
        </>
    )
}

export default MathGame; 