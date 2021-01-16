import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import Modal from './ModalSign'; 
import SignUpForm from './SignUpForm'; 
import { removeErrors } from '../../store/reducers/session';
import './Auth.css'

function SignUpModal() { 
    const [showModal, setShowModal] = useState(false); 
    const errors = useSelector(state => state.session.errors);
    const dispatch = useDispatch();

    const modalClose = () => {
        setShowModal(false); 
        if (errors) dispatch(removeErrors()); 
    }

    return (
        <>
            <button className={"nav__signup-button"} onClick={() => setShowModal(true)}>
                Sign Up
            </button>
            <Modal open={showModal} onClose={modalClose}>
                <SignUpForm onClose={modalClose}/>
            </Modal>
        </>
    );
}

export default SignUpModal; 