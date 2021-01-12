import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';  
import { logIn } from '../../store/reducers/session'

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
        <form onSubmit={submitHandler}>
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
            <button type="submit">
                Log In 
            </button>
        </form>
    );
}

export default LoginForm; 