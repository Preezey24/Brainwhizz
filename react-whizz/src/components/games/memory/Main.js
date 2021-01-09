import React from 'react'; 
import { Style } from 'react-style-tag';
import './Memory.css'; 

// keep adding to number of steps for keyframe
function changePercent(length) {
    return 100/length
}

const Main = ({mainClick, colors}) => {
    //establish text string to be input into style tag with dynamic update to steps 
    function keyFrameUpdate(colorArr) {
        let keyFrame = "@keyframes main {"; 
        let step = 0;
        let transition = 100/colors.length;
        colorArr.forEach((color, i) => {
           keyFrame+=`${step+transition} { background: ${color} }`
        })
    }


    return (
        <>
            <button onClick={mainClick}>Click me</button>          
            <span className={"main"} >
                <Style>{` 
                @keyframes main {
                    0% {
                        background: orange;
                    }
                    100% {
                        background: black; 
                    }
                }
                `}</Style>
                HELLO
                {colors.length}
            </span>
        </>
    )
}

export default Main; 

// var createKeyframe = require('create-keyframe') 

// var cssKeyframe
// shakeDistance = 50; 

// cssKeyframe = {
//   0: {
//     color: 'black'
//   },
//   20: { transform: `translateX(${shakeDistance}px)` },
//   60: { transform: `translateX(-${shakeDistance}px)` },
//   75: {
//     color: 'blue'
//   },
//   100: { color: 'black' }
// }
// var keyframeObj = createKeyframe(cssKeyframe, 'jimmy')
// console.log(keyframeObj); 