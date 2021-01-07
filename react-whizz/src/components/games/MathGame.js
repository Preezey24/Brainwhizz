import React, {useState} from 'react'; 
import Clock from './Clock'; 

const MathGame = () => {
    const [time, setTime] = useState(new Date())

    return (
        <Clock /> 
    )
}

export default MathGame; 