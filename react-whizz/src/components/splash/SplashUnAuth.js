import React, {useState, useEffect, useRef} from 'react';
import './SplashUnAuth.css';
import koala from "../../images/koala.jpg";
import kangaroo from "../../images/kangaroo.jpg";

const SplashUnAuth = () => {
    const message = "Hi, I'm Bruce the Koala and welcome to Brainwhizz!! Unleash your intelligence right here";
    const messageTwo = "And I'm Damo the Kangaroo. Improve your skills in Math, Memory and Drawing!!"; 
    const [index, setIndex] = useState(0); 
    const [indexTwo, setIndexTwo] = useState(88)
    const [next, setNext] = useState(false); 
    const [brain, setBrain] = useState(false); 
    const i = useRef(0); 
    
    useEffect(() => {
        if (!message[index]) { 
            setTimeout(() => {
                setNext(true); 
                document.getElementById("talkbubble_one").style.display = "none"; 
            }, 1000); 
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
            setTimeout(() => {
                document.getElementById("talkbubble_two").style.display = "none"; 
            }, 1000);
            setBrain(true); 
            return;
        } 

        if (index >= 87) {
            document.getElementById("talkbubble_two").style.display = "inline"; 
            setTimeout(() => {
                const char = document.getElementById(indexTwo);
                char.style.display = "inline";
                setIndexTwo(indexTwo + 1);
            }, 50);
    
            i.current += 1; 
        }
    }, [next, indexTwo]);

    useEffect(() => {
        if (brain) {
            setTimeout(() => {
                const logo = document.getElementById("logo_div"); 
                logo.style.display = "inline"; 
                logo.style.animation = "zoom 3s linear both"
            }, 1000)
        }
    }, [brain])

    return (
        <div className={"page_main"}>
            <div className={"koala_container"}>
                <img src={koala} />
            </div> 
            <div className={"kangaroo_container"}>
                <img src={kangaroo} />
            </div> 
            <div className={"talkbubble_one"} id={"talkbubble_one"}>
                <div className={"talkbubble_one-text"}>
                    {
                        message.split('').map((char, index) => {
                            return <span className={"talkbubble_char"} key={index} id={index}>{char}</span>
                        })
                    }
                </div>
            </div>
            <div className={"talkbubble_two"} id={"talkbubble_two"}>
                <div className={"talkbubble_two-text"}>
                    {
                        messageTwo.split('').map((char, index) => {
                            return <span className={"talkbubble_char"} key={index} id={88 + index}>{char}</span>
                        })
                    }
                </div>
            </div>
            <div className={"logo_div"} id={"logo_div"}>
                    <div className={"logo_text"}>
                        Brainwhizz
                    </div>
            </div>
        </div>
    )
}

export default SplashUnAuth; 