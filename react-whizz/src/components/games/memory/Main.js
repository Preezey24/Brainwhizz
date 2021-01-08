import React from 'react'; 
import './Memory.css'; 

const Main = ({mainClick}) => {
    return (
        <>
            <span className={"main"} />
            <button onClick={mainClick}>Click me</button>
        </>
    )
}

export default Main; 