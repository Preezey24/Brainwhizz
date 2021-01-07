import React, {useState} from 'react'; 
import Clock from '../Clock'; 
import mathProblems from '../../component_utils/math_tables'

const MathGame = () => {
    const [questions, setQuestions] = useState(mathProblems())
    const [answers, setAnswers] = useState({}); 

    //update the answers array as answers are typed in
    const answerHandler = e => {
        const { id, value } = e.target; 
        setAnswers(answers => ({
            ...answers, 
            [id]: value
        }))  
    };    
    
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
        </>
    )
}

export default MathGame; 