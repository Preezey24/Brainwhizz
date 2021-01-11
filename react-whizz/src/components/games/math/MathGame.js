import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import Clock from './Clock'; 
import Modal from './Modal'; 
import mathProblems from '../../component_utils/math_tables';

//establish score outside of functional component so that it persists after the components re-renders
//total score during game session 
let score = 0;
//high score during game session 
let gameScore = 0; 

const MathGame = () => {
    const history = useHistory(); 
    //validate user is authenticated
    const user = useSelector(state => state.session.user);
    //math questions & answers 
    const [questions, setQuestions] = useState(mathProblems())
    const [answers, setAnswers] = useState({});
    //countdown clock
    const [time, setTime] = useState('02:00'); 
    const [timeUp, setTimeUp] = useState(false);
    const [counter, setCounter] = useState(20);
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
               gameScore += 1; 
               score += 1; 
           } 
        });  

        //clean up input fields, reset answers and give a new set of questions 
        for (let i = 0; i < 10; i++) {
            document.getElementById(i).value = null; 
        }
        setAnswers({}); 
        setQuestions(mathProblems());        
    }

    //when time runs out and the modal appears, showing your score and asking whether you want to play again
    //useEffect was used to combat constant re-rendering of the page as state changed
    useEffect(() => {
        if (time === '00:00') {
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
                            gameScore,
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
        setTime('02:00');
        setTimeUp(false); 
        setIsOpen(false); 
        setCounter(20);
        gameScore = 0; 
        //clean up input fields, reset answers and give a new set of questions 
        for (let i = 0; i < 10; i++) {
            document.getElementById(i).value = null; 
        }
    }
    
    // when button is clicked on modal to quit game 
    const exitGame = () => {
        const updateScore = async () => {
            try {
                await fetch('/score/math', {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        email: user.email, 
                        score, 
                    }),
                });
            } catch (err) {
                console.log(err); 
            }
        }
        updateScore(); 
        history.push('/')
    }
    
    return (
        <>
            <Clock time={time} setTime={setTime} counter={counter} setCounter={setCounter} />
            {questions.map((question, i) => {
                return (
                    <div key={i}>
                        {question}
                        <input type='text' value={answers[i]} onChange={answerHandler} id={i}/>
                    </div>
                )
            })}
            <button onClick={submitHandler}>Next</button>
            {timeUp &&
                <div>
                    <Modal open={isOpen} gameScore={gameScore} score={score} playAgain={playAgain} exitGame={exitGame}/>
                </div> 
            }
        </>
    )
}

export default MathGame; 