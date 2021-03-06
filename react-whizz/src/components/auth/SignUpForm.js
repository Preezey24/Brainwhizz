import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';  
import { signUp } from '../../store/reducers/session';
import './Auth.css'; 

const SignUpForm = ({onClose}) => {
    const dispatch = useDispatch(); 
    const errors = useSelector(state => state.session.errors);
    const [username, setUserName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    // validation for whether passwords match is completed on the backend in signup_form.py
    const [confirm, setConfirm] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault(); 
        return dispatch(signUp({ username, email, password, confirm }));
    }

    const userHandler = e => {
        setUserName(e.target.value); 
    }

    const emailHandler = e => {
        setEmail(e.target.value); 
    }

    const passwordHandler = e => {
        setPassword(e.target.value); 
    }

    const confirmHandler = e => {
        setConfirm(e.target.value); 
    }

    return (
        <>
            <div className={"signin__heading"}>
                Sign Up
            </div>
            <form onSubmit={submitHandler} className={"form__signin"}>
                <div>
                    <label className={"form__signin-label"}>Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={username}
                        onChange={userHandler}
                        className={"textbox__signin"}
                    />
                </div>
                <div>
                    <label className={"form__signin-label"}>Email</label>
                    <input 
                        type="text"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        className={"textbox__signin"}
                    />
                </div>
                <div>
                    <label className={"form__signin-label"}>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                        className={"textbox__signin"}
                    />
                </div>
                <div>
                    <label className={"form__signin-label"}>Confirm Password</label>
                    <input 
                        type="password"
                        name="confirm"
                        value={confirm}
                        onChange={confirmHandler}
                        className={"textbox__signin"}
                    />
                </div>
                <button type="submit" className={"button__signin"}>
                    Sign Up
                </button>
                <button onClick={onClose} className={"button__home-signin"}>
                    Return
                </button>
                <div className={"errors__container-signin"}>
                    {errors && errors.map(error => {
                        return (
                            <>
                                <div>{error}</div>
                            </>
                        )
                    })}
                </div>
            </form>
        </>
    )
}

export default SignUpForm; 