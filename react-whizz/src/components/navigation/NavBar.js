import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton'; 
import LoginFormModal from '../auth/LoginFormModal'; 
import SignUpModal from '../auth/SignUpModal'; 
import './Navigation.css';  

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user); 

    let sessionLinks; 
    if (sessionUser) {
        sessionLinks = (
            <div className={"nav__div-prof"}>
                <ProfileButton/>
            </div>
        );
    } else {
        sessionLinks = (
            <div className={"nav__div-auth"}>
                <div>
                    <LoginFormModal/>
                </div>
                <div>
                    <SignUpModal/>
                </div>
            </div>
        )
    }
    return (
        <div className={"nav__container"}>
            {sessionUser && 
                <div className={"nav__div-home"}>  
                    <button className={"nav__home-button"}>
                        <Link style={{"textDecoration": "none"}} to="/home">
                            Home
                        </Link>
                    </button>
                </div>
            }
            <div className={"nav__div-title"}>
                <span className={"nav__icon"}/>
                Brainwhizz
            </div>
            {sessionLinks}
        </div>
    )
}; 

export default Navigation; 

