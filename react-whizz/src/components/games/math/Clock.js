import React, { useEffect, useRef } from 'react'; 
import { timeConversion } from '../../component_utils/clock_helper'; 
import './Clock.css'; 

const WARNING_THRESHOLD = 30; 
const ALERT_THRESHOLD = 10; 
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    }, 
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
}; 

let remainingPathColor = COLOR_CODES.info.color

const Clock = ({time, setTime, counter, setCounter}) => {   
    const timeLimit = useRef(time); 

    function timeRemaining() {
        const timeLeft = counter/timeLimit.current;
        return (timeLeft - (1 / timeLimit.current) * (1 - timeLeft));
    };
    
    function setCircleDasharray() {
        const circleDasharray = `${(
            timeRemaining() * '283'
        ).toFixed(0)} 283`;
        document.getElementById('base-timer-path-remaining')
                .setAttribute('stroke-dasharray', circleDasharray)
    };

    function setPathColor(timeLeft) {
        const {alert, warning} = COLOR_CODES; 

        if (timeLeft <= alert.threshold) {
            remainingPathColor = "red";
        } else if (timeLeft <= warning.threshold) {
            remainingPathColor = "orange"; 
        } else {
            remainingPathColor = 'green'; 
        }
    };

    function shake(timeLeft) {
        const circle = document.querySelector('.base-timer__circle'); 
        if (timeLeft <= 10) {
            circle.style.animation = "shake 0.5s cubic-bezier(0.42, 0.0, 0.58, 1.0) both"; 
            setTimeout(() => {
                circle.removeAttribute("style"); 
            }, 500);  
        }
    }
    
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1);   
        }, 1000);
        setCircleDasharray();
        setPathColor(counter);   
        setTime(counter);
        shake(counter); 
        return () => clearInterval(timer); 
    }, [counter]); 

    return (
       <div className={"base-timer"}>
           <svg className={"base-timer__svg"} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
               <g className={"base-timer__circle"}>
                   <circle className={"base-timer__path-elapsed"} cx="50" cy="50" r="45" />
                   <path 
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className={'base-timer__path-remaining'}
                        style={{stroke: `${remainingPathColor}`}}
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
               {timeConversion(time)}
           </span>
       </div> 
    )
}

export default Clock; 