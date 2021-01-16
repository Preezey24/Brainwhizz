import React from 'react'; 
import { useSelector } from 'react-redux'; 
import { NavLink } from 'react-router-dom';
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
            <div className={"math__div"}>
                <NavLink to='/math'>
                    <span className={"math__link-span"}>Math Game</span>
                </NavLink>
            </div>
            <div className={"memory__div"}>
                <NavLink to='/memory'>
                    <span className={"memory__link-span"}>Memory Game</span>
                </NavLink> 
            </div>
            <div className={"drawing__div"}>
                <NavLink to='/drawing'>
                    <span className={"drawing__link-span"}>Drawing</span>
                </NavLink> 
            </div>
            <div className={"picture__div"}>
                {drawing}
            </div>
        </>
    )
}

export default SplashAuth; 