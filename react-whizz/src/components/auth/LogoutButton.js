import React from "react";
import { logout } from "../../store/reducers/session";
import { useDispatch, useSelector } from 'react-redux';

const LogoutButton = () => {
    const dispatch = useDispatch(); 

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;