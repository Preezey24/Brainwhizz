import React, { useState } from 'react'; 
import { Modal } from './Modal'; 
import LoginForm from './LoginForm'; 

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Log In
            </button>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <LoginForm/>
            </Modal>
        </>
    );
}

export default LoginFormModal; 