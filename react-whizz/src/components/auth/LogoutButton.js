import React, {useContext} from "react";
import { logout } from "../../store/reducers/session";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../App';
import '../navigation/ProfileButton.css';

const LogoutButton = () => {
    const dispatch = useDispatch(); 
    const history = useHistory();
    const setIsAuthenticated = useContext(AuthContext);  

    const onLogout = async (e) => {
        await dispatch(logout());
        setIsAuthenticated(false); 
        history.push('/')
    };
    
    return <button onClick={onLogout} className={"nav__logout-button"}>
                Log Out
            </button>;
};

export default LogoutButton;