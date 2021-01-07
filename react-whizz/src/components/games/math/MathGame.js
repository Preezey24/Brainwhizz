import React, {useState} from 'react'; 
import Clock from '../Clock'; 
import mathProblems from '../../component_utils/math_tables'

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
         
    }
    
    return (
        <>
            <Clock />
            {questions.map((question, i) => {
                return (
                    <div key={i}>
                        {question}
                        <input type='text' onChange={answerHandler} id={i}/>
                    </div>
                )
            })}
            <button onClick={submitHandler}>Next</button>
        </>
    )
}

export default MathGame; 