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
                    <img src={user.image_url} alt=""/>
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
        <div className={"splashpage_auth__main"}> 
            <i class="fab fa-accessible-icon"></i>
            <div className={"math__container"}>
                <NavLink to='/math' style={{textDecoration:"none"}}>
                    <div className={"math__div"}>
                        <div className={"math_heading__div"}>
                            Math Game
                        </div>
                        <div className={"math_icons__div"}>
                            <FcCalculator className={"math__calculator"}/>
                            <FaDivide />
                            <FcClock className={"math__equals"}/>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className={"math_scores__container"}>
                <div className={"math_scores-div"}>
                    <div className={"math_trophy"}>
                        <IconContext.Provider value={{className: "trophy"}}>
                            <ImTrophy/>
                        </IconContext.Provider>   
                    </div> 
                    <div className={"math_scores-content"}>
                        High 
                    </div>
                    <div className={"math_scores-content"}>
                        Total
                    </div>
                    <div className={"math_scores-content"}>
                        {user?.math_high || 0} 
                    </div>
                    <div className={"math_scores-content"}>
                        {user?.math_total || 0} 
                    </div>
                </div>
            </div>
            <div className={"memory__container"}>
                <NavLink to='/memory' style={{textDecoration:"none"}}>
                    <div className={"memory__div"}>
                        <div className={"memory__heading_one"}>
                            Memory
                        </div>
                        <div className={"memory__heading_two"}>
                            Game
                        </div>
                        <div className={"memory_icons__div"}>
                            <FaEye className={"memory__eye"}/>
                            <FcMindMap className={"memory__mind"}/>
                            <FcIdea className={"memory__light"}/>
                        </div>
                    </div>
                </NavLink> 
            </div>
            <div className={"memory_scores__container"}>
                <div className={"memory_scores-div"}>
                    <div className={"memory_trophy"}>
                        <IconContext.Provider value={{className: "trophy"}}>
                            <ImTrophy/>
                        </IconContext.Provider>   
                    </div> 
                    <div className={"memory_scores-content"}>
                        High 
                    </div>
                    <div className={"memory_scores-content"}>
                        Total
                    </div>
                    <div className={"memory_scores-content"}>
                        {user?.memory_high || 0} 
                    </div>
                    <div className={"memory_scores-content"}>
                        {user?.memory_total || 0}
                    </div>
                </div>
            </div>
            <div className={"drawing__container"}>
                <div className={"drawing__div"}>
                    <NavLink to='/drawing'>
                        <span className={"drawing__link-span"}>Drawing</span>
                    </NavLink> 
                    <FcPicture className={"drawing__pic"}/>
                    <FcFrame className={"drawing__gallery"}/>
                </div>
            </div>
            <div className={"picture__container"}>
                <div className={"picture__div"}>
                    {drawing}
                </div>
            </div>
        </div>
    )
}

export default SplashAuth; 