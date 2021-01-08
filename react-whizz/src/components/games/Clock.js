import React, { useState, useEffect } from 'react'; 
import { timeConversion } from '../component_utils/clock_helper'; 

const Clock = (props) => {
    const [counter, setCounter] = useState(10);
    // const [time, setTime] = useState('02:00'); 
    
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1);  
        }, 1000);
        props.setTime(timeConversion(counter)); 
        return () => clearInterval(timer); 
    }, [counter]); 

    return (
       <div>
           <h1>Countdown</h1>
           <p>
            <span>
                Time: 
            </span>
            <span>
                {props.time}  
            </span>
           </p>
       </div> 
    )
}

export default Clock; 