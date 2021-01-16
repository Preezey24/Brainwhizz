import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';  
import { logIn } from '../../store/reducers/session'; 
import './Auth.css'; 

const LoginForm = () => {
    const dispatch = useDispatch();  
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault(); 
        dispatch(logIn({ email, password })); 
    }

    const emailHandler = e => {
        setEmail(e.target.value); 
    }

    const passwordHandler = e => {
        setPassword(e.target.value); 
    }
    

    return ( 
        <>
            <div className={"login__heading"}>
                Login
            </div>
            <form onSubmit={submitHandler} className={"form__login"}>
                <div>
                    <label className={"form__login-label"}>Email</label>
                    <input 
                        type="text"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        className={"textbox__login"}
                    />
                </div>
                <div>
                    <label className={"form__login-label"}>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                        className={"textbox__login"}
                    />
                </div>
                <button type="submit" className={"button__login"}>
                    Log In 
                </button>
            </form>
        </>
    );
}

export default LoginForm; 