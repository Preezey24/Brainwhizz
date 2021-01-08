import React, {useState} from 'react'; 
import Clock from '../Clock'; 
import mathProblems from '../../component_utils/math_tables'

//establish score outside of functional component so that it persists after the components re-renders
let score = 0;  

const MathGame = () => {
    const [questions, setQuestions] = useState(mathProblems())
    const [answers, setAnswers] = useState({}); 

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
    
    const submitHandler = () => {
        //complete validation that all inputs are filled out before advancing
        let valArr = Object.values(answers); 
        let exit; 
        if (valArr.length !== 10) return; 
        valArr.forEach(val => {
            if (!val) {
                exit = 'exit'; 
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
               score += 10; 
           } 
        });  

        //clean up input fields, reset answers and give a new set of questions 
        for (let i = 0; i < 10; i++) {
            document.getElementById(i).value = null; 
        }
        setAnswers({}); 
        setQuestions(mathProblems());        
    }
    
    return (
        <>
            <Clock />
            {questions.map((question, i) => {
                return (
                    <div key={i}>
                        {question}
                        <input type='text' value={answers[i]} onChange={answerHandler} id={i}/>
                    </div>
                )
            })}
            <button type="reset" onClick={submitHandler}>Next</button>
        </>
    )
}

export default MathGame; 