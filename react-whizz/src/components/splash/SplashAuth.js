import React from 'react'; 
import { NavLink } from 'react-router-dom';
import './SplashAuth.css'; 

const SplashAuth = () => {
    return (
        <>  
            <div>
                <NavLink to='/math'>Math Game</NavLink>
            </div>
            <div>
                <NavLink to='/memory'>Memory Game</NavLink> 
            </div>
        </>
    )
}

export default SplashAuth; 