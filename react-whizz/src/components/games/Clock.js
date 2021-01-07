import React, { useState, useEffect } from 'react'; 

const Clock = () => {
    const [time, setTime] = useState(new Date());  

    setInterval(() => setTime(new Date()), 1000); 

    let minutes = time.getMinutes(); 
    let seconds = time.getSeconds(); 

    return (
       <div>
           <h1>Clock</h1>
           <p>
            <span>
                Time: 
            </span>
            <span>
                {minutes}:{seconds}  
            </span>
           </p>
       </div> 
    )
}

export default Clock; 