import React from 'react'; 
import { useSelector } from 'react-redux'; 
import { NavLink } from 'react-router-dom';
import './SplashAuth.css';
import { IconContext } from 'react-icons/lib';
import { FaDivide, FaEye } from "react-icons/fa";
import { FcCalculator, FcIdea, FcPicture, FcClock, FcMindMap, FcFrame } from "react-icons/fc";
import { ImTrophy } from 'react-icons/im'; 


const SplashAuth = () => {
    const user = useSelector(state => state.session.user);  

    let drawing; 
    if (user) {
        if (user.image_url) {
            drawing = (
                <>
                    <img src={user.image_url}/>
                </>
            )
        } else {
            drawing = (
                <span className={"picture__text"}>
                    Open up your creative side, 
                    draw something! 
                </span>
            )
        }
    };

    return (
        <div className={"page__main"}> 
            <i class="fab fa-accessible-icon"></i>
            <div className={"math__div"}>
                <NavLink to='/math'>
                    <span className={"math__link-span"}>
                        <div className={"math__heading"}>
                            Math Game
                        </div>
                    </span>
                </NavLink>
                <FcCalculator className={"math__calculator"}/>
                <FaDivide className={"math__divide"}/>
                <FcClock className={"math__equals"}/>
            </div>
            <div>
                <IconContext.Provider className={"trophy"}>
                    <ImTrophy/>
                </IconContext.Provider>   
            </div> 
            <div className={"math_scores-div"}>
                <div className={"math_scores-content"}>
                    High 
                </div>
                <div className={"math_scores-content"}>
                    Total
                </div>
                <div className={"math_scores-content"}>
                    {user &&
                    user.math_high} 
                </div>
                <div className={"math_scores-content"}>
                    {user && 
                    user.math_total} 
                </div>
            </div>
            <div className={"memory__div"}>
                <NavLink to='/memory'>
                    <span className={"memory__link-span"}>
                        <div className={"memory__heading_one"}>
                            Memory
                        </div>
                        <div className={"memory__heading_two"}>
                            Game
                        </div>
                    </span>
                </NavLink> 
                <FaEye className={"memory__eye"}/>
                <FcIdea className={"memory__light"}/>
                <FcMindMap className={"memory__mind"}/>
            </div>
            <div className={"drawing__div"}>
                <NavLink to='/drawing'>
                    <span className={"drawing__link-span"}>Drawing</span>
                </NavLink> 
                <FcPicture className={"drawing__pic"}/>
                <FcFrame className={"drawing__gallery"}/>
            </div>
            <div className={"picture__div"}>
                {drawing}
            </div>
        </div>
    )
}

export default SplashAuth; 