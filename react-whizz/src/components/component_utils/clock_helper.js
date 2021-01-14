export const timeConversion = (counter) => {
    let minutes = Math.floor(counter/60); 
    let seconds = counter % 60; 
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    return `0${minutes}:${seconds}`; 
}
