import React, { useEffect } from 'react'; 
import { timeConversion } from '../../component_utils/clock_helper'; 

const Clock = ({time, setTime, counter, setCounter}) => {   
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1);  
        }, 1000);
        setTime(timeConversion(counter)); 
        return () => clearInterval(timer); 
    }, [counter]); 

    return (
       <>
       </> 
    )
}

export default Clock; 