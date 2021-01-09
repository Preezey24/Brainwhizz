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
