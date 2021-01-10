import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton'; 
import LoginFormModal from '../auth/LoginFormModal'; 
import LogoutButton from '../auth/LogoutButton'; 
import SignUpForm from '../auth/SignUpForm'; 
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
            <div>
                <LoginForm/>
            </div>
        )
    }
}

