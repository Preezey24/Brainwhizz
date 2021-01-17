import React from 'react'; 
import { useSelector } from 'react-redux'; 
import { NavLink } from 'react-router-dom';
import './SplashAuth.css';
import { FaDivide, FaEye } from "react-icons/fa";
import { FcCalculator, FcIdea, FcPicture, FcClock, FcMindMap, FcFrame } from "react-icons/fc";


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
        </>
    )
}

export default SplashAuth; 