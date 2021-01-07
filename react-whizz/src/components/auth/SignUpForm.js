import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';  
import { signUp } from '../../store/reducers/session'

const SignUpForm = () => {
    const dispatch = useDispatch(); 
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
        <form onSubmit={submitHandler}>
            <div>
                <label>Username</label>
                <input 
                    type="text"
                    name="username"
                    value={username}
                    onChange={userHandler}
                />
            </div>
            <div>
                <label>Email</label>
                <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={emailHandler}
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={passwordHandler}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input 
                    type="password"
                    name="confirm"
                    value={confirm}
                    onChange={confirmHandler}
                />
            </div>
            <button type="submit">
                Sign Up
            </button>
        </form>
    )
}

export default SignUpForm; 