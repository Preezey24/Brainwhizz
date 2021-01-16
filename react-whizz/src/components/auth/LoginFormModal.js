import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal'; 
import LoginForm from './LoginForm'; 
import { removeErrors } from '../../store/reducers/session'
import './Auth.css'; 

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false); 
    const errors = useSelector(state => state.session.errors);
    const dispatch = useDispatch();

    const modalClose = () => {
        setShowModal(false); 
        if (errors) dispatch(removeErrors()); 
    }

    return (
        <>
            <button className={"nav__login-button"} onClick={() => setShowModal(true)}>
                Log In
            </button>
            <Modal open={showModal} onClose={modalClose}>
                <ul>
                    {errors && errors.map(error => {
                        return (
                            <li>{error}</li>
                        )
                    })}
                </ul>
                <LoginForm />
            </Modal>
        </>
    );
}

export default LoginFormModal; 