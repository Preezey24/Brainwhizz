import React, { useState } from 'react'; 
import Modal from './Modal'; 
import SignUpForm from './SignUpForm'; 

function SignUpModal() { 
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Sign Up
            </button>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <SignUpForm/>
            </Modal>
        </>
    );
}

export default SignUpModal; 