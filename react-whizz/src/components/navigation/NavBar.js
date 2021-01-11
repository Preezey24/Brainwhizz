import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
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
            <>
                <ProfileButton/>
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
            {sessionUser && 
                <div>
                    <button>
                        <NavLink to="/home">
                            Home
                        </NavLink>
                    </button>
                </div>
            }
            {sessionLinks}
        </div>
    )
}; 

export default Navigation; 

