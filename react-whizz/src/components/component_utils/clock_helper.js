export const timeConversion = (counter) => {
    let minutes = Math.floor(counter/60); 
    let seconds = counter % 60; 
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    return `0${minutes}:${seconds}`; 
}

// export function timeRemaining() {
//     return timeLeft/timeLimit; 
// }

// export function setCircleDasharray() {
//     const circleDasharray = `${(
//         calculateTimeFraction() * completeDashArray
//     ).toFixed(0)} 283`;
//     document.getElementById('base-timer-path-remaining')
//             .setAttribute('stroke-dasharray', circleDasharray)
// }