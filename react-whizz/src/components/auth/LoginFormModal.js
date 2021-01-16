import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import Modal from './ModalLog'; 
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
                <LoginForm onClose={modalClose}/>
            </Modal>
        </>
    );
}

export default LoginFormModal; 