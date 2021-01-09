import React from 'react'; 
import './Memory.css'; 

const Light = ({ style, id, lightClick }) => {
    return (
        <span onClick={lightClick} className={"light"} style={style} id={id}/>
    )
}

export default Light; 