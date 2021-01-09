import React from 'react'; 
import { Style } from 'react-style-tag';
import './Memory.css'; 

// keep adding to number of steps for keyframe
function changePercent(length) {
    return 100/length
}

const Main = ({mainClick, colors}) => {

    return (
        <>
            <span className={"main"} />
            <button onClick={mainClick}>Click me</button>
            {colors.map(color => {
                return (
                    <div className={`${color}`}>
                        <Style>{` \
                        .${color} {\
                            color: ${color};\
                        }`}</Style>
                        HELLO
                        {colors.length}
                    </div>
                )
            })}
            <div className={`${color}`}>
                <Style>{` \
                .${color} {\
                    color: ${color};\
                }`}</Style>
                HELLO
                {colors.length}
            </div>
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