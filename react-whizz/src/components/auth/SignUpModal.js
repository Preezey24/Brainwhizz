import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import Modal from './Modal'; 
import SignUpForm from './SignUpForm'; 
import { removeErrors } from '../../store/reducers/session'

function SignUpModal() { 
    const [showModal, setShowModal] = useState(false); 
    const errors = useSelector(state => state.session.errors);
    const dispatch = useDispatch();

    const modalClose = () => {
        setShowModal(false); 
        dispatch(removeErrors()); 
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Sign Up
            </button>
            <Modal open={showModal} onClose={modalClose}>
                <ul>
                    {errors && errors.map(error => {
                        return (
                            <li>{error}</li>
                        )
                    })}
                </ul>
                <SignUpForm/>
            </Modal>
        </>
    );
}

export default SignUpModal; 