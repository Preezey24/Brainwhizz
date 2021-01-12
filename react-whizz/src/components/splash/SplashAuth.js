import React, {useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { NavLink, Route } from 'react-router-dom';
import './SplashAuth.css'; 


const SplashAuth = () => {

    return (
        <>  
            <div>
                <NavLink to='/math'>Math Game</NavLink>
                <NavLink to='/memory'>Memory Game</NavLink> 
                <NavLink to='/drawing'>Drawing</NavLink> 
            </div>
        </>
    )
}

export default SplashAuth; 