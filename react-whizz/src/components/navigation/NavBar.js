import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton'; 
import LoginFormModal from '../auth/LoginFormModal'; 
import LogoutButton from '../auth/LogoutButton'; 
import SignUpModal from '../auth/SignUpModal'; 
import './Navigation.css'; 

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user); 

    let sessionLinks; 
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser}/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div>
                    <LoginFormModal/>
                </div>
                <div>
                    <SignUpModal/>
                </div>
            </>
        )
    }
    return (
        <div>
            <div>
                <button>
                    <NavLink exact to="/">
                        Home
                    </NavLink>
                </button>
            </div>
            {/* {isLoaded && sessionLinks} */}
        </div>
    )
}; 

export default Navigation; 

