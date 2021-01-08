// var createKeyframe = require('create-keyframe') 

function getRandInt (max) {
    return Math.floor(Math.random() * max); 
}

const randColor = () => {
    let i = getRandInt(5); 
    let colorArr = ['red', 'blue', 'green', 'yellow', 'purple']; 
    return colorArr[i]; 
}; 

export {
    randColor,
};

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

