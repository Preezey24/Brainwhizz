import React, { useEffect, useRef } from 'react'; 
import { timeConversion } from '../../component_utils/clock_helper'; 
import './Clock.css'; 

const COLOR_CODES = {
    info: {
        color: "green"
    }
}; 

let remainingPathColor = COLOR_CODES.info.color

const Clock = ({time, setTime, counter, setCounter}) => {   
    const timeLimit = useRef(time); 

    function timeRemaining() {
        console.log(time)
        console.log(time/timeLimit.current)
        return time/timeLimit.current; 
    }
    
    function setCircleDasharray() {
        const circleDasharray = `${(
            timeRemaining() * '283'
        ).toFixed(0)} 283`;
        document.getElementById('base-timer-path-remaining')
                .setAttribute('stroke-dasharray', circleDasharray)
    }
    

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1); 
            setCircleDasharray();  
        }, 1000);
        setTime(counter); 
        return () => clearInterval(timer); 
    }, [counter]); 

    return (
       <div className={"base-timer"}>
           <svg className={"base-timer__svg"} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
               <g className={"base-timer__circle"}>
                   <circle className={"base-timer__path-elapsed"} cx="50" cy="50" r="45" />
                   <path 
                        id="base-timer-path-remaining"
                        stroke-dasharray="283"
                        className={`base-timer__path-remaining ${remainingPathColor}`}
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                    ></path>
               </g>
           </svg>
           <span className={"base-timer__label"}>
               {time}
           </span>
       </div> 
    )
}

export default Clock; 