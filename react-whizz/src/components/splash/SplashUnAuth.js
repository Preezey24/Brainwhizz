import React, {useState, useEffect, useRef} from 'react';
import './SplashUnAuth.css';
import koala from "../../images/koala.jpg";
import kangaroo from "../../images/kangaroo.jpg";

const SplashUnAuth = () => {
    const message = "Hi, I'm Bruce the Koala and welcome to Brainwhizz!! Unleash your intelligence right here";
    const messageTwo = "Improve your skills in Math, Memory and Drawing!!"; 
    const [index, setIndex] = useState(0); 
    const [indexTwo, setIndexTwo] = useState(60)
    const [next, setNext] = useState(false); 
    const i = useRef(0); 
    
    useEffect(() => {
        if (!message[index]) { 
            setNext(true); 
            return; 
        };

        setTimeout(() => {
            const char = document.getElementById(index);
            char.style.display = "inline";
            setIndex(index + 1);
        }, 50);
    }, [index]);

    useEffect(() => { 
        if (!messageTwo[i.current]) {
            return;
        } 

        if (index === 60) {
            setTimeout(() => {
                const char = document.getElementById(indexTwo);
                console.log(i.current); 
                char.style.display = "inline";
                setIndexTwo(indexTwo + 1);
            }, 50);
    
            i.current += 1; 
        }
    }, [next, indexTwo]);

    return (
        <div className={"page_main"}>
            <div className={"koala_container"}>
                <img src={koala} />
            </div> 
            <div className={"kangaroo_container"}>
                <img src={kangaroo} />
            </div> 
            <div className={"talkbubble_one"}>
                <div className={"talkbubble_one-text"}>
                    {
                        message.split('').map((char, index) => {
                            return <span className={"talkbubble_char"} key={index} id={index}>{char}</span>
                        })
                    }
                </div>
            </div>
            <div className={"talkbubble_two"}>
                <div className={"talkbubble_two-text"}>
                    {
                        messageTwo.split('').map((char, index) => {
                            return <span className={"talkbubble_char"} key={index} id={60 + index}>{char}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SplashUnAuth; 