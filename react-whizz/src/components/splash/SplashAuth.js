import React, {useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { NavLink, Route } from 'react-router-dom';
import './SplashAuth.css'; 


const SplashAuth = () => {
    const imageURL = useSelector(state => state.session.user.image_url);  

    let drawing; 
    if (imageURL) {
        drawing = (
            <>
                <img src={imageURL}/>
            </>
        )
    } else {
        drawing = (
            <p>
                Open up your creative side, 
                draw yourself! 
            </p>
        )
    }

    return (
        <>  
            <div>
                <NavLink to='/math'>Math Game</NavLink>
                <NavLink to='/memory'>Memory Game</NavLink> 
                <NavLink to='/drawing'>Drawing</NavLink> 
            </div>
            <div>
                {drawing}
            </div>
        </>
    )
}

export default SplashAuth; 